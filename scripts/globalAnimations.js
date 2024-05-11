import { menuHideAnimation } from "./menu/menuAnimations.js";

export function globalAnimations() {
  document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(ScrollTrigger)
    
    reloadAnimation();
    customCursorFollowMouse();
    textAppearProjectHover();
    linkHoverPointReveal();
    aboutAnimation();
  });
}

// RELOAD ANIMATION
function reloadAnimation() {
  let reloadAnimationResponsive = gsap.matchMedia();

  reloadAnimationResponsive.add(
    {
      isMobile: "(max-width: 1024px)",
      isDesktop: "(min-width: 1025px)",
    },
    (context) => {
      let { isMobile, isDesktop } = context.conditions;
      const tl = gsap.timeline( {paused: true} );
      const htmlElement = document.getElementById("html");
      const isHome = htmlElement.dataset.isHome;
      
      if (isHome === 'true') {
        gsap.to(".logo-left-section p", {
          duration: 0.65,
          delay: 0.5,
          ease: "power3.out",
  
          translateY: "0",
          autoAlpha: 1
        });
        gsap.to(".logo-right-section p", {
          duration: 0.65,
          delay: 0.05,
          ease: "power3.out",
  
          translateY: "0",
          autoAlpha: 1,
          stagger: { amount: 0.1 }
        }, "<");
        gsap.to([".logo-left-section h1", ".logo-right-section h1"], {
          duration: 1.5,
          delay: 0.95,
          ease: "power3.inOut",
  
          transform: "translateY(0)",
          top: "22px"
        });
        setTimeout(() => { tl.play() }, 2450);
      } else {
        setTimeout(() => { tl.play() }, 250);
      }

      tl
      .to(".logo-left-section h1", {
        duration: 1.5,
        ease: "power3.inOut",

        left: "0",
      })
      .to(".logo-right-section h1", {
        duration: 1.5,
        ease: "power3.inOut",

        right: "0",
      },"<")
      .to([".curtain-left", ".curtain-right"], {
        duration: 1.5,
        ease: "power3.inOut",

        x: "-100%",
        x: (index) => ["-100%", "100%"][index],
        boxShadow: "0px 0px 0px 0px rgba(0, 0, 0, 1)"
      },"<")
      .to(".project-title p", {
        duration: 0.75,
        delay: 0.65,
        ease: "power3.out",

        translateY: "0",
        autoAlpha: 1,
        stagger: { amount: 0.1 }
      },"<")
      .to(".header", {
        duration: 1,
        ease: "power3.inOut",

        translateY: "0%"
      })
      .to(".logo", {
        duration: 1,
        ease: "power3.inOut",

        translateY: () => `${document.querySelector(".menu").offsetHeight + 1}px`
      },"<")
      .to(".nav h2", {
        duration: 0.35,

        autoAlpha: 1,
        stagger: { amount: 0.15 }
      })
      .to(".home-project-text p", {
        duration: 0.35,

        autoAlpha: 1,
        stagger: { amount: 0.15 }
      },"<")
      .to([".project-design-type p", ".project-year p", ".project-design-type-year-mobile"], {
        duration: 0.35,

        autoAlpha: 1,
        stagger: { amount: 0.15 }
      },"<")
      .to(".project-info p", {
        duration: 0.35,
        delay: 0.15,

        autoAlpha: 1,
        stagger: { amount: 0.15 }
      },"<")
      .to([".previous p", ".next p"], {
        duration: 0.35,
        delay: 0.15,

        autoAlpha: 1,
        stagger: { amount: 0.15 }
      },"<")
      .to(".header", {
        duration: 1,
        delay: 0.35,
        ease: "power3.inOut",

        translateY: isMobile
          ? "0%"
          : () => `-${document.querySelector(".menu").offsetHeight + 1}px`
      }, "+=0.5")
      .to(".logo", {
        duration: 1,
        ease: "power3.inOut",

        translateY: isMobile
          ? () => `${document.querySelector(".menu").offsetHeight + 1}px`
          : "0%"
      },"<")
      .to(".nav h2", {
        duration: 1,
        ease: "power3.inOut",

        translateY: isMobile
          ? "0%"
          : () => `${document.querySelector(".menu").offsetHeight + 1}px`
      },"<")
      .to(".screen-blocker", {
        delay: isMobile ? 0 : 1,
        duration: 0,

        display: "none"
      },"<")
      .to(".home-project-divider .line", {
        duration: 0.5,
        ease: "power3.inOut",

        scaleX: 1
      },"<")
      .to(html, {
        duration: 0,

        overflowY: "scroll"
      }, "<")
    }
  );
}

// CUSTOM CURSOR FOLLOW MOUSE
function customCursorFollowMouse() {
  gsap.set(".cursor-hover", { xPercent: 20, yPercent: 100 });

  const cursor = document.querySelector(".cursor-hover");
  let mouseX;
  let mouseY;

  //Movimiento Cursor
  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    gsap.to(cursor, 0.125, { x: mouseX, y: mouseY });
  });
}

// CUSTOM CURSOR PROJECT HOVER
function textAppearProjectHover() {
  const img = document.querySelectorAll(".home-projects a");

  img.forEach((item) => {
    const point = item.querySelector(".project-number span");

    const onMouseEnter = () => {
      const tl = gsap.timeline();

      tl
      .to(".cursor-hover p", {
        duration: 0.25,

        autoAlpha: 1,
      })
      .to(point, {
        duration: 0.25,

        autoAlpha: 1,
      },"<")
    };

    const onMouseLeave = () => {
      const tl = gsap.timeline();

      tl
      .to(".cursor-hover p", {
        duration: 0.25,

        autoAlpha: 0,
      })
      .to(point, {
        duration: 0.25,

        autoAlpha: 0,
      },"<")
    };

    item.addEventListener("mouseenter", onMouseEnter);
    item.addEventListener("mouseleave", onMouseLeave);
  });
}

// LINK HOVER
function linkHoverPointReveal() {
  const linkElements = document.querySelectorAll(".js-link");

  linkElements.forEach((item) => {
    const point = item.querySelector(".js-point");

    const onMouseEnter = () => {
      gsap.to(point, {
        duration: 0.25,

        autoAlpha: 1,
      });
    };
    const onMouseLeave = () => {
      gsap.to(point, {
        duration: 0.25,

        autoAlpha: 0,
      });
    };
    
    item.addEventListener("mouseenter", onMouseEnter);
    item.addEventListener("mouseleave", onMouseLeave);
  });
}

// ABOUT ENTER ANIMATION
function aboutAnimation() {
  let aboutAnimationResponsive = gsap.matchMedia();

  const tl = gsap.timeline({paused: true});

  aboutAnimationResponsive.add(
    {
      isMobile: "(max-width: 768px)",
      isDesktop: "(min-width: 769px)",
    },
    (context) => {
      let { isMobile, isDesktop } = context.conditions;

      tl
      .to(".menu-reveal", {
        duration: 0,
      
        display: "none",
      })
      .to([".logo-left-section h1", ".logo-right-section h1"], {
        duration: 1.5,
        ease: "power3.inOut",

        left: (index) => [isMobile ? "0" : "calc(50% - 20px)", isMobile ? "auto" : "calc(16.666% - 5px)"][index]
      },"<")

      ScrollTrigger.create({
        trigger: ".logo-animation-trigger",
        start: "bottom 15px",
        end: "bottom 15px",
        onEnter: () => { tl.play() },
        onLeaveBack: () => { tl.reverse() }
      });
    }
  );
}

// DEFAULT LINK TO PROJECT ANIMATION
export function linkToProjectAnimation() {
  let linkToProjectAnimation = gsap.matchMedia();

  linkToProjectAnimation.add(
    {
      isMobile: "(max-width: 600px)",
      isDesktop: "(min-width: 601px)",
    },
    (context) => {
      let { isMobile, isDesktop } = context.conditions;
  
      const tl = gsap.timeline();
      
      tl
      .to(".home-project-text p", {
        duration: 0.5,
        autoAlpha: 0,
        stagger: { amount: -0.15 }
      })
      .to(".home-project-divider .line", {
        duration: 0.5,
        ease: "power3.inOut",

        scaleX: 0,
      },"<")
      .to([".logo-left-section h1", ".logo-right-section h1"], {
        duration: 1.5,
        delay: 0.15,
        ease: "power3.inOut",
    
        left: (index) => [isMobile ? "0" : "auto", isMobile ? "auto" : "0"][index],
        right: (index) => [isMobile ? "auto" : "0", isMobile ? "0" : "auto"][index],
        // color: "#090709"
      },"<")
      .to([".curtain-left", ".curtain-right"], {
        duration: 1.5,
        ease: "power3.inOut",
    
        x: "0%",
      },"<")
    }
  );
}

// Fast version
export function defaultLinkToProjectAnimation(link) {
  let imgLinkToProjectAnimation = gsap.matchMedia();

  imgLinkToProjectAnimation.add(
    {
      isMobile: "(max-width: 600px)",
      isDesktop: "(min-width: 601px)",
    },
    (context) => {
      let { isMobile, isDesktop } = context.conditions;

      const links = document.querySelectorAll(link);

      links.forEach((item) => {
        const onClick = () => {
          const tl = gsap.timeline();
          
          menuHideAnimation();
          
          tl
          .to(html, {
            duration: 0,
    
            overflowY: "hidden"
          })
          .to(".screen-blocker", {
            duration: 0,
    
            display: "block"
          },"<")

          linkToProjectAnimation();
        };

        item.addEventListener("click", onClick);
      });
    }
  );
}

// Slow version
// export function imgLinkToProjectAnimation() {
//   let imgLinkToProjectAnimation = gsap.matchMedia();

//   imgLinkToProjectAnimation.add(
//     {
//       isMobile: "(max-width: 600px)",
//       isDesktop: "(min-width: 601px)",
//     },
//     (context) => {
//       let { isMobile, isDesktop } = context.conditions;


//       const imgLink = document.querySelectorAll(".home-projects a");

//       imgLink.forEach((item) => {
//         const onClick = () => {
//           menuHideAnimation();

//           const tl = gsap.timeline();
          
//           tl
//           .to(".screen-blocker", {
//             duration: 0,
    
//             display: "block"
//           })
//           .to(html, {
//             duration: 0,
    
//             overflowY: "hidden"
//           },"<")
//           .to(".home-project-video", {
//             duration: 1.25,
//             ease: "power3.inOut",
        
//             height: "calc(100% - 250px)"
//           },"<")      
//           .to(".home-project-text p", {
//             duration: 0.5,
//             autoAlpha: 0,
//             stagger: { amount: -0.15 }
//           },"<")
//           .to(".home-project-divider .line", {
//             duration: 0.5,
//             ease: "power3.inOut",
    
//             scaleX: 0,
//           },"<")
//           .to([".logo-left-section h1", ".logo-right-section h1"], {
//             duration: 1.5,
//             ease: "power3.inOut",
        
//             top: "50%",
//             transform: "translateY(-50%)"
//           },"<")
//           .to([".logo-left-section h1", ".logo-right-section h1"], {
//             duration: 1.5,
//             ease: "power3.inOut",
        
//             left: (index) => [isMobile ? "0" : "auto", isMobile ? "auto" : "0"][index],
//             right: (index) => [isMobile ? "auto" : "0", isMobile ? "0" : "auto"][index],
//             color: "#090709"
//           })
//           .to([".curtain-left", ".curtain-right"], {
//             duration: 1.5,
//             ease: "power3.inOut",
        
//             x: "0%",
//           },"<")
//         };

//         item.addEventListener("click", onClick);
//       });
//     }
//   );
// }