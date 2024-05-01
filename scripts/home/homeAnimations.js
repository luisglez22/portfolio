import {defaultLinkToProjectAnimation} from '../globalAnimations.js';

export function homeAnimations() {
  document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(ScrollTrigger)

    defaultLinkToProjectAnimation(".home-projects a");
  });
}