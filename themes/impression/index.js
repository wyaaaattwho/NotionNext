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
import useImpressionMotion from './useMotion'
import { NEWSREADER_LATIN_PRELOAD, StyleFonts } from './fonts'

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
    <span aria-hidden='true' className='im-arrow'>
      {diagonal ? '↗' : '→'}
    </span>
  )
}

// Small original vector ornament; article images always come from Notion.
function Flower({ className = '' }) {
  return (
    <svg
      className={className}
      viewBox='0 0 100 100'
      fill='none'
      aria-hidden='true'
    >
      <path
        d='M50 91C52 74 46 55 51 40M49 76C33 77 25 70 22 64C38 61 46 65 49 76M51 65C68 62 73 55 76 49C60 47 52 53 51 65'
        stroke='currentColor'
        strokeWidth='2.5'
        strokeLinecap='round'
      />
      <g fill='currentColor' opacity='.85'>
        <ellipse cx='50' cy='26' rx='10' ry='20' transform='rotate(-8 50 26)' />
        <ellipse cx='64' cy='34' rx='10' ry='20' transform='rotate(58 64 34)' />
        <ellipse
          cx='60'
          cy='50'
          rx='10'
          ry='20'
          transform='rotate(128 60 50)'
        />
        <ellipse
          cx='40'
          cy='49'
          rx='10'
          ry='20'
          transform='rotate(-128 40 49)'
        />
        <ellipse
          cx='35'
          cy='32'
          rx='10'
          ry='20'
          transform='rotate(-58 35 32)'
        />
      </g>
      <circle cx='49' cy='39' r='8' fill='#eac578' />
    </svg>
  )
}

function MenuEntry({ item }) {
  const children = item.subMenus?.filter(child => child.show !== false) || []
  if (children.length) {
    return (
      <details className='im-menu-group'>
        <summary>
          {item.name || item.title} <span aria-hidden='true'>⌄</span>
        </summary>
        <div className='im-submenu'>
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

  useImpressionMotion(root, router.asPath)

  useEffect(() => {
    setMenuOpen(false)
    root.current
      ?.querySelectorAll('details[open]')
      .forEach(el => el.removeAttribute('open'))
  }, [router.asPath])

  return (
    <div id='theme-impression' ref={root}>
      <Head>
        <link
          rel='preload'
          href={NEWSREADER_LATIN_PRELOAD}
          as='font'
          type='font/woff2'
          crossOrigin='anonymous'
        />
      </Head>
      <StyleFonts />
      <Style />
      <canvas className='im-watercolor' aria-hidden='true' />
      <div className='im-reading-progress' aria-hidden='true' />
      <a className='im-skip' href='#im-main'>
        跳至正文
      </a>
      <header className='im-header im-shell'>
        <SmartLink className='im-brand' href='/' aria-label={`${author} 首页`}>
          <Flower className='im-brand-flower' />
          <span>
            {author}
            <small>AI RESEARCH & ENGINEERING</small>
          </span>
        </SmartLink>
        <button
          className='im-menu-toggle'
          aria-expanded={menuOpen}
          aria-controls='im-navigation'
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? '关闭' : '菜单'}{' '}
          <span aria-hidden='true'>{menuOpen ? '×' : '☰'}</span>
        </button>
        <nav
          id='im-navigation'
          aria-label='主导航'
          className={menuOpen ? 'im-nav im-nav-open' : 'im-nav'}
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
            className='im-mode'
            onClick={toggleDarkMode}
            aria-label={isDarkMode ? '切换至日间模式' : '切换至夜间模式'}
          >
            {isDarkMode ? '☀' : '☾'}
          </button>
        </nav>
      </header>
      <main id='im-main' tabIndex={-1}>
        {slotTop}
        {children}
      </main>
      <footer className='im-footer im-shell'>
        <div className='im-footer-bottom'>
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
          <a className='im-filing' href={siteConfig('BEI_AN_LINK')}>
            {siteConfig('BEI_AN')}
          </a>
        )}
        {siteConfig('BEI_AN_GONGAN') && (
          <p className='im-filing'>{siteConfig('BEI_AN_GONGAN')}</p>
        )}
        {siteConfig('ANALYTICS_BUSUANZI_ENABLE') && (
          <div className='im-meta im-stats'>
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
    siteConfig('IMPRESSION_TITLE', CONFIG.IMPRESSION_TITLE) ||
    siteInfo?.description ||
    'He want the kindom of god on earth'
  const cover = siteInfo?.pageCover || siteConfig('HOME_BANNER_IMAGE')
  return (
    <section className='im-hero' aria-label='博客简介'>
      {cover && (
        <LazyImage
          priority
          id='header-cover'
          src={cover}
          alt={siteInfo?.title || 'Notion 首页封面'}
          width={1920}
          height={1080}
          className='im-hero-cover'
        />
      )}
      <div className='im-hero-copy im-shell'>
        <p className='im-eyebrow'>
          {siteConfig('IMPRESSION_EYEBROW', CONFIG.IMPRESSION_EYEBROW)}
        </p>
        <h1>
          {title.split('\n').map((line, i) => (
            <span key={i}>{line}</span>
          ))}
        </h1>
        <p className='im-hero-description'>
          {siteConfig('IMPRESSION_DESCRIPTION', CONFIG.IMPRESSION_DESCRIPTION)}
        </p>
        <a className='im-text-link' href='#im-journal'>
          查看文章 <span className='im-hero-scroll' aria-hidden='true'>↓</span>
        </a>
      </div>
    </section>
  )
}

function PostMeta({ post }) {
  return (
    <div className='im-meta'>
      {post.category && (
        <SmartLink
          href={`/category/${encodeURIComponent(post.category)}`}
          className='im-category'
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
      className={featured ? 'im-post im-featured' : 'im-post'}
      data-reveal
      style={{ '--im-delay': `${Math.min(index % 3, 2) * 70}ms` }}
    >
      {cover && (
        <SmartLink
          href={post.href}
          className='im-post-cover'
          aria-label={`阅读：${post.title}`}
        >
          <LazyImage src={cover} alt={post.title} className='im-cover-image' />
        </SmartLink>
      )}
      <div className='im-post-copy'>
        {featured && (
          <p className='im-eyebrow'>
            LATEST ARTICLE <span aria-hidden='true'>/</span> 最新文章
          </p>
        )}
        <PostMeta post={post} />
        <h3>
          <SmartLink href={post.href}>{post.title}</SmartLink>
        </h3>
        {post.summary && <p className='im-summary'>{post.summary}</p>}
        <div className='im-post-bottom'>
          <div className='im-tags'>
            {post.tags?.slice(0, 3).map(tag => (
              <SmartLink key={tag} href={`/tag/${encodeURIComponent(tag)}`}>
                {tag}
              </SmartLink>
            ))}
          </div>
          <SmartLink
            className='im-read'
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
    <nav className='im-pagination' aria-label='文章分页'>
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
    : category || tag || '最新文章'
  return (
    <section id='im-journal' className='im-journal im-shell'>
      <div className='im-section-heading'>
        <div>
          <p className='im-eyebrow'>ARTICLES</p>
          <h2>
            {headline}
            <span className='im-heading-dot'>.</span>
          </h2>
        </div>
        <SmartLink href='/archive' className='im-text-link'>
          所有文章 <Arrow diagonal />
        </SmartLink>
      </div>
      {categoryOptions.length > 0 && (
        <nav className='im-categories' aria-label='文章分类'>
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
        <div className='im-post-grid'>
          {(featured ? visible.slice(1) : visible).map((post, i) => (
            <PostCard key={post.id} post={post} index={i} />
          ))}
        </div>
        {!visible.length && (
          <div className='im-empty'>
            <Flower className='im-empty-flower' />
            <p>
              {keyword ? '没有找到相关文章，请尝试其他关键词。' : '暂无文章。'}
            </p>
          </div>
        )}
      </div>
      {scroll ? (
        visible.length < posts.length && (
          <button
            className='im-load-more'
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
      <aside className='im-notice im-shell'>
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
      <div className='im-search im-shell'>
        <p className='im-eyebrow'>SEARCH</p>
        <h1>搜索文章</h1>
        <form
          role='search'
          onSubmit={e => {
            e.preventDefault()
            if (value.trim())
              router.push(`/search/${encodeURIComponent(value.trim())}`)
          }}
        >
          <label className='sr-only' htmlFor='im-search-input'>
            搜索文章
          </label>
          <input
            id='im-search-input'
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
  <section className='im-archive im-shell'>
    <p className='im-eyebrow'>ARCHIVE</p>
    <h1>文章归档</h1>
    {Object.entries(archivePosts).map(([period, posts]) => (
      <div key={period} id={period} className='im-archive-group' data-reveal>
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
    <section className='im-taxonomy im-shell'>
      <p className='im-eyebrow'>{eyebrow}</p>
      <h1>{title}</h1>
      <div className='im-taxonomy-grid'>
        {items.map((item, i) => (
          <SmartLink
            key={item.name}
            href={`/${type}/${encodeURIComponent(item.name)}`}
            data-reveal
          >
            <span className='im-taxonomy-number'>
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
      <div className='im-shell'>
        <ArticleLock validPassword={validPassword} />
      </div>
    )
  if (!post)
    return (
      <div className='im-empty im-shell' role='status'>
        正在加载文章…
      </div>
    )
  if (post.type === 'Page' && post.slug === 'about' && post.blockMap?.block) {
    return (
      <>
        <ProfilePage post={post} />
        <div className='im-shell im-profile-comments'>
          <Comment frontMatter={post} />
        </div>
      </>
    )
  }
  return (
    <article
      className={`im-article im-shell${post.type === 'Page' ? ' im-page' : ''}${post.type === 'Page' && post.slug === 'about' ? ' im-profile' : ''}${fullWidth ? ' im-article-wide' : ''}`}
      data-page-type={post.type}
    >
      <header className='im-article-header'>
        <SmartLink href='/' className='im-back'>
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
          <nav className='im-adjacent' aria-label='前后文章'>
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
            <section className='im-recommend'>
              <p className='im-eyebrow'>RELATED ARTICLES</p>
              <h2>相关文章</h2>
              <div className='im-post-grid'>
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
    <section className='im-empty im-shell'>
      <Flower className='im-empty-flower' />
      <p className='im-eyebrow'>404 / NOT FOUND</p>
      <h1>页面不存在</h1>
      <SmartLink href='/' className='im-text-link'>
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
