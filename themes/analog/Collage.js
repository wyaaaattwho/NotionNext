const assets = {
  street: { width: 450, height: 900 },
  audio: { width: 640, height: 588 },
  robot: { width: 640, height: 498 }
}

/** A continuous pasted-paper backdrop beneath the site's reading surfaces. */
export default function Collage() {
  return (
    <div className='an-collage-background' aria-hidden='true'>
      {Object.keys(assets).map(name => (
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
