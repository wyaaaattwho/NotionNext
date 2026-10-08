import { useEffect } from 'react'
import { createWatercolorScene } from './watercolor'

const REVEAL_TARGETS = [
  '[data-reveal]',
  '.notion-h1',
  '.notion-h2',
  '.notion-h3',
  '.notion-callout',
  '.notion-row',
  '.notion-quote',
  '.notion-table',
  '.notion-asset-wrapper-image'
].join(',')

const clamp = (value, min, max) => Math.min(max, Math.max(min, value))

function listenToMedia(media, listener) {
  if (media.addEventListener) {
    media.addEventListener('change', listener)
    return () => media.removeEventListener('change', listener)
  }
  media.addListener(listener)
  return () => media.removeListener(listener)
}

/**
 * Motion is an enhancement: CSS leaves blocks visible until a finite reveal
 * animation starts. An absent observer, interrupted route or reduced-motion
 * preference therefore cannot strand article content behind opacity: 0.
 */
export default function useImpressionMotion(rootRef, routeKey) {
  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const desktopPointer = window.matchMedia(
      '(min-width: 900px) and (hover: hover) and (pointer: fine)'
    )
    const targetState = new Map()
    const revealed = new WeakSet()
    const originalProgress = root.style.getPropertyValue('--im-progress')
    const originalShift = root.style.getPropertyValue('--im-hero-shift')
    const hadMotionClass = root.classList.contains('im-motion-ready')
    const hadScrolledClass = root.classList.contains('im-header-scrolled')
    const watercolor = createWatercolorScene(root.querySelector('.im-watercolor'))
    let revealObserver = null
    let entryAnimation = null
    let hero = null
    let frame = 0
    let needsRefresh = true
    let needsMetrics = true
    let targetShift = 0
    let currentShift = 0
    let targetWaterScroll = 0
    let currentWaterScroll = 0
    let destroyed = false

    function rememberTarget(element) {
      if (targetState.has(element)) return
      targetState.set(element, {
        hadReveal: element.classList.contains('im-reveal'),
        hadView: element.classList.contains('im-in-view'),
        delay: element.style.getPropertyValue('--im-reveal-delay')
      })
    }

    function restoreTarget(element, previous) {
      element.classList.toggle('im-reveal', previous.hadReveal)
      element.classList.toggle('im-in-view', previous.hadView)
      if (previous.delay) {
        element.style.setProperty('--im-reveal-delay', previous.delay)
      } else {
        element.style.removeProperty('--im-reveal-delay')
      }
    }

    function refreshTargets() {
      hero = root.querySelector('.im-hero')
      // Remove detached nodes from the strong map when Notion replaces blocks.
      for (const [element, previous] of targetState) {
        if (!root.contains(element)) {
          revealObserver?.unobserve(element)
          restoreTarget(element, previous)
          targetState.delete(element)
        }
      }
      if (!revealObserver || reducedMotion.matches) return

      const viewportHeight = window.innerHeight
      root.querySelectorAll(REVEAL_TARGETS).forEach(element => {
        const parentTarget = element.parentElement?.closest(REVEAL_TARGETS)
        // A row/callout owns its nested images and headings; animate it once.
        if (parentTarget && root.contains(parentTarget)) return
        if (targetState.has(element)) return
        rememberTarget(element)
        element.classList.add('im-reveal')
        const rect = element.getBoundingClientRect()
        if (
          revealed.has(element) ||
          (rect.bottom > 0 && rect.top < viewportHeight)
        ) {
          // Above-the-fold content uses the page entrance, avoiding two layers
          // of simultaneous transforms on the same text.
          revealed.add(element)
        } else {
          revealObserver.observe(element)
        }
      })
    }

    function updateMetrics() {
      const documentElement = document.documentElement
      const scrollTop = window.scrollY || documentElement.scrollTop || 0
      const scrollDistance = Math.max(
        0,
        documentElement.scrollHeight - window.innerHeight
      )
      root.style.setProperty(
        '--im-progress',
        String(scrollDistance ? clamp(scrollTop / scrollDistance, 0, 1) : 0)
      )
      root.classList.toggle('im-header-scrolled', scrollTop > 48)
      targetWaterScroll = reducedMotion.matches ? 0 : scrollTop

      targetShift = 0
      if (!reducedMotion.matches && desktopPointer.matches && hero) {
        const rect = hero.getBoundingClientRect()
        // Keep the movement inside a scaled image's crop, including at the
        // viewport edge. No movement is applied to mobile or touch pointers.
        targetShift = clamp(
          -rect.top * 0.1,
          0,
          Math.min(38, rect.height * 0.035)
        )
      }
    }

    function tick() {
      frame = 0
      if (destroyed) return
      if (needsRefresh) {
        needsRefresh = false
        refreshTargets()
        watercolor?.resize()
      }
      if (needsMetrics) {
        needsMetrics = false
        updateMetrics()
      }

      if (reducedMotion.matches || !desktopPointer.matches) {
        currentShift = 0
      } else {
        currentShift += (targetShift - currentShift) * 0.16
        if (Math.abs(targetShift - currentShift) < 0.05) {
          currentShift = targetShift
        }
      }
      root.style.setProperty('--im-hero-shift', `${currentShift.toFixed(2)}px`)
      if (reducedMotion.matches || !watercolor) {
        currentWaterScroll = targetWaterScroll
      } else {
        currentWaterScroll += (targetWaterScroll - currentWaterScroll) * 0.14
        if (Math.abs(targetWaterScroll - currentWaterScroll) < 0.1) {
          currentWaterScroll = targetWaterScroll
        }
      }
      watercolor?.render(
        currentWaterScroll,
        document.documentElement.classList.contains('dark')
      )
      if (
        currentShift !== targetShift ||
        currentWaterScroll !== targetWaterScroll
      ) {
        schedule()
      }
    }

    function schedule() {
      if (!frame && !destroyed) frame = window.requestAnimationFrame(tick)
    }

    function onScroll() {
      needsMetrics = true
      schedule()
    }

    function onResizeOrLoad() {
      needsMetrics = true
      needsRefresh = true
      schedule()
    }

    function configureMotion() {
      revealObserver?.disconnect()
      revealObserver = null
      entryAnimation?.cancel()
      entryAnimation = null

      if (reducedMotion.matches) {
        for (const [element, previous] of targetState) {
          restoreTarget(element, previous)
        }
        targetState.clear()
        root.classList.remove('im-motion-ready')
      } else {
        root.classList.add('im-motion-ready')
        if ('IntersectionObserver' in window) {
          revealObserver = new IntersectionObserver(
            entries => {
              let order = 0
              entries.forEach(entry => {
                if (!entry.isIntersecting || revealed.has(entry.target)) return
                revealed.add(entry.target)
                entry.target.style.setProperty(
                  '--im-reveal-delay',
                  `${Math.min(order++, 4) * 40}ms`
                )
                entry.target.classList.add('im-in-view')
                revealObserver?.unobserve(entry.target)
              })
            },
            { threshold: 0.06, rootMargin: '0px 0px -24px 0px' }
          )
          // A live preference change replaces the observer; uncompleted
          // targets must be attached to the fresh instance.
          for (const element of targetState.keys()) {
            if (!revealed.has(element)) revealObserver.observe(element)
          }
        }
      }
      onResizeOrLoad()
    }

    configureMotion()
    refreshTargets()
    needsRefresh = false
    updateMetrics()
    needsMetrics = false
    currentWaterScroll = targetWaterScroll
    watercolor?.resize()
    watercolor?.render(
      currentWaterScroll,
      document.documentElement.classList.contains('dark')
    )

    const main = root.querySelector('#im-main')
    if (!reducedMotion.matches && main?.animate) {
      entryAnimation = main.animate(
        [
          { opacity: 0.6, transform: 'translate3d(0, 10px, 0)' },
          { opacity: 1, transform: 'translate3d(0, 0, 0)' }
        ],
        { duration: 650, easing: 'cubic-bezier(.22, 1, .36, 1)' }
      )
    }

    // Notion embeds and lazy-loaded page blocks can arrive after hydration.
    // Theme attributes are excluded so reveal classes and scroll properties
    // never feed back into this observer. The document's class alone is watched
    // separately to repaint the background when light/dark mode changes.
    const contentObserver =
      'MutationObserver' in window ? new MutationObserver(onResizeOrLoad) : null
    contentObserver?.observe(root, { childList: true, subtree: true })
    contentObserver?.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResizeOrLoad, { passive: true })
    root.addEventListener('load', onResizeOrLoad, true)
    const removeReducedListener = listenToMedia(reducedMotion, configureMotion)
    const removePointerListener = listenToMedia(desktopPointer, onResizeOrLoad)

    return () => {
      destroyed = true
      if (frame) window.cancelAnimationFrame(frame)
      revealObserver?.disconnect()
      contentObserver?.disconnect()
      entryAnimation?.cancel()
      watercolor?.destroy()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResizeOrLoad)
      root.removeEventListener('load', onResizeOrLoad, true)
      removeReducedListener()
      removePointerListener()
      for (const [element, previous] of targetState) {
        restoreTarget(element, previous)
      }
      root.classList.toggle('im-motion-ready', hadMotionClass)
      root.classList.toggle('im-header-scrolled', hadScrolledClass)
      if (originalProgress) {
        root.style.setProperty('--im-progress', originalProgress)
      } else {
        root.style.removeProperty('--im-progress')
      }
      if (originalShift) {
        root.style.setProperty('--im-hero-shift', originalShift)
      } else {
        root.style.removeProperty('--im-hero-shift')
      }
    }
  }, [rootRef, routeKey])
}
