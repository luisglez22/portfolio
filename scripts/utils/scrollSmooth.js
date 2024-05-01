import 'https://unpkg.com/@studio-freight/lenis@1.0.42/dist/lenis.min.js';

const lenis = new Lenis();

function scrollSmooth() {
  lenis.on("scroll", ScrollTrigger.update);

  // Scroll top on reload.
  window.onload = function() {
    lenis.scrollTo(0);
  }

  scrollToElementOnClick();

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);
}

export default scrollSmooth;

// Scroll to element on click
function scrollToElementOnClick() {
  const clickableElement = document.querySelectorAll('[data-scroll-to]');

  clickableElement.forEach((element) => {
    const scrollTo = element.dataset.scrollTo;
    element.addEventListener('click', () => {
      lenis.scrollTo(`${scrollTo}`);
    })
  });
}