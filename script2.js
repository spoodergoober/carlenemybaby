function resetView() {
  const home = document.getElementById('home');
  const sections = document.querySelectorAll('.section');
  const diagramWrapper = document.getElementById('diagramWrapper');

  // Show main content
  if (home) {
    home.style.display = 'block';
    home.classList.add('home-visible');
    home.classList.remove('home-hidden');
  }

  sections.forEach(section => {
    section.style.display = 'block';
    section.classList.remove('hidden');
  });

  // Hide diagram
  if (diagramWrapper) {
    diagramWrapper.style.display = 'none';
    diagramWrapper.classList.remove('fade-in');
  }

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function revealDiagram() {
  const home = document.getElementById('home');
  const sections = document.querySelectorAll('.section');
  const diagramWrapper = document.getElementById('diagramWrapper');

  // Hide everything else
  if (home) {
    home.classList.remove('home-visible');
    home.classList.add('home-hidden');
  }

  sections.forEach(section => {
    section.classList.remove('active');
    section.classList.remove('visible');
    section.style.display = 'none';
  });

  // Show diagram with fade effect
  if (diagramWrapper) {
    diagramWrapper.style.display = 'block'; // ✅ crucial line
    diagramWrapper.classList.add('fade-in');
    diagramWrapper.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}


function showSection(sectionId) {
  const sections = document.querySelectorAll('.section');
  const home = document.getElementById('home');
  const diagramWrapper = document.getElementById('diagramWrapper');

  // Hide diagram when switching to a section
  if (diagramWrapper) diagramWrapper.style.display = 'none';

  // Hide all sections first
  sections.forEach(section => {
    section.classList.remove('active', 'visible');
    section.style.display = 'none'; // ✅ Ensure it's hidden
  });

  // Show home if requested
  if (sectionId === 'home') {
    home.classList.remove('home-hidden');
    home.classList.add('home-visible');
    return;
  }

  // Otherwise, hide home and show the requested section
  home.classList.remove('home-visible');
  home.classList.add('home-hidden');

  const target = document.getElementById(sectionId);
  if (target) {
    target.style.display = 'block'; // ✅ Make it visible again
    setTimeout(() => {
      target.classList.add('visible');
      target.classList.add('active');
    }, 10);
  }
}