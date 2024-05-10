import { projects } from "../data/projects.js";
import { linkToProjectAnimation } from "../globalAnimations.js";
import { fixedTitle } from "../project/projectAnimations.js";

export function menuAnimations() {
  document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(ScrollTrigger)

    menuRevealOnHover();
    menuItemHover();
    menuIndexReveal();
    menuIndexItemHover();
    menuAbout();
    hideMenuIndexInMobile();
    indexLinkToProjectAnimation();
  });
}

let indexIsOpen = false;

// DISPLAY MENU ON HOVER
function menuRevealOnHover() {
  let menuRevealTriggerResponsive = gsap.matchMedia();
  
  menuRevealTriggerResponsive.add("(min-width: 1025px)", () => {
    const onMouseEnter = () => {
      if(fixedTitle === true) {
        gsap.to([".project-title", ".project-design-type", ".project-year", ".project-design-type-year-mobile"], {
          duration: 1,
          ease: "power3.inOut",

          translateY: () => `${document.querySelector(".nav").offsetHeight}px`
        })
      }

      gsap.to([".header",".nav h2"], {
        duration: 1,
        ease: "power3.inOut",

        translateY: "0%"
      })
      gsap.to(".logo", {
        duration: 1,
        ease: "power3.inOut",

        translateY: () => `${document.querySelector(".menu").offsetHeight}px`
      },"<")
    };

    const onMouseLeave = () => {      
      if(indexIsOpen === true) {
        gsap.to([".index-item", ".home-item"], {
          duration: 0.25,
    
          autoAlpha: 1,
        });
        gsap.to([".project-title", ".project-design-type", ".project-year", ".project-design-type-year-mobile"], {
          duration: 1, 
          delay: 0.25,
          ease: "power3.inOut",

          translateY: "0",
          autoAlpha: 1
        });
        setTimeout(() => { menuHideAnimation() }, 250);
        setTimeout(() => { indexIsOpen = false }, 1000);
      } else {
        if(fixedTitle === true) {
          gsap.to([".project-title", ".project-design-type", ".project-year", ".project-design-type-year-mobile"], {
            duration: 1, 
            delay: 0.25,
            ease: "power3.inOut",

            translateY: "0"
          })
        }
        menuHideAnimation();
      }
    };

    const menuRevealTrigger = document.querySelector(".menu");
    menuRevealTrigger.addEventListener("mouseenter", onMouseEnter);
    menuRevealTrigger.addEventListener("mouseleave", onMouseLeave);
  });
}

// MENU ITEMS HOVER
function menuItemHover() {
  const items = document.querySelectorAll(".nav-item h2");

  items.forEach((item) => {
    itemHoverOpacityAnimation(items, item);
  });
}

// DISPLAY INDEX ON CLICK
function menuIndexReveal() {
  let menuIndexItemResponsive = gsap.matchMedia();

  menuIndexItemResponsive.add(
    {
      isMobile: "(max-width: 1024px)",
      isDesktop: "(min-width: 1025px)",
    },
    (context) => {
      let { isMobile, isDesktop } = context.conditions;

      const onClick = () => {
        indexIsOpen = true;

        const tl = gsap.timeline();

        tl
        .to([".index-item", ".home-item"], {
          duration: 0,

          pointerEvents: "none"
        })
        .to([".project-title", ".project-design-type", ".project-year", ".project-design-type-year-mobile"], {
          duration: 1,

          autoAlpha: 0
        },"<")
        .to(".index", {
          duration: 1,
          ease: "power3.inOut",

          transform: "translateY(0%)"
        },"<")
        .to(".menu-reveal", {
          duration: 1,
          ease: "power3.inOut",

          height: "100vh",
          pointerEvents: "all",
          translateY: () =>
            `${document.querySelector(".index").offsetHeight}px`
        },"<")
        .to(".logo-left-section h1, .logo-right-section h1", {
          duration: 1,
          ease: "power3.inOut",

          translateY: () =>
            `${document.querySelector(".index").offsetHeight}px`
        },"<")
        .to(".nav-divider .line", {
          duration: 0.5,
          ease: "power3.inOut",

          scaleX: 1
        },"-=0.15")
        .to([".index-item", ".home-item"], {
          duration: 0.35,

          autoAlpha: 1,
          stagger: { amount: 0.06 }
        },"<")
        .to(".menu-reveal", {
          duration: 0,

          height: isMobile ? "100vh" : "50px",
          translateY: isMobile
            ? () => `${document.querySelector(".index").offsetHeight}px`
            : "0%",
          pointerEvents: isMobile ? "all" : "none"
        })
        .to([".index-item", ".home-item"], {
          duration: 0,

          pointerEvents: "all"
        })
      };

      const menuIndexItem = document.querySelector(".nav-item:nth-child(1)");
      menuIndexItem.addEventListener("click", onClick);
    }
  );
}

//INDEX LINK TO PROJECT ANIMATION
function indexLinkToProjectAnimation() {
  const indexLink = document.querySelectorAll(".index-item a, .home-item a, .nav-item:nth-child(3) a");

  indexLink.forEach((item) => {
    const onClick = () => {
      const tl = gsap.timeline();

      tl
      .to(html, {
        duration: 0,

        overflowY: "hidden"
      })
      .to(".screen-blocker", {
        duration: 0,

        display: "block"
      },"<")
      .to([".index-item", ".home-item"], {
        duration: 0.25,
  
        autoAlpha: 1,
      },"<");
      
      setTimeout(() => {
        gsap.to([".project-title", ".project-design-type", ".project-year", ".project-design-type-year-mobile"], {
          duration: 1,
    
          autoAlpha: 1,
        });

        menuHideAnimation();
        // Timeout for avoiding lag
        setTimeout(()=> {
          linkToProjectAnimation();

          const homeItem = item.dataset.isHomeItem;

          if(homeItem) {
            gsap.to(".logo-left-section p", {
              duration: 0.65,
              delay: 1.85,
              ease: "power3.out",
      
              translateY: "-125%",
              autoAlpha: 0.5
            });
            gsap.to(".logo-right-section p", {
              duration: 0.65,
              delay: 0.05,
              ease: "power3.out",
      
              translateY: "-125%",
              autoAlpha: 0.5,
              stagger: { amount: 0.1 }
            }, "<");
          }
        }, 1000);
      }, 250);
    };

    item.addEventListener("click", onClick);
  });
}

// INDEX ITEMS HOVER
function menuIndexItemHover() {
  const items = document.querySelectorAll(".index-item, .home-item");

  items.forEach((item) => {
    itemHoverOpacityAnimation(items, item);
  });
}

function menuAbout() {
  const onClick = () => {
    const tl = gsap.timeline();

    tl
    .to(".screen-blocker", {
      duration: 0,

      display: "block"
    })
    .to(".screen-blocker", {
      duration: 0,
      delay: 1,

      display: "none"
    });
  };

  const menuAboutItem = document.querySelector(".nav-item:nth-child(2)");
  menuAboutItem.addEventListener("click", onClick);
}

// CLOSE MENU IN MOBILE
function hideMenuIndexInMobile() {
  let closeMenuResponsive = gsap.matchMedia();

  closeMenuResponsive.add("(max-width: 1024px)", () => {
    const onClick = () => {
      gsap.to([".project-title", ".project-design-type", ".project-year", ".project-design-type-year-mobile"], {
        duration: 1,
        delay: 0.25,

        autoAlpha: 1
      });

      const tl = gsap.timeline();

      tl
      .to([".menu", ".index-item", ".home-item", ".nav a", ".nav h2"], {
        duration: 0,

        pointerEvents: "none"
      },"<")
      .to(".menu-reveal", {
        duration: 0,

        height: "50px",
        translateY: "0%",
        pointerEvents: "none"
      },"<")
      .to(".nav-divider .line", {
        duration: 0.5,
        ease: "power3.inOut",

        scaleX: 0
      },"<")
      .to(".index", {
        duration: 1,
        ease: "power3.inOut",

        translateY: "-100%"
      },"<")
      .to(".logo-left-section h1, .logo-right-section h1", {
        duration: 1,
        ease: "power3.inOut",

        translateY: "0%"
      },"<")
      .to([".index-item", ".home-item"], {
        delay: 0.1,
        duration: 0.15,

        autoAlpha: 0,
        stagger: { amount: -0.15 }
      },"<")
      .to([".menu", ".nav a", ".nav h2"], {
        duration: 0,

        pointerEvents: "all"
      },"<")
      .to(".menu-reveal", {
        duration: 0,

        pointerEvents: "all"
      })
    };
    const menuTrigger = document.querySelector(".menu-reveal");
    menuTrigger.addEventListener("click", onClick);
    
    ScrollTrigger.create({
      trigger: '.logo-animation-trigger',
      start: "bottom 15px",
      end: "bottom 15px",
      onEnter: () => { menuHideAnimation() },
      onLeaveBack: () => {
        gsap.to([".header",".nav h2"], {
          duration: 1,
          ease: "power3.inOut",
  
          translateY: "0%"
        })
        gsap.to(".logo", {
          duration: 1,
          ease: "power3.inOut",
  
          translateY: () => `${document.querySelector(".menu").offsetHeight}px`
        },"<")
      }
    });
  });
}

// DEFAULT ANIMATIONS
// Default item hover animation.
function itemHoverOpacityAnimation(items, item) {
  const onMouseEnter = () => {
    const tl = gsap.timeline();

    tl
    .to(items, {
      duration: 0.25,

      autoAlpha: 0.5
    })
    .to(item, {
      duration: 0.25,

      autoAlpha: 1
    },"<")
  };

  const onMouseLeave = () => {
    gsap.to(items, {
      duration: 0.25,

      autoAlpha: 1
    })
  };

  item.addEventListener("mouseenter", onMouseEnter);
  item.addEventListener("mouseleave", onMouseLeave);
}

// Default hide animation of the menu.
export function menuHideAnimation() {
  const tl = gsap.timeline();

  tl
  .to([".menu", ".index-item", ".home-item", ".nav a", ".nav h2"], {
    duration: 0,

    pointerEvents: "none"
  })
  .to([".index-item", ".home-item"], {
    duration: 0.15,

    autoAlpha: 0,
    stagger: { amount: -0.06 }
  })
  .to(".nav-divider .line", {
    duration: 0.5,
    ease: "power3.inOut",

    scaleX: 0
  },"<")
  .to(".index", {
    duration: 1,
    ease: "power3.inOut",

    transform: "translateY(-100%)"
  },"<")
  .to([".logo-left-section h1", ".logo-right-section h1"], {
    duration: 1,
    ease: "power3.inOut",

    translateY: "0%",
  },"<")
  .to(".header", {
    duration: 1,
    ease: "power3.inOut",

    translateY: () => `-${document.querySelector(".menu").offsetHeight}px`,
  },"-=0.75")
  .to(".logo", {
    duration: 1,
    ease: "power3.inOut",

    translateY: 0,
  },"<")
  .to(".nav h2", {
    duration: 1,
    ease: "power3.inOut",

    translateY: () => `${document.querySelector(".menu").offsetHeight}px`,
  },"<")
  .to([".menu-reveal", ".menu", ".nav a", ".nav h2"], {
    duration: 0,

    pointerEvents: "all",
  },"<")
}