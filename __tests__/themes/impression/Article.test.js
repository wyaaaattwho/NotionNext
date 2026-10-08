import { render, screen } from '@testing-library/react'
import { LayoutSlug } from '@/themes/impression'

jest.mock('@/components/NotionPage', () => ({
  __esModule: true,
  default: () => <div>Notion 正文</div>
}))
jest.mock('@/components/SmartLink', () => ({
  __esModule: true,
  default: ({ children, ...props }) => <a {...props}>{children}</a>
}))
jest.mock('@/components/GoogleAdsense', () => ({ AdSlot: () => null }))
jest.mock('@/lib/global', () => ({ useGlobal: () => ({ fullWidth: false }) }))
jest.mock('@/lib/config', () => ({
  siteConfig: (_key, fallback) => fallback
}))

const post = {
  id: 'about',
  slug: 'about',
  title: 'About Xunlan Zhou',
  summary: '可用链接/about访问，不会在菜单栏显示',
  publishDay: '2022-05-18',
  tags: []
}

test('standalone pages omit database notes and publication metadata', () => {
  const { container } = render(<LayoutSlug post={{ ...post, type: 'Page' }} />)
  expect(screen.getByRole('heading', { name: post.title })).toBeInTheDocument()
  expect(screen.getByText('Notion 正文')).toBeInTheDocument()
  expect(screen.queryByText(post.summary)).not.toBeInTheDocument()
  expect(screen.queryByText(post.publishDay)).not.toBeInTheDocument()
  expect(container.querySelector('article')).toHaveClass('im-page')
  expect(container.querySelector('article')).toHaveClass('im-profile')
})

test('blog posts retain their reader-facing summary and publication date', () => {
  const article = { ...post, type: 'Post', summary: '强化学习中的策略优化。' }
  render(<LayoutSlug post={article} />)
  expect(screen.getByText(article.summary)).toBeInTheDocument()
  expect(screen.getByText(article.publishDay)).toBeInTheDocument()
})
