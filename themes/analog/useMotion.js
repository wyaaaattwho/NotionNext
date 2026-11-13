import { useEffect } from 'react'

/** Scroll-linked motion sleeps between input events and honors live preferences. */
export default function useAnalogMotion(rootRef, routeKey) {
  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const desktop = window.matchMedia('(min-width: 651px)')
    let frame = 0
    let stopped = false
    const targets =
      '[data-reveal], .notion-row, .notion-h, .notion-asset-wrapper'
    const observed = new WeakSet()
    const reveal =
      typeof IntersectionObserver === 'function'
        ? new IntersectionObserver(
            entries =>
              entries.forEach(entry => {
                if (!entry.isIntersecting) return
                entry.target.classList.add('an-in-view')
                reveal.unobserve(entry.target)
              }),
            { threshold: 0.06, rootMargin: '0px 0px -30px' }
          )
        : null
    function scan() {
      root.querySelectorAll(targets).forEach(element => {
        if (
          observed.has(element) ||
          media.matches ||
          element.parentElement?.closest(targets)
        )
          return
        observed.add(element)
        element.classList.add('an-reveal')
        reveal?.observe(element)
      })
    }
    function paint() {
      frame = 0
      if (stopped) return
      const y = window.scrollY
      const height = Math.max(
        0,
        document.documentElement.scrollHeight - window.innerHeight
      )
      root.style.setProperty(
        '--an-progress',
        String(height ? Math.min(1, y / height) : 0)
      )
      root.style.setProperty(
        '--an-hero-shift',
        `${media.matches || !desktop.matches ? 0 : Math.min(45, y * 0.075)}px`
      )
      root.style.setProperty(
        '--an-trace-shift',
        `${media.matches ? 0 : Math.sin(y / 1400) * 54}px`
      )
      root.classList.toggle('an-header-scrolled', y > 48)
    }
    function schedule() {
      if (!frame && !stopped) frame = requestAnimationFrame(paint)
    }
    function preference() {
      scan()
      schedule()
    }
    const mutation = new MutationObserver(() => {
      scan()
      schedule()
    })
    mutation.observe(root, { childList: true, subtree: true })
    const resize =
      typeof ResizeObserver === 'function' ? new ResizeObserver(schedule) : null
    resize?.observe(document.body)
    media.addEventListener('change', preference)
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule, { passive: true })
    scan()
    paint()
    return () => {
      stopped = true
      if (frame) cancelAnimationFrame(frame)
      reveal?.disconnect()
      mutation.disconnect()
      resize?.disconnect()
      media.removeEventListener('change', preference)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      root
        .querySelectorAll('.an-reveal')
        .forEach(element => element.classList.remove('an-reveal', 'an-in-view'))
      for (const property of [
        '--an-progress',
        '--an-hero-shift',
        '--an-trace-shift'
      ])
        root.style.removeProperty(property)
      root.classList.remove('an-header-scrolled')
    }
  }, [rootRef, routeKey])
}
