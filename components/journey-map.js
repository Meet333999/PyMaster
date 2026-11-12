// ==========================================================================
// Code Level / PyMaster — Modern Journey Map with Section & Chapter Dropdowns
// Features:
// - Collapsible section & chapter dropdowns with toggle buttons on right side
// - Zero misaligned connector lines (perfectly aligned timeline node track)
// - Glowing active play button with ripple ring for current lesson
// - Completed checkmarks (✓) and locked padlocks (🔒)
// - Smooth transitions and haptic audio clicks
// ==========================================================================

import { icon } from './icons.js';
import { playSound } from '../engine/haptics.js';

// Persistent toggle state across route reloads within session
const openChapters = new Set();
const openSections = new Set();
let initializedDefaults = false;

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

  // Initialize default open states: the section & chapter with the current lesson are always open
  if (!initializedDefaults) {
    let lessonCounter = 0;
    curriculum.sections.forEach((section, sIdx) => {
      let sectionHasCurrent = false;
      section.chapters.forEach((chapter, cIdx) => {
        const chapterStart = lessonCounter;
        const chapterEnd = lessonCounter + chapter.lessons.length;
        if (firstUncompletedIdx >= chapterStart && firstUncompletedIdx < chapterEnd) {
          openChapters.add(`${sIdx}-${cIdx}`);
          sectionHasCurrent = true;
        } else if (cIdx === 0 && sIdx === 0) {
          openChapters.add(`${sIdx}-${cIdx}`);
          sectionHasCurrent = true;
        }
        lessonCounter += chapter.lessons.length;
      });
      if (sectionHasCurrent || sIdx === 0) {
        openSections.add(sIdx);
      }
    });
    initializedDefaults = true;
  }

  function render() {
    container.innerHTML = `
      <div class="journey-container" id="journey-scroll-container">
        <div class="journey-inner">
          ${renderCurriculumSections(curriculum.sections, allLessons, completedLessons, firstUncompletedIdx)}
        </div>
      </div>
    `;

    bindEvents();
  }

  function bindEvents() {
    // 1. Section Dropdown Toggle
    container.querySelectorAll('.section-card-header').forEach(header => {
      header.addEventListener('click', (e) => {
        // Prevent trigger if clicking on an inner chapter
        if (e.target.closest('.chapter-block')) return;
        playSound('click');
        const sIdx = parseInt(header.dataset.sectionIdx);
        if (isNaN(sIdx)) return;

        if (openSections.has(sIdx)) {
          openSections.delete(sIdx);
        } else {
          openSections.add(sIdx);
        }
        render();
      });
    });

    // 2. Chapter Dropdown Toggle
    container.querySelectorAll('.chapter-card-header').forEach(header => {
      header.addEventListener('click', (e) => {
        e.stopPropagation();
        playSound('click');
        const chapterKey = header.dataset.chapterKey;
        if (!chapterKey) return;

        if (openChapters.has(chapterKey)) {
          openChapters.delete(chapterKey);
        } else {
          openChapters.add(chapterKey);
        }
        render();
      });
    });

    // 3. Challenge / Lesson Click Handlers
    container.querySelectorAll('.challenge-timeline-row:not(.locked)').forEach(row => {
      row.addEventListener('click', () => {
        const lessonId = row.dataset.lessonId;
        if (lessonId) {
          playSound('click');
          row.classList.add('node-press');
          setTimeout(() => onLessonClick(lessonId), 120);
        }
      });
    });

    // Auto-scroll to current active challenge
    setTimeout(() => {
      const activeEl = container.querySelector('.challenge-timeline-row.current');
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 180);
  }

  render();
}

function renderCurriculumSections(sections, allLessons, completedLessons, firstUncompletedIdx) {
  let html = '';
  let globalLessonIdx = 0;

  sections.forEach((section, sIdx) => {
    let sectionLessonCount = 0;
    let sectionCompletedCount = 0;
    section.chapters.forEach(c => {
      sectionLessonCount += c.lessons.length;
      sectionCompletedCount += c.lessons.filter(l => completedLessons.has(l.id)).length;
    });

    const isSectionDone = sectionCompletedCount === sectionLessonCount && sectionLessonCount > 0;
    const isSectionOpen = openSections.has(sIdx);
    const sectionPercent = sectionLessonCount > 0 ? Math.round((sectionCompletedCount / sectionLessonCount) * 100) : 0;

    html += `
      <div class="section-card modern-card-panel ${isSectionDone ? 'done' : ''}" data-section-idx="${sIdx}">
        <!-- Section Card Header with Right-Side Dropdown Button -->
        <div class="section-card-header" data-section-idx="${sIdx}" role="button" tabindex="0" aria-expanded="${isSectionOpen}">
          <div class="section-info-group">
            <div class="section-meta-row">
              <span class="section-kicker">SECTION ${sIdx + 1}</span>
              <span class="section-progress-pill ${isSectionDone ? 'done' : ''}">
                ${isSectionDone ? '✓ Completed' : `${sectionCompletedCount}/${sectionLessonCount} Lessons`}
              </span>
            </div>
            <h2 class="section-title">${section.title}</h2>
            ${section.description ? `<p class="section-description">${section.description}</p>` : ''}
            
            <div class="section-progress-track">
              <div class="section-progress-fill" style="width: ${sectionPercent}%;"></div>
            </div>
          </div>

          <button class="section-toggle-btn tactile-icon-btn ${isSectionOpen ? 'open' : ''}" 
                  data-section-idx="${sIdx}" 
                  aria-label="Toggle section ${sIdx + 1}"
                  title="Toggle section">
            <svg class="chevron-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
        </div>

        <!-- Section Chapters Accordion Body -->
        <div class="section-chapters-drawer ${isSectionOpen ? 'open' : 'collapsed'}">
    `;

    section.chapters.forEach((chapter, cIdx) => {
      const chapterKey = `${sIdx}-${cIdx}`;
      const chapterCompletedCount = chapter.lessons.filter(l => completedLessons.has(l.id)).length;
      const chapterPercent = Math.round((chapterCompletedCount / chapter.lessons.length) * 100);
      const isChapterDone = chapterCompletedCount === chapter.lessons.length;
      const isChapterOpen = openChapters.has(chapterKey);

      html += `
        <div class="chapter-block" data-chapter-key="${chapterKey}">
          <!-- Chapter Card Header with Right-Side Dropdown Button -->
          <div class="chapter-card-header ${isChapterOpen ? 'active-header' : ''}" data-chapter-key="${chapterKey}">
            <div class="chapter-header-clickable" data-chapter-key="${chapterKey}" role="button" tabindex="0" aria-expanded="${isChapterOpen}">
              <div class="chapter-card-top">
                <span class="chapter-meta-tag">CHAPTER ${cIdx + 1}</span>
                <span class="chapter-stat-badge ${isChapterDone ? 'done' : ''}">
                  ${isChapterDone ? 'Completed' : `${chapterCompletedCount}/${chapter.lessons.length} Challenges`}
                </span>
              </div>
              <h3 class="chapter-title-heading">${chapter.title}</h3>
              <div class="chapter-progress-track">
                <div class="chapter-progress-fill" style="width: ${chapterPercent}%;"></div>
              </div>
            </div>

            <button class="chapter-toggle-btn tactile-icon-btn ${isChapterOpen ? 'open' : ''}"
                    data-chapter-key="${chapterKey}"
                    aria-label="Toggle chapter challenges"
                    title="Toggle challenges dropdown">
              <svg class="chevron-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
          </div>

          <!-- Chapter Challenges Dropdown Drawer with Perfectly Aligned Connector Track -->
          <div class="chapter-challenges-drawer ${isChapterOpen ? 'open' : 'collapsed'}" id="drawer-${chapterKey}">
            <div class="timeline-track-container">
      `;

      chapter.lessons.forEach((lesson, lIdx) => {
        const isCompleted = completedLessons.has(lesson.id);
        const isCurrent = globalLessonIdx === firstUncompletedIdx;
        const isLocked = globalLessonIdx > firstUncompletedIdx;
        const isLastInChapter = lIdx === chapter.lessons.length - 1;

        let statusClass = isCompleted ? 'completed' : (isCurrent ? 'current' : 'locked');

        let nodeIconHTML = '';
        if (isCompleted) {
          nodeIconHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          `;
        } else if (isCurrent) {
          nodeIconHTML = `
            <span class="pulse-ring"></span>
            <svg class="play-icon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="6 4 20 12 6 20 6 4"></polygon>
            </svg>
          `;
        } else {
          nodeIconHTML = `
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
          `;
        }

        html += `
          <div class="challenge-timeline-row ${statusClass}" 
               data-lesson-id="${lesson.id}"
               role="button"
               tabindex="${isLocked ? -1 : 0}"
               aria-label="${lesson.title} - ${statusClass}">
            
            <!-- Perfectly Aligned Timeline Spine: Node + Continuous Connecting Line -->
            <div class="timeline-spine">
              <div class="timeline-node ${statusClass}">
                ${nodeIconHTML}
              </div>
              ${!isLastInChapter ? `<div class="timeline-line ${isCompleted ? 'completed' : ''}"></div>` : ''}
            </div>

            <!-- Challenge Card Details -->
            <div class="challenge-item-card ${statusClass}">
              <div class="challenge-item-left">
                <div class="challenge-item-tags">
                  <span class="lesson-type-pill ${lesson.type}">${lesson.type.toUpperCase()}</span>
                  ${isCurrent ? '<span class="start-here-pill">START HERE</span>' : ''}
                  ${lesson.difficulty ? `<span class="difficulty-tag">${lesson.difficulty.toUpperCase()}</span>` : ''}
                </div>
                <h4 class="challenge-item-title">${lesson.title}</h4>
              </div>

              <div class="challenge-item-right">
                <span class="challenge-xp-badge">+${lesson.xp} XP</span>
                <span class="challenge-action-icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </span>
              </div>
            </div>
          </div>
        `;

        globalLessonIdx++;
      });

      html += `
            </div> <!-- .timeline-track-container -->
          </div> <!-- .chapter-challenges-drawer -->
        </div> <!-- .chapter-block -->
      `;
    });

    html += `
        </div> <!-- .section-chapters-drawer -->
      </div> <!-- .section-card -->
    `;
  });

  return html;
}
