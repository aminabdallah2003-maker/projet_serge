/* ============================================================
   L'OASIS FLORALE – script.js
   Navigation SPA, Slider, Filtres boutique, Formulaire
============================================================ */

// ── PAGE NAVIGATION ──────────────────────────────────────
function showPage(pageId) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

  // Show target page
  const target = document.getElementById(pageId);
  if (target) {
    target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Update nav links
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + pageId) {
      link.classList.add('active');
    }
  });

  // Close mobile menu
  document.getElementById('navLinks').classList.remove('open');
}

// ── HAMBURGER MENU ────────────────────────────────────────
function toggleMenu() {
  const navLinks = document.getElementById('navLinks');
  navLinks.classList.toggle('open');
}

// Close menu on outside click
document.addEventListener('click', (e) => {
  const nav = document.getElementById('navbar');
  if (!nav.contains(e.target)) {
    document.getElementById('navLinks').classList.remove('open');
  }
});

// ── NAVBAR SCROLL EFFECT ──────────────────────────────────
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 30) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ── SLIDER ────────────────────────────────────────────────
let currentSlide = 0;
let slideInterval;
const slides = document.querySelectorAll('.slide');
const dotsContainer = document.getElementById('sliderDots');

// Build dots
slides.forEach((_, i) => {
  const dot = document.createElement('button');
  dot.className = 'dot' + (i === 0 ? ' active' : '');
  dot.setAttribute('aria-label', 'Diapositive ' + (i + 1));
  dot.addEventListener('click', () => goToSlide(i));
  dotsContainer.appendChild(dot);
});

function goToSlide(n) {
  slides[currentSlide].classList.remove('active');
  document.querySelectorAll('.dot')[currentSlide].classList.remove('active');

  currentSlide = (n + slides.length) % slides.length;

  slides[currentSlide].classList.add('active');
  document.querySelectorAll('.dot')[currentSlide].classList.add('active');
}

function moveSlide(direction) {
  resetInterval();
  goToSlide(currentSlide + direction);
}

function startInterval() {
  slideInterval = setInterval(() => goToSlide(currentSlide + 1), 5000);
}

function resetInterval() {
  clearInterval(slideInterval);
  startInterval();
}

startInterval();

// Pause on hover
const slider = document.getElementById('slider');
if (slider) {
  slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
  slider.addEventListener('mouseleave', startInterval);
}

// Touch swipe support
let touchStartX = 0;
if (slider) {
  slider.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  slider.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      resetInterval();
      goToSlide(currentSlide + (diff > 0 ? 1 : -1));
    }
  });
}

// ── FLOWER FILTER ──────────────────────────────────────────
function filterFleurs(category, btn) {
  // Update active tab
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  // Show/hide cards
  document.querySelectorAll('.flower-card').forEach(card => {
    if (category === 'all' || card.dataset.category === category) {
      card.classList.remove('hidden');
      // Re-trigger animation
      card.style.animation = 'none';
      card.offsetHeight; // reflow
      card.style.animation = 'fadeIn 0.4s ease';
    } else {
      card.classList.add('hidden');
    }
  });
}

// ── CONTACT FORM ───────────────────────────────────────────
function submitForm(e) {
  e.preventDefault();

  const form = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  const btn = form.querySelector('button[type="submit"]');

  // Loading state
  btn.textContent = 'Envoi en cours...';
  btn.disabled = true;

  // Simulate submission (replace with real backend/EmailJS integration)
  setTimeout(() => {
    form.style.display = 'none';
    success.style.display = 'block';
    success.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 1200);
}

// ── KEYBOARD NAV ───────────────────────────────────────────
document.addEventListener('keydown', (e) => {
  const activePage = document.querySelector('.page.active');
  if (activePage && activePage.id === 'accueil') {
    if (e.key === 'ArrowLeft') moveSlide(-1);
    if (e.key === 'ArrowRight') moveSlide(1);
  }
});

// ── INTERSECTION OBSERVER for scroll animations ────────────
const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -40px 0px' };

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Apply to cards on page load
function initAnimations() {
  const animatables = document.querySelectorAll('.service-card, .flower-card, .why-card, .info-card');
  animatables.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = `opacity 0.5s ease ${i * 0.06}s, transform 0.5s ease ${i * 0.06}s`;
    observer.observe(el);
  });
}

// Re-init animations when page changes
const originalShowPage = showPage;
window.showPage = function(pageId) {
  originalShowPage(pageId);
  setTimeout(initAnimations, 100);
};

// Init on load
window.addEventListener('load', initAnimations);
