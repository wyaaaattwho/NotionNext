const assets = {
  street: { width: 450, height: 900 },
  audio: { width: 640, height: 588 },
  robot: { width: 640, height: 498 }
}

const scenes = {
  margins: ['street', 'robot'],
  journal: ['street', 'audio'],
  research: ['robot'],
  footer: ['audio']
}

/** Decorative cutouts stay out of the content, reading order and hit targets. */
export default function Collage({ scene }) {
  return (
    <div className={`an-collage an-collage-${scene}`} aria-hidden='true'>
      {scenes[scene].map(name => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={name}
          className={`an-cutout an-cutout-${name}`}
          src={`/images/analog/collage/${name}.webp`}
          alt=''
          width={assets[name].width}
          height={assets[name].height}
          loading='lazy'
          decoding='async'
          draggable='false'
        />
      ))}
    </div>
  )
}
