# Analog

冷灰蓝、炭黑、灰白和暗酒红色的研究档案主题。首页使用原创城市影像、手写标题与杂志式错位构图；正文使用 IBM Plex Sans，章节标识使用 Barlow Condensed，手写字使用 Permanent Marker。字体自托管，许可证见 `public/fonts/analog/`。

主背景为冷银灰 `#D1D5D5`，文章区为褪色蓝灰 `#B9C2C7`，主文字为 `#252D35`，强调色为 `#873B47`，细边框使用 `rgba(37,45,53,0.18)`。次级文字从石板灰略加深，以保证两种底色上的可读性。纹理为低透明度的单色颗粒。Notion 技术插图的白底保持原样。

## 切换与旧版

默认主题为 `analog`。使用 `NEXT_PUBLIC_THEME=impressionism` 可恢复水彩衬线主题，或使用 `?theme=impressionism` 预览；Git 标签 `impressionism` 保存完整旧版源码。

`NEXT_PUBLIC_ANALOG_TITLE` 可覆盖首页标题，默认读取 Notion 站点描述。`NEXT_PUBLIC_ANALOG_HERO_IMAGE` 可覆盖城市影像；文章封面、正文、个人头像、机构标识、论文和项目图均沿用 Notion 原图。纯色图表背景保持白色，机构标识没有额外白色底板。

## 个人主页

继续识别已有的 Notion 格式：简介、Research Interests、Experience、Publications / Preprints、Projects。机构和经历按时间记录排版，论文采用独立双列瀑布流，摘要展开只推动同列内容，项目以交错图文展示。保留富文本、链接、图片放大及不符合固定格式内容的原生 Notion 回退。

## 交互

保留搜索、分类、标签、归档、分页、密码文章、评论、分享和深浅色模式。顶部导航没有常驻选中样式；Notion 链接无常驻下划线。Bookmark 默认透明无边框，悬停和键盘聚焦时呈现实色背景。

滚动视差和背景位移共用按需请求的动画帧，不在静止时持续绘制。页眉尺寸恒定，减少动画偏好实时生效。内容在无 JavaScript 或观察器不可用时仍可阅读。

## 首页影像

内置 imagegen 生成的原创城市影像（2026-11-13），用于主题插图。匿名人物不是站点作者肖像。网页使用 `public/images/analog/city-study.webp`（约 93 KB）及手机版本 `city-study-small.webp`（约 25 KB）。生成记录及完整提示词见 [影像说明](../../../public/images/analog/README.md)。
