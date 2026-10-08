const PIGMENTS = [
  [133, 155, 116], // Sage
  [197, 133, 106], // Clay
  [202, 173, 103], // Ochre
  [124, 155, 162] // Slate blue
]

// Positions are relative to the viewport; most pigment stays at its edges.
const WASHES = [
  { x: -0.02, y: 0.23, pigment: 0, size: 1.5, phase: 0.2 },
  { x: 0.07, y: 0.68, pigment: 1, size: 1.05, phase: 2.1 },
  { x: 0.22, y: 0.94, pigment: 2, size: 0.65, phase: 4.8 },
  { x: 1.02, y: 0.32, pigment: 1, size: 1.3, phase: 1.3 },
  { x: 0.95, y: 0.79, pigment: 0, size: 1.55, phase: 3.6 },
  { x: 0.82, y: 0.12, pigment: 3, size: 0.75, phase: 5.4 },
  { x: 0.52, y: 0.56, pigment: 2, size: 0.5, phase: 2.9 }
]

function randomSequence(seed) {
  return () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0
    return seed / 4294967296
  }
}

function traceWash(context, points) {
  const last = points[points.length - 1]
  context.beginPath()
  context.moveTo((last.x + points[0].x) / 2, (last.y + points[0].y) / 2)
  points.forEach((point, index) => {
    const next = points[(index + 1) % points.length]
    context.quadraticCurveTo(
      point.x,
      point.y,
      (point.x + next.x) / 2,
      (point.y + next.y) / 2
    )
  })
  context.closePath()
}

function paintStamp(pigment, seed) {
  const stamp = document.createElement('canvas')
  stamp.width = 256
  stamp.height = 320
  const context = stamp.getContext('2d')
  const random = randomSequence(seed)
  const color = pigment.join(',')

  // Several translucent, uneven washes make a soft edge and pooled pigment.
  for (let layer = 0; layer < 5; layer++) {
    const points = Array.from({ length: 24 }, (_, index) => {
      const angle = (index / 24) * Math.PI * 2
      const radius = 0.78 + random() * 0.22 - layer * 0.035
      return {
        x: 128 + Math.cos(angle) * 108 * radius,
        y: 160 + Math.sin(angle) * 140 * radius
      }
    })
    const wash = context.createRadialGradient(117, 146, 12, 128, 160, 145)
    wash.addColorStop(0, `rgba(${color},0.14)`)
    wash.addColorStop(0.65, `rgba(${color},0.075)`)
    wash.addColorStop(1, `rgba(${color},0.015)`)
    traceWash(context, points)
    context.fillStyle = wash
    context.fill()
    context.strokeStyle = `rgba(${color},0.045)`
    context.lineWidth = 0.8
    context.stroke()
  }

  // Paper-sized gaps and fine pigment grains are baked once, never per frame.
  context.globalCompositeOperation = 'source-atop'
  for (let grain = 0; grain < 900; grain++) {
    context.beginPath()
    context.ellipse(
      random() * 256,
      random() * 320,
      0.3 + random() * 1.8,
      0.3 + random() * 1.3,
      random() * Math.PI,
      0,
      Math.PI * 2
    )
    context.fillStyle = `rgba(${color},${0.025 + random() * 0.06})`
    context.fill()
  }
  context.globalCompositeOperation = 'destination-out'
  for (let grain = 0; grain < 500; grain++) {
    context.fillStyle = `rgba(0,0,0,${random() * 0.35})`
    context.fillRect(random() * 256, random() * 320, 1, 1)
  }
  return stamp
}

/** A small cached painting, drawn only while scroll motion settles. */
export function createWatercolorScene(canvas) {
  if (!canvas) return null
  let context
  try {
    context = canvas.getContext('2d')
  } catch {
    return null
  }
  if (!context) return null

  let stamps = PIGMENTS.map((pigment, index) => paintStamp(pigment, index + 31))
  const random = randomSequence(71)
  const droplets = Array.from({ length: 24 }, () => ({
    x: random(),
    y: 0.12 + random() * 0.84,
    radius: 1.2 + random() * 3.4,
    phase: random() * Math.PI * 2,
    pigment: Math.floor(random() * PIGMENTS.length)
  }))
  let width = 0
  let height = 0
  let ratio = 1
  let lastPaint = ''

  function resize() {
    const nextRatio = Math.min(window.devicePixelRatio || 1, 1.5)
    if (
      width === window.innerWidth &&
      height === window.innerHeight &&
      ratio === nextRatio
    ) {
      return
    }
    width = window.innerWidth
    height = window.innerHeight
    ratio = nextRatio
    canvas.width = Math.round(width * ratio)
    canvas.height = Math.round(height * ratio)
    context.setTransform(ratio, 0, 0, ratio, 0, 0)
    lastPaint = ''
  }

  function render(scrollTop, dark) {
    const paintKey = `${scrollTop.toFixed(1)}:${dark}`
    if (paintKey === lastPaint) return
    lastPaint = paintKey
    context.clearRect(0, 0, width, height)
    const phase = scrollTop * 0.0008
    const size = Math.min(250, width * 0.24)
    const travel = Math.min(90, width * 0.08)

    WASHES.forEach((wash, index) => {
      const angle = phase + wash.phase
      const x = width * wash.x + Math.sin(angle) * travel
      const y = height * wash.y + Math.cos(angle * 0.8) * height * 0.1
      const scale = 1 + Math.sin(angle * 0.6) * 0.12
      const washWidth = size * wash.size * scale
      context.save()
      context.translate(x, y)
      context.rotate(Math.sin(angle * 0.7) * 0.3)
      context.globalAlpha = (dark ? 0.34 : 0.48) * (index === 6 ? 0.45 : 1)
      context.drawImage(
        stamps[wash.pigment],
        -washWidth / 2,
        -washWidth * 0.625,
        washWidth,
        washWidth * 1.25
      )
      context.restore()
    })

    droplets.forEach(drop => {
      const angle = phase * 1.2 + drop.phase
      const x = drop.x * width + Math.sin(angle) * travel * 0.5
      const y = drop.y * height + Math.cos(angle) * 26
      const radius = drop.radius * (width < 650 ? 0.7 : 1)
      context.fillStyle = `rgba(${PIGMENTS[drop.pigment].join(',')},${dark ? 0.12 : 0.17})`
      context.beginPath()
      context.ellipse(x, y, radius, radius * 0.7, angle * 0.3, 0, Math.PI * 2)
      context.fill()
    })
  }

  return {
    resize,
    render,
    destroy() {
      context.clearRect(0, 0, width, height)
      stamps = []
    }
  }
}
