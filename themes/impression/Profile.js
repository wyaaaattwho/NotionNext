import NotionLink from '@/components/NotionLink'
import SmartLink from '@/components/SmartLink'
import NotionEmbed from '@/components/NotionEmbed'
import { mapImgUrl } from '@/lib/db/notion/mapImage'
import { useGlobal } from '@/lib/global'
import dynamic from 'next/dynamic'
import { useEffect, useMemo, useRef } from 'react'
import {
  NotionContextProvider,
  NotionRenderer,
  Text,
  useNotionContext
} from 'react-notion-x'
import { parseProfile } from './profileData'
import { ProfileStyle } from './profileStyle'
import { splitPaperBibliography } from './profilePresentation'

const Equation = dynamic(
  () => import('@/components/Equation').then(m => m.Equation),
  { ssr: false }
)
const Code = dynamic(
  () => import('react-notion-x/build/third-party/code').then(m => m.Code),
  { ssr: false }
)
const Collection = dynamic(() => import('@/components/NotionCollection'))
const Pdf = dynamic(() => import('@/components/Pdf').then(m => m.Pdf), {
  ssr: false
})
const components = {
  Link: NotionLink,
  Embed: NotionEmbed,
  Equation,
  Code,
  Collection,
  Pdf
}

const plain = descriptor =>
  (descriptor?.richText || []).map(item => item[0]).join('')
const anchor = id => String(id).replace(/-/g, '')
const mapPageUrl = id => `/${anchor(id)}`
const isTextTree = descriptor =>
  descriptor.block?.type === 'text' && descriptor.children.every(isTextTree)

function RichBlock({ descriptor, as: Tag = 'p', className = '' }) {
  if (!descriptor?.block) return null
  return (
    <>
      {descriptor.richText.length > 0 && (
        <Tag className={`im-profile-text ${className}`}>
          <Text value={descriptor.richText} block={descriptor.block} />
        </Tag>
      )}
      {descriptor.children.length > 0 && (
        <div className='im-profile-text-children'>
          {descriptor.children.map(child => (
            <RichBlock key={child.id} descriptor={child} />
          ))}
        </div>
      )}
    </>
  )
}

function ProfileImage({
  descriptor,
  alt = '',
  className = '',
  priority = false,
  onZoom
}) {
  const { block, source } = descriptor
  const src = mapImgUrl(source, block, 'block', false)
  if (!src) return null
  const width = 900
  const height = Math.round(width * (block.format?.block_aspect_ratio || 0.65))
  const caption = block.properties?.caption
  const image = (
    // Native lazy images also render and load when JavaScript is unavailable.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      decoding='async'
      fetchpriority={priority ? 'high' : undefined}
    />
  )
  return (
    <figure className={`im-profile-figure ${className}`}>
      {onZoom ? (
        <a
          className='im-profile-figure-link'
          href={src}
          target='_blank'
          rel='noreferrer'
          aria-label={`放大查看：${alt}`}
          onClick={onZoom}
        >
          {image}
        </a>
      ) : (
        image
      )}
      {caption?.length > 0 && (
        <figcaption>
          <Text value={caption} block={block} />
        </figcaption>
      )}
    </figure>
  )
}

function Experience({ entry }) {
  const [role, period, ...details] = entry.blocks
  return (
    <article className='im-career-card' data-reveal>
      <div className='im-career-logos' aria-hidden='true'>
        {entry.images.map(image => (
          <ProfileImage key={image.id} descriptor={image} />
        ))}
      </div>
      <div className='im-career-content'>
        <RichBlock descriptor={role} as='h3' className='im-career-title' />
        <div className='im-career-details'>
          {details.map(block => (
            <RichBlock key={block.id} descriptor={block} />
          ))}
        </div>
      </div>
      <div className='im-career-period'>
        <RichBlock descriptor={period} />
      </div>
    </article>
  )
}

function Publication({ entry, onZoom }) {
  const { title, authors, metadata } = splitPaperBibliography(
    entry.bibliography
  )
  return (
    <article className='im-paper-card' data-reveal>
      <div className='im-paper-art'>
        {entry.figures.map(image => (
          <ProfileImage
            key={image.id}
            descriptor={image}
            alt={plain(title)}
            onZoom={onZoom}
          />
        ))}
      </div>
      <div className='im-paper-body'>
        <RichBlock descriptor={title} as='h3' className='im-paper-title' />
        <div className='im-paper-authors'>
          {authors.map(block => (
            <RichBlock key={block.id} descriptor={block} />
          ))}
        </div>
        <div className='im-paper-metadata'>
          {metadata.map(block => (
            <RichBlock key={block.id} descriptor={block} />
          ))}
        </div>
        {entry.abstract.length > 0 && (
          <details className='im-paper-abstract'>
            <summary>
              Abstract <span aria-hidden='true'>＋</span>
            </summary>
            <div className='im-paper-abstract-text'>
              {entry.abstract.map(block => (
                <RichBlock key={block.id} descriptor={block} />
              ))}
            </div>
          </details>
        )}
      </div>
    </article>
  )
}

function Project({ entry, onZoom }) {
  return (
    <article className='im-project-card' data-reveal>
      <div className='im-project-art'>
        {entry.images.map(image => (
          <ProfileImage
            key={image.id}
            descriptor={image}
            alt={plain(entry.title)}
            onZoom={onZoom}
          />
        ))}
      </div>
      <div className='im-project-body'>
        <RichBlock descriptor={entry.title} as='h3' />
        {entry.description.map(block => (
          <RichBlock key={block.id} descriptor={block} />
        ))}
      </div>
    </article>
  )
}

function Fallback({ entry }) {
  const { darkMode } = useNotionContext()
  if (entry.blocks.every(isTextTree)) {
    return entry.blocks.map(block => (
      <RichBlock key={block.id} descriptor={block} />
    ))
  }
  return entry.blockIds.map(id => (
    <NotionRenderer
      key={id}
      recordMap={entry.recordMap}
      blockId={id}
      mapImageUrl={mapImgUrl}
      mapPageUrl={mapPageUrl}
      darkMode={darkMode}
      components={components}
    />
  ))
}

function Intro({ entry, title }) {
  return (
    <div className='im-profile-intro'>
      <div className='im-profile-portrait'>
        {entry.images.map((image, index) => (
          <ProfileImage
            key={image.id}
            descriptor={image}
            alt={title}
            priority={index === 0}
          />
        ))}
      </div>
      <div className='im-profile-bio'>
        {entry.blocks.map(block => (
          <RichBlock
            key={block.id}
            descriptor={block}
            as={
              ['header', 'sub_header', 'sub_sub_header'].includes(
                block.block?.type
              )
                ? 'h2'
                : 'p'
            }
          />
        ))}
      </div>
    </div>
  )
}

export default function Profile({ post }) {
  const { isDarkMode } = useGlobal()
  const data = useMemo(() => parseProfile(post), [post])
  const root = useRef(null)
  const zoom = useRef(null)
  const sections = data.sections.filter(section => section.kind !== 'intro')

  useEffect(() => {
    let stopped = false
    import('@fisch0920/medium-zoom').then(({ default: mediumZoom }) => {
      if (stopped || !root.current) return
      zoom.current = mediumZoom(
        root.current.querySelectorAll('.im-profile-figure-link img'),
        {
          background: 'rgba(25, 31, 24, 0.9)',
          margin: 24
        }
      )
    })
    return () => {
      stopped = true
      zoom.current?.detach()
      zoom.current = null
    }
  }, [post.id])

  function openImage(event) {
    if (
      !zoom.current ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    )
      return
    event.preventDefault()
    zoom.current.open({ target: event.currentTarget.querySelector('img') })
  }

  return (
    <NotionContextProvider
      recordMap={data.recordMap}
      components={components}
      mapImageUrl={mapImgUrl}
      mapPageUrl={mapPageUrl}
      darkMode={isDarkMode}
    >
      <article
        className='im-profile im-profile-custom im-shell'
        data-page-type='Page'
        ref={root}
      >
        <ProfileStyle />
        <header className='im-profile-header'>
          <SmartLink href='/' className='im-back'>
            ← 返回首页
          </SmartLink>
          <h1>{post.title}</h1>
        </header>
        {data.sections
          .filter(section => section.kind === 'intro')
          .map(section => (
            <div key={section.id}>
              {section.entries.map(entry => (
                <Intro key={entry.id} entry={entry} title={post.title} />
              ))}
            </div>
          ))}
        {sections.some(section => section.heading) && (
          <nav className='im-profile-nav' aria-label='个人页章节'>
            {sections
              .filter(section => section.heading)
              .map(section => (
                <a key={section.id} href={`#${anchor(section.id)}`}>
                  {plain(section.heading).trim()}
                </a>
              ))}
          </nav>
        )}
        {sections.map((section, index) => (
          <section
            key={section.id}
            id={anchor(section.id)}
            className={`im-profile-section im-profile-section-${section.kind}`}
          >
            {section.heading && (
              <header className='im-profile-section-header' data-reveal>
                <span className='im-profile-section-number' aria-hidden='true'>
                  {String(index + 1).padStart(2, '0')}
                </span>
                <RichBlock descriptor={section.heading} as='h2' />
              </header>
            )}
            <div
              className={`im-profile-entries im-profile-entries-${section.kind}`}
            >
              {section.entries.map(entry => {
                if (entry.kind === 'experience')
                  return <Experience key={entry.id} entry={entry} />
                if (entry.kind === 'publication')
                  return (
                    <Publication
                      key={entry.id}
                      entry={entry}
                      onZoom={openImage}
                    />
                  )
                if (entry.kind === 'project')
                  return (
                    <Project key={entry.id} entry={entry} onZoom={openImage} />
                  )
                return (
                  <div
                    key={entry.id}
                    className='im-profile-fallback'
                    data-reveal
                  >
                    <Fallback entry={entry} />
                  </div>
                )
              })}
            </div>
          </section>
        ))}
      </article>
    </NotionContextProvider>
  )
}
