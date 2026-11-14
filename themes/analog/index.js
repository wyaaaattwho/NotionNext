import LazyImage from '@/components/LazyImage'
import NotionPage from '@/components/NotionPage'
import SmartLink from '@/components/SmartLink'
import { AdSlot } from '@/components/GoogleAdsense'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import CONFIG from './config'
import { Style } from './style'
import useAnalogMotion from './useMotion'
import { FONT_PRELOAD, StyleFonts } from './fonts'

const Comment = dynamic(() => import('@/components/Comment'), { ssr: false })
const ShareBar = dynamic(() => import('@/components/ShareBar'), { ssr: false })
const ProfilePage = dynamic(() => import('./Profile'))
const ArticleLock = dynamic(() => import('../simple/components/ArticleLock'), {
  ssr: false
})
const AlgoliaSearchModal = dynamic(
  () => import('@/components/AlgoliaSearchModal'),
  { ssr: false }
)

function Arrow({ diagonal = false }) {
  return (
    <span aria-hidden='true' className='an-arrow'>
      {diagonal ? '↗' : '→'}
    </span>
  )
}

function Emblem({ className = '' }) {
  return (
    <svg
      className={className}
      viewBox='0 0 44 44'
      fill='none'
      aria-hidden='true'
    >
      <path
        d='M9 8 34 34M34 9 10 34M6 12l6-6m21 31 5-6'
        stroke='currentColor'
        strokeWidth='2.5'
        strokeLinecap='square'
      />
      <circle
        cx='22'
        cy='22'
        r='18'
        stroke='currentColor'
        strokeWidth='.8'
        strokeDasharray='38 5 14 3'
      />
    </svg>
  )
}

function MenuEntry({ item }) {
  const children = item.subMenus?.filter(child => child.show !== false) || []
  if (children.length) {
    return (
      <details className='an-menu-group'>
        <summary>
          {item.name || item.title} <span aria-hidden='true'>⌄</span>
        </summary>
        <div className='an-submenu'>
          {children.map((child, i) => (
            <MenuEntry key={child.id || i} item={child} />
          ))}
        </div>
      </details>
    )
  }
  return (
    <SmartLink href={item.href || '/'} target={item.target || '_self'}>
      {item.name || item.title}
    </SmartLink>
  )
}

const LayoutBase = props => {
  const { children, customMenu, customNav, slotTop } = props
  const router = useRouter()
  const { isDarkMode, toggleDarkMode } = useGlobal()
  const [menuOpen, setMenuOpen] = useState(false)
  const searchModal = useRef(null)
  const root = useRef(null)
  const author = siteConfig('AUTHOR', 'wyaaaattwho')
  const menu =
    siteConfig('CUSTOM_MENU') && customMenu?.length
      ? customMenu
      : customNav || []

  useAnalogMotion(root, router.asPath)

  useEffect(() => {
    setMenuOpen(false)
    root.current
      ?.querySelectorAll('details[open]')
      .forEach(el => el.removeAttribute('open'))
  }, [router.asPath])

  return (
    <div id='theme-analog' ref={root}>
      <Head>
        <link
          rel='preload'
          href={FONT_PRELOAD}
          as='font'
          type='font/woff2'
          crossOrigin='anonymous'
        />
        <link
          rel='preload'
          href='/fonts/analog/permanent-marker-latin.woff2'
          as='font'
          type='font/woff2'
          crossOrigin='anonymous'
        />
      </Head>
      <StyleFonts />
      <Style />
      <div className='an-motion-trace' aria-hidden='true' />
      <div className='an-reading-progress' aria-hidden='true' />
      <a className='an-skip' href='#an-main'>
        跳至正文
      </a>
      <header className='an-header an-shell'>
        <SmartLink className='an-brand' href='/' aria-label={`${author} 首页`}>
          <Emblem className='an-brand-flower' />
          <span>
            {author}
            <small>AI RESEARCH & ENGINEERING</small>
          </span>
        </SmartLink>
        <button
          className='an-menu-toggle'
          aria-expanded={menuOpen}
          aria-controls='an-navigation'
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? '关闭' : '菜单'}{' '}
          <span aria-hidden='true'>{menuOpen ? '×' : '☰'}</span>
        </button>
        <nav
          id='an-navigation'
          aria-label='主导航'
          className={menuOpen ? 'an-nav an-nav-open' : 'an-nav'}
        >
          <SmartLink
            href='/'
            aria-current={router.pathname === '/' ? 'page' : undefined}
          >
            首页
          </SmartLink>
          {menu
            .filter(item => item.show !== false)
            .map((item, i) => (
              <MenuEntry key={item.id || i} item={item} />
            ))}
          {!menu.length && <SmartLink href='/archive'>归档</SmartLink>}
          <SmartLink
            href='/search'
            onClick={e => {
              if (siteConfig('ALGOLIA_APP_ID') && searchModal.current) {
                e.preventDefault()
                searchModal.current.openSearch()
              }
            }}
          >
            搜索 <span aria-hidden='true'>⌕</span>
          </SmartLink>
          <button
            className='an-mode'
            onClick={toggleDarkMode}
            aria-label={isDarkMode ? '切换至日间模式' : '切换至夜间模式'}
          >
            {isDarkMode ? '☀' : '☾'}
          </button>
        </nav>
      </header>
      <main id='an-main' tabIndex={-1}>
        {slotTop}
        {children}
      </main>
      <footer className='an-footer an-shell'>
        <div className='an-footer-signature'>
          <span>RESEARCH / CODE / NOTES.</span>
          <span className='an-handwritten' aria-hidden='true'>
            end of page.
          </span>
        </div>
        <div className='an-footer-bottom'>
          <span>
            © {siteConfig('SINCE')} — {new Date().getFullYear()} {author}
          </span>
          <div>
            <SmartLink href='/archive'>归档</SmartLink>
            <SmartLink href='/tag'>标签</SmartLink>
            {siteConfig('ENABLE_RSS') && <a href='/rss/feed.xml'>RSS ↗</a>}
          </div>
          <span>
            Powered by{' '}
            <a
              href='https://github.com/notionnext-org/NotionNext'
              target='_blank'
              rel='noreferrer'
            >
              NotionNext
            </a>
          </span>
        </div>
        {siteConfig('BEI_AN') && (
          <a className='an-filing' href={siteConfig('BEI_AN_LINK')}>
            {siteConfig('BEI_AN')}
          </a>
        )}
        {siteConfig('BEI_AN_GONGAN') && (
          <p className='an-filing'>{siteConfig('BEI_AN_GONGAN')}</p>
        )}
        {siteConfig('ANALYTICS_BUSUANZI_ENABLE') && (
          <div className='an-meta an-stats'>
            <span className='hidden busuanzi_container_site_pv'>
              访问量 <span className='busuanzi_value_site_pv' />
            </span>
            <span className='hidden busuanzi_container_site_uv'>
              访客 <span className='busuanzi_value_site_uv' />
            </span>
          </div>
        )}
      </footer>
      <AlgoliaSearchModal cRef={searchModal} {...props} />
    </div>
  )
}

function Hero({ siteInfo }) {
  const title =
    siteConfig('ANALOG_TITLE', CONFIG.ANALOG_TITLE) ||
    siteInfo?.description ||
    'He want the kindom of god on earth'
  const image = siteConfig('ANALOG_HERO_IMAGE', CONFIG.ANALOG_HERO_IMAGE)
  const customImage = image !== CONFIG.ANALOG_HERO_IMAGE
  const biography = siteConfig('BIO', '')
  const description =
    biography && biography !== siteConfig('AUTHOR', 'wyaaaattwho')
      ? biography
      : 'AI research & engineering.'
  const words = title.split(/\s+/)
  const chunk = Math.max(1, Math.ceil(words.length / 3))
  const fragments = []
  for (let index = 0; index < words.length; index += chunk)
    fragments.push(words.slice(index, index + chunk).join(' '))
  return (
    <section className='an-hero' aria-label='博客简介'>
      <div className='an-hero-index an-label an-shell'>
        <span>PERSONAL ARCHIVE / AI RESEARCH</span>
        <span>01 — CITY STUDY</span>
      </div>
      <div className='an-hero-stage'>
        <figure className='an-hero-photo'>
          <div className='an-hero-photo-frame'>
            <picture>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                id='header-cover'
                className='an-hero-image'
                src={image}
                alt='原创城市摄影：静止的匿名人影与运动拖影中的行人和街道'
                width='1536'
                height='1024'
                fetchpriority='high'
                decoding='async'
              />
            </picture>
          </div>
          <figcaption className='an-label'>
            <span>CITY STUDY / 01</span>
            <span>STILL / IN MOTION</span>
          </figcaption>
        </figure>
        <div className='an-hero-copy an-shell'>
          <p className='an-eyebrow'>RESEARCH. CODE. NOTES.</p>
          <h1>
            {fragments.map((fragment, index) => (
              <span className='an-headline-fragment' key={index}>
                <span>{fragment} </span>
              </span>
            ))}
          </h1>
        </div>
        {!customImage && (
          <div className='an-contact-print' aria-hidden='true'>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={image} alt='' width='1536' height='1024' loading='lazy' />
            <span className='an-label'>CONTACT / 01—02</span>
          </div>
        )}
        <span className='an-handwritten an-hero-note' aria-hidden='true'>
          research notes ↘
        </span>
        <div className='an-hero-controls'>
          <p className='an-hero-bio'>{description}</p>
          <div className='an-hero-actions'>
            <SmartLink href='/about' className='an-button'>
              About me <Arrow diagonal />
            </SmartLink>
            <a href='#an-journal' className='an-text-link'>
              阅读文章 <span aria-hidden='true'>↓</span>
            </a>
          </div>
        </div>
      </div>
      <div className='an-hero-bottom an-label an-shell'>
        <span>AI RESEARCH & ENGINEERING</span>
        <span>SCROLL TO EXPLORE ↓</span>
      </div>
    </section>
  )
}

function PostMeta({ post }) {
  return (
    <div className='an-meta'>
      {post.category && (
        <SmartLink
          href={`/category/${encodeURIComponent(post.category)}`}
          className='an-category'
        >
          {post.category}
        </SmartLink>
      )}
      <span>
        {post.date?.start_date || post.publishDay || post.createdTime || ''}
      </span>
      {post.password && <span aria-label='需要密码'>⌑</span>}
    </div>
  )
}

function PostCard({ post, featured = false, index = 0 }) {
  const cover = post.pageCoverThumbnail || post.pageCover
  return (
    <article
      className={featured ? 'an-post an-featured' : 'an-post'}
      data-reveal
    >
      <div className='an-post-number an-label' aria-hidden='true'>
        {String(index + 1).padStart(2, '0')}
      </div>
      {cover && (
        <SmartLink
          href={post.href}
          className='an-post-cover'
          aria-label={`阅读：${post.title}`}
        >
          <span className='an-post-image'>
            <LazyImage
              src={cover}
              alt={post.title}
              width={featured ? 640 : 320}
              className='an-cover-image'
            />
          </span>
          <span className='an-post-image-label an-label' aria-hidden='true'>
            {featured
              ? 'LATEST ENTRY'
              : 'NOTE / ' + String(index + 1).padStart(2, '0')}
          </span>
        </SmartLink>
      )}
      <div className='an-post-copy'>
        <PostMeta post={post} />
        <h3>
          <SmartLink href={post.href}>{post.title}</SmartLink>
        </h3>
        {post.summary && <p className='an-summary'>{post.summary}</p>}
        <div className='an-post-bottom'>
          <div className='an-tags'>
            {post.tags?.slice(0, 3).map(tag => (
              <SmartLink key={tag} href={`/tag/${encodeURIComponent(tag)}`}>
                {tag}
              </SmartLink>
            ))}
          </div>
          <SmartLink
            className='an-read'
            href={post.href}
            aria-label={`阅读：${post.title}`}
          >
            阅读全文 <Arrow diagonal />
          </SmartLink>
        </div>
      </div>
    </article>
  )
}

function Pagination({ page = 1, postCount = 0, NOTION_CONFIG }) {
  const router = useRouter()
  const pageSize = Number(siteConfig('POSTS_PER_PAGE', 12, NOTION_CONFIG)) || 12
  const total = Math.ceil(postCount / pageSize)
  const current = Number(page)
  const prefix = router.asPath
    .split('?')[0]
    .replace(/\.html$/, '')
    .replace(/\/page\/\d+\/?$/, '')
    .replace(/\/$/, '')
  const href = n => ({
    pathname: n === 1 ? `${prefix}/` : `${prefix}/page/${n}`,
    query: router.query.s ? { s: router.query.s } : {}
  })
  if (total <= 1) return null
  return (
    <nav className='an-pagination' aria-label='文章分页'>
      {current > 1 ? (
        <SmartLink href={href(current - 1)}>← 上一页</SmartLink>
      ) : (
        <span />
      )}
      <span>
        {current} / {total}
      </span>
      {current < total ? (
        <SmartLink href={href(current + 1)}>下一页 →</SmartLink>
      ) : (
        <span />
      )}
    </nav>
  )
}

function Journal({ featured = false, ...props }) {
  const {
    posts = [],
    category,
    tag,
    keyword,
    NOTION_CONFIG,
    categoryOptions = []
  } = props
  const [visiblePages, setVisiblePages] = useState(1)
  const router = useRouter()
  useEffect(() => setVisiblePages(1), [router.asPath])
  const scroll =
    siteConfig('POST_LIST_STYLE', 'page', NOTION_CONFIG) === 'scroll'
  const pageSize = Number(siteConfig('POSTS_PER_PAGE', 12, NOTION_CONFIG)) || 12
  const visible = scroll ? posts.slice(0, visiblePages * pageSize) : posts
  const headline = keyword
    ? `关于「${keyword}」`
    : category || tag || 'Research notes'
  return (
    <section id='an-journal' className='an-journal an-shell'>
      <div className='an-section-heading'>
        <div>
          <p className='an-eyebrow'>THE NOTEBOOK / 研究与实践</p>
          <h2>
            {headline}
            <span className='an-heading-dot'>.</span>
          </h2>
        </div>
        <SmartLink href='/archive' className='an-text-link'>
          所有文章 <Arrow diagonal />
        </SmartLink>
      </div>
      {categoryOptions.length > 0 && (
        <nav className='an-categories' aria-label='文章分类'>
          <SmartLink
            href='/'
            aria-current={!category && !tag && !keyword ? 'page' : undefined}
          >
            全部
          </SmartLink>
          {categoryOptions.map(item => (
            <SmartLink
              key={item.name}
              href={`/category/${encodeURIComponent(item.name)}`}
              aria-current={category === item.name ? 'page' : undefined}
            >
              {item.name}
              <small>{item.count}</small>
            </SmartLink>
          ))}
        </nav>
      )}
      <div id='posts-wrapper'>
        {featured && visible[0] && <PostCard post={visible[0]} featured />}
        <div className='an-post-grid'>
          {(featured ? visible.slice(1) : visible).map((post, i) => (
            <PostCard key={post.id} post={post} index={featured ? i + 1 : i} />
          ))}
        </div>
        {!visible.length && (
          <div className='an-empty'>
            <Emblem className='an-empty-flower' />
            <p>
              {keyword ? '没有找到相关文章，请尝试其他关键词。' : '暂无文章。'}
            </p>
          </div>
        )}
      </div>
      {scroll ? (
        visible.length < posts.length && (
          <button
            className='an-load-more'
            onClick={() => setVisiblePages(n => n + 1)}
          >
            加载更多 <Arrow />
          </button>
        )
      ) : (
        <Pagination {...props} />
      )}
      <AdSlot type='native' />
    </section>
  )
}

const LayoutIndex = props => (
  <>
    <Hero siteInfo={props.siteInfo} />
    {props.notice?.blockMap && (
      <aside className='an-notice an-shell'>
        <details>
          <summary>
            最新动态 <span aria-hidden='true'>＋</span>
          </summary>
          <NotionPage post={props.notice} />
        </details>
      </aside>
    )}
    <Journal {...props} featured />
  </>
)
const LayoutPostList = props => <Journal {...props} />

const LayoutSearch = props => {
  const router = useRouter()
  const [value, setValue] = useState(props.keyword || '')
  useEffect(() => setValue(props.keyword || ''), [props.keyword])
  return (
    <>
      <div className='an-search an-shell'>
        <p className='an-eyebrow'>SEARCH</p>
        <h1>搜索文章</h1>
        <form
          role='search'
          onSubmit={e => {
            e.preventDefault()
            if (value.trim())
              router.push(`/search/${encodeURIComponent(value.trim())}`)
          }}
        >
          <label className='sr-only' htmlFor='an-search-input'>
            搜索文章
          </label>
          <input
            id='an-search-input'
            type='search'
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder='输入关键词，按下回车…'
          />
          <button type='submit' aria-label='搜索'>
            搜索 <Arrow />
          </button>
        </form>
      </div>
      <Journal {...props} />
    </>
  )
}

const LayoutArchive = ({ archivePosts = {} }) => (
  <section className='an-archive an-shell'>
    <p className='an-eyebrow'>ARCHIVE</p>
    <h1>文章归档</h1>
    {Object.entries(archivePosts).map(([period, posts]) => (
      <div key={period} id={period} className='an-archive-group' data-reveal>
        <h2>
          {period}
          <small>{posts.length} 篇</small>
        </h2>
        <div>
          {posts.map(post => (
            <SmartLink key={post.id} href={post.href}>
              <time>{post.date?.start_date || post.publishDay}</time>
              <span>{post.title}</span>
              <Arrow diagonal />
            </SmartLink>
          ))}
        </div>
      </div>
    ))}
  </section>
)

function Taxonomy({ items = [], type, title, eyebrow }) {
  return (
    <section className='an-taxonomy an-shell'>
      <p className='an-eyebrow'>{eyebrow}</p>
      <h1>{title}</h1>
      <div className='an-taxonomy-grid'>
        {items.map((item, i) => (
          <SmartLink
            key={item.name}
            href={`/${type}/${encodeURIComponent(item.name)}`}
            data-reveal
          >
            <span className='an-taxonomy-number'>
              {String(i + 1).padStart(2, '0')}
            </span>
            <h2>{item.name}</h2>
            <span>
              {item.count || 0} 篇文章 <Arrow diagonal />
            </span>
          </SmartLink>
        ))}
      </div>
    </section>
  )
}
const LayoutCategoryIndex = props => (
  <Taxonomy
    items={props.categoryOptions}
    type='category'
    title='文章分类'
    eyebrow='CATEGORIES'
  />
)
const LayoutTagIndex = props => (
  <Taxonomy
    items={props.tagOptions}
    type='tag'
    title='文章标签'
    eyebrow='TAGS'
  />
)

const LayoutSlug = props => {
  const { post, lock, validPassword, prev, next, recommendPosts = [] } = props
  const { fullWidth } = useGlobal()
  if (lock)
    return (
      <div className='an-shell'>
        <ArticleLock validPassword={validPassword} />
      </div>
    )
  if (!post)
    return (
      <div className='an-empty an-shell' role='status'>
        正在加载文章…
      </div>
    )
  if (post.type === 'Page' && post.slug === 'about' && post.blockMap?.block) {
    return (
      <>
        <ProfilePage post={post} />
        <div className='an-shell an-profile-comments'>
          <Comment frontMatter={post} />
        </div>
      </>
    )
  }
  return (
    <article
      className={`an-article an-shell${post.type === 'Page' ? ' an-page' : ''}${post.type === 'Page' && post.slug === 'about' ? ' an-profile' : ''}${fullWidth ? ' an-article-wide' : ''}`}
      data-page-type={post.type}
    >
      <header className='an-article-header'>
        <SmartLink href='/' className='an-back'>
          ← 返回首页
        </SmartLink>
        {post.type === 'Post' && <PostMeta post={post} />}
        <h1>{post.title}</h1>
        {post.type === 'Post' && post.summary && <p>{post.summary}</p>}
      </header>
      <div id='article-wrapper'>
        <NotionPage post={post} />
      </div>
      {post.type === 'Post' && (
        <>
          <ShareBar post={post} />
          <AdSlot type='in-article' />
        </>
      )}
      {post.type === 'Post' && (
        <>
          <nav className='an-adjacent' aria-label='前后文章'>
            <div>
              {prev && (
                <SmartLink href={prev.href}>
                  <small>上一篇</small>
                  {prev.title}
                </SmartLink>
              )}
            </div>
            <div>
              {next && (
                <SmartLink href={next.href}>
                  <small>下一篇</small>
                  {next.title}
                </SmartLink>
              )}
            </div>
          </nav>
          {recommendPosts.length > 0 && (
            <section className='an-recommend'>
              <p className='an-eyebrow'>RELATED ARTICLES</p>
              <h2>相关文章</h2>
              <div className='an-post-grid'>
                {recommendPosts.slice(0, 3).map(p => (
                  <PostCard key={p.id} post={p} />
                ))}
              </div>
            </section>
          )}
        </>
      )}
      <Comment frontMatter={post} />
    </article>
  )
}

const Layout404 = props =>
  props.post ? (
    <LayoutSlug {...props} />
  ) : (
    <section className='an-empty an-shell'>
      <Emblem className='an-empty-flower' />
      <p className='an-eyebrow'>404 / NOT FOUND</p>
      <h1>页面不存在</h1>
      <SmartLink href='/' className='an-text-link'>
        回到首页 <Arrow />
      </SmartLink>
    </section>
  )

export {
  LayoutBase,
  LayoutIndex,
  LayoutPostList,
  LayoutSearch,
  LayoutArchive,
  LayoutCategoryIndex,
  LayoutTagIndex,
  LayoutSlug,
  Layout404,
  CONFIG as THEME_CONFIG
}
