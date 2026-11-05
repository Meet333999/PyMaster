// ========================================
// Journey Map — Industrial Patch-Bay Progression Path
// Skeuomorphic patch sockets, bus traces, and status LEDs
// ========================================

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

  // Add click handlers to nodes with mechanical click sound
  container.querySelectorAll('.path-node:not(.locked)').forEach(node => {
    node.addEventListener('click', () => {
      const lessonId = node.dataset.lessonId;
      if (lessonId) {
        playSound('click');
        node.classList.add('node-press');
        setTimeout(() => onLessonClick(lessonId), 180);
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
  let totalChapters = 0;
  sections.forEach(s => { totalChapters += s.chapters.length; });
  let chapterIndex = 0;

  sections.forEach((section, sIdx) => {
    section.chapters.forEach((chapter, cIdx) => {
      chapterIndex++;
      const isChapterDone = chapter.lessons.every(l => completedLessons.has(l.id));

      html += `
        <div class="journey-chapter-block" data-section="${sIdx + 1}" data-chapter="${cIdx + 1}">
          <!-- Stamped Hardware Faceplate Header -->
          <div class="section-header hardware-faceplate">
            <div class="faceplate-screw screw-left" aria-hidden="true"></div>
            <div class="section-icon-box">${icon(section.icon, 18)}</div>
            <div class="section-info-col">
              <div class="section-subheading">SECTION ${sIdx + 1} // CHAPTER ${cIdx + 1}</div>
              <div class="section-title-text">${chapter.title}</div>
            </div>
            <div class="section-meta-badge">
              <span class="meta-led ${isChapterDone ? 'status-green' : 'status-idle'}"></span>
              <span>${chapter.lessons.length} SOCKETS</span>
            </div>
            <div class="faceplate-screw screw-right" aria-hidden="true"></div>
          </div>

          <!-- Lesson Nodes Path -->
          <div class="journey-path">
      `;

      chapter.lessons.forEach((lesson, lIdx) => {
        const isCompleted = completedLessons.has(lesson.id);
        const isCurrent = globalLessonIdx === firstUncompletedIdx;
        const isLocked = globalLessonIdx > firstUncompletedIdx;

        let stateClass = 'locked';
        let nodeContent = '';

        if (isCompleted) {
          stateClass = 'completed';
          nodeContent = `
            <div class="socket-inner completed">
              <span class="socket-diode status-green"></span>
              <span class="socket-check">✓</span>
            </div>
            <span class="node-caption">${lesson.title}</span>
          `;
        } else if (isCurrent) {
          stateClass = 'current';
          nodeContent = `
            <div class="socket-inner current">
              <span class="socket-diode status-blue pulse-blue"></span>
              <span class="socket-number">${lIdx + 1}</span>
            </div>
            <span class="node-caption active">${lesson.title}</span>
          `;
        } else {
          nodeContent = `
            <div class="socket-inner locked">
              <span class="socket-lock-icon">${icon('lock', 12)}</span>
            </div>
            <span class="node-caption">${lesson.title}</span>
          `;
        }

        // Circuit bus connector line before each node (except first)
        if (lIdx > 0) {
          const prevCompleted = completedLessons.has(chapter.lessons[lIdx - 1].id);
          html += `<div class="path-connector-css ${prevCompleted ? 'completed' : ''}"></div>`;
        }

        // Node row
        html += `
          <div class="path-row">
            <div class="path-node ${stateClass}"
                 data-lesson-id="${lesson.id}"
                 title="${lesson.title} (${lesson.type.toUpperCase()})"
                 role="button"
                 tabindex="${isLocked ? -1 : 0}"
                 aria-label="${lesson.title} - ${stateClass}">
              ${nodeContent}
            </div>
          </div>
        `;

        globalLessonIdx++;
      });

      html += `</div>`; // .journey-path

      // If not the last chapter, render inter-chapter circuit bus conduit
      if (chapterIndex < totalChapters) {
        html += `
          <div class="chapter-interconnect ${isChapterDone ? 'completed' : ''}" aria-hidden="true">
            <div class="interconnect-line"></div>
            <div class="interconnect-junction"></div>
            <div class="interconnect-line"></div>
          </div>
        `;
      }

      html += `</div>`; // .journey-chapter-block
    });
  });

  return html;
}
