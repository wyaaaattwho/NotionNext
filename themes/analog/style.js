export const Style = () => (
  <style jsx global>{`
    #theme-analog {
      --an-paper: #d1d5d5;
      --an-section: #b9c2c7;
      --an-card: #c5cdd0;
      --an-ink: #252d35;
      --an-muted: #4b5963;
      --an-line: rgba(37, 45, 53, 0.18);
      --an-accent: #873b47;
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
      color: var(--an-ink);
      font: 400 16px/1.65 var(--an-sans);
      -webkit-font-smoothing: antialiased;
    }
    .dark #theme-analog {
      --an-paper: #1c252b;
      --an-section: #25313a;
      --an-card: #28343c;
      --an-ink: #d1d5d5;
      --an-muted: #b0bdc2;
      --an-line: rgba(209, 213, 213, 0.18);
      --an-accent: #d29aa4;
      --an-steel: #afc8d7;
    }
    #theme-analog::after {
      content: '';
      position: fixed;
      inset: 0;
      z-index: 60;
      pointer-events: none;
      opacity: 0.028;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 150 150' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Cpath fill='%23000' filter='url(%23n)' opacity='.65' d='M0 0h150v150H0z'/%3E%3C/svg%3E");
    }
    #theme-analog .an-motion-trace {
      position: fixed;
      inset: -10% -20%;
      z-index: -1;
      pointer-events: none;
      opacity: 0.5;
      transform: translate3d(var(--an-trace-shift, 0px), 0, 0);
      background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1600' height='1000' viewBox='0 0 1600 1000'%3E%3Cg fill='%237d97a8' opacity='.045'%3E%3Cpath d='M0 160h1600v64H0zM0 228h1600v8H0zM0 730h1600v30H0z'/%3E%3C/g%3E%3Cpath d='M0 765h1600' stroke='%2382545e' stroke-opacity='.06' stroke-width='2'/%3E%3C/svg%3E")
        center / cover;
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
    #theme-analog .an-hero {
      padding-top: 30px;
    }
    #theme-analog .an-hero-index,
    #theme-analog .an-hero-bottom {
      display: flex;
      justify-content: space-between;
      gap: 20px;
      color: var(--an-muted);
    }
    #theme-analog .an-hero-grid {
      display: grid;
      grid-template-columns: 0.85fr 1.15fr;
      align-items: center;
      padding-block: 30px 48px;
    }
    #theme-analog .an-hero-copy {
      position: relative;
      z-index: 2;
      margin-right: -155px;
      padding-block: 30px 40px;
    }
    #theme-analog .an-hero-copy .an-eyebrow {
      margin-bottom: 30px;
      color: var(--an-accent);
    }
    #theme-analog .an-hero h1 {
      max-width: 690px;
      font: 400 clamp(48px, 5.6vw, 83px)/1.16 var(--an-hand);
      letter-spacing: -0.035em;
      transform: rotate(-2deg);
      margin-bottom: 34px;
      text-wrap: balance;
    }
    #theme-analog .an-hero h1 span {
      background: var(--an-paper);
      box-decoration-break: clone;
      -webkit-box-decoration-break: clone;
      box-shadow:
        8px 0 var(--an-paper),
        -6px 0 var(--an-paper);
    }
    #theme-analog .an-hero-bio {
      max-width: 390px;
      font-size: 15px;
      color: var(--an-muted);
      padding-right: 20px;
    }
    #theme-analog .an-hero-actions {
      display: flex;
      align-items: center;
      gap: 28px;
      margin-top: 30px;
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
    #theme-analog .an-hero-photo {
      position: relative;
      min-width: 0;
      transform: rotate(1.3deg);
    }
    #theme-analog .an-hero-photo-frame {
      position: relative;
      height: clamp(410px, 42vw, 595px);
      overflow: hidden;
      background: #687983;
      border: 7px solid #252d35;
    }
    #theme-analog .an-hero-photo picture {
      display: block;
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
    #theme-analog .an-hero-image {
      width: 100%;
      height: calc(100% + 60px);
      max-width: none;
      object-fit: cover;
      object-position: 62% 56%;
      transform: translate3d(0, calc(-30px + var(--an-hero-shift, 0px)), 0);
    }
    #theme-analog .an-hero-photo figcaption {
      display: flex;
      justify-content: space-between;
      gap: 16px;
      margin-top: 12px;
      font-size: 9px;
    }
    #theme-analog .an-photo-cross {
      position: absolute;
      color: #d1d5d5;
      font: 22px var(--an-mono);
      opacity: 0.8;
    }
    #theme-analog .an-photo-cross-top {
      top: 9px;
      right: 10px;
    }
    #theme-analog .an-photo-cross-bottom {
      bottom: 9px;
      left: 10px;
    }
    #theme-analog .an-hero-note {
      position: absolute;
      right: 10px;
      bottom: -48px;
      font-size: 23px;
      transform: rotate(-5deg);
      white-space: nowrap;
    }
    #theme-analog .an-hero-bottom {
      margin-top: 20px;
      padding-block: 22px;
      border-top: 1px solid var(--an-ink);
      border-bottom: 1px solid var(--an-line);
    }
    #theme-analog .an-journal {
      --an-muted: #3e4f5b;
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
      background: #c5cdd0;
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
      bottom: 9px;
      padding: 3px 6px;
      background: #b9c2c7;
      color: #252d35;
      font-size: 9px;
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
      color: var(--an-accent);
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
      color: var(--an-accent);
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
      #theme-analog .an-hero-copy {
        margin-right: -100px;
      }
      #theme-analog .an-hero h1 {
        font-size: 58px;
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
      #theme-analog .an-hero-grid {
        grid-template-columns: 1fr 1fr;
      }
      #theme-analog .an-hero h1 {
        font-size: 49px;
      }
      #theme-analog .an-hero-photo-frame {
        height: 450px;
      }
      #theme-analog .an-hero-actions {
        gap: 18px;
      }
      #theme-analog .an-hero-bio {
        max-width: 270px;
        font-size: 13px;
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
      #theme-analog .an-hero {
        padding-top: 22px;
      }
      #theme-analog .an-hero-index {
        font-size: 9px;
      }
      #theme-analog .an-hero-index > span:last-child {
        display: none;
      }
      #theme-analog .an-hero-grid {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        padding-block: 30px 64px;
      }
      #theme-analog .an-hero-copy {
        margin: 0;
        padding: 0 0 30px;
      }
      #theme-analog .an-hero-copy .an-eyebrow {
        font-size: 10px;
        margin-bottom: 20px;
      }
      #theme-analog .an-hero h1 {
        max-width: 510px;
        font-size: clamp(37px, 9.5vw, 57px);
        line-height: 1.16;
        margin-bottom: 24px;
      }
      #theme-analog .an-hero-bio {
        font-size: 13px;
        max-width: none;
      }
      #theme-analog .an-hero-actions {
        margin-top: 22px;
        gap: 24px;
      }
      #theme-analog .an-hero-photo {
        margin-inline: 3px;
      }
      #theme-analog .an-hero-photo-frame {
        height: auto;
        aspect-ratio: 1.4;
        border-width: 5px;
      }
      #theme-analog .an-hero-image {
        height: 100%;
        transform: none;
        object-position: 58% center;
      }
      #theme-analog .an-hero-note {
        bottom: -40px;
        font-size: 21px;
      }
      #theme-analog .an-hero-photo figcaption {
        font-size: 8px;
      }
      #theme-analog .an-hero-bottom {
        padding-block: 17px;
        font-size: 8px;
        margin-top: 0;
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
      #theme-analog .an-hero-image,
      #theme-analog .an-post-cover:hover .an-cover-image,
      #theme-analog .an-brand:hover .an-brand-flower,
      #theme-analog
        .notion-row:has(> .notion-bookmark):hover
        > .notion-bookmark,
      #theme-analog .an-button:hover {
        transform: none;
      }
    }
  `}</style>
)
