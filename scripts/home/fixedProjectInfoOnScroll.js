import { projects } from "../data/projects.js";

export function fixedProjectInfoOnScroll() {
  document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(ScrollTrigger)

    let projectNumber = '';
    let endPercentage = '';

    projects.forEach((project) => {
      projectNumber = project.number;

      if (projectNumber === 'one') {
        endPercentage = '48.5';
      } else {
        endPercentage = '50';
      }
    
      ScrollTrigger.create({
        // markers: true,
        trigger: `.home-project.${projectNumber}`,
        start: "top 50%", 
        end: () => `${endPercentage}% +=${document.querySelector(`.home-project-text.${projectNumber}`).offsetHeight}`,
        pin: `.home-project-text.${projectNumber}`
      });
    });
  });
  
}