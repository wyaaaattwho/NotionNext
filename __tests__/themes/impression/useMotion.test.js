import { useRef } from 'react'
import { act, render } from '@testing-library/react'
import useImpressionMotion from '@/themes/impression/useMotion'

function Fixture({ route = '/' }) {
  const root = useRef(null)
  useImpressionMotion(root, route)
  return (
    <div ref={root} data-testid='root'>
      <main id='im-main'>
        <section className='im-hero' />
        <div className='notion-row' data-testid='row'>
          <aside className='notion-callout' data-testid='nested-callout'>
            <h2 className='notion-h2'>Experience</h2>
          </aside>
        </div>
        <div className='notion-callout' data-testid='callout'>
          Microsoft
        </div>
        <figure className='notion-asset-wrapper-image' data-testid='image' />
      </main>
    </div>
  )
}

describe('Impression motion lifecycle', () => {
  let intersections
  let mutations
  let media
  let frames
  let frameId
  let entrance
  const originalIntersectionObserver = window.IntersectionObserver
  const originalMutationObserver = window.MutationObserver
  const originalRaf = window.requestAnimationFrame
  const originalCancelRaf = window.cancelAnimationFrame
  const originalMatchMedia = window.matchMedia
  const originalAnimate = Object.getOwnPropertyDescriptor(
    HTMLElement.prototype,
    'animate'
  )
  const originalScrollHeight = Object.getOwnPropertyDescriptor(
    document.documentElement,
    'scrollHeight'
  )
  const originalScrollY = Object.getOwnPropertyDescriptor(window, 'scrollY')
  const originalInnerHeight = Object.getOwnPropertyDescriptor(
    window,
    'innerHeight'
  )

  const flushFrame = () => {
    const pending = [...frames.values()]
    frames.clear()
    pending.forEach(callback => callback())
  }

  beforeEach(() => {
    intersections = []
    mutations = []
    media = new Map()
    frames = new Map()
    frameId = 0
    entrance = { cancel: jest.fn() }
    window.IntersectionObserver = jest.fn(function (callback, options) {
      this.callback = callback
      this.options = options
      this.observe = jest.fn()
      this.unobserve = jest.fn()
      this.disconnect = jest.fn()
      intersections.push(this)
    })
    window.MutationObserver = jest.fn(function (callback) {
      this.callback = callback
      this.observe = jest.fn()
      this.disconnect = jest.fn()
      mutations.push(this)
    })
    window.matchMedia = jest.fn(query => {
      const listeners = new Set()
      const result = {
        matches: query.includes('pointer: fine'),
        addEventListener: jest.fn((event, listener) => listeners.add(listener)),
        removeEventListener: jest.fn((event, listener) =>
          listeners.delete(listener)
        ),
        change(matches) {
          result.matches = matches
          listeners.forEach(listener => listener({ matches }))
        }
      }
      media.set(query, result)
      return result
    })
    window.requestAnimationFrame = jest.fn(callback => {
      frames.set(++frameId, callback)
      return frameId
    })
    window.cancelAnimationFrame = jest.fn(id => frames.delete(id))
    HTMLElement.prototype.animate = jest.fn(() => entrance)
    jest.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({
      top: 1000,
      bottom: 1200,
      left: 0,
      right: 700,
      width: 700,
      height: 200
    })
    Object.defineProperty(window, 'scrollY', { configurable: true, value: 400 })
    Object.defineProperty(window, 'innerHeight', {
      configurable: true,
      value: 800
    })
    Object.defineProperty(document.documentElement, 'scrollHeight', {
      configurable: true,
      value: 2000
    })
  })

  afterEach(() => {
    window.IntersectionObserver = originalIntersectionObserver
    window.MutationObserver = originalMutationObserver
    window.requestAnimationFrame = originalRaf
    window.cancelAnimationFrame = originalCancelRaf
    window.matchMedia = originalMatchMedia
    if (originalAnimate) {
      Object.defineProperty(HTMLElement.prototype, 'animate', originalAnimate)
    } else {
      delete HTMLElement.prototype.animate
    }
    if (originalScrollHeight) {
      Object.defineProperty(
        document.documentElement,
        'scrollHeight',
        originalScrollHeight
      )
    } else {
      delete document.documentElement.scrollHeight
    }
    Object.defineProperty(window, 'scrollY', originalScrollY)
    Object.defineProperty(window, 'innerHeight', originalInnerHeight)
  })

  it('reveals top-level Notion blocks once without double-animating nested callouts', () => {
    const { getByTestId } = render(<Fixture />)
    const observer = intersections[0]
    const row = getByTestId('row')
    const callout = getByTestId('callout')
    expect(observer.observe.mock.calls.map(([element]) => element)).toEqual([
      row,
      callout,
      getByTestId('image')
    ])
    expect(getByTestId('nested-callout')).not.toHaveClass('im-reveal')
    expect(row.style.opacity).toBe('')
    act(() =>
      observer.callback([
        { target: row, isIntersecting: true },
        { target: callout, isIntersecting: true }
      ])
    )
    expect(row).toHaveClass('im-in-view')
    expect(callout.style.getPropertyValue('--im-reveal-delay')).toBe('40ms')
    expect(observer.unobserve).toHaveBeenCalledWith(row)
    act(() => observer.callback([{ target: row, isIntersecting: true }]))
    expect(
      observer.unobserve.mock.calls.filter(([element]) => element === row)
    ).toHaveLength(1)
  })

  it('discovers late Notion blocks using a single scoped child-list observer', () => {
    const { getByTestId } = render(<Fixture />)
    const root = getByTestId('root')
    expect(mutations).toHaveLength(1)
    expect(mutations[0].observe).toHaveBeenCalledWith(root, {
      childList: true,
      subtree: true
    })
    const heading = document.createElement('h2')
    heading.className = 'notion-h2'
    root.querySelector('main').append(heading)
    act(() => {
      mutations[0].callback([])
      flushFrame()
    })
    expect(intersections[0].observe).toHaveBeenCalledWith(heading)
  })

  it('honors live reduced-motion changes and restores nodes and styles on unmount', () => {
    const { getByTestId, unmount } = render(<Fixture />)
    const root = getByTestId('root')
    const row = getByTestId('row')
    const preference = media.get('(prefers-reduced-motion: reduce)')
    act(() =>
      intersections[0].callback([{ target: row, isIntersecting: true }])
    )
    act(() => preference.change(true))
    expect(row).not.toHaveClass('im-reveal', 'im-in-view')
    expect(row.style.getPropertyValue('--im-reveal-delay')).toBe('')
    expect(entrance.cancel).toHaveBeenCalled()
    expect(root).not.toHaveClass('im-motion-ready')
    act(() => flushFrame())
    expect(root.style.getPropertyValue('--im-hero-shift')).toBe('0.00px')
    act(() => preference.change(false))
    act(() => flushFrame())
    expect(root).toHaveClass('im-motion-ready')
    unmount()
    expect(mutations[0].disconnect).toHaveBeenCalled()
    expect(
      intersections.every(observer => observer.disconnect.mock.calls.length > 0)
    ).toBe(true)
    expect(root.style.getPropertyValue('--im-progress')).toBe('')
    expect(root.style.getPropertyValue('--im-hero-shift')).toBe('')
    expect(root).not.toHaveClass('im-motion-ready', 'im-header-scrolled')
    expect(preference.removeEventListener).toHaveBeenCalledWith(
      'change',
      expect.any(Function)
    )
  })

  it('updates progress and header state without React renders and coalesces scroll frames', () => {
    const { getByTestId } = render(<Fixture />)
    const root = getByTestId('root')
    expect(Number(root.style.getPropertyValue('--im-progress'))).toBeCloseTo(
      1 / 3
    )
    expect(root).toHaveClass('im-header-scrolled')
    act(() => flushFrame())
    const calls = window.requestAnimationFrame.mock.calls.length
    Object.defineProperty(window, 'scrollY', { configurable: true, value: 0 })
    act(() => {
      window.dispatchEvent(new Event('scroll'))
      window.dispatchEvent(new Event('scroll'))
    })
    expect(window.requestAnimationFrame.mock.calls.length).toBe(calls + 1)
    act(() => flushFrame())
    expect(root.style.getPropertyValue('--im-progress')).toBe('0')
    expect(root).not.toHaveClass('im-header-scrolled')
  })

  it('keeps all content visible when IntersectionObserver is unavailable', () => {
    delete window.IntersectionObserver
    const { getByTestId } = render(<Fixture />)
    expect(getByTestId('row')).not.toHaveClass('im-reveal', 'im-in-view')
    expect(getByTestId('row').style.opacity).toBe('')
  })

  it('moves the hero within its crop on desktop and resets when a touch pointer is selected', () => {
    const { getByTestId } = render(<Fixture />)
    const root = getByTestId('root')
    root.querySelector('.im-hero').getBoundingClientRect = jest.fn(() => ({
      top: -250,
      bottom: 350,
      height: 600
    }))
    act(() => window.dispatchEvent(new Event('scroll')))
    let count = 0
    while (frames.size && count++ < 80) act(() => flushFrame())
    expect(frames.size).toBe(0)
    expect(parseFloat(root.style.getPropertyValue('--im-hero-shift'))).toBe(21)
    const pointer = media.get(
      '(min-width: 900px) and (hover: hover) and (pointer: fine)'
    )
    act(() => pointer.change(false))
    act(() => flushFrame())
    expect(root.style.getPropertyValue('--im-hero-shift')).toBe('0.00px')
    expect(frames.size).toBe(0)
  })
})
