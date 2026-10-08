export const Style = () => (
  <style jsx global>{`
    #theme-impression {
      --im-paper: #f8f6ef;
      --im-ink: #2e352e;
      --im-muted: #74796c;
      --im-line: #d9ddcf;
      --im-green: #596c50;
      --im-wash: #e9ecdf;
      --im-rust: #a55f47;
      --im-serif: 'Noto Serif SC', 'Songti SC', 'STSong', Georgia, serif;
      --im-sans:
        -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans SC',
        sans-serif;
      min-height: 100vh;
      background: var(--im-paper);
      color: var(--im-ink);
      font-family: var(--im-sans);
      -webkit-font-smoothing: antialiased;
      overflow: clip;
    }
    .dark #theme-impression {
      --im-paper: #232822;
      --im-ink: #ecebde;
      --im-muted: #b1b7a7;
      --im-line: #434d3f;
      --im-green: #becfa6;
      --im-wash: #30392d;
      --im-rust: #e4a48b;
    }
    #theme-impression ::selection {
      background: #d9dfbf;
      color: #2e352e;
    }
    #theme-impression a {
      color: inherit;
      text-decoration: none;
    }
    #theme-impression button,
    #theme-impression input {
      font: inherit;
    }
    #theme-impression button {
      cursor: pointer;
    }
    #theme-impression :focus-visible {
      outline: 2px solid var(--im-rust);
      outline-offset: 5px;
    }
    #theme-impression h1,
    #theme-impression h2,
    #theme-impression h3,
    #theme-impression p,
    #theme-impression figure {
      margin: 0;
    }
    #theme-impression h1,
    #theme-impression h2,
    #theme-impression h3 {
      font-family: var(--im-serif);
      font-weight: 400;
    }
    #theme-impression .im-shell {
      width: min(1240px, calc(100% - 112px));
      margin-inline: auto;
    }
    #theme-impression .im-header {
      min-height: 110px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 32px;
      border-bottom: 1px solid var(--im-line);
      position: relative;
      z-index: 30;
    }
    #theme-impression .im-brand {
      display: flex;
      align-items: center;
      gap: 11px;
      flex-shrink: 0;
      font:
        25px Georgia,
        serif;
      letter-spacing: -0.8px;
    }
    #theme-impression .im-brand small {
      display: block;
      margin-top: 9px;
      font: 9px var(--im-sans);
      letter-spacing: 2.1px;
      color: var(--im-muted);
    }
    #theme-impression .im-brand-flower {
      width: 42px;
      height: 53px;
      color: var(--im-rust);
      transition: transform 0.5s;
    }
    #theme-impression .im-brand:hover .im-brand-flower {
      transform: rotate(-12deg);
    }
    #theme-impression .im-nav {
      display: flex;
      align-items: center;
      gap: 28px;
      font-size: 13px;
    }
    #theme-impression .im-nav a,
    #theme-impression .im-nav summary {
      transition: color 0.2s;
    }
    #theme-impression .im-nav a:hover,
    #theme-impression .im-nav summary:hover {
      color: var(--im-rust);
    }
    #theme-impression .im-nav [aria-current='page'] {
      color: var(--im-rust);
    }
    #theme-impression .im-mode {
      border: 1px solid var(--im-line);
      background: transparent;
      border-radius: 50%;
      width: 34px;
      height: 34px;
      font-size: 20px;
    }
    #theme-impression .im-menu-toggle {
      display: none;
    }
    #theme-impression .im-menu-group {
      position: relative;
    }
    #theme-impression .im-menu-group summary {
      cursor: pointer;
      list-style: none;
      white-space: nowrap;
    }
    #theme-impression .im-menu-group summary::-webkit-details-marker {
      display: none;
    }
    #theme-impression .im-submenu {
      position: absolute;
      top: 28px;
      right: 0;
      min-width: 155px;
      padding: 18px;
      border: 1px solid var(--im-line);
      background: var(--im-paper);
      box-shadow: 0 10px 25px #00000008;
      display: grid;
      gap: 18px;
    }
    #theme-impression .im-skip {
      position: absolute;
      left: 20px;
      top: -80px;
      z-index: 100;
      padding: 10px;
      background: var(--im-paper);
    }
    #theme-impression .im-skip:focus {
      top: 12px;
    }
    #theme-impression .im-hero {
      position: relative;
      display: flex;
      align-items: center;
      min-height: min(720px, calc(100svh - 110px));
      padding-block: 90px;
      background: #293c38;
      color: #faf8f1;
      isolation: isolate;
      overflow: hidden;
    }
    #theme-impression .im-hero-cover {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
      filter: saturate(0.85) sepia(0.06);
      z-index: -2;
    }
    #theme-impression .im-hero:before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(
        90deg,
        rgba(16, 25, 24, 0.76),
        rgba(16, 25, 24, 0.46) 60%,
        rgba(16, 25, 24, 0.25)
      );
      z-index: -1;
    }
    #theme-impression .im-hero .im-eyebrow {
      color: #e2e6d9;
    }
    #theme-impression .im-hero .im-text-link {
      border-color: #faf8f1;
    }
    #theme-impression .im-eyebrow {
      font: 10px var(--im-sans);
      letter-spacing: 2px;
      font-weight: 500;
      color: var(--im-muted);
    }
    #theme-impression .im-hero-copy {
      position: relative;
      z-index: 1;
      padding-block: 15px;
    }
    #theme-impression .im-dot {
      display: inline-block;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--im-rust);
      margin-right: 8px;
      vertical-align: middle;
    }
    #theme-impression .im-hero h1 {
      font-size: clamp(36px, 5vw, 72px);
      line-height: 1.18;
      max-width: 930px;
      letter-spacing: -0.035em;
      margin: 26px 0 24px;
    }
    #theme-impression .im-hero h1 span {
      display: block;
    }
    #theme-impression .im-hero-description {
      max-width: 600px;
      font-size: 15px;
      line-height: 2;
      color: #e2e6d9;
      margin-bottom: 31px;
    }
    #theme-impression .im-text-link {
      display: inline-flex;
      align-items: center;
      gap: 25px;
      padding-bottom: 8px;
      border-bottom: 1px solid var(--im-ink);
      font-size: 12px;
    }
    #theme-impression .im-arrow {
      display: inline-block;
      font-family: var(--im-sans);
      font-size: 20px;
      transition: transform 0.3s;
    }
    #theme-impression a:hover .im-arrow,
    #theme-impression button:hover .im-arrow {
      transform: translate(3px, -2px);
    }
    #theme-impression .im-notice {
      border-block: 1px solid var(--im-line);
      padding-block: 18px;
      margin-bottom: 25px;
    }
    #theme-impression .im-notice summary {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 12px;
      cursor: pointer;
      list-style: none;
      color: var(--im-muted);
    }
    #theme-impression .im-notice summary::-webkit-details-marker {
      display: none;
    }
    #theme-impression .im-notice summary span {
      font-size: 20px;
      transition: transform 0.25s;
    }
    #theme-impression .im-notice details[open] summary span {
      transform: rotate(45deg);
    }
    #theme-impression .im-notice .notion {
      margin-top: 20px;
    }
    #theme-impression .im-journal {
      padding-block: 32px 45px;
      scroll-margin-top: 32px;
    }
    #theme-impression .im-section-heading {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      gap: 24px;
    }
    #theme-impression .im-section-heading h2 {
      font-size: 34px;
      margin-top: 14px;
    }
    #theme-impression .im-heading-dot {
      color: var(--im-rust);
    }
    #theme-impression .im-categories {
      display: flex;
      gap: 24px;
      flex-wrap: wrap;
      margin-block: 28px 32px;
      padding-block: 16px;
      border-block: 1px solid var(--im-line);
      font-size: 12px;
      color: var(--im-muted);
    }
    #theme-impression .im-categories a {
      display: flex;
      gap: 6px;
      align-items: baseline;
    }
    #theme-impression .im-categories a:hover,
    #theme-impression .im-categories [aria-current='page'] {
      color: var(--im-rust);
    }
    #theme-impression .im-categories small {
      font-size: 9px;
      opacity: 0.75;
    }
    #theme-impression .im-post-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 40px 30px;
      padding-top: 34px;
    }
    #theme-impression .im-post {
      min-width: 0;
      border-top: 1px solid var(--im-line);
      padding-top: 20px;
    }
    #theme-impression .im-post-cover {
      display: block;
      overflow: hidden;
      position: relative;
      aspect-ratio: 1.55;
      background: var(--im-wash);
      margin-bottom: 24px;
    }
    #theme-impression .im-post-cover .lazy-image-wrapper {
      width: 100%;
      height: 100%;
    }
    #theme-impression .im-cover-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      filter: saturate(0.78) sepia(0.12);
      transition:
        transform 0.8s cubic-bezier(0.2, 0.7, 0.2, 1),
        filter 0.8s;
    }
    #theme-impression .im-post:hover .im-cover-image {
      transform: scale(1.035);
      filter: saturate(0.95) sepia(0.06);
    }
    #theme-impression .im-meta {
      display: flex;
      flex-wrap: wrap;
      gap: 15px;
      align-items: center;
      color: var(--im-muted);
      font-size: 10px;
      letter-spacing: 0.3px;
    }
    #theme-impression .im-category {
      color: var(--im-green);
    }
    #theme-impression .im-meta .im-category:after {
      content: ' /';
      color: var(--im-line);
      margin-left: 12px;
    }
    #theme-impression .im-post h3 {
      font-size: 22px;
      line-height: 1.7;
      margin-block: 13px;
      overflow-wrap: anywhere;
    }
    #theme-impression .im-post h3 a {
      background-image: linear-gradient(var(--im-rust), var(--im-rust));
      background-size: 0 1px;
      background-position: 0 100%;
      background-repeat: no-repeat;
      transition: background-size 0.4s;
    }
    #theme-impression .im-post h3 a:hover {
      background-size: 100% 1px;
    }
    #theme-impression .im-summary {
      color: var(--im-muted);
      font-size: 13px;
      line-height: 2;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    #theme-impression .im-post-bottom {
      margin-top: 25px;
      display: flex;
      justify-content: space-between;
      gap: 12px;
      align-items: center;
    }
    #theme-impression .im-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      font-size: 9px;
      color: var(--im-muted);
    }
    #theme-impression .im-tags a:before {
      content: '#';
      opacity: 0.5;
    }
    #theme-impression .im-read {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      white-space: nowrap;
      font-size: 11px;
      color: var(--im-green);
    }
    #theme-impression .im-featured {
      display: grid;
      grid-template-columns: 1.08fr 1fr;
      gap: 46px;
      border: 0;
      padding: 24px 0 6px;
    }
    #theme-impression .im-featured:not(:has(.im-post-cover)) {
      grid-template-columns: 1fr;
      background: var(--im-wash);
      padding: 35px;
    }
    #theme-impression .im-featured .im-post-cover {
      aspect-ratio: 1.65;
      margin: 0;
    }
    #theme-impression .im-featured .im-post-copy {
      padding-block: 20px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    #theme-impression .im-featured .im-eyebrow {
      margin-bottom: 28px;
    }
    #theme-impression .im-featured .im-eyebrow > span {
      margin-inline: 10px;
      color: var(--im-rust);
    }
    #theme-impression .im-featured h3 {
      font-size: 30px;
      margin-block: 18px;
    }
    #theme-impression .im-featured .im-post-bottom {
      margin-top: 30px;
    }
    #theme-impression .im-pagination {
      display: flex;
      justify-content: space-between;
      gap: 20px;
      border-top: 1px solid var(--im-line);
      margin-top: 55px;
      padding-top: 24px;
      font-size: 12px;
      color: var(--im-muted);
    }
    #theme-impression .im-load-more {
      display: flex;
      align-items: center;
      gap: 26px;
      margin: 40px auto 0;
      padding: 14px 30px;
      background: transparent;
      border: 1px solid var(--im-line);
      font-size: 12px;
    }
    #theme-impression .im-footer {
      border-top: 1px solid var(--im-line);
      padding-block: 38px 25px;
    }
    #theme-impression .im-footer-bottom {
      display: flex;
      justify-content: space-between;
      gap: 20px;
      font-size: 10px;
      color: var(--im-muted);
      line-height: 1.7;
    }
    #theme-impression .im-footer-bottom > div {
      display: flex;
      gap: 22px;
    }
    #theme-impression .im-filing {
      display: block;
      font-size: 10px;
      color: var(--im-muted);
      margin-top: 15px;
    }
    #theme-impression .im-stats {
      justify-content: center;
      margin-top: 16px;
    }
    #theme-impression .im-search,
    #theme-impression .im-archive,
    #theme-impression .im-taxonomy {
      padding-block: 70px;
    }
    #theme-impression .im-search h1,
    #theme-impression .im-archive > h1,
    #theme-impression .im-taxonomy h1 {
      font-size: 42px;
      margin-block: 20px 48px;
    }
    #theme-impression .im-search form {
      display: flex;
      max-width: 650px;
      border-bottom: 1px solid var(--im-ink);
      padding-bottom: 15px;
      gap: 20px;
    }
    #theme-impression .im-search input {
      width: 100%;
      min-width: 0;
      background: transparent;
      border: 0;
      font-size: 17px;
      color: var(--im-ink);
    }
    #theme-impression .im-search button {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      gap: 20px;
      background: transparent;
      border: 0;
      font-size: 12px;
    }
    #theme-impression .im-archive-group {
      display: grid;
      grid-template-columns: 180px 1fr;
      gap: 30px;
      border-top: 1px solid var(--im-line);
      padding-block: 28px;
      scroll-margin-top: 30px;
    }
    #theme-impression .im-archive-group h2 {
      font-size: 26px;
    }
    #theme-impression .im-archive-group h2 small {
      display: block;
      margin-top: 12px;
      font: 11px var(--im-sans);
      color: var(--im-muted);
    }
    #theme-impression .im-archive-group a {
      display: flex;
      gap: 25px;
      align-items: baseline;
      padding-block: 13px;
      font: 17px/1.6 var(--im-serif);
    }
    #theme-impression .im-archive-group a > span:nth-child(2) {
      flex: 1;
    }
    #theme-impression .im-archive-group time {
      flex-shrink: 0;
      font: 11px var(--im-sans);
      color: var(--im-muted);
    }
    #theme-impression .im-taxonomy-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 25px;
    }
    #theme-impression .im-taxonomy-grid a {
      padding: 27px;
      border: 1px solid var(--im-line);
      transition: background 0.3s;
    }
    #theme-impression .im-taxonomy-grid a:hover {
      background: var(--im-wash);
    }
    #theme-impression .im-taxonomy-grid h2 {
      margin-block: 30px;
      font-size: 25px;
      overflow-wrap: anywhere;
    }
    #theme-impression .im-taxonomy-grid a > span {
      color: var(--im-muted);
      font-size: 11px;
    }
    #theme-impression .im-taxonomy-grid .im-arrow {
      float: right;
    }
    #theme-impression .im-empty {
      padding-block: 90px;
      text-align: center;
      color: var(--im-muted);
      font-size: 14px;
    }
    #theme-impression .im-empty h1 {
      font-size: 36px;
      margin-block: 20px 30px;
    }
    #theme-impression .im-empty-flower {
      width: 70px;
      height: 100px;
      margin: 0 auto 25px;
      color: var(--im-rust);
    }
    #theme-impression .im-article {
      max-width: 850px;
      padding-block: 60px;
    }
    #theme-impression .im-article-wide {
      max-width: 1240px;
    }
    #theme-impression .im-back {
      display: inline-block;
      font-size: 11px;
      color: var(--im-muted);
      margin-bottom: 45px;
    }
    #theme-impression .im-article-header {
      border-bottom: 1px solid var(--im-line);
      padding-bottom: 40px;
      margin-bottom: 32px;
    }
    #theme-impression .im-article-header h1 {
      font-size: 42px;
      line-height: 1.6;
      margin-top: 18px;
      overflow-wrap: anywhere;
    }
    #theme-impression .im-article-header > p {
      color: var(--im-muted);
      line-height: 2;
      font-size: 15px;
      margin-top: 22px;
    }
    #theme-impression .notion {
      --bg-color: var(--im-paper);
      --fg-color: var(--im-ink);
      color: var(--im-ink);
      font-family: var(--im-serif);
    }
    #theme-impression .notion-page {
      padding-inline: 0;
      width: 100%;
    }
    #theme-impression .notion-text {
      line-height: 2;
    }
    #theme-impression .notion-asset-wrapper-image img {
      filter: saturate(0.94) sepia(0.035);
      transition: filter 0.5s;
    }
    #theme-impression .notion-asset-wrapper-image:hover img {
      filter: none;
    }
    #theme-impression .notion-callout {
      border-radius: 14px;
      line-height: 2;
    }
    #theme-impression .notion-callout-text .notion-text {
      padding-block: 0;
      margin-block: 0;
      line-height: 2;
    }
    #theme-impression .im-adjacent {
      display: grid;
      grid-template-columns: 1fr 1fr;
      border-block: 1px solid var(--im-line);
      gap: 30px;
      padding-block: 30px;
      margin-block: 40px;
      font: 17px/1.7 var(--im-serif);
    }
    #theme-impression .im-adjacent > div:last-child {
      text-align: right;
    }
    #theme-impression .im-adjacent small {
      display: block;
      color: var(--im-muted);
      font: 10px var(--im-sans);
      margin-bottom: 14px;
    }
    #theme-impression .im-recommend > h2 {
      font-size: 28px;
      margin-top: 12px;
    }
    #theme-impression .im-recommend {
      margin-block: 55px;
    }
    #theme-impression .im-in-view {
      animation: im-arrive 0.7s both;
      animation-delay: var(--im-delay, 0ms);
    }
    @keyframes im-arrive {
      from {
        opacity: 0.35;
        transform: translateY(14px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    @media (min-width: 1000px) and (prefers-reduced-motion: no-preference) {
      #theme-impression .im-hero-copy {
        animation: im-arrive 0.9s both;
      }
    }
    @media (max-width: 1100px) {
      #theme-impression .im-shell {
        width: calc(100% - 64px);
      }
      #theme-impression .im-nav {
        gap: 17px;
        font-size: 12px;
      }
      #theme-impression .im-hero {
        min-height: 570px;
      }
      #theme-impression .im-post-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }
    @media (max-width: 800px) {
      #theme-impression .im-header {
        min-height: 88px;
      }
      #theme-impression .im-brand {
        font-size: 22px;
      }
      #theme-impression .im-menu-toggle {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        background: transparent;
        border: 0;
        font-size: 12px;
      }
      #theme-impression .im-nav {
        display: none;
        position: absolute;
        top: 87px;
        left: 0;
        right: 0;
        background: var(--im-paper);
        padding: 25px;
        border: 1px solid var(--im-line);
        box-shadow: 0 15px 25px #0000000a;
      }
      #theme-impression .im-nav-open {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        gap: 23px;
      }
      #theme-impression .im-submenu {
        position: static;
        margin-top: 15px;
        border: 0;
        padding-block: 8px;
        box-shadow: none;
      }
      #theme-impression .im-hero {
        padding-block: 70px;
      }
      #theme-impression .im-hero h1 {
        font-size: 48px;
      }
      #theme-impression .im-featured {
        gap: 25px;
      }
      #theme-impression .im-featured h3 {
        font-size: 25px;
      }
      #theme-impression .im-taxonomy-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
      #theme-impression .im-article {
        width: calc(100% - 64px);
      }
    }
    @media (max-width: 600px) {
      #theme-impression .im-shell,
      #theme-impression .im-article {
        width: calc(100% - 40px);
      }
      #theme-impression .im-hero {
        min-height: 540px;
        padding-block: 64px;
      }
      #theme-impression .im-hero h1 {
        font-size: clamp(34px, 9vw, 44px);
        margin-block: 22px 24px;
      }
      #theme-impression .im-hero-description {
        font-size: 13px;
      }
      #theme-impression .im-journal {
        padding-top: 40px;
      }
      #theme-impression .im-section-heading h2 {
        font-size: 28px;
      }
      #theme-impression .im-section-heading > a {
        font-size: 10px;
        gap: 10px;
      }
      #theme-impression .im-categories {
        gap: 18px;
        font-size: 11px;
      }
      #theme-impression .im-featured {
        grid-template-columns: 1fr;
        gap: 0;
        padding-top: 8px;
      }
      #theme-impression .im-featured h3 {
        font-size: 25px;
      }
      #theme-impression .im-featured .im-eyebrow {
        margin-block: 5px 20px;
      }
      #theme-impression .im-post-grid {
        grid-template-columns: 1fr;
        gap: 32px;
        padding-top: 20px;
      }
      #theme-impression .im-post h3 {
        font-size: 23px;
      }
      #theme-impression .im-footer-bottom {
        flex-wrap: wrap;
        gap: 18px;
      }
      #theme-impression .im-footer-bottom > span:last-child {
        width: 100%;
      }
      #theme-impression .im-search h1,
      #theme-impression .im-archive > h1,
      #theme-impression .im-taxonomy h1 {
        font-size: 31px;
      }
      #theme-impression .im-archive-group {
        grid-template-columns: 1fr;
        gap: 15px;
      }
      #theme-impression .im-archive-group h2 small {
        display: inline;
        margin-left: 18px;
      }
      #theme-impression .im-archive-group a {
        gap: 13px;
        font-size: 15px;
      }
      #theme-impression .im-archive-group time {
        font-size: 9px;
      }
      #theme-impression .im-taxonomy-grid {
        gap: 15px;
      }
      #theme-impression .im-taxonomy-grid a {
        padding: 20px;
      }
      #theme-impression .im-taxonomy-grid h2 {
        font-size: 20px;
      }
      #theme-impression .im-article {
        padding-top: 35px;
      }
      #theme-impression .im-article-header h1 {
        font-size: 29px;
      }
      #theme-impression .im-adjacent {
        font-size: 14px;
        gap: 18px;
      }
    }
    @media (prefers-reduced-motion: reduce) {
      #theme-impression *,
      #theme-impression *:before,
      #theme-impression *:after {
        animation: none !important;
        transition: none !important;
        scroll-behavior: auto !important;
      }
      #theme-impression .im-post:hover .im-cover-image,
      #theme-impression .im-brand:hover .im-brand-flower {
        transform: none;
      }
    }
  `}</style>
)
