export const CollageStyle = () => (
  <style jsx global>{`
    #theme-analog .an-collage {
      --an-collage-shift: calc(var(--an-trace-shift, 0px) * 0.18);
      position: absolute;
      pointer-events: none;
      user-select: none;
      z-index: -1;
    }
    #theme-analog .an-cutout {
      position: absolute;
      display: block;
      height: auto;
      max-width: none;
      filter: drop-shadow(2px 4px 1px #252b3229);
      transform: translate3d(0, var(--an-collage-shift, 0px), 0)
        rotate(var(--an-cutout-angle, 0deg));
    }
    #theme-analog .an-collage-margins {
      display: none;
    }
    #theme-analog:has(.an-profile-custom) .an-collage-margins .an-cutout-robot {
      display: none;
    }
    #theme-analog .an-collage-journal {
      top: -32px;
      right: 145px;
      width: 260px;
      height: 205px;
    }
    #theme-analog .an-collage-journal .an-cutout-street {
      --an-cutout-angle: 9deg;
      top: 0;
      right: 0;
      width: 86px;
      opacity: 0.78;
    }
    #theme-analog .an-collage-journal .an-cutout-audio {
      --an-cutout-angle: -13deg;
      top: 46px;
      left: 0;
      width: 185px;
    }
    #theme-analog .an-journal:has(> .an-collage) .an-section-heading > div {
      max-width: calc(100% - 400px);
    }
    #theme-analog .an-profile-section-header {
      position: relative;
      isolation: isolate;
    }
    #theme-analog .an-collage-research {
      top: -55px;
      right: 2%;
      width: 210px;
      height: 150px;
    }
    #theme-analog .an-collage-research .an-cutout {
      --an-cutout-angle: 7deg;
      width: 185px;
      right: 0;
      top: 0;
    }
    #theme-analog .an-footer {
      position: relative;
      isolation: isolate;
      padding-top: 130px;
    }
    #theme-analog .an-collage-footer {
      top: -38px;
      right: 5%;
      width: 170px;
      height: 160px;
    }
    #theme-analog .an-collage-footer .an-cutout {
      --an-cutout-angle: 12deg;
      width: 170px;
    }
    .dark #theme-analog .an-cutout {
      filter: brightness(0.86) drop-shadow(2px 4px 1px #10182066);
    }
    @media (min-width: 1700px) {
      #theme-analog .an-collage-margins {
        display: block;
        position: fixed;
        inset: 100px 0 0;
        opacity: 0.64;
      }
      #theme-analog .an-collage-margins .an-cutout {
        width: clamp(180px, calc((100vw - 1280px) / 2 - 60px), 260px);
      }
      #theme-analog .an-collage-margins .an-cutout-street {
        --an-cutout-angle: -10deg;
        top: 8%;
        left: -20px;
      }
      #theme-analog .an-collage-margins .an-cutout-robot {
        --an-cutout-angle: 17deg;
        right: -15px;
        bottom: 8%;
      }
    }
    @media (max-width: 1000px) {
      #theme-analog .an-collage-journal {
        top: -28px;
        right: -10px;
        width: 145px;
        height: 110px;
      }
      #theme-analog .an-collage-journal .an-cutout-street {
        display: none;
      }
      #theme-analog .an-collage-journal .an-cutout-audio {
        top: 0;
        width: 125px;
      }
      #theme-analog .an-journal:has(> .an-collage) .an-section-heading > div {
        max-width: none;
      }
      #theme-analog .an-collage-research {
        top: -72px;
        right: -12px;
        width: 145px;
        height: 100px;
      }
      #theme-analog .an-collage-research .an-cutout {
        width: 130px;
      }
    }
    @media (max-width: 650px) {
      #theme-analog .an-collage-journal {
        top: -35px;
        right: -16px;
        width: 106px;
        height: 90px;
      }
      #theme-analog .an-collage-journal .an-cutout-audio {
        width: 96px;
      }
      #theme-analog .an-profile-custom .an-profile-nav {
        margin-bottom: 120px;
      }
      #theme-analog .an-collage-research {
        top: -104px;
        right: -4px;
        width: 115px;
        height: 80px;
      }
      #theme-analog .an-collage-research .an-cutout {
        width: 105px;
      }
      #theme-analog .an-footer {
        padding-top: 105px;
      }
      #theme-analog .an-collage-footer {
        top: -25px;
        right: 3%;
        width: 120px;
        height: 115px;
      }
      #theme-analog .an-collage-footer .an-cutout {
        width: 120px;
      }
    }
    @media (prefers-reduced-motion: reduce) {
      #theme-analog .an-cutout {
        --an-collage-shift: 0px;
      }
    }
  `}</style>
)
