# Impression：AI 技术博客主题

参考 [Microsoft AI](https://microsoft.ai/) 的绘画感、衬线排版、柔和颜色与留白，使用鼠尾草绿和陶土色，适配桌面与手机。全站标题、正文、导航和元数据统一使用自托管 Newsreader 艺术衬线体，中文由 Noto Serif SC 补充，保留代码与数学公式的专用字体。字体随网站部署，中文按 Unicode 子集加载，不依赖访客连接 Google 字体服务；字体来源与 OFL 许可证见 `public/fonts/impression/README.md`。首页大图直接读取 Notion 站点封面 `siteInfo.pageCover`，与原 Hexo 首页保持相同来源；文章封面及正文插图继续读取 Notion 原图。首页标题默认使用 Notion 站点描述（例如现有的 “He Wanted The Kingdom Of God On Earth”）。

封面应用轻微暖色与饱和度滤镜，桌面滚动时轻微视差；正文图片只加很轻的色调调整，悬停恢复原色。科研图表和经历卡片中的 logo 保留原色与完整比例。页面进入、标题、callout 和图片滚入视野时短暂淡入，文章卡片悬停时轻抬并缓慢放大封面，菜单带展开动画。导航栏保持固定高度，滚动后只增加阴影，避免尺寸变化引发浏览器滚动锚定和临界点抖动；顶部细线显示阅读进度。背景加入原创水彩笔触与少量颜料颗粒，随滚动缓慢移动、旋转和舒展，停下后静止。笔触在离屏画布中生成并缓存，动画与视差共用一个按需运行的帧循环，手机限制画布像素密度。深色模式采用更淡的颜料。动态加载的 Notion 内容也会获得滚动动画。系统开启“减少动态效果”后水彩保持静态，并关闭动画、视差与缩放，页面内容始终可见。

独立 `Page` 页面不展示数据库的 summary 备注、发布日期或文章分享栏；分享预览使用站点简介，`Post` 文章继续展示摘要和日期。`/about` 使用独立个人页设计，从 Notion 内容生成章节导航、统一对齐的经历卡片、等高的双列论文与项目展示。科研图片完整显示，可点击放大；论文完整摘要可展开阅读。手机端改为单列。保留 Notion 菜单及子菜单、搜索（含 Algolia）、分类、标签、分页、加载更多、归档、密码文章、评论、分享和深色模式。

## About 页的 Notion 格式

个人页仅针对 `type=Page`、`slug=about` 启用，内容和顺序均来自 Notion，不写死机构、论文、项目、图片或区块 ID。后续按原格式增删条目，会自动使用同一套设计：

- 简介：顶层分栏，图片列放头像，文字列放 About Me 标题、介绍和联系方式。嵌套的第二行邮箱会保留。
- 章节：使用 Notion 标题。`Work Experience`、`Research Experience`、`Publications`、`Preprints`、`Projects` 支持对应中文标题；其他章节继续保留其内容。
- 经历：每条一个 callout，里面一个分栏块。图片列放机构和实验室 logo，文字列依次放职位、时间、导师/团队和研究方向。原来的空白列可保留。
- 论文：每篇一个 callout，内部分栏第一列放作者列表和引用文字，第二列放配图；摘要段落放在分栏下面。引用文字的开头用粗体标出论文标题，后面继续写会议与 Paper/Code/Page 链接。
- 项目：每项一个顶层分栏，第一列放标题列表项及其嵌套介绍段落，第二列放配图。

富文本链接、强调、作者公式和图片说明都保留。不符合该结构的条目交给标准 Notion 渲染器，避免新内容消失。

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
