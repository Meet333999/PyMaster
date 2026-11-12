// ==========================================================================
// Code Level / PyMaster — Modern S-Curve Journey Progression Map
// Clean, interactive learning tree with smooth S-curve node progression,
// glowing active play button, completed checkmarks, and chapter cards.
// ==========================================================================

import { icon } from './icons.js';
import { playSound } from '../engine/haptics.js';

export function renderJourneyMap(container, curriculum, gameState, onLessonClick) {
  const allLessons = [];
  for (const section of curriculum.sections) {
    for (const chapter of section.chapters) {
      allLessons.push(...chapter.lessons);
    }
  }
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

  // Add click handlers to nodes with audio feedback
  container.querySelectorAll('.path-node:not(.locked)').forEach(node => {
    node.addEventListener('click', () => {
      const lessonId = node.dataset.lessonId;
      if (lessonId) {
        playSound('click');
        node.classList.add('node-press');
        setTimeout(() => onLessonClick(lessonId), 150);
      }
    });
  });

  // Scroll to current lesson
  setTimeout(() => {
    const currentNode = container.querySelector('.path-node.current');
    if (currentNode) {
      currentNode.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, 250);
}

function renderSections(sections, allLessons, completedLessons, firstUncompletedIdx) {
  let html = '';
  let globalLessonIdx = 0;
  let totalChapters = 0;
  sections.forEach(s => { totalChapters += s.chapters.length; });
  let chapterIndex = 0;

  // S-curve offset array for smooth left-right weaving
  const S_OFFSETS = [0, 42, 64, 42, 0, -42, -64, -42];

  sections.forEach((section, sIdx) => {
    section.chapters.forEach((chapter, cIdx) => {
      chapterIndex++;
      const completedCount = chapter.lessons.filter(l => completedLessons.has(l.id)).length;
      const chapterPercent = Math.round((completedCount / chapter.lessons.length) * 100);
      const isChapterDone = completedCount === chapter.lessons.length;

      html += `
        <div class="journey-chapter-block" data-section="${sIdx + 1}" data-chapter="${cIdx + 1}">
          <!-- Modern Chapter Header Card -->
          <div class="chapter-card-header">
            <div class="chapter-card-top">
              <span class="chapter-meta-tag">SECTION ${sIdx + 1} · CHAPTER ${cIdx + 1}</span>
              <span class="chapter-stat-badge ${isChapterDone ? 'done' : ''}">
                ${isChapterDone ? 'Completed' : `${completedCount}/${chapter.lessons.length} Lessons`}
              </span>
            </div>
            <h2 class="chapter-title-heading">${chapter.title}</h2>
            <div class="chapter-progress-track">
              <div class="chapter-progress-fill" style="width: ${chapterPercent}%;"></div>
            </div>
          </div>

          <!-- S-Curve Learning Tree Path -->
          <div class="journey-path s-curve-path">
      `;

      chapter.lessons.forEach((lesson, lIdx) => {
        const isCompleted = completedLessons.has(lesson.id);
        const isCurrent = globalLessonIdx === firstUncompletedIdx;
        const isLocked = globalLessonIdx > firstUncompletedIdx;

        let stateClass = 'locked';
        let nodeCircleHTML = '';

        if (isCompleted) {
          stateClass = 'completed';
          nodeCircleHTML = `
            <div class="node-circle completed" title="Completed">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <div class="node-caption">
              <span class="node-title">${lesson.title}</span>
              <span class="node-type-tag">${lesson.type.toUpperCase()}</span>
            </div>
          `;
        } else if (isCurrent) {
          stateClass = 'current';
          nodeCircleHTML = `
            <div class="node-circle current">
              <span class="pulse-ring"></span>
              <svg class="play-icon" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="6 4 20 12 6 20 6 4"></polygon>
              </svg>
            </div>
            <div class="node-caption current-caption">
              <span class="node-start-pill">START HERE</span>
              <span class="node-title">${lesson.title}</span>
            </div>
          `;
        } else {
          nodeCircleHTML = `
            <div class="node-circle locked" title="Locked">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
            <div class="node-caption locked-caption">
              <span class="node-title">${lesson.title}</span>
            </div>
          `;
        }

        // Connector before node (except first node in chapter)
        if (lIdx > 0) {
          const prevCompleted = completedLessons.has(chapter.lessons[lIdx - 1].id);
          html += `<div class="s-connector-line ${prevCompleted ? 'completed' : ''}"></div>`;
        }

        // S-curve offset
        const xOffset = S_OFFSETS[lIdx % S_OFFSETS.length];

        html += `
          <div class="path-row s-row" style="--node-offset: ${xOffset}px;">
            <div class="path-node ${stateClass}"
                 data-lesson-id="${lesson.id}"
                 title="${lesson.title} (${lesson.type.toUpperCase()})"
                 role="button"
                 tabindex="${isLocked ? -1 : 0}"
                 aria-label="${lesson.title} - ${stateClass}">
              ${nodeCircleHTML}
            </div>
          </div>
        `;

        globalLessonIdx++;
      });

      html += `</div>`; // .journey-path

      // If not the last chapter, render inter-chapter bridge
      if (chapterIndex < totalChapters) {
        html += `
          <div class="chapter-bridge ${isChapterDone ? 'completed' : ''}" aria-hidden="true">
            <div class="bridge-line"></div>
            <div class="bridge-node">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
            <div class="bridge-line"></div>
          </div>
        `;
      }

      html += `</div>`; // .journey-chapter-block
    });
  });

  return html;
}
