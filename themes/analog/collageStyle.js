export const CollageStyle = () => (
  <style jsx global>{`
    #theme-analog .an-collage-background {
      --an-collage-shift: calc(var(--an-trace-shift, 0px) * 0.18);
      position: fixed;
      inset: 0;
      z-index: 0;
      overflow: clip;
      pointer-events: none;
      user-select: none;
    }
    #theme-analog #an-main,
    #theme-analog .an-footer {
      position: relative;
      z-index: 1;
    }
    #theme-analog .an-cutout {
      position: absolute;
      display: block;
      height: auto;
      max-width: none;
      filter: drop-shadow(5px 8px 2px #252b3240);
      transform: translate3d(0, var(--an-collage-shift, 0px), 0)
        rotate(var(--an-cutout-angle, 0deg));
    }
    #theme-analog .an-cutout-street {
      --an-cutout-angle: -14deg;
      width: clamp(520px, 43vw, 820px);
      left: -15vw;
      top: -28vh;
    }
    #theme-analog .an-cutout-audio {
      --an-cutout-angle: 16deg;
      width: clamp(500px, 42vw, 760px);
      right: -11vw;
      top: 6vh;
    }
    #theme-analog .an-cutout-robot {
      --an-cutout-angle: -19deg;
      width: clamp(440px, 37vw, 680px);
      left: 25vw;
      bottom: -20vh;
    }
    #theme-analog .an-journal::before {
      display: none;
    }
    .dark #theme-analog .an-cutout {
      filter: brightness(0.82) drop-shadow(5px 8px 2px #10182080);
    }
    @media (max-width: 650px) {
      #theme-analog .an-cutout-street {
        width: 370px;
        left: -190px;
        top: -100px;
      }
      #theme-analog .an-cutout-audio {
        width: 350px;
        right: -185px;
        top: 25vh;
      }
      #theme-analog .an-cutout-robot {
        width: 340px;
        left: -20px;
        bottom: -150px;
      }
    }
    @media (prefers-reduced-motion: reduce) {
      #theme-analog .an-cutout {
        --an-collage-shift: 0px;
      }
    }
  `}</style>
)
