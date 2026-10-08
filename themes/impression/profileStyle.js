export const ProfileStyle = () => (
  <style jsx global>{`
    #theme-impression .im-profile-custom {
      max-width: 1240px;
      padding-block: 52px 88px;
      font-size: 19px;
      line-height: 1.6;
      font-weight: 450;
    }
    #theme-impression .im-profile-header {
      padding-bottom: 42px;
      margin-bottom: 44px;
      border-bottom: 1px solid var(--im-line);
    }
    #theme-impression .im-profile-header .im-back {
      display: inline-block;
      margin-bottom: 28px;
      font-size: 16px;
    }
    #theme-impression .im-profile-header h1 {
      font-size: clamp(40px, 5.2vw, 72px);
      line-height: 1.12;
      letter-spacing: -0.035em;
      text-wrap: balance;
    }
    #theme-impression .im-profile-intro {
      display: grid;
      grid-template-columns: 280px minmax(0, 1fr);
      gap: 72px;
      align-items: center;
      margin-bottom: 64px;
    }
    #theme-impression .im-profile-portrait {
      position: relative;
      isolation: isolate;
    }
    #theme-impression .im-profile-portrait:before {
      content: '';
      position: absolute;
      inset: -24px -30px;
      background:
        radial-gradient(ellipse at 25% 35%, #c5ccae88, transparent 65%),
        radial-gradient(ellipse at 75% 70%, #d7b49b77, transparent 62%);
      filter: blur(18px);
      z-index: -1;
    }
    #theme-impression .im-profile-portrait img {
      width: 100%;
      height: auto;
      border-radius: 3px;
      filter: saturate(0.93);
    }
    #theme-impression .im-profile-bio h2 {
      font-size: 32px;
      line-height: 1.2;
      margin-bottom: 22px;
    }
    #theme-impression .im-profile-bio > .im-profile-text {
      margin-bottom: 18px;
      max-width: 760px;
    }
    #theme-impression
      .im-profile-bio
      > .im-profile-text:has(+ .im-profile-text-children) {
      margin-bottom: 0;
    }
    #theme-impression .im-profile-bio > .im-profile-text-children {
      margin: 0 0 18px 2.8em;
    }
    #theme-impression .im-profile-text-children {
      margin-left: 1.15em;
    }
    #theme-impression .im-profile-text {
      overflow-wrap: anywhere;
      margin: 0;
    }
    #theme-impression .im-profile-custom b,
    #theme-impression .im-profile-custom strong {
      font-weight: 600;
    }
    #theme-impression .im-profile-custom .notion-link {
      color: var(--im-green);
      opacity: 1;
      border-bottom: 1px solid color-mix(in srgb, currentColor 40%, transparent);
      transition:
        color 0.25s,
        border-color 0.25s;
    }
    #theme-impression .im-profile-custom .notion-link:hover {
      color: var(--im-rust);
      border-color: var(--im-rust);
    }
    #theme-impression .im-profile-custom .notion-blue {
      color: inherit;
    }
    #theme-impression .im-profile-custom .notion-gray {
      color: var(--im-muted);
    }
    #theme-impression .im-profile-nav {
      display: flex;
      flex-wrap: wrap;
      gap: 12px 26px;
      padding-block: 20px;
      margin-bottom: 60px;
      border-block: 1px solid var(--im-line);
      font-size: 16px;
      color: var(--im-muted);
    }
    #theme-impression .im-profile-nav a {
      transition: color 0.25s;
    }
    #theme-impression .im-profile-nav a:hover {
      color: var(--im-rust);
    }
    #theme-impression .im-profile-section {
      scroll-margin-top: 110px;
      margin-bottom: 72px;
    }
    #theme-impression .im-profile-section-header {
      display: flex;
      align-items: baseline;
      gap: 22px;
      margin-bottom: 28px;
    }
    #theme-impression .im-profile-section-number {
      color: var(--im-rust);
      font-size: 16px;
      flex: 0 0 26px;
      font-variant-numeric: tabular-nums;
    }
    #theme-impression .im-profile-section-header h2 {
      font-size: clamp(30px, 3.2vw, 42px);
      line-height: 1.15;
      letter-spacing: -0.025em;
    }
    #theme-impression .im-profile-entries-text,
    #theme-impression .im-profile-entries-content {
      padding-left: 48px;
      max-width: 940px;
      font-size: 20px;
    }
    #theme-impression .im-profile-fallback + .im-profile-fallback {
      margin-top: 16px;
    }
    #theme-impression .im-profile-entries-experience {
      display: grid;
      gap: 18px;
    }
    #theme-impression .im-career-card {
      display: grid;
      grid-template-columns: 130px minmax(0, 1fr) 176px;
      gap: 32px;
      align-items: center;
      min-height: 208px;
      padding: 30px 32px;
      border: 1px solid var(--im-line);
      border-radius: 4px;
      background: var(--im-card);
      transition:
        border-color 0.4s,
        box-shadow 0.4s;
    }
    #theme-impression .im-career-card:hover {
      border-color: var(--im-green);
      box-shadow: 0 8px 32px #25311e09;
    }
    #theme-impression .im-career-logos {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 12px;
      height: 142px;
      padding: 12px;
      background: #fff;
      border-radius: 2px;
    }
    #theme-impression .im-career-logos .im-profile-figure {
      width: 100%;
      height: 38px;
    }
    #theme-impression .im-career-logos .im-profile-figure:first-child {
      height: 76px;
    }
    #theme-impression .im-career-logos img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
    #theme-impression .im-career-title {
      font-size: 27px;
      font-weight: 450;
      line-height: 1.25;
      letter-spacing: -0.015em;
      margin-bottom: 16px;
      text-wrap: balance;
    }
    #theme-impression .im-career-title b,
    #theme-impression .im-paper-title b,
    #theme-impression .im-project-body h3 b {
      font-weight: inherit;
    }
    #theme-impression .im-career-details {
      font-size: 18px;
      line-height: 1.55;
      display: grid;
      gap: 6px;
    }
    #theme-impression .im-career-period {
      align-self: start;
      padding-top: 5px;
      color: var(--im-muted);
      text-align: right;
      font-size: 17px;
      font-variant-numeric: lining-nums;
    }
    #theme-impression .im-profile-entries-publications,
    #theme-impression .im-profile-entries-projects {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 28px;
    }
    #theme-impression .im-paper-card,
    #theme-impression .im-project-card {
      display: flex;
      flex-direction: column;
      min-width: 0;
      border: 1px solid var(--im-line);
      border-radius: 4px;
      background: var(--im-card);
      overflow: clip;
      transition:
        border-color 0.4s,
        box-shadow 0.5s;
    }
    #theme-impression .im-paper-card:hover,
    #theme-impression .im-project-card:hover {
      border-color: var(--im-green);
      box-shadow: 0 8px 32px #25311e09;
    }
    #theme-impression .im-paper-art,
    #theme-impression .im-project-art {
      height: 240px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      padding: 22px;
      background: #f0f0e6;
      border-bottom: 1px solid var(--im-line);
    }
    #theme-impression .im-project-art {
      height: 270px;
      padding: 20px;
    }
    .dark #theme-impression .im-paper-art,
    .dark #theme-impression .im-project-art {
      background: #384032;
    }
    #theme-impression .im-paper-art .im-profile-figure,
    #theme-impression .im-project-art .im-profile-figure {
      height: 100%;
      min-width: 0;
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    #theme-impression .im-profile-figure-link {
      display: flex;
      width: 100%;
      flex: 1;
      min-height: 0;
      align-items: center;
      justify-content: center;
      cursor: zoom-in;
    }
    #theme-impression
      .im-profile-figure-link
      img:not(.medium-zoom-image--opened) {
      width: 100%;
      height: 100%;
      object-fit: contain;
      filter: none;
    }
    #theme-impression .im-profile-figure figcaption {
      font-size: 14px;
      color: var(--im-muted);
      line-height: 1.4;
      padding-top: 6px;
    }
    #theme-impression .im-paper-body,
    #theme-impression .im-project-body {
      padding: 28px;
      flex: 1;
      display: flex;
      flex-direction: column;
    }
    #theme-impression .im-paper-title,
    #theme-impression .im-project-body h3 {
      font-size: 28px;
      font-weight: 450;
      line-height: 1.2;
      letter-spacing: -0.015em;
      margin-bottom: 18px;
      text-wrap: balance;
    }
    #theme-impression .im-paper-authors {
      font-size: 17px;
      line-height: 1.5;
      color: var(--im-muted);
      margin-bottom: 14px;
    }
    #theme-impression .im-paper-metadata {
      font-size: 17px;
      line-height: 1.55;
      margin-bottom: 24px;
    }
    #theme-impression .im-paper-abstract {
      margin-top: auto;
      padding-top: 18px;
      border-top: 1px solid var(--im-line);
      font-size: 17px;
    }
    #theme-impression .im-paper-abstract summary {
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      list-style: none;
      color: var(--im-green);
    }
    #theme-impression .im-paper-abstract summary::-webkit-details-marker {
      display: none;
    }
    #theme-impression .im-paper-abstract summary span {
      font-size: 24px;
      line-height: 1;
      transition: transform 0.3s;
    }
    #theme-impression .im-paper-abstract[open] summary span {
      transform: rotate(45deg);
    }
    #theme-impression .im-paper-abstract-text {
      padding-top: 20px;
      line-height: 1.65;
      animation: im-menu-enter 0.3s var(--im-ease) backwards;
    }
    #theme-impression
      .im-paper-abstract-text
      > .im-profile-text
      + .im-profile-text {
      margin-top: 14px;
    }
    #theme-impression .im-project-body > p {
      font-size: 18px;
      line-height: 1.6;
    }
    @media (max-width: 1000px) {
      #theme-impression .im-profile-intro {
        grid-template-columns: 240px minmax(0, 1fr);
        gap: 40px;
      }
      #theme-impression .im-career-card {
        grid-template-columns: 100px minmax(0, 1fr);
        gap: 20px 28px;
        padding: 26px;
      }
      #theme-impression .im-career-logos {
        grid-row: 1 / 3;
      }
      #theme-impression .im-career-period {
        grid-column: 2;
        grid-row: 2;
        text-align: left;
        padding: 0;
      }
      #theme-impression .im-profile-entries-publications,
      #theme-impression .im-profile-entries-projects {
        gap: 20px;
      }
      #theme-impression .im-paper-body,
      #theme-impression .im-project-body {
        padding: 24px;
      }
      #theme-impression .im-paper-art,
      #theme-impression .im-project-art {
        height: 210px;
        padding: 18px;
      }
      #theme-impression .im-paper-title,
      #theme-impression .im-project-body h3 {
        font-size: 25px;
      }
    }
    @media (max-width: 650px) {
      #theme-impression .im-profile-custom {
        padding-block: 32px 48px;
        font-size: 18px;
      }
      #theme-impression .im-profile-header {
        padding-bottom: 28px;
        margin-bottom: 36px;
      }
      #theme-impression .im-profile-header h1 {
        font-size: 44px;
      }
      #theme-impression .im-profile-intro {
        grid-template-columns: minmax(0, 1fr);
        gap: 34px;
        margin-bottom: 36px;
      }
      #theme-impression .im-profile-portrait {
        width: 200px;
        margin: auto;
      }
      #theme-impression .im-profile-bio h2 {
        font-size: 29px;
      }
      #theme-impression .im-profile-nav {
        gap: 10px 18px;
        margin-bottom: 40px;
        font-size: 16px;
      }
      #theme-impression .im-profile-section {
        margin-bottom: 48px;
      }
      #theme-impression .im-profile-section-header {
        gap: 12px;
        margin-bottom: 22px;
      }
      #theme-impression .im-profile-section-header h2 {
        font-size: 32px;
      }
      #theme-impression .im-profile-section-number {
        flex-basis: 22px;
      }
      #theme-impression .im-profile-entries-text,
      #theme-impression .im-profile-entries-content {
        padding-left: 0;
        font-size: 19px;
      }
      #theme-impression .im-career-card {
        grid-template-columns: 76px minmax(0, 1fr);
        gap: 16px;
        padding: 20px 16px;
        align-items: start;
      }
      #theme-impression .im-career-logos {
        height: 112px;
        padding: 8px;
        gap: 8px;
      }
      #theme-impression .im-career-logos .im-profile-figure:first-child {
        height: 62px;
      }
      #theme-impression .im-career-logos .im-profile-figure {
        height: 24px;
      }
      #theme-impression .im-career-title {
        font-size: 23px;
        line-height: 1.2;
      }
      #theme-impression .im-career-details,
      #theme-impression .im-career-period {
        font-size: 17px;
      }
      #theme-impression .im-profile-entries-publications,
      #theme-impression .im-profile-entries-projects {
        grid-template-columns: minmax(0, 1fr);
        gap: 24px;
      }
      #theme-impression .im-paper-art,
      #theme-impression .im-project-art {
        height: 220px;
      }
      #theme-impression .im-paper-body,
      #theme-impression .im-project-body {
        padding: 24px 22px;
      }
      #theme-impression .im-paper-title,
      #theme-impression .im-project-body h3 {
        font-size: 27px;
      }
    }
    @media (prefers-reduced-motion: reduce) {
      #theme-impression .im-profile-custom *,
      #theme-impression .im-profile-custom *:before,
      #theme-impression .im-profile-custom *:after {
        animation: none !important;
        transition: none !important;
      }
    }
  `}</style>
)
