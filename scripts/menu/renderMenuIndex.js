import { projects } from "../data/projects.js";

export function renderMenuIndex() {
  let html = '';

  projects.forEach((project) => {
    html += `
      <div class="index-item">
        <a href="${project.href}" class="href-delay-two" data-scroll-to="#scroll-to-${project.number}">
          <h2>(0${project.id + 1})</h2><h2>${project.name}</h2><h2>${project.designType}</h2><h2>${project.year}</h2>
        </a>
      </div>
    `;
  });

  const containerHtml = document.querySelector('.index-container');
  const htmlElement = document.getElementById("html");
  const isHome = htmlElement.dataset.isHome;
  
  if (isHome === 'true') {
    containerHtml.innerHTML = html;
  } else {
    containerHtml.innerHTML = `
    ${html}
    <div class="home-item">
      <a href="./" class="href-delay-three" data-is-home-item="true">
        <h2>Home</h2>
      </a>
    </div>
    `;
  }
}