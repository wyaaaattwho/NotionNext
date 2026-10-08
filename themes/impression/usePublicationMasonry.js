import { useEffect } from 'react'

const ROW_HEIGHT = 4
const COLUMN_PROPERTY = '--im-paper-column'
const SPAN_PROPERTY = '--im-paper-span'

/** Keep source/keyboard order while giving each desktop column its own flow. */
export default function usePublicationMasonry(rootRef, data) {
  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const groups = [...root.querySelectorAll('.im-profile-entries-publications')]
    const original = new Map()
    let frame = 0

    groups.forEach(group => {
      for (const card of group.children) {
        original.set(card, {
          column: card.style.getPropertyValue(COLUMN_PROPERTY),
          span: card.style.getPropertyValue(SPAN_PROPERTY)
        })
      }
    })

    function layout() {
      frame = 0
      if (window.innerWidth <= 650) return
      groups.forEach(group => {
        group.classList.add('im-paper-masonry')
        const gap = parseFloat(window.getComputedStyle(group).columnGap) || 0
        const cards = [...group.children]
        cards.forEach((card, index) => {
          const trailingGap = index < cards.length - 2 ? gap : 0
          const span = Math.max(
            1,
            Math.ceil((card.getBoundingClientRect().height + trailingGap) / ROW_HEIGHT)
          )
          card.style.setProperty(COLUMN_PROPERTY, String((index % 2) + 1))
          card.style.setProperty(SPAN_PROPERTY, String(span))
        })
      })
    }

    function schedule() {
      if (!frame) frame = window.requestAnimationFrame(layout)
    }

    const observer =
      'ResizeObserver' in window ? new ResizeObserver(schedule) : null
    original.forEach((previous, card) => observer?.observe(card))
    window.addEventListener('resize', schedule, { passive: true })
    root.addEventListener('toggle', schedule, true)
    root.addEventListener('load', schedule, true)
    layout()

    return () => {
      if (frame) window.cancelAnimationFrame(frame)
      observer?.disconnect()
      window.removeEventListener('resize', schedule)
      root.removeEventListener('toggle', schedule, true)
      root.removeEventListener('load', schedule, true)
      groups.forEach(group => group.classList.remove('im-paper-masonry'))
      original.forEach((previous, card) => {
        for (const [property, value] of [
          [COLUMN_PROPERTY, previous.column],
          [SPAN_PROPERTY, previous.span]
        ]) {
          if (value) card.style.setProperty(property, value)
          else card.style.removeProperty(property)
        }
      })
    }
  }, [rootRef, data])
}
