const CONFIG = {
  IMPRESSION_EYEBROW:
    process.env.NEXT_PUBLIC_IMPRESSION_EYEBROW || 'AI RESEARCH & ENGINEERING',
  // Empty by default: use the existing Notion site description as the headline.
  IMPRESSION_TITLE: process.env.NEXT_PUBLIC_IMPRESSION_TITLE || '',
  IMPRESSION_DESCRIPTION:
    process.env.NEXT_PUBLIC_IMPRESSION_DESCRIPTION || 'AI 技术、研究与实践。'
}
export default CONFIG
