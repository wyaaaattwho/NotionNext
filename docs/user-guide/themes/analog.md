# Analog

面向 2001–2004 年廉价数码相机、另类摇滚 CD 内页和独立杂志的低保真研究档案主题。首页采用沉浸式低分辨率城市影像、纸片标题和接触印样拼贴；正文使用 IBM Plex Sans，章节标识使用 Barlow Condensed，手写字使用 Permanent Marker。字体自托管，许可证见 `public/fonts/analog/`。

主背景为脏银灰 `#BCC3C6`，辅以褪色牛仔蓝、炭黑 `#252B32`、旧纸灰白 `#D9D9D3` 和酒红 `#844753`。页面背景直接使用扫描纸面位图，各区域采用不同的裁切与底色混合；不再给整个页面叠加统一颗粒。大字标题使用局部缺墨遮罩，正文、导航和操作控件保持清晰。

## 切换与旧版

默认主题为 `analog`。使用 `NEXT_PUBLIC_THEME=impressionism` 可恢复水彩衬线主题，或使用 `?theme=impressionism` 预览；Git 标签 `impressionism` 保存完整旧版源码。

`NEXT_PUBLIC_ANALOG_TITLE` 可覆盖首页标题，默认读取 Notion 站点描述。`NEXT_PUBLIC_ANALOG_HERO_IMAGE` 可覆盖城市影像；文章封面、正文、个人头像、机构标识、论文和项目图均沿用 Notion 原图。纯色图表背景保持白色，机构标识没有额外白色底板。

## 个人主页

继续识别已有的 Notion 格式：简介、Research Interests、Experience、Publications / Preprints、Projects。机构和经历按时间记录排版，论文采用独立双列瀑布流，摘要展开只推动同列内容。项目交替使用跨页大图、分栏侧写和叠页说明三种构图，放大标题与手写页边标注形成不同节奏。技术插图仍保留高清原图与白底，不做低清压缩。保留富文本、链接、图片放大及不符合固定格式内容的原生 Notion 回退。

## 交互

保留搜索、分类、标签、归档、分页、密码文章、评论、分享和深浅色模式。顶部导航没有常驻选中样式；Notion 链接无常驻下划线。Bookmark 默认透明无边框，悬停和键盘聚焦时呈现实色背景。

滚动视差和背景位移共用按需请求的动画帧，不在静止时持续绘制。页眉尺寸恒定，减少动画偏好实时生效。内容在无 JavaScript 或观察器不可用时仍可阅读。

## 首页影像

内置 imagegen 编辑的原创城市影像（2026-11-13）包含局部失焦、扫描条纹、色彩渗漏和噪点，再以实际 JPEG 编码保留压缩损伤。桌面素材 `city-study-lofi.jpg` 为 640×427、约 11 KB，手机素材 `city-study-lofi-small.jpg` 为 480×320、约 6 KB。匿名人物不是站点作者肖像。

`scan-surface.webp` 为 imagegen 生成的扫描纸面素材（约 47 KB），作为背景使用，不遮盖文字。`ink-loss.svg` 是代码绘制的局部缺墨遮罩，仅用于大字标题。原先的高分辨率版本保留在资源目录。完整提示词及导出说明见 [影像说明](../../../public/images/analog/LOFI-ASSETS.md)。
