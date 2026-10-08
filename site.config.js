// Personal settings live here so upstream blog.config.js changes stay easy to merge.
// Vercel environment variables still override these defaults.
module.exports = {
  API_BASE_URL:
    process.env.API_BASE_URL ||
    'https://witty-xylophone-fd6.notion.site/api/v3',
  AUTHOR: process.env.NEXT_PUBLIC_AUTHOR || 'wyaaaattwho',
  BIO: process.env.NEXT_PUBLIC_BIO || 'An undergraduate student from NJU',
  LINK: process.env.NEXT_PUBLIC_LINK || 'https://blog.wyaaaattwho.xyz',
  FONT_STYLE: process.env.NEXT_PUBLIC_FONT_STYLE || 'font-serif font-light',
  THEME: process.env.NEXT_PUBLIC_THEME || 'impression',
  // Use the personal theme even when an old THEME value remains in Notion_Config.
  // Set NEXT_PUBLIC_SITE_THEME=false to return theme selection to Notion_Config.
  SITE_THEME:
    process.env.NEXT_PUBLIC_SITE_THEME === 'false'
      ? false
      : process.env.NEXT_PUBLIC_THEME || 'impression'
}
