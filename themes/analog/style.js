export const Style = () => (
  <style jsx global>{`
    #theme-analog {
      --an-paper: #bcc3c6;
      --an-section: #a3b0b9;
      --an-card: #d0d1ce;
      --an-ink: #252b32;
      --an-muted: #42515b;
      --an-line: rgba(37, 45, 53, 0.18);
      --an-accent: #844753;
      --an-link: #6e3441;
      --an-steel: #536e80;
      --an-sans: 'IBM Plex Sans', 'PingFang SC', 'Microsoft YaHei', sans-serif;
      --an-display: 'Barlow Condensed', var(--an-sans);
      --an-hand: 'Permanent Marker', var(--an-sans);
      --an-mono: 'SFMono-Regular', Consolas, 'Liberation Mono', monospace;
      --an-ease: cubic-bezier(0.22, 1, 0.36, 1);
      min-height: 100vh;
      overflow: clip;
      isolation: isolate;
      background: var(--an-paper);
      background-image: url('/images/analog/scan-surface.webp');
      background-size: 1200px auto;
      background-position: 50% 60px;
      background-blend-mode: soft-light;
      color: var(--an-ink);
      font: 400 16px/1.65 var(--an-sans);
      -webkit-font-smoothing: antialiased;
    }
    .dark #theme-analog {
      --an-paper: #252b32;
      --an-section: #303e49;
      --an-card: #35414a;
      --an-ink: #d9d9d3;
      --an-muted: #b0bdc2;
      --an-line: rgba(209, 213, 213, 0.18);
      --an-accent: #d29aa4;
      --an-link: #e4b2bc;
      --an-steel: #afc8d7;
    }
    #theme-analog .an-motion-trace {
      position: fixed;
      inset: -10% -20%;
      z-index: -1;
      pointer-events: none;
      opacity: 0.16;
      transform: translate3d(var(--an-trace-shift, 0px), 0, 0);
      background: url('/images/analog/scan-surface.webp') 45% 25% / 100% auto;
      mix-blend-mode: multiply;
      clip-path: polygon(
        0 16%,
        100% 10%,
        100% 23%,
        0 25%,
        0 68%,
        100% 74%,
        100% 89%,
        0 85%
      );
    }
    #theme-analog ::selection {
      background: #b9c2c7;
      color: #252d35;
    }
    #theme-analog a {
      color: inherit;
      text-decoration: none;
    }
    #theme-analog button,
    #theme-analog input {
      font: inherit;
    }
    #theme-analog button {
      cursor: pointer;
    }
    #theme-analog :focus-visible {
      outline: 2px solid var(--an-accent);
      outline-offset: 5px;
    }
    #theme-analog :is(h1, h2, h3, p, figure) {
      margin: 0;
    }
    #theme-analog :is(h1, h2, h3) {
      color: var(--an-ink);
      font-weight: 600;
      line-height: 1.18;
    }
    #theme-analog .an-shell {
      width: min(1280px, calc(100% - 112px));
      margin-inline: auto;
    }
    #theme-analog .an-label,
    #theme-analog .an-eyebrow {
      font: 400 11px/1.5 var(--an-mono);
      letter-spacing: 0.07em;
      text-transform: uppercase;
    }
    #theme-analog .an-eyebrow {
      color: var(--an-muted);
      margin-bottom: 20px;
    }
    #theme-analog .an-handwritten {
      font: 400 27px/1.2 var(--an-hand);
      color: var(--an-accent);
    }
    #theme-analog .an-arrow {
      display: inline-block;
      transition: transform 0.3s var(--an-ease);
    }
    #theme-analog a:hover > .an-arrow {
      transform: translate(3px, -2px);
    }
    #theme-analog .an-skip {
      position: fixed;
      left: 20px;
      top: -100px;
      z-index: 100;
      background: var(--an-card);
      padding: 12px 20px;
    }
    #theme-analog .an-skip:focus {
      top: 12px;
    }
    #theme-analog .an-reading-progress {
      position: fixed;
      inset: 0 0 auto;
      height: 2px;
      z-index: 70;
      background: var(--an-accent);
      transform: scaleX(var(--an-progress, 0));
      transform-origin: left;
      pointer-events: none;
    }
    #theme-analog .an-header {
      position: sticky;
      top: 0;
      z-index: 40;
      min-height: 88px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 30px;
      border-bottom: 1px solid var(--an-line);
      isolation: isolate;
    }
    #theme-analog .an-header::before {
      content: '';
      position: absolute;
      inset: 0 calc((min(1280px, 100vw - 112px) - 100vw) / 2);
      background: var(--an-paper);
      background-image: url('/images/analog/scan-surface.webp');
      background-size: 1200px auto;
      background-position: 40% 70%;
      background-blend-mode: soft-light;
      z-index: -1;
      border-bottom: 1px solid var(--an-line);
      transition: box-shadow 0.3s;
    }
    #theme-analog.an-header-scrolled .an-header::before {
      box-shadow: 0 8px 24px #101b2312;
    }
    #theme-analog .an-brand {
      display: flex;
      align-items: center;
      gap: 12px;
      flex-shrink: 0;
      font: 700 29px/1 var(--an-display);
      letter-spacing: 0.01em;
    }
    #theme-analog .an-brand-flower {
      width: 36px;
      height: 36px;
      color: var(--an-accent);
      transition: transform 0.35s var(--an-ease);
    }
    #theme-analog .an-brand:hover .an-brand-flower {
      transform: rotate(-12deg);
    }
    #theme-analog .an-brand small {
      display: block;
      font: 400 9px/1.4 var(--an-mono);
      letter-spacing: 0.13em;
      margin-top: 7px;
      color: var(--an-muted);
    }
    #theme-analog .an-nav {
      display: flex;
      gap: 25px;
      align-items: center;
      font-size: 13px;
    }
    #theme-analog .an-nav > a,
    #theme-analog .an-menu-group > summary {
      position: relative;
      padding-block: 10px;
      cursor: pointer;
      white-space: nowrap;
      transition: color 0.2s;
    }
    #theme-analog .an-nav a:hover,
    #theme-analog .an-nav summary:hover,
    #theme-analog .an-nav a:focus-visible {
      color: var(--an-accent);
    }
    #theme-analog .an-nav > a::after,
    #theme-analog .an-menu-group > summary::after {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      bottom: 5px;
      height: 1px;
      background: currentColor;
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 0.3s var(--an-ease);
    }
    #theme-analog .an-nav > a:hover::after,
    #theme-analog .an-nav > a:focus-visible::after,
    #theme-analog .an-menu-group > summary:hover::after,
    #theme-analog .an-menu-group > summary:focus-visible::after {
      transform: scaleX(1) rotate(-1deg);
    }
    #theme-analog .an-mode {
      width: 30px;
      height: 30px;
      border: 1px solid var(--an-line);
      background: transparent;
      border-radius: 50%;
      display: grid;
      place-items: center;
    }
    #theme-analog .an-mode:hover {
      border-color: var(--an-accent);
      color: var(--an-accent);
    }
    #theme-analog .an-menu-toggle {
      display: none;
    }
    #theme-analog .an-menu-group {
      position: relative;
    }
    #theme-analog summary {
      list-style: none;
    }
    #theme-analog summary::-webkit-details-marker {
      display: none;
    }
    #theme-analog .an-submenu {
      position: absolute;
      top: 40px;
      right: 0;
      min-width: 190px;
      display: grid;
      gap: 14px;
      padding: 22px;
      border: 1px solid var(--an-line);
      background: var(--an-card);
      box-shadow: 5px 5px 0 #141f2612;
    }
    #theme-analog .an-button {
      display: inline-flex;
      gap: 34px;
      justify-content: space-between;
      align-items: center;
      background: var(--an-ink);
      color: var(--an-paper);
      padding: 12px 19px;
      font-size: 13px;
      transition:
        background 0.25s,
        transform 0.3s var(--an-ease);
    }
    #theme-analog .an-button:hover {
      background: var(--an-accent);
      color: var(--an-paper);
      transform: translateY(-2px);
    }
    #theme-analog .an-text-link {
      display: inline-flex;
      align-items: center;
      gap: 16px;
      font-size: 13px;
      padding-block: 8px;
      transition:
        color 0.2s,
        gap 0.3s var(--an-ease);
    }
    #theme-analog .an-text-link:hover {
      color: var(--an-accent);
      gap: 22px;
    }
    #theme-analog .an-journal {
      --an-muted: #33424c;
      position: relative;
      isolation: isolate;
      padding-block: 86px 76px;
      scroll-margin-top: 110px;
    }
    #theme-analog .an-journal::before {
      content: '';
      position: absolute;
      inset: 0 calc((100% - 100vw) / 2);
      z-index: -1;
      pointer-events: none;
      background: var(--an-section);
      background-image: url('/images/analog/scan-surface.webp');
      background-size: 1100px auto;
      background-position: 15% 35%;
      background-blend-mode: soft-light;
    }
    .dark #theme-analog .an-journal {
      --an-muted: #b0bdc2;
    }
    #theme-analog .an-section-heading {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      gap: 30px;
      margin-bottom: 28px;
    }
    #theme-analog .an-section-heading h2 {
      font: 700 clamp(45px, 5.7vw, 78px)/0.95 var(--an-display);
      text-transform: uppercase;
      letter-spacing: -0.015em;
    }
    #theme-analog .an-heading-dot {
      color: var(--an-accent);
    }
    #theme-analog .an-categories {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 14px 26px;
      padding-block: 19px;
      margin-bottom: 25px;
      border-block: 1px solid var(--an-line);
      font-size: 12px;
      color: var(--an-muted);
    }
    #theme-analog .an-categories a {
      display: flex;
      gap: 8px;
      align-items: baseline;
    }
    #theme-analog .an-categories small {
      font: 10px var(--an-mono);
    }
    #theme-analog .an-categories a:hover,
    #theme-analog .an-categories [aria-current='page'] {
      color: var(--an-accent);
    }
    #theme-analog .an-journal .an-category,
    #theme-analog .an-journal .an-categories a:hover,
    #theme-analog .an-journal .an-categories [aria-current='page'] {
      color: color-mix(in srgb, var(--an-accent) 92%, var(--an-ink));
    }
    #theme-analog .an-post {
      position: relative;
      display: grid;
      grid-template-columns: 44px minmax(0, 1fr) 280px;
      gap: 28px;
      padding-block: 32px;
      border-bottom: 1px solid var(--an-line);
    }
    #theme-analog .an-post-number {
      color: var(--an-muted);
      padding-top: 3px;
    }
    #theme-analog .an-post-cover {
      grid-column: 3;
      grid-row: 1;
      position: relative;
      align-self: start;
      display: block;
      aspect-ratio: 1.55;
      overflow: hidden;
      padding: 8px 8px 23px;
      border: 1px solid var(--an-ink);
      background: var(--an-card);
      box-shadow: 3px 3px 0 var(--an-line);
    }
    #theme-analog .an-post-image {
      display: block;
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
    #theme-analog .an-cover-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      filter: saturate(0.5) contrast(1.04);
      transition:
        transform 0.65s var(--an-ease),
        filter 0.5s;
    }
    #theme-analog .an-post-cover:hover .an-cover-image {
      transform: scale(1.035);
      filter: saturate(0.95);
    }
    #theme-analog .an-post-image-label {
      position: absolute;
      left: 9px;
      bottom: 4px;
      padding: 0;
      color: var(--an-muted);
      font-size: 8px;
    }
    #theme-analog .an-post-copy {
      grid-column: 2;
      grid-row: 1;
      min-width: 0;
    }
    #theme-analog .an-post h3 {
      margin-top: 12px;
      max-width: 760px;
      font-size: clamp(22px, 2.3vw, 31px);
      font-weight: 600;
      line-height: 1.24;
      letter-spacing: -0.02em;
    }
    #theme-analog .an-post h3 a {
      transition: color 0.25s;
    }
    #theme-analog .an-post h3 a:hover {
      color: var(--an-accent);
    }
    #theme-analog .an-meta {
      display: flex;
      gap: 14px;
      align-items: center;
      flex-wrap: wrap;
      font: 400 10px/1.5 var(--an-mono);
      letter-spacing: 0.02em;
      color: var(--an-muted);
    }
    #theme-analog .an-category {
      color: var(--an-link);
    }
    #theme-analog .an-summary {
      font-size: 14px;
      line-height: 1.8;
      color: var(--an-muted);
      margin-top: 18px;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    #theme-analog .an-post-bottom {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 14px;
      margin-top: 24px;
    }
    #theme-analog .an-tags {
      display: flex;
      gap: 10px;
      font-size: 10px;
      color: var(--an-muted);
    }
    #theme-analog .an-tags a::before {
      content: '#';
    }
    #theme-analog .an-read {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 12px;
    }
    #theme-analog .an-featured {
      grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
      gap: 52px;
      padding-block: 16px 44px;
      margin-bottom: 14px;
    }
    #theme-analog .an-featured .an-post-number {
      display: none;
    }
    #theme-analog .an-featured .an-post-cover {
      grid-column: 1;
      aspect-ratio: 1.35;
    }
    #theme-analog .an-featured .an-post-copy {
      align-self: center;
    }
    #theme-analog .an-featured h3 {
      font-size: clamp(28px, 3vw, 41px);
      line-height: 1.18;
    }
    #theme-analog .an-featured .an-summary {
      -webkit-line-clamp: 4;
      font-size: 15px;
    }
    #theme-analog .an-pagination {
      display: flex;
      justify-content: space-between;
      gap: 20px;
      padding-top: 38px;
      font: 12px var(--an-mono);
    }
    #theme-analog .an-load-more {
      display: block;
      margin: 36px auto 0;
      padding: 11px 26px;
      border: 1px solid var(--an-ink);
      background: transparent;
    }
    #theme-analog .an-empty {
      padding-block: 80px;
      text-align: center;
    }
    #theme-analog .an-empty-flower {
      width: 55px;
      height: 55px;
      margin: 0 auto 24px;
      color: var(--an-accent);
    }
    #theme-analog .an-empty h1 {
      font: 700 68px var(--an-display);
    }
    #theme-analog .an-notice {
      margin-block: 30px 0;
      padding: 20px 0;
      border-bottom: 1px solid var(--an-line);
    }
    #theme-analog .an-notice > details > summary {
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      font-size: 13px;
    }
    #theme-analog .an-notice #notion-article {
      margin-top: 24px;
    }
    #theme-analog .an-search,
    #theme-analog .an-archive,
    #theme-analog .an-taxonomy {
      padding-block: 60px 90px;
    }
    #theme-analog .an-search h1,
    #theme-analog .an-archive > h1,
    #theme-analog .an-taxonomy > h1 {
      font-size: clamp(34px, 4vw, 54px);
      margin-bottom: 36px;
    }
    #theme-analog .an-search form {
      display: flex;
      border-bottom: 2px solid var(--an-ink);
    }
    #theme-analog .an-search input {
      flex: 1;
      min-width: 0;
      background: transparent;
      border: 0;
      border-radius: 0;
      padding: 18px 6px;
      color: var(--an-ink);
    }
    #theme-analog .an-search button {
      border: 0;
      background: transparent;
      display: flex;
      align-items: center;
      gap: 20px;
      padding: 14px;
    }
    #theme-analog .an-archive-group {
      display: grid;
      grid-template-columns: 180px 1fr;
      gap: 40px;
      padding-block: 28px;
      border-top: 1px solid var(--an-line);
    }
    #theme-analog .an-archive-group h2 {
      font: 700 36px var(--an-display);
    }
    #theme-analog .an-archive-group small {
      display: block;
      font: 11px var(--an-mono);
      margin-top: 12px;
      color: var(--an-muted);
    }
    #theme-analog .an-archive-group a {
      display: flex;
      align-items: baseline;
      gap: 22px;
      padding-block: 14px;
    }
    #theme-analog .an-archive-group a span:nth-child(2) {
      flex: 1;
    }
    #theme-analog .an-archive-group time {
      color: var(--an-muted);
      font: 11px var(--an-mono);
      flex-shrink: 0;
    }
    #theme-analog .an-archive-group a:hover {
      color: var(--an-accent);
    }
    #theme-analog .an-taxonomy-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 0 50px;
    }
    #theme-analog .an-taxonomy-grid a {
      border-top: 1px solid var(--an-line);
      padding: 24px 0;
    }
    #theme-analog .an-taxonomy-number {
      font: 12px var(--an-mono);
      color: var(--an-accent);
    }
    #theme-analog .an-taxonomy-grid h2 {
      margin-block: 12px 16px;
      font-size: 26px;
    }
    #theme-analog .an-taxonomy-grid a > span:last-child {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      color: var(--an-muted);
    }
    #theme-analog .an-article {
      max-width: 1080px;
      padding-block: 52px 80px;
    }
    #theme-analog .an-article-wide {
      max-width: 1280px;
    }
    #theme-analog .an-article-header {
      border-bottom: 1px solid var(--an-ink);
      padding-bottom: 32px;
      margin-bottom: 38px;
    }
    #theme-analog .an-back {
      display: inline-block;
      font: 11px var(--an-mono);
      color: var(--an-muted);
      margin-bottom: 30px;
    }
    #theme-analog .an-back:hover {
      color: var(--an-accent);
    }
    #theme-analog .an-article-header h1 {
      font-size: clamp(32px, 4.2vw, 57px);
      letter-spacing: -0.04em;
      margin-block: 18px;
      overflow-wrap: anywhere;
    }
    #theme-analog .an-article-header > p {
      color: var(--an-muted);
      font-size: 17px;
      line-height: 1.75;
    }
    #theme-analog #notion-article {
      overflow: visible;
    }
    #theme-analog .notion {
      font-family: var(--an-sans) !important;
      font-size: 17px;
      line-height: 1.8;
      font-weight: 400;
      color: var(--an-ink);
      --fg-color: var(--an-ink);
      --fg-color-0: var(--an-ink);
      --fg-color-1: var(--an-line);
      --fg-color-2: var(--an-muted);
      --fg-color-3: var(--an-muted);
      --bg-color: var(--an-paper);
      --bg-color-0: var(--an-card);
    }
    #theme-analog .notion-page {
      padding: 0;
      max-width: none;
      margin: 0;
    }
    #theme-analog .notion-text {
      font-family: inherit;
      font-size: inherit;
      line-height: 1.8 !important;
      padding-block: 0;
      margin-block: 0 16px;
      overflow-wrap: anywhere;
    }
    #theme-analog .notion :is(b, strong) {
      font-weight: 600;
    }
    #theme-analog .notion-h {
      font-family: var(--an-sans);
      margin: 42px 0 18px;
      line-height: 1.3;
      scroll-margin-top: 110px;
    }
    #theme-analog .notion-h-title {
      margin: 0;
      line-height: inherit;
    }
    #theme-analog .notion-h1 {
      font-size: 29px;
    }
    #theme-analog .notion-h2 {
      font-size: 25px;
    }
    #theme-analog .notion-h3 {
      font-size: 22px;
    }
    #theme-analog .notion-gray {
      color: var(--an-muted);
    }
    #theme-analog .notion-link {
      color: var(--an-link);
      opacity: 1;
      border-bottom: 0 !important;
      text-decoration: none;
      transition: color 0.2s;
    }
    #theme-analog .notion-link:hover {
      color: var(--an-steel);
    }
    #theme-analog .notion-page-link {
      border: 0;
      text-decoration: none;
      min-height: 46px;
      height: auto;
      padding: 10px 12px;
      margin-block: 6px;
      transition: background 0.2s;
    }
    #theme-analog .notion-page-link:hover {
      background: var(--an-card);
    }
    #theme-analog .notion-link .notion-inline-underscore,
    #theme-analog .notion-inline-underscore:has(.notion-link) {
      text-decoration: none;
    }
    #theme-analog
      .notion
      a
      :is(
        .notion-page-text,
        .notion-page-title-text,
        .notion-table-of-contents-item-body,
        .notion-external-title
      ),
    #theme-analog .notion-link .notion-page-title-text {
      border-bottom: 0 !important;
    }
    #theme-analog .notion-list {
      margin-block: 14px;
      line-height: 1.8;
    }
    #theme-analog .notion-list li {
      padding-block: 3px;
    }
    #theme-analog .notion-row {
      overflow: visible;
    }
    #theme-analog .notion-quote {
      margin-block: 24px;
      padding: 16px 24px;
      border: 0;
      border-left: 2px solid var(--an-accent);
      background: var(--an-card);
      font: inherit;
    }
    #theme-analog .notion-callout {
      border: 0;
      border-radius: 0;
      background: var(--an-card);
      padding: 24px;
      margin-block: 20px;
      color: var(--an-ink);
    }
    #theme-analog .notion-callout-text {
      font: inherit;
      color: inherit;
      width: 100%;
      min-width: 0;
    }
    #theme-analog .notion-callout-text .notion-text:last-child {
      margin-bottom: 0;
    }
    #theme-analog .notion-code,
    #theme-analog .notion-inline-code {
      font-family: var(--an-mono);
    }
    #theme-analog .notion-asset-wrapper {
      margin-block: 26px;
    }
    #theme-analog .an-article .notion-asset-wrapper-image {
      padding: clamp(8px, 1.5vw, 14px);
      border: 1px solid var(--an-ink);
      background: var(--an-card);
      box-shadow: 4px 5px 0 var(--an-line);
      border-radius: 0;
    }
    #theme-analog .an-article .notion-asset-wrapper-image > div {
      outline: 1px solid var(--an-line);
      outline-offset: 3px;
      background: #fff;
    }
    #theme-analog
      .an-article
      .notion-asset-wrapper-image
      .notion-asset-caption {
      margin-top: 10px;
      padding: 10px 0 2px;
      border-top: 1px solid var(--an-line);
    }
    #theme-analog .notion-asset-caption,
    #theme-analog .notion-asset-wrapper figcaption {
      color: var(--an-muted);
      font: 12px/1.6 var(--an-sans);
    }
    #theme-analog .notion-bookmark {
      border: 0;
      border-radius: 1px;
      margin-block: 8px;
      background: transparent;
      transition:
        background 0.25s,
        box-shadow 0.3s,
        transform 0.35s var(--an-ease);
    }
    #theme-analog .notion-bookmark > div:first-child {
      min-width: 0;
      padding: 24px;
      color: var(--an-ink);
    }
    #theme-analog .notion-bookmark-title {
      font-size: 21px;
      line-height: 1.3;
      white-space: normal;
      font-weight: 600;
      margin-bottom: 8px;
      color: var(--an-ink);
    }
    #theme-analog .notion-bookmark-description {
      font-size: 15px;
      line-height: 1.6;
      height: auto;
      max-height: 3.2em;
      color: var(--an-muted);
      opacity: 1;
    }
    #theme-analog .notion-bookmark-link {
      width: 100%;
      align-items: center;
      margin-top: 18px;
    }
    #theme-analog .notion-bookmark-link > .notion-bookmark-link-text {
      min-width: 0;
      color: var(--an-accent);
      font: 11px/1.5 var(--an-mono);
    }
    #theme-analog .notion-bookmark:focus-visible,
    #theme-analog .notion-bookmark:active {
      background: var(--an-card);
      box-shadow: 6px 6px 0 #536e8014;
    }
    @media (hover: hover) {
      #theme-analog
        .notion-row:has(> .notion-bookmark):hover
        > .notion-bookmark {
        background: var(--an-card);
        box-shadow: 6px 6px 0 #536e8014;
        transform: translateY(-4px);
      }
    }
    #theme-analog .an-adjacent {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 30px;
      border-top: 1px solid var(--an-line);
      padding-top: 28px;
      margin-block: 52px;
    }
    #theme-analog .an-adjacent > div:last-child {
      text-align: right;
    }
    #theme-analog .an-adjacent small {
      display: block;
      font: 10px var(--an-mono);
      color: var(--an-muted);
      margin-bottom: 12px;
    }
    #theme-analog .an-recommend {
      margin-block: 64px;
    }
    #theme-analog .an-recommend > h2 {
      font-size: 30px;
      margin-bottom: 24px;
    }
    #theme-analog .an-recommend .an-post {
      grid-template-columns: 30px 1fr 200px;
    }
    #theme-analog .an-recommend .an-post h3 {
      font-size: 22px;
    }
    #theme-analog .an-footer {
      border-top: 1px solid var(--an-ink);
      padding-block: 36px 26px;
    }
    #theme-analog .an-footer-signature {
      display: flex;
      gap: 30px;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 36px;
    }
    #theme-analog .an-footer-signature > span:first-child {
      font: 700 clamp(27px, 3vw, 44px)/1 var(--an-display);
    }
    #theme-analog .an-footer-signature .an-handwritten {
      font-size: 22px;
      transform: rotate(-4deg);
    }
    #theme-analog .an-footer-bottom {
      display: flex;
      justify-content: space-between;
      gap: 24px;
      flex-wrap: wrap;
      border-top: 1px solid var(--an-line);
      padding-top: 24px;
      color: var(--an-muted);
      font: 10px/1.8 var(--an-mono);
    }
    #theme-analog .an-footer-bottom > div {
      display: flex;
      gap: 24px;
    }
    #theme-analog .an-footer a:hover {
      color: var(--an-accent);
    }
    #theme-analog .an-stats {
      margin-top: 18px;
    }
    #theme-analog .an-reveal.an-in-view {
      animation: an-enter 0.65s var(--an-ease) backwards;
    }
    @keyframes an-enter {
      from {
        opacity: 0.25;
        transform: translateY(18px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    @media (max-width: 1100px) {
      #theme-analog .an-shell {
        width: calc(100% - 64px);
      }
      #theme-analog .an-header::before {
        inset-inline: -32px;
      }
      #theme-analog .an-nav {
        gap: 16px;
        font-size: 12px;
      }
      #theme-analog .an-post {
        grid-template-columns: 30px minmax(0, 1fr) 230px;
        gap: 22px;
      }
      #theme-analog .an-featured {
        grid-template-columns: 1fr 1fr;
        gap: 34px;
      }
    }
    @media (max-width: 850px) {
      #theme-analog .an-header {
        min-height: 78px;
      }
      #theme-analog .an-menu-toggle {
        display: flex;
        gap: 10px;
        align-items: center;
        background: transparent;
        border: 0;
        padding: 8px;
        font-size: 12px;
      }
      #theme-analog .an-nav {
        display: none;
        position: absolute;
        top: calc(100% - 1px);
        left: -32px;
        right: -32px;
        background: var(--an-paper);
        padding: 22px 32px;
        border-bottom: 1px solid var(--an-line);
      }
      #theme-analog .an-nav-open {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        gap: 12px;
      }
      #theme-analog .an-nav > a,
      #theme-analog .an-menu-group > summary {
        display: block;
        padding-block: 9px;
      }
      #theme-analog .an-submenu {
        position: static;
        box-shadow: none;
        border: 0;
        border-left: 1px solid var(--an-line);
        margin-top: 10px;
        padding: 10px 20px;
        background: transparent;
      }
      #theme-analog .an-featured {
        gap: 28px;
      }
      #theme-analog .an-featured h3 {
        font-size: 27px;
      }
      #theme-analog .an-post {
        grid-template-columns: 25px minmax(0, 1fr) 200px;
        gap: 18px;
      }
      #theme-analog .an-featured {
        grid-template-columns: 1fr 1fr;
      }
      #theme-analog .an-post h3 {
        font-size: 24px;
      }
      #theme-analog .an-archive-group {
        grid-template-columns: 130px 1fr;
        gap: 24px;
      }
    }
    @media (max-width: 650px) {
      #theme-analog .an-shell {
        width: calc(100% - 40px);
      }
      #theme-analog .an-header::before {
        inset-inline: -20px;
      }
      #theme-analog .an-brand {
        font-size: 25px;
        gap: 8px;
      }
      #theme-analog .an-brand-flower {
        width: 28px;
        height: 28px;
      }
      #theme-analog .an-brand small {
        font-size: 8px;
        letter-spacing: 0.07em;
      }
      #theme-analog .an-nav {
        left: -20px;
        right: -20px;
        padding-inline: 20px;
      }
      #theme-analog .an-journal {
        padding-block: 58px;
        scroll-margin-top: 98px;
      }
      #theme-analog .an-section-heading {
        gap: 16px;
      }
      #theme-analog .an-section-heading .an-text-link {
        white-space: nowrap;
        font-size: 11px;
        gap: 8px;
      }
      #theme-analog .an-section-heading h2 {
        font-size: 47px;
      }
      #theme-analog .an-section-heading .an-eyebrow {
        font-size: 9px;
      }
      #theme-analog .an-categories {
        gap: 12px 20px;
        font-size: 11px;
      }
      #theme-analog .an-post,
      #theme-analog .an-recommend .an-post {
        grid-template-columns: 22px minmax(0, 1fr);
        gap: 15px;
        padding-block: 25px;
      }
      #theme-analog .an-post-cover {
        grid-column: 2;
        grid-row: 1;
        width: 100%;
        aspect-ratio: 1.65;
      }
      #theme-analog .an-post-copy {
        grid-column: 2;
        grid-row: 2;
      }
      #theme-analog .an-post-number {
        grid-column: 1;
        grid-row: 1;
      }
      #theme-analog .an-post h3,
      #theme-analog .an-recommend .an-post h3 {
        font-size: 23px;
      }
      #theme-analog .an-post .an-summary {
        font-size: 13px;
        -webkit-line-clamp: 3;
      }
      #theme-analog .an-featured {
        display: block;
        padding-top: 0;
      }
      #theme-analog .an-featured .an-post-cover {
        margin-bottom: 22px;
        aspect-ratio: 1.45;
      }
      #theme-analog .an-featured h3 {
        font-size: 29px;
      }
      #theme-analog .an-post-bottom {
        margin-top: 20px;
      }
      #theme-analog .an-article {
        padding-block: 34px 54px;
      }
      #theme-analog .an-article-header h1 {
        font-size: 32px;
        letter-spacing: -0.025em;
      }
      #theme-analog .an-article-header > p {
        font-size: 15px;
      }
      #theme-analog .notion {
        font-size: 16px;
      }
      #theme-analog .notion-h1 {
        font-size: 25px;
      }
      #theme-analog .notion-h2 {
        font-size: 23px;
      }
      #theme-analog .notion-callout {
        padding: 18px 16px;
      }
      #theme-analog .notion-bookmark > div:first-child {
        padding: 20px 16px;
      }
      #theme-analog .notion-bookmark-title {
        font-size: 19px;
      }
      #theme-analog .notion-bookmark-description {
        font-size: 14px;
      }
      #theme-analog .an-search,
      #theme-analog .an-archive,
      #theme-analog .an-taxonomy {
        padding-block: 42px 60px;
      }
      #theme-analog .an-archive-group {
        display: block;
      }
      #theme-analog .an-archive-group h2 {
        margin-bottom: 20px;
      }
      #theme-analog .an-archive-group small {
        display: inline;
        margin-left: 16px;
      }
      #theme-analog .an-archive-group a {
        gap: 15px;
        font-size: 14px;
      }
      #theme-analog .an-archive-group time {
        font-size: 9px;
      }
      #theme-analog .an-taxonomy-grid {
        grid-template-columns: 1fr;
      }
      #theme-analog .an-footer-signature {
        display: block;
        padding-bottom: 26px;
      }
      #theme-analog .an-footer-signature .an-handwritten {
        display: block;
        font-size: 19px;
        margin-top: 16px;
      }
      #theme-analog .an-footer-bottom {
        display: grid;
        gap: 14px;
        font-size: 9px;
      }
    }
    @media (prefers-reduced-motion: reduce) {
      #theme-analog *,
      #theme-analog *::before,
      #theme-analog *::after {
        animation: none !important;
        transition: none !important;
        scroll-behavior: auto !important;
      }
      #theme-analog .an-motion-trace,
      #theme-analog .an-post-cover:hover .an-cover-image,
      #theme-analog .an-brand:hover .an-brand-flower,
      #theme-analog
        .notion-row:has(> .notion-bookmark):hover
        > .notion-bookmark,
      #theme-analog .an-button:hover {
        transform: none;
      }
    }
    #theme-analog .an-hero {
      padding-top: 0;
    }
    #theme-analog .an-hero-index {
      display: flex;
      justify-content: space-between;
      gap: 20px;
      padding-block: 18px;
      color: var(--an-muted);
    }
    #theme-analog .an-hero-stage {
      position: relative;
      isolation: isolate;
      min-height: 720px;
      height: min(820px, calc(100svh - 55px));
    }
    #theme-analog .an-hero-photo {
      position: absolute;
      inset: 0 0 27px;
      margin: 0;
      transform: none;
    }
    #theme-analog .an-hero-photo-frame {
      position: absolute;
      inset: 0;
      overflow: hidden;
      background: #778a99;
      clip-path: polygon(
        0 0.6%,
        15% 0,
        38% 0.7%,
        67% 0.2%,
        100% 0,
        100% 97.9%,
        86% 99.1%,
        59% 98.3%,
        32% 100%,
        0 98.9%
      );
    }
    #theme-analog .an-hero-photo picture {
      display: block;
      height: 100%;
    }
    #theme-analog .an-hero-image {
      display: block;
      width: 100%;
      height: calc(100% + 64px);
      object-fit: cover;
      object-position: 61% 55%;
      max-width: none;
      transform: translate3d(0, calc(-32px + var(--an-hero-shift, 0px)), 0);
    }
    #theme-analog .an-hero-photo figcaption {
      position: absolute;
      bottom: -17px;
      left: 5.5%;
      right: 5.5%;
      display: flex;
      justify-content: space-between;
      gap: 20px;
      color: var(--an-ink);
      font-size: 9px;
    }
    #theme-analog .an-hero-copy {
      position: relative;
      z-index: 2;
      padding-top: 56px;
      pointer-events: none;
    }
    #theme-analog .an-hero-copy .an-eyebrow {
      display: inline-block;
      background: #252b32;
      color: #d9d9d3;
      padding: 5px 11px;
      margin-bottom: 28px;
      transform: rotate(0.7deg);
    }
    #theme-analog .an-hero h1 {
      max-width: 900px;
      font: 400 clamp(53px, 6.4vw, 96px)/1.08 var(--an-hand);
      letter-spacing: -0.045em;
      margin-left: -8px;
    }
    #theme-analog .an-headline-fragment {
      position: relative;
      isolation: isolate;
      display: table;
      max-width: 100%;
      padding: 1px 13px 8px;
      margin: 0 0 10px;
      color: #252b32;
      transform: rotate(-2.6deg);
    }
    #theme-analog .an-headline-fragment::before {
      content: '';
      position: absolute;
      inset: 0 -6px;
      z-index: -1;
      background: #d9d9d3 url('/images/analog/scan-surface.webp') 42% 37% /
        700px;
      background-blend-mode: soft-light;
      clip-path: polygon(
        0.3% 8%,
        37% 2%,
        98.8% 0,
        100% 83%,
        73% 97%,
        28% 93%,
        0.8% 100%
      );
    }
    #theme-analog .an-headline-fragment:nth-child(2) {
      margin-left: 13px;
      transform: rotate(0.9deg);
    }
    #theme-analog .an-headline-fragment:nth-child(3) {
      margin-left: 1px;
      transform: rotate(-1.3deg);
    }
    #theme-analog .an-headline-fragment > span {
      mask: url('/images/analog/ink-loss.svg') 0 0 / 170px 110px repeat;
      mask-mode: luminance;
    }
    #theme-analog .an-hero-controls {
      position: absolute;
      left: max(56px, calc((100% - 1280px) / 2));
      bottom: 74px;
      z-index: 3;
      padding: 19px 27px 21px;
    }
    #theme-analog .an-hero-controls::before {
      content: '';
      position: absolute;
      inset: 0;
      z-index: -1;
      background: var(--an-paper) url('/images/analog/scan-surface.webp') 65%
        82% / 720px;
      background-blend-mode: soft-light;
      clip-path: polygon(1% 0, 99% 3%, 100% 93%, 77% 100%, 0 96%);
    }
    #theme-analog .an-hero-bio {
      color: var(--an-ink);
      font-size: 13px;
    }
    #theme-analog .an-hero-actions {
      display: flex;
      align-items: center;
      gap: 30px;
      margin-top: 13px;
    }
    #theme-analog .an-hero-actions .an-text-link {
      font-size: 13px;
    }
    #theme-analog .an-hero-note {
      position: absolute;
      right: 5%;
      top: 30px;
      z-index: 2;
      color: #252b32;
      font-size: 26px;
      transform: rotate(5deg);
    }
    #theme-analog .an-contact-print {
      position: absolute;
      right: 4%;
      bottom: 66px;
      z-index: 2;
      width: 212px;
      padding: 9px 9px 7px;
      transform: rotate(5deg);
      background: #d9d9d3 url('/images/analog/scan-surface.webp') 75% 12% /
        420px;
      background-blend-mode: soft-light;
      box-shadow: -5px 7px 0 #252b3255;
    }
    #theme-analog .an-contact-print img {
      display: block;
      width: 100%;
      height: 123px;
      object-fit: cover;
      object-position: 82% 73%;
    }
    #theme-analog .an-contact-print > span {
      display: block;
      color: #252b32;
      font-size: 8px;
      margin-top: 6px;
    }
    #theme-analog .an-hero-bottom {
      display: flex;
      justify-content: space-between;
      gap: 20px;
      padding-block: 26px;
      color: var(--an-muted);
      border-bottom: 1px solid var(--an-line);
    }
    @media (min-width: 1600px) {
      #theme-analog .an-hero-stage {
        height: 920px;
      }
      #theme-analog .an-hero h1 {
        max-width: 1100px;
        font-size: 106px;
      }
    }
    @media (max-width: 1100px) {
      #theme-analog .an-hero h1 {
        font-size: clamp(49px, 7.2vw, 77px);
        max-width: 75%;
      }
      #theme-analog .an-hero-controls {
        left: 32px;
      }
      #theme-analog .an-hero-stage {
        min-height: 700px;
      }
      #theme-analog .an-contact-print {
        width: 170px;
      }
      #theme-analog .an-contact-print img {
        height: 110px;
      }
    }
    @media (max-width: 650px) {
      #theme-analog .an-hero-index {
        font-size: 8px;
        padding-block: 16px;
      }
      #theme-analog .an-hero-index > span:last-child {
        display: none;
      }
      #theme-analog .an-hero-stage {
        height: 690px;
        min-height: 660px;
      }
      #theme-analog .an-hero-photo {
        inset: 0 0 25px;
      }
      #theme-analog .an-hero-image {
        height: 100%;
        object-position: 62% center;
        transform: none;
      }
      #theme-analog .an-hero-copy {
        padding-top: 42px;
      }
      #theme-analog .an-hero-copy .an-eyebrow {
        font-size: 8px;
        margin-bottom: 22px;
      }
      #theme-analog .an-hero h1 {
        font-size: clamp(32px, 10.5vw, 63px);
        max-width: none;
        line-height: 1.12;
        letter-spacing: -0.04em;
      }
      #theme-analog .an-headline-fragment {
        padding: 3px 8px 6px;
        margin-bottom: 8px;
      }
      #theme-analog .an-headline-fragment:nth-child(2) {
        margin-left: 5px;
      }
      #theme-analog .an-hero-controls {
        left: 17px;
        bottom: 55px;
        padding: 17px 18px;
      }
      #theme-analog .an-hero-actions {
        gap: 22px;
      }
      #theme-analog .an-hero-bio {
        font-size: 12px;
      }
      #theme-analog .an-hero-controls .an-button {
        gap: 24px;
        padding: 10px 14px;
      }
      #theme-analog .an-contact-print {
        width: 108px;
        right: 14px;
        bottom: 188px;
        padding: 5px;
        box-shadow: -3px 4px 0 #252b3255;
      }
      #theme-analog .an-contact-print img {
        height: 74px;
      }
      #theme-analog .an-contact-print > span {
        font-size: 6px;
        margin-top: 4px;
      }
      #theme-analog .an-hero-note {
        top: auto;
        bottom: 330px;
        right: 15px;
        font-size: 20px;
        color: #d9d9d3;
        text-shadow: 1px 1px #252b32;
      }
      #theme-analog .an-hero-photo figcaption {
        bottom: -15px;
        font-size: 7px;
      }
      #theme-analog .an-hero-bottom {
        font-size: 8px;
        padding-block: 22px;
      }
    }
    @media (prefers-reduced-motion: reduce) {
      #theme-analog .an-hero-image {
        transform: none;
      }
    }
    @media (max-width: 360px) {
      #theme-analog .an-hero h1 {
        font-size: 31px;
      }
    }
    #theme-analog .an-profile-header h1,
    #theme-analog .an-article-header h1,
    #theme-analog .an-search h1,
    #theme-analog .an-archive > h1,
    #theme-analog .an-taxonomy > h1,
    #theme-analog .an-empty h1 {
      font-family: var(--an-display);
      font-weight: 700;
      text-transform: uppercase;
    }
    #theme-analog .an-section-heading h2,
    #theme-analog .an-profile-header h1,
    #theme-analog .an-article-header h1,
    #theme-analog .an-search h1,
    #theme-analog .an-archive > h1,
    #theme-analog .an-taxonomy > h1,
    #theme-analog .an-empty h1 {
      mask: url('/images/analog/ink-loss.svg') 15px 0 / 170px 110px repeat;
      mask-mode: luminance;
    }
    @media (min-width: 851px) {
      #theme-analog .an-featured {
        display: block;
        padding-bottom: 52px;
      }
      #theme-analog .an-featured .an-post-cover {
        width: 82%;
        aspect-ratio: 1.9;
      }
      #theme-analog .an-featured .an-post-copy {
        position: relative;
        isolation: isolate;
        margin: -65px 0 0 32%;
        padding: 29px 34px;
      }
      #theme-analog .an-featured .an-post-copy::before {
        content: '';
        position: absolute;
        inset: 0;
        z-index: -1;
        background: var(--an-paper) url('/images/analog/scan-surface.webp') 64%
          88% / 680px;
        background-blend-mode: soft-light;
        clip-path: polygon(0 2%, 97% 0, 100% 97%, 1% 100%);
      }
      #theme-analog .an-featured h3 {
        font-size: 43px;
      }
      #theme-analog .an-post-grid > .an-post:nth-child(3n + 1) {
        grid-template-columns: 30px minmax(0, 1fr) minmax(0, 1.15fr);
        gap: 30px;
        padding-block: 42px;
      }
      #theme-analog .an-post-grid > .an-post:nth-child(3n + 1) .an-post-cover {
        grid-column: 2;
        aspect-ratio: 1.5;
      }
      #theme-analog .an-post-grid > .an-post:nth-child(3n + 1) .an-post-copy {
        grid-column: 3;
        align-self: center;
      }
      #theme-analog .an-post-grid > .an-post:nth-child(3n + 2) h3 {
        font-size: 35px;
      }
    }
  `}</style>
)
