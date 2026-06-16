// ========================================
// Journey Map — Snake-like Progression Path
// ========================================

import { getAllLessons } from '../data/curriculum.js';

export function renderJourneyMap(container, curriculum, gameState, onLessonClick) {
  const allLessons = getAllLessons();
  const completedLessons = gameState.getCompletedLessons();

  // Find the first uncompleted lesson
  let firstUncompletedIdx = allLessons.findIndex(l => !completedLessons.has(l.id));
  if (firstUncompletedIdx === -1) firstUncompletedIdx = allLessons.length;

  container.innerHTML = `
    <div class="journey-container" id="journey-scroll-container">
      <div class="journey-inner">
        ${renderSections(curriculum.sections, allLessons, completedLessons, firstUncompletedIdx)}
      </div>
    </div>
  `;

  // Add click handlers to nodes
  container.querySelectorAll('.path-node:not(.locked)').forEach(node => {
    node.addEventListener('click', () => {
      const lessonId = node.dataset.lessonId;
      if (lessonId) {
        node.classList.add('node-press');
        setTimeout(() => onLessonClick(lessonId), 200);
      }
    });
  });

  // Scroll to current lesson
  setTimeout(() => {
    const currentNode = container.querySelector('.path-node.current');
    if (currentNode) {
      currentNode.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, 300);
}

function renderSections(sections, allLessons, completedLessons, firstUncompletedIdx) {
  let html = '';
  let globalLessonIdx = 0;

  sections.forEach((section, sIdx) => {
    section.chapters.forEach((chapter, cIdx) => {
      // Section/Chapter header
      html += `
        <div class="section-header">
          <span class="section-icon">${section.icon}</span>
          <div>
            <div style="font-size: 0.7rem; color: var(--text-secondary); font-weight: 500;">Section ${sIdx + 1}, Chapter ${cIdx + 1}</div>
            <div>${chapter.title}</div>
          </div>
          <span class="section-meta">${chapter.lessons.length} lessons</span>
        </div>
      `;

      // Render lesson nodes in snake pattern using .path-row
      html += `<div class="journey-path">`;

      chapter.lessons.forEach((lesson, lIdx) => {
        const isCompleted = completedLessons.has(lesson.id);
        const isCurrent = globalLessonIdx === firstUncompletedIdx;
        const isLocked = globalLessonIdx > firstUncompletedIdx;

        let stateClass = 'locked';
        if (isCompleted) stateClass = 'completed';
        else if (isCurrent) stateClass = 'current';

        // Connector line before each node (except first)
        if (lIdx > 0) {
          const prevCompleted = completedLessons.has(chapter.lessons[lIdx - 1].id);
          html += `<div class="path-connector-css ${prevCompleted ? 'completed' : ''}"></div>`;
        }

        // Node row using .path-row for the S-curve via nth-child CSS
        html += `
          <div class="path-row">
            <div class="path-node ${stateClass}"
                 data-lesson-id="${lesson.id}"
                 title="${lesson.title}"
                 role="button"
                 tabindex="${isLocked ? -1 : 0}"
                 aria-label="${lesson.title} - ${stateClass}">
            </div>
          </div>
        `;

        globalLessonIdx++;
      });

      html += `</div>`; // .journey-path
    });
  });

  return html;
}
