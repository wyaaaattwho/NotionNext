# Impression：AI 技术博客主题

参考 [Microsoft AI](https://microsoft.ai/) 的绘画感、柔和颜色与留白，首页使用衬线标题、鼠尾草绿和陶土色，适配桌面与手机。文章与个人页使用统一的无衬线字体、字号层级和行距，保留代码与数学公式的专用字体。首页大图直接读取 Notion 站点封面 `siteInfo.pageCover`，与原 Hexo 首页保持相同来源；文章封面及正文插图继续读取 Notion 原图。首页标题默认使用 Notion 站点描述（例如现有的 “He Wanted The Kingdom Of God On Earth”）。

封面应用轻微暖色与饱和度滤镜，桌面滚动时轻微视差；正文图片只加很轻的色调调整，悬停恢复原色。科研图表和经历卡片中的 logo 保留原色与完整比例。页面进入、标题、callout 和图片滚入视野时短暂淡入，文章卡片悬停时轻抬并缓慢放大封面，菜单带展开动画。滚动时页眉收紧，顶部细线显示阅读进度。动态加载的 Notion 内容也会获得滚动动画。系统开启“减少动态效果”后关闭动画、视差与缩放，页面内容始终可见。

独立 `Page` 页面不展示数据库的 summary 备注、发布日期或文章分享栏；`Post` 文章继续展示摘要和日期。个人页中的经历卡片使用紧凑 logo 列，论文卡片保留完整的科研配图与摘要，手机端分别适配。保留 Notion 菜单及子菜单、搜索（含 Algolia）、分类、标签、分页、加载更多、归档、密码文章、评论、分享和深色模式。

## 配置

个人默认值集中在根目录 `site.config.js`，最后由 `blog.config.js` 引入。后续同步上游时保留该文件及引入行，同时保留 `fetchGlobalAllData` 中应用 `SITE_THEME` 的逻辑。

- 默认主题为 `impression`；`NEXT_PUBLIC_THEME` 可指定其他主题。
- `SITE_THEME` 会覆盖 Notion_Config 中遗留的 `THEME=hexo`。若希望继续由 Notion 控制主题，设置 `NEXT_PUBLIC_SITE_THEME=false`，并在 Notion_Config 中将 `THEME` 设为 `impression`。
- 仍可用 `?theme=simple` 或 `?theme=hexo` 临时预览旧主题。
- Notion 数据库 ID 沿用 Vercel 的 `NOTION_PAGE_ID`。本次没有改变你的环境变量。仓库未设置该变量时，仍会读取上游的演示数据库。
- API 地址、作者、简介、域名和衬线字体默认值从个人提交 `a2fb6162` 恢复；环境变量可覆盖这些默认值。图标也恢复自该提交。Notion_Config 的作者、简介、域名配置仍按原有优先级生效。

以下配置既可放在 Notion_Config，也可用对应环境变量：

| Notion_Config 键         | 环境变量                             | 用途                                   |
| ------------------------ | ------------------------------------ | -------------------------------------- |
| `IMPRESSION_EYEBROW`     | `NEXT_PUBLIC_IMPRESSION_EYEBROW`     | 首页标题上方短句                       |
| `IMPRESSION_TITLE`       | `NEXT_PUBLIC_IMPRESSION_TITLE`       | 覆盖首页标题；默认读取 Notion 站点描述 |
| `IMPRESSION_DESCRIPTION` | `NEXT_PUBLIC_IMPRESSION_DESCRIPTION` | 首页简介                               |

## 验证与部署

本地生产构建使用仓库默认的演示数据库（工作区未提供 Vercel 的 `NOTION_PAGE_ID`）；浏览器排版检查使用从现有线上站点读取的公开文章与完整 About 页面数据。检查覆盖首页、真实文章、个人页的经历与论文卡片、菜单及子菜单、搜索提交、分类、标签、归档、404、加载更多、深色模式、320px/390px 手机宽度及减少动态效果。主题的回归测试覆盖独立页面备注隐藏、文章摘要保留，以及动态内容、动画偏好变化、观察器缺失、滚动合并与清理。

使用仓库声明的 Node.js 22 或 24 和 Yarn 1.22.22：

```bash
corepack yarn install --frozen-lockfile
corepack yarn build
corepack yarn dev
```

Vercel 最新部署对应的提交作者可能是上游维护者：同步上游会保留原提交作者。当前 `09b89790` 的作者是 `tangly1024`。这个显示本身不能说明部署失败或项目归属变化；以 Vercel 的部署状态及关联仓库为准。个人变更提交并推送后，新部署会关联新的提交。
