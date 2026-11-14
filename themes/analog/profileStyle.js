export const ProfileStyle = () => (
  <style jsx global>{`
    #theme-analog .an-profile-custom {
      padding-block: 52px 90px;
      font: 400 16px/1.75 var(--an-sans);
    }
    #theme-analog .an-profile-header {
      border-bottom: 1px solid var(--an-ink);
      padding-bottom: 32px;
      margin-bottom: 48px;
    }
    #theme-analog .an-profile-header .an-eyebrow {
      margin-bottom: 18px;
    }
    #theme-analog .an-profile-header .an-back {
      float: right;
      margin: 0 0 20px 25px;
    }
    #theme-analog .an-profile-header h1 {
      font: 700 clamp(45px, 6.4vw, 88px)/1 var(--an-display);
      letter-spacing: -0.015em;
      text-transform: uppercase;
      clear: both;
    }
    #theme-analog .an-profile-intro {
      display: grid;
      grid-template-columns: 280px minmax(0, 1fr);
      gap: 72px;
      align-items: start;
      margin-bottom: 55px;
    }
    #theme-analog .an-profile-portrait {
      position: relative;
      padding: 10px;
      border: 1px solid var(--an-line);
      background: var(--an-card);
      transform: rotate(-1.5deg);
    }
    #theme-analog .an-profile-portrait::after {
      content: '';
      position: absolute;
      width: 80px;
      height: 22px;
      top: -10px;
      left: calc(50% - 40px);
      background: #8b9aa766;
      transform: rotate(-5deg);
      pointer-events: none;
    }
    #theme-analog .an-profile-portrait img {
      display: block;
      width: 100%;
      height: auto;
      filter: saturate(0.75);
    }
    #theme-analog .an-profile-bio h2 {
      font-size: 31px;
      line-height: 1.25;
      margin-bottom: 22px;
      letter-spacing: -0.025em;
    }
    #theme-analog .an-profile-bio > .an-profile-text {
      margin-bottom: 18px;
    }
    #theme-analog
      .an-profile-bio
      > .an-profile-text:has(+ .an-profile-text-children) {
      margin-bottom: 0;
    }
    #theme-analog .an-profile-bio > .an-profile-text-children {
      margin: 0 0 18px 1.5em;
    }
    #theme-analog .an-profile-text-children {
      margin-left: 1.2em;
    }
    #theme-analog .an-profile-text {
      margin: 0;
      overflow-wrap: anywhere;
    }
    #theme-analog .an-profile-custom :is(b, strong) {
      font-weight: 600;
    }
    #theme-analog .an-profile-custom .notion-gray {
      color: var(--an-muted);
    }
    #theme-analog .an-profile-custom .notion-blue {
      color: inherit;
    }
    #theme-analog .an-profile-nav {
      display: flex;
      flex-wrap: wrap;
      gap: 14px 28px;
      padding-block: 18px;
      border-block: 1px solid var(--an-line);
      color: var(--an-muted);
      font: 11px/1.7 var(--an-mono);
      margin-bottom: 64px;
    }
    #theme-analog .an-profile-nav a {
      transition: color 0.2s;
    }
    #theme-analog .an-profile-nav a:hover {
      color: var(--an-accent);
    }
    #theme-analog .an-profile-section {
      margin-bottom: 80px;
      scroll-margin-top: 112px;
    }
    #theme-analog .an-profile-section-header {
      display: flex;
      align-items: baseline;
      gap: 24px;
      margin-bottom: 32px;
    }
    #theme-analog .an-profile-section-number {
      color: var(--an-accent);
      font: 12px var(--an-mono);
      flex: 0 0 26px;
    }
    #theme-analog .an-profile-section-header h2 {
      font: 700 clamp(35px, 4vw, 52px)/1.05 var(--an-display);
      text-transform: uppercase;
      letter-spacing: 0.005em;
    }
    #theme-analog .an-profile-entries-text,
    #theme-analog .an-profile-entries-content {
      padding-left: 50px;
      font-size: 18px;
      line-height: 1.85;
    }
    #theme-analog .an-profile-fallback + .an-profile-fallback {
      margin-top: 16px;
    }
    #theme-analog .an-profile-entries-experience {
      border-top: 1px solid var(--an-line);
    }
    #theme-analog .an-career-card {
      display: grid;
      grid-template-columns: 100px minmax(0, 1fr) 160px;
      align-items: start;
      gap: 36px;
      padding: 34px 0;
      border-bottom: 1px solid var(--an-line);
      background: transparent;
    }
    #theme-analog .an-career-logos {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 12px;
      min-height: 112px;
      padding: 6px;
    }
    #theme-analog .an-career-logos .an-profile-figure {
      width: 100%;
      height: 36px;
    }
    #theme-analog .an-career-logos .an-profile-figure:first-child {
      height: 70px;
    }
    #theme-analog .an-career-logos img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
    #theme-analog .an-career-title {
      font-size: 24px;
      line-height: 1.35;
      font-weight: 600;
      letter-spacing: -0.025em;
      margin-bottom: 14px;
    }
    #theme-analog .an-career-title b,
    #theme-analog .an-paper-title b {
      font-weight: inherit;
    }
    #theme-analog .an-career-details {
      display: grid;
      gap: 5px;
      color: var(--an-muted);
      font-size: 15px;
      line-height: 1.7;
    }
    #theme-analog .an-career-period {
      padding-top: 4px;
      text-align: right;
      font: 11px/1.7 var(--an-mono);
      color: var(--an-muted);
    }
    #theme-analog .an-profile-entries-publications {
      display: grid;
      grid-template-columns: minmax(0, 1.08fr) minmax(0, 0.92fr);
      gap: 64px 54px;
      align-items: start;
    }
    #theme-analog .an-paper-card {
      min-width: 0;
      align-self: start;
    }
    #theme-analog .an-paper-art {
      padding: 18px;
    }
    #theme-analog .an-paper-art {
      min-height: 200px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    #theme-analog .an-paper-art:empty {
      display: none;
    }
    #theme-analog .an-paper-art .an-profile-figure + .an-profile-figure {
      margin-top: 16px;
    }
    #theme-analog .an-paper-art img {
      display: block;
      width: 100%;
      height: 230px;
      object-fit: contain;
    }
    #theme-analog .an-profile-figure-link {
      display: block;
      cursor: zoom-in;
    }
    #theme-analog .an-profile-figure img {
      max-width: 100%;
    }
    #theme-analog .an-profile-figure figcaption {
      color: var(--an-muted);
      font: 12px/1.6 var(--an-sans);
      text-align: left;
      margin-top: 10px;
    }
    #theme-analog .an-paper-body {
      padding-top: 22px;
    }
    #theme-analog .an-paper-label {
      color: var(--an-accent);
      margin-bottom: 14px;
    }
    #theme-analog .an-paper-title {
      font-size: 25px;
      line-height: 1.27;
      letter-spacing: -0.025em;
      margin-bottom: 16px;
      font-weight: 600;
    }
    #theme-analog .an-paper-authors {
      font-size: 14px;
      line-height: 1.8;
      margin-bottom: 10px;
    }
    #theme-analog .an-paper-authors > .an-profile-text + .an-profile-text,
    #theme-analog .an-paper-metadata > .an-profile-text + .an-profile-text {
      margin-top: 6px;
    }
    #theme-analog .an-paper-metadata {
      color: var(--an-muted);
      font-size: 13px;
      line-height: 1.8;
    }
    #theme-analog .an-paper-abstract {
      margin-top: 20px;
      border-top: 1px solid var(--an-line);
      border-bottom: 1px solid var(--an-line);
    }
    #theme-analog .an-paper-abstract > summary {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 20px;
      cursor: pointer;
      padding-block: 12px;
      font: 11px/1.6 var(--an-mono);
    }
    #theme-analog .an-paper-abstract > summary:hover {
      color: var(--an-accent);
    }
    #theme-analog .an-paper-abstract > summary span {
      font-size: 18px;
      transition: transform 0.25s;
    }
    #theme-analog .an-paper-abstract[open] > summary span {
      transform: rotate(45deg);
    }
    #theme-analog .an-paper-abstract-text {
      padding-block: 5px 20px;
      font-size: 14px;
      line-height: 1.85;
      color: var(--an-muted);
    }
    #theme-analog
      .an-paper-abstract-text
      > .an-profile-text
      + .an-profile-text {
      margin-top: 14px;
    }
    #theme-analog .an-profile-comments {
      margin-bottom: 60px;
    }
    @media (min-width: 651px) {
      #theme-analog .an-profile-entries-publications.an-paper-masonry {
        grid-auto-flow: row dense;
        grid-auto-rows: 4px;
        row-gap: 0;
      }
      #theme-analog .an-profile-entries-publications.an-paper-masonry > * {
        grid-column: var(--an-paper-column, auto);
        grid-row-end: span var(--an-paper-span, 1);
      }
      #theme-analog .an-paper-card:nth-child(even) {
        padding-top: 36px;
      }
    }
    @media (max-width: 1000px) {
      #theme-analog .an-profile-intro {
        grid-template-columns: 230px minmax(0, 1fr);
        gap: 40px;
      }
      #theme-analog .an-profile-bio {
        font-size: 15px;
      }
      #theme-analog .an-career-card {
        grid-template-columns: 84px minmax(0, 1fr);
        gap: 12px 26px;
      }
      #theme-analog .an-career-logos {
        grid-column: 1;
        grid-row: 1 / span 2;
      }
      #theme-analog .an-career-content {
        grid-column: 2;
        grid-row: 2;
      }
      #theme-analog .an-career-period {
        grid-column: 2;
        grid-row: 1;
        text-align: left;
        padding: 0;
      }
      #theme-analog .an-career-title {
        font-size: 22px;
      }
      #theme-analog .an-profile-entries-publications {
        column-gap: 32px;
      }
      #theme-analog .an-paper-art img {
        height: 190px;
      }
      #theme-analog .an-paper-title {
        font-size: 23px;
      }
    }
    @media (max-width: 650px) {
      #theme-analog .an-profile-custom {
        padding-block: 34px 55px;
        font-size: 15px;
      }
      #theme-analog .an-profile-header {
        padding-bottom: 28px;
        margin-bottom: 36px;
      }
      #theme-analog .an-profile-header .an-back {
        float: none;
        display: inline-block;
        margin: 0 0 22px;
      }
      #theme-analog .an-profile-header h1 {
        font-size: clamp(39px, 10vw, 60px);
      }
      #theme-analog .an-profile-header .an-eyebrow {
        font-size: 9px;
      }
      #theme-analog .an-profile-intro {
        display: flex;
        flex-direction: column;
        gap: 32px;
        margin-bottom: 36px;
      }
      #theme-analog .an-profile-portrait {
        width: 215px;
        margin-inline: 4px;
      }
      #theme-analog .an-profile-bio h2 {
        font-size: 28px;
      }
      #theme-analog .an-profile-nav {
        gap: 12px 20px;
        margin-bottom: 44px;
        font-size: 10px;
      }
      #theme-analog .an-profile-section {
        margin-bottom: 52px;
        scroll-margin-top: 98px;
      }
      #theme-analog .an-profile-section-header {
        gap: 12px;
        margin-bottom: 24px;
      }
      #theme-analog .an-profile-section-number {
        flex-basis: 20px;
        font-size: 10px;
      }
      #theme-analog .an-profile-section-header h2 {
        font-size: 36px;
      }
      #theme-analog .an-profile-entries-text,
      #theme-analog .an-profile-entries-content {
        padding-left: 0;
        font-size: 16px;
      }
      #theme-analog .an-career-card {
        padding-block: 24px;
        grid-template-columns: 64px minmax(0, 1fr);
        gap: 10px 18px;
      }
      #theme-analog .an-career-logos {
        min-height: 90px;
        padding: 0;
      }
      #theme-analog .an-career-logos .an-profile-figure:first-child {
        height: 56px;
      }
      #theme-analog .an-career-logos .an-profile-figure {
        height: 28px;
      }
      #theme-analog .an-career-title {
        font-size: 20px;
      }
      #theme-analog .an-career-details {
        font-size: 13px;
      }
      #theme-analog .an-career-period {
        font-size: 10px;
      }
      #theme-analog .an-profile-entries-publications {
        display: grid;
        grid-template-columns: minmax(0, 1fr);
        gap: 40px;
      }
      #theme-analog .an-paper-art {
        min-height: 160px;
        padding: 15px;
      }
      #theme-analog .an-paper-art img {
        height: 200px;
      }
      #theme-analog .an-paper-title {
        font-size: 23px;
      }
      #theme-analog .an-paper-body {
        padding-top: 18px;
      }
      #theme-analog .an-paper-authors,
      #theme-analog .an-paper-abstract-text {
        font-size: 13px;
      }
    }
    @media (prefers-reduced-motion: reduce) {
      #theme-analog .an-paper-abstract > summary span {
        transition: none;
      }
    }
    #theme-analog .an-profile-section-projects > .an-profile-section-header h2 {
      font-size: clamp(55px, 8vw, 108px);
      letter-spacing: -0.02em;
    }
    #theme-analog .an-profile-entries-projects {
      display: grid;
      gap: 90px;
    }
    #theme-analog .an-project-card {
      position: relative;
      display: grid;
      grid-template-columns: repeat(12, minmax(0, 1fr));
      gap: 25px 24px;
      align-items: start;
      border-top: 2px solid var(--an-ink);
      padding-top: 29px;
    }
    #theme-analog .an-project-heading {
      grid-column: 1 / 12;
      min-width: 0;
    }
    #theme-analog .an-project-heading > .an-label {
      color: var(--an-link);
      margin-bottom: 18px;
    }
    #theme-analog .an-project-heading h3 {
      font: 700 clamp(35px, 4.5vw, 62px)/1.04 var(--an-display);
      letter-spacing: -0.01em;
      text-transform: uppercase;
      overflow-wrap: anywhere;
      mask: url('/images/analog/ink-loss.svg') 5px 0 / 170px 110px repeat;
      mask-mode: luminance;
    }
    #theme-analog .an-project-art {
      grid-column: 1 / 13;
      grid-row: 2;
      min-width: 0;
      padding: 20px;
    }
    #theme-analog .an-profile-custom .notion-asset-wrapper-image,
    #theme-analog .an-paper-art,
    #theme-analog .an-project-art {
      position: relative;
      border: 1px solid var(--an-line);
      background: var(--an-card);
      box-shadow: 4px 5px 0 var(--an-line);
    }
    #theme-analog .an-profile-custom .notion-asset-wrapper-image::before,
    #theme-analog .an-paper-art::before,
    #theme-analog .an-project-art::before,
    #theme-analog .an-project-art::after {
      content: '';
      position: absolute;
      width: 46px;
      height: 13px;
      background: #7c919f66;
      pointer-events: none;
      z-index: 1;
      transform: rotate(-28deg);
    }
    #theme-analog .an-profile-custom .notion-asset-wrapper-image::before,
    #theme-analog .an-paper-art::before,
    #theme-analog .an-project-art::before {
      top: 1px;
      left: -8px;
    }
    #theme-analog .an-project-art::after {
      bottom: 1px;
      right: -8px;
    }
    #theme-analog .an-paper-art .an-profile-figure-link,
    #theme-analog .an-project-art .an-profile-figure-link {
      padding: clamp(8px, 1.2vw, 16px);
      border: 1px solid rgba(37, 45, 53, 0.18);
      background: #fff;
    }
    #theme-analog .an-profile-custom .notion-asset-wrapper-image {
      padding: clamp(10px, 1.5vw, 18px);
    }
    #theme-analog .an-profile-custom .notion-asset-wrapper-image > div {
      background: #fff;
    }
    #theme-analog .an-project-art img {
      display: block;
      width: 100%;
      height: 410px;
      object-fit: contain;
    }
    #theme-analog .an-project-art .an-profile-figure + .an-profile-figure {
      margin-top: 18px;
    }
    #theme-analog .an-project-body {
      grid-column: 5 / 13;
      grid-row: 3;
      min-width: 0;
      font-size: 16px;
      line-height: 1.85;
    }
    #theme-analog .an-project-body > .an-profile-text + .an-profile-text {
      margin-top: 15px;
    }
    #theme-analog .an-project-margin-note {
      grid-column: 1 / 5;
      grid-row: 3;
      font-size: 27px;
      transform: rotate(-4deg);
      margin: 18px 0 0 10px;
    }
    #theme-analog .an-project-layout-1 .an-project-heading {
      grid-column: 7 / 13;
      grid-row: 1;
    }
    #theme-analog .an-project-layout-1 .an-project-heading h3 {
      font-size: 45px;
    }
    #theme-analog .an-project-layout-1 .an-project-art {
      grid-column: 1 / 7;
      grid-row: 1 / 3;
      margin-top: 38px;
      transform: rotate(-0.7deg);
    }
    #theme-analog .an-project-layout-1 .an-project-art img {
      height: 340px;
    }
    #theme-analog .an-project-layout-1 .an-project-body {
      grid-column: 7 / 13;
      grid-row: 2;
    }
    #theme-analog .an-project-layout-1 .an-project-margin-note {
      grid-column: 1 / 7;
      grid-row: 3;
      justify-self: end;
    }
    #theme-analog .an-project-layout-2 .an-project-heading {
      grid-column: 2 / 13;
    }
    #theme-analog .an-project-layout-2 .an-project-art {
      grid-column: 5 / 13;
      grid-row: 2 / 4;
      margin-top: 26px;
    }
    #theme-analog .an-project-layout-2 .an-project-art img {
      height: 355px;
    }
    #theme-analog .an-project-layout-2 .an-project-body {
      position: relative;
      isolation: isolate;
      grid-column: 1 / 6;
      grid-row: 2;
      padding: 25px;
    }
    #theme-analog .an-project-layout-2 .an-project-body::before {
      content: '';
      position: absolute;
      inset: 0;
      z-index: -1;
      background: var(--an-card) url('/images/analog/scan-surface.webp') 22%
        80% / 620px;
      background-blend-mode: soft-light;
      clip-path: polygon(0 0, 99% 2%, 100% 97%, 1% 100%);
    }
    #theme-analog .an-project-layout-2 .an-project-margin-note {
      grid-column: 1 / 5;
      grid-row: 3;
    }
    @media (max-width: 1000px) and (min-width: 651px) {
      #theme-analog .an-project-card {
        gap: 24px 18px;
      }
      #theme-analog .an-project-heading h3 {
        font-size: 46px;
      }
      #theme-analog .an-project-layout-1 .an-project-heading h3 {
        font-size: 34px;
      }
      #theme-analog .an-project-art img {
        height: 330px;
      }
      #theme-analog .an-project-layout-1 .an-project-art img,
      #theme-analog .an-project-layout-2 .an-project-art img {
        height: 270px;
      }
      #theme-analog .an-project-body {
        font-size: 15px;
      }
      #theme-analog .an-project-layout-2 .an-project-body {
        padding: 18px;
      }
    }
    @media (max-width: 650px) {
      #theme-analog .an-profile-entries-projects {
        gap: 52px;
      }
      #theme-analog .an-project-card {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        gap: 24px;
        padding-top: 24px;
      }
      #theme-analog .an-project-heading h3,
      #theme-analog .an-project-layout-1 .an-project-heading h3 {
        font-size: clamp(32px, 9.8vw, 43px);
        line-height: 1.08;
      }
      #theme-analog .an-project-card .an-project-art {
        margin: 0;
        padding: 13px;
        transform: none;
      }
      #theme-analog .an-project-card .an-project-art img {
        height: 245px;
      }
      #theme-analog .an-project-card .an-project-body {
        padding: 0;
        font-size: 15px;
      }
      #theme-analog .an-project-layout-2 .an-project-body::before {
        display: none;
      }
      #theme-analog .an-project-card .an-project-margin-note {
        align-self: flex-end;
        margin: 0;
        font-size: 22px;
      }
    }
  `}</style>
)
