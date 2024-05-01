import {defaultLinkToProjectAnimation} from '../globalAnimations.js';

export function projectAnimations() {
  document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(ScrollTrigger)
    
    // textAppearImageHover();
    fixedTitleOnScroll();
    playPauseVideo();
    prevNextHover();
    defaultLinkToProjectAnimation(".previous a, .next a");
  });
}

// CUSTOM CURSOR IMAGE HOVER
function textAppearImageHover() {
  const images = document.querySelectorAll(".js-appear-center-in-view");

  images.forEach((item) => {
    const onMouseEnter = () => {
      const tl = gsap.timeline();

      tl
      .to(".cursor-hover p", {
        duration: 0.25,

        autoAlpha: 1,
      })
      .to(item, {
        duration: 0,

        cursor: "pointer"
      }, "<")
    };

    const onMouseLeave = () => {
      const tl = gsap.timeline();

      tl
      .to(".cursor-hover p", {
        duration: 0.25,

        autoAlpha: 0,
      })
      .to(item, {
        duration: 0,

        cursor: "auto"
      }, "<")
    };

    item.addEventListener("mouseenter", onMouseEnter);
    item.addEventListener("mouseleave", onMouseLeave);
  });
}


export let fixedTitle = false;

//Fixed text
function fixedTitleOnScroll() {
  let fixedTitleOnScrollResponsive = gsap.matchMedia();

  fixedTitleOnScrollResponsive.add(
    {
      isMobile: "(max-width: 1024px)",
      isDesktop: "(min-width: 1025px)",
    }, 
    (context) => {
    let { isMobile, isDesktop } = context.conditions;

    const title = document.querySelector(".project-title");
    const designType = document.querySelector(".project-design-type");
    const year = document.querySelector(".project-year");
    const designTypeYear = document.querySelector(".project-design-type-year-mobile");

    const bottomSection = document.querySelector(".project-bottom-section");
    const paddingBottomSection = parseFloat(window.getComputedStyle(bottomSection).paddingBottom);


    function createFixedTrigger(element) {
      ScrollTrigger.create({
        trigger: title,
        start: isMobile ? 0 : "top 1px",
        end: isMobile 
          ? () => `+=${(document.querySelector(".project").offsetHeight - 103) - title.offsetHeight - (designTypeYear.offsetHeight * 2) + 10 - paddingBottomSection}px` 
          : () => `+=${(document.querySelector(".project").offsetHeight - 103) - title.offsetHeight - designType.offsetHeight - year.offsetHeight + 35 - paddingBottomSection}px`,
        pin: element,
        onEnter: () => { fixedTitle = true},
        onLeaveBack: () => { fixedTitle = false }
      });

      if (window.innerWidth <= 1024) {
        gsap.to([title, ".project-design-type-year-mobile p"], {
          scrollTrigger: {
            trigger: bottomSection,
            scrub: 2,
            start: 1,
            end: 50
          },

          opacity: 0.75
        })
      }
    }

      createFixedTrigger(title);
      createFixedTrigger(designType);
      createFixedTrigger(year);
      createFixedTrigger(designTypeYear);
  });
}

function playPauseVideo() {
  const videoContainers = document.querySelectorAll('.video-container');

  videoContainers.forEach((videoContainer) => {
    videoContainer.innerHTML += `
      <div class="video-controls">
        <div class="play"></div>
      </div>
    `;
  });

  const videos = document.querySelectorAll("video");

  videos.forEach((video) => {
    let isPaused = false;
    const canPause = video.dataset.canPause;

    if(canPause) {
      video.addEventListener('click', () => {
        video.paused ? video.play() : video.pause();
        const controls = video.parentNode.querySelector('.video-controls');

        if (!isPaused) {
          isPaused = true;

          gsap.to(controls, {
            duration: 0.35,
  
            opacity: 1
          })
        } else {
          isPaused = false;

          gsap.to(controls, {
            duration: 0.35,
  
            opacity: 0
          })
        }
      })
    }
  });
}

function prevNextHover() {
  const items = document.querySelectorAll(".previous a, .next a");

  items.forEach((item) => {
    item.addEventListener('mouseover', () => {
      gsap.to(item, {
        duration: 0.5,

        autoAlpha: 0.5
      })
    })
    item.addEventListener('mouseleave', () => {
      gsap.to(item, {
        duration: 0.5,

        autoAlpha: 1
      })
    })
  });
}