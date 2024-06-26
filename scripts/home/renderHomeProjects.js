import { projects } from "../data/projects.js";
import { projectsEs } from "../data/projectsEs.js";

export function renderHomeProjects() {
  let html = '';

  const lang = document.documentElement.getAttribute("lang");
  let projectsData = '';

  if(lang === 'en') {
    projectsData = projects;
  } else if (lang === 'es') {
    projectsData = projectsEs;
  }

  projectsData.forEach((project) => {
    let hrefFix = '';

    if(lang === 'es') {
      hrefFix = 'es/';
    }

    if (project.id >= 1) {
      html += `
        <a href="${hrefFix}${project.href}" class="href-delay-one" data-scroll-to="#scroll-to-${project.number}">
          <div class="home-project ${project.number} js-home-project js-home-project-${project.id}" id="scroll-to-${project.number}">
            <div class="home-project-divider">
              <div class="line"></div>
            </div>

            <div class="home-project-text ${project.number}">
              <div class="project-number">
                <span>·</span><p>(0${project.id + 1})</p>
              </div>
              <div class="project-details">
                <p>${project.name}</p><p>${project.designType}</p><p>${project.year}</p>
              </div>
            </div>

            <video class="home-project-video" style="mix-blend-mode: lighten;" autoplay="autoplay" playsinline muted defaultMuted loop="loop" oncontextmenu="return false;" preload="auto">
              <source src="${project.videoHome}" type="video/mp4">
            </video>
          </div>
        </a>
      `;
    } else {
        html += `
        <a href="${hrefFix}${project.href}" class="href-delay-one" data-scroll-to="#scroll-to-${project.number}">
          <div class="home-project ${project.number} js-home-project js-home-project-${project.id}" id="scroll-to-${project.number}">
            <div class="home-project-text ${project.number}">
              <div class="project-number">
                <span>·</span><p>(0${project.id + 1})</p>
              </div>
              <div class="project-details">
                <p>${project.name}</p><p>${project.designType}</p><p>${project.year}</p>
              </div>
            </div>

            <video class="home-project-video" style="mix-blend-mode: lighten;" autoplay="autoplay" playsinline muted defaultMuted loop="loop" oncontextmenu="return false;" preload="auto">
              <source src="${project.videoHome}" type="video/mp4">
            </video>
          </div>
        </a>
      `;
    }
  });

  const containerHtml = document.querySelector('.home-projects');
  containerHtml.innerHTML = html;
}