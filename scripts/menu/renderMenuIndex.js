import { projects } from "../data/projects.js";
import { projectsEs } from "../data/projectsEs.js";

export function renderMenuIndex() {
  const htmlElement = document.getElementById("html");
  const isHome = htmlElement.dataset.isHome;

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

    if(lang === 'es' & isHome === 'true') {
      hrefFix = 'es/';
    } else if(lang === 'es' !== isHome === 'true') {
      hrefFix = '';
    }

    html += `
      <div class="index-item">
        <a href="${hrefFix}${project.href}" class="href-delay-two" data-scroll-to="#scroll-to-${project.number}">
          <h2>(0${project.id + 1})</h2><h2>${project.name}</h2><h2>${project.designType}</h2><h2>${project.year}</h2>
        </a>
      </div>
    `;
  });

  const containerHtml = document.querySelector('.index-container');
  
  if (isHome === 'true') {
    containerHtml.innerHTML = html;
  } else {
    let hrefHome = './';

    if(lang === 'es') {
      hrefHome = '../es';
    }

    containerHtml.innerHTML = `
    ${html}
    <div class="home-item">
      <a href="${hrefHome}" class="href-delay-three" data-is-home-item="true">
        <h2>Home</h2>
      </a>
    </div>
    `;
  }
}
