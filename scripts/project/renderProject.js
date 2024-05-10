import { projects } from "../data/projects.js";

export function renderProject() {
  let matchingProject;
  const container = document.querySelector('.project');

  projects.forEach((project) => {
    const projectContainerId = Number(container.dataset.projectId);

    if (projectContainerId === project.id) {
      matchingProject = project;
    }
  });

  let titleHTML = '';

  if(matchingProject.titleIsLong === 'true') {
    titleHTML = `
    <h1 class="project-title-desktop">${matchingProject.nameDesktopLineOne}</h1>
    <h1 class="project-title-desktop">${matchingProject.nameDesktopLineTwo}</h1>
    <h1 class="project-title-mobile">${matchingProject.nameMobileLineOne}</h1>
    <h1 class="project-title-mobile">${matchingProject.nameMobileLineTwo}</h1>
    <h1 class="project-title-mobile">${matchingProject.nameMobileLineThree}</h1>
    `;
  } else {
    titleHTML = `
    <h1>
      <span>
        <p>${matchingProject.name}</p>
      </span>
    </h1>
    `;
  }

  let prevNextHTML = '';
  let prevText = 'Previous';
  let nextText = 'Next';

  if(window.innerWidth <= 640) {
    prevText = 'Previous Project';
    nextText = 'Next Project';
  }

  if(matchingProject.id === 0) {
    prevNextHTML = `
      <div class="next">
        <a href="${projects[matchingProject.id + 1].href}" class="href-delay-one">
          <p>${nextText}</p>
        </a>
      </div>
    `;
  } else if(matchingProject.id + 1 === projects.length) {
      prevNextHTML = `
        <div class="previous">
          <a href="${projects[matchingProject.id - 1].href}" class="href-delay-one">
            <p>${prevText}</p>
          </a>
        </div>
      `;
  } else {
    prevNextHTML = `
      <div class="previous">
        <a href="${projects[matchingProject.id - 1].href}" class="href-delay-one">
          <p>${prevText}</p>
        </a>
      </div>
      <div class="next">
        <a href="${projects[matchingProject.id + 1].href}" class="href-delay-one">
          <p>${nextText}</p>
        </a>
      </div>
    `;
  }

  const html = `
      <div class="project-container project-container-${matchingProject.id}">
        <div class="project-top-section">
          <div class="project-title">
            ${titleHTML}
          </div>
          <div class="project-design-type-year-mobile">
            <p>${matchingProject.designType}</p>
            <p>${matchingProject.year}</p>
          </div>
          <div class="project-details">
            <div class="project-design-type">
              <p>${matchingProject.designType}</p>
            </div>
            <div class="project-year">
              <p>${matchingProject.year}</p>
            </div>
            <div class="project-info">
              ${matchingProject.text}
            </div>
          </div>
        </div>

        <div class="project-bottom-section">
          <div class="project-media">
              ${matchingProject.projectMedia}
          </div>
          ${prevNextHTML}
        </div>
      </div>
    `;

    container.innerHTML = html;
}