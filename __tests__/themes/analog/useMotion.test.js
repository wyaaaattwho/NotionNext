import { useRef } from 'react'
import { act, render } from '@testing-library/react'
import useAnalogMotion from '@/themes/analog/useMotion'

function Fixture() {
  const root = useRef(null)
  useAnalogMotion(root, '/')
  return (
    <div ref={root} data-testid='root'>
      <section data-reveal>
        <div className='notion-row'>Content</div>
      </section>
    </div>
  )
}

describe('Analog motion', () => {
  let frames, media, observers
  const original = {
    raf: window.requestAnimationFrame,
    cancel: window.cancelAnimationFrame,
    match: window.matchMedia,
    intersection: window.IntersectionObserver,
    mutation: window.MutationObserver,
    resize: window.ResizeObserver
  }
  const properties = [
    [window, 'scrollY', 400],
    [window, 'innerHeight', 800],
    [document.documentElement, 'scrollHeight', 2000]
  ].map(([object, key, value]) => ({
    object,
    key,
    value,
    descriptor: Object.getOwnPropertyDescriptor(object, key)
  }))
  const flush = () => {
    const callbacks = [...frames.values()]
    frames.clear()
    callbacks.forEach(callback => callback())
  }

  beforeEach(() => {
    frames = new Map()
    media = new Map()
    observers = []
    let id = 0
    window.requestAnimationFrame = jest.fn(callback => {
      frames.set(++id, callback)
      return id
    })
    window.cancelAnimationFrame = jest.fn(id => frames.delete(id))
    window.matchMedia = jest.fn(query => {
      const listeners = new Set()
      const match = {
        matches: query.includes('min-width'),
        addEventListener: (_, fn) => listeners.add(fn),
        removeEventListener: (_, fn) => listeners.delete(fn),
        change: value => {
          match.matches = value
          listeners.forEach(fn => fn())
        }
      }
      media.set(query, match)
      return match
    })
    const Observer = function (callback) {
      this.callback = callback
      this.observe = jest.fn()
      this.unobserve = jest.fn()
      this.disconnect = jest.fn()
      observers.push(this)
    }
    window.IntersectionObserver = Observer
    window.MutationObserver = Observer
    window.ResizeObserver = Observer
    properties.forEach(({ object, key, value }) =>
      Object.defineProperty(object, key, { configurable: true, value })
    )
  })
  afterEach(() => {
    window.requestAnimationFrame = original.raf
    window.cancelAnimationFrame = original.cancel
    window.matchMedia = original.match
    window.IntersectionObserver = original.intersection
    window.MutationObserver = original.mutation
    window.ResizeObserver = original.resize
    properties.forEach(({ object, key, descriptor }) =>
      descriptor
        ? Object.defineProperty(object, key, descriptor)
        : delete object[key]
    )
  })

  test('coalesces scroll input and stops requesting frames when stationary', () => {
    const { getByTestId } = render(<Fixture />)
    act(() => {
      for (let i = 0; i < 12; i++) window.dispatchEvent(new Event('scroll'))
    })
    expect(frames.size).toBe(1)
    act(flush)
    expect(frames.size).toBe(0)
    expect(
      Number(getByTestId('root').style.getPropertyValue('--an-progress'))
    ).toBeCloseTo(1 / 3)
    expect(observers[0].observe).toHaveBeenCalledTimes(1)
  })
  test('live reduced-motion changes reset movement while preserving reading progress', () => {
    const { getByTestId } = render(<Fixture />)
    const root = getByTestId('root')
    expect(root.style.getPropertyValue('--an-hero-shift')).not.toBe('0px')
    act(() => media.get('(prefers-reduced-motion: reduce)').change(true))
    act(flush)
    expect(root.style.getPropertyValue('--an-hero-shift')).toBe('0px')
    expect(root.style.getPropertyValue('--an-trace-shift')).toBe('0px')
    expect(
      Number(root.style.getPropertyValue('--an-progress'))
    ).toBeGreaterThan(0)
  })
  test('unmount cancels pending work and disconnects observers and listeners', () => {
    const { unmount } = render(<Fixture />)
    act(() => window.dispatchEvent(new Event('scroll')))
    expect(frames.size).toBe(1)
    unmount()
    expect(frames.size).toBe(0)
    observers.forEach(observer =>
      expect(observer.disconnect).toHaveBeenCalled()
    )
    act(() => window.dispatchEvent(new Event('scroll')))
    expect(frames.size).toBe(0)
  })
})
