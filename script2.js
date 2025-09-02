// script2.js — single, robust navigation file
(function () {
  // cached globals (will be set on DOMContentLoaded)
  let homeEl, diagramWrapper, sections, referencesEl;

  document.addEventListener('DOMContentLoaded', init);

  function init() {
    homeEl = document.getElementById('home');
    diagramWrapper = document.getElementById('diagramWrapper');
    sections = Array.from(document.querySelectorAll('.section'));
    referencesEl = document.getElementById('references');

    // initial state: home visible, other sections hidden, diagram hidden
    if (homeEl) {
      homeEl.classList.add('home-visible');
      homeEl.classList.remove('home-hidden');
      homeEl.style.display = 'block';
    }
    sections.forEach(s => {
      if (s !== homeEl) {
        s.classList.remove('active', 'visible');
        s.style.display = 'none';
      }
    });
    if (diagramWrapper) {
      diagramWrapper.style.display = 'none';
    }

    // sync references visibility with classes (if any)
    if (referencesEl) {
      if (referencesEl.classList.contains('references-visible')) {
        referencesEl.style.display = 'block';
      } else {
        referencesEl.style.display = 'none';
      }
    }

    // wire references button safely (if it exists)
    const refsBtn = document.getElementById('showReferencesBtn');
    if (refsBtn && referencesEl) {
      refsBtn.addEventListener('click', function () {
        referencesEl.classList.toggle('references-visible');
        referencesEl.classList.toggle('references-hidden');

        if (referencesEl.classList.contains('references-visible')) {
          referencesEl.style.display = 'block';
          referencesEl.scrollIntoView({ behavior: 'smooth' });
        } else {
          referencesEl.style.display = 'none';
        }
      });
    }

    // expose functions used by inline onclicks
    window.showSection = showSection;
    window.resetView = resetView;
    window.revealDiagram = revealDiagram;
  }

  // utility: hide all "section" blocks
  function hideAllSections() {
    sections.forEach(s => {
      s.classList.remove('active', 'visible');
      s.style.display = 'none';
    });
  }

  // called by "Return to Home" buttons and when you want to show the title page
  function resetView() {
    if (homeEl) {
      homeEl.style.display = 'block';
      homeEl.classList.add('home-visible');
      homeEl.classList.remove('home-hidden');
    }

    // hide all other sections visually
    sections.forEach(s => {
      if (s !== homeEl) {
        s.style.display = 'none';
        s.classList.remove('active', 'visible');
      }
    });

    // hide diagram
    if (diagramWrapper) {
      diagramWrapper.style.display = 'none';
      diagramWrapper.classList.remove('fade-in');
    }

    // restore title background
    document.body.classList.remove('no-bg');

    // keep references state as user last toggled it
    if (referencesEl) {
      if (referencesEl.classList.contains('references-visible')) {
        referencesEl.style.display = 'block';
      } else {
        referencesEl.style.display = 'none';
      }
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // called by your "View Tile" button
  function revealDiagram() {
    if (homeEl) {
      homeEl.classList.remove('home-visible');
      homeEl.classList.add('home-hidden');
      homeEl.style.display = 'none';
    }

    hideAllSections();

    if (diagramWrapper) {
      diagramWrapper.style.display = 'block';
      diagramWrapper.classList.add('fade-in');
      diagramWrapper.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    // remove title background when viewing diagram
    document.body.classList.add('no-bg');
  }

  // called by your nav buttons: show a specific section (e.g., 'contact', 'abaca', etc.)
  function showSection(sectionId) {
    if (!sectionId) return;
    hideAllSections();
    if (diagramWrapper) diagramWrapper.style.display = 'none';

    if (sectionId === 'home') {
      if (homeEl) {
        homeEl.style.display = 'block';
        homeEl.classList.add('home-visible');
        homeEl.classList.remove('home-hidden');
      }
      document.body.classList.remove('no-bg');

      // references: don't change user toggle — just ensure display matches class
      if (referencesEl) {
        if (referencesEl.classList.contains('references-visible')) {
          referencesEl.style.display = 'block';
        } else {
          referencesEl.style.display = 'none';
        }
      }
      return;
    }

    // otherwise hide title and show requested section
    if (homeEl) {
      homeEl.classList.remove('home-visible');
      homeEl.classList.add('home-hidden');
      homeEl.style.display = 'none';
    }

    const target = document.getElementById(sectionId);
    if (target) {
      target.style.display = 'block';
      // small delay to allow CSS transitions that depend on classes
      setTimeout(() => {
        target.classList.add('visible', 'active');
      }, 10);
    }

    // remove title background on other pages
    document.body.classList.add('no-bg');
  }

})();
