document.documentElement.classList.add('is-loading');

/* ---------- Loader ---------- */
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  const minDisplay = 900;
  const start = window.__loaderStart || Date.now();
  const elapsed = Date.now() - start;
  const wait = Math.max(minDisplay - elapsed, 0);

  setTimeout(() => {
    loader.classList.add('is-hidden');
    document.documentElement.classList.remove('is-loading');
    startTypewriter();
  }, wait);
});
window.__loaderStart = Date.now();

/* Fallback in case 'load' takes too long (slow images) */
setTimeout(() => {
  const loader = document.getElementById('loader');
  if (loader && !loader.classList.contains('is-hidden')) {
    loader.classList.add('is-hidden');
    document.documentElement.classList.remove('is-loading');
    startTypewriter();
  }
}, 4000);

/* ---------- Typewriter hero title ---------- */
let typewriterStarted = false;
function startTypewriter() {
  if (typewriterStarted) return;
  typewriterStarted = true;

  const el = document.getElementById('typewriter');
  if (!el) return;
  const text = el.getAttribute('data-text') || '';
  let i = 0;
  let currentWord = null;

  function type() {
    if (i < text.length) {
      const ch = text[i];
      if (ch === ' ') {
        el.appendChild(document.createTextNode(' '));
        currentWord = null;
      } else {
        if (!currentWord) {
          currentWord = document.createElement('span');
          currentWord.className = 'word';
          el.appendChild(currentWord);
        }
        const span = document.createElement('span');
        span.className = 'letter';
        span.textContent = ch;
        currentWord.appendChild(span);
      }
      i++;
      setTimeout(type, 42);
    } else {
      el.classList.add('is-done');
    }
  }
  type();
}

/* ---------- Hero background particles ---------- */
(function spawnHeroParticles() {
  const container = document.getElementById('heroParticles');
  if (!container) return;
  const colors = ['rgba(255,255,255,0.55)', 'rgba(245,130,31,0.55)', 'rgba(42,172,209,0.55)'];
  const count = window.innerWidth < 700 ? 16 : 30;

  for (let n = 0; n < count; n++) {
    const p = document.createElement('span');
    p.className = 'particle';
    const size = (Math.random() * 4 + 2).toFixed(1);
    const left = (Math.random() * 100).toFixed(1);
    const duration = (Math.random() * 10 + 9).toFixed(1);
    const delay = (Math.random() * -20).toFixed(1);
    const drift = (Math.random() * 80 - 40).toFixed(0);

    p.style.width = size + 'px';
    p.style.height = size + 'px';
    p.style.left = left + '%';
    p.style.background = colors[n % colors.length];
    p.style.animationDuration = duration + 's';
    p.style.animationDelay = delay + 's';
    p.style.setProperty('--drift', drift + 'px');

    container.appendChild(p);
  }
})();

/* ---------- Button ripple feedback ---------- */
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.btn');
  if (!btn) return;

  const rect = btn.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const ripple = document.createElement('span');
  ripple.className = 'ripple';
  ripple.style.width = size + 'px';
  ripple.style.height = size + 'px';
  ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
  ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';

  btn.appendChild(ripple);
  ripple.addEventListener('animationend', () => ripple.remove());
});

/* ---------- Navbar scroll state ---------- */
const navbar = document.getElementById('navbar');
function onScrollNavbar() {
  if (window.scrollY > 40) {
    navbar.classList.add('is-scrolled');
  } else {
    navbar.classList.remove('is-scrolled');
  }
}
window.addEventListener('scroll', onScrollNavbar, { passive: true });
onScrollNavbar();

/* ---------- Mobile nav toggle ---------- */
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
  navToggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
});

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Abrir menú');
  });
});

/* ---------- Scroll reveal ---------- */
const revealItems = document.querySelectorAll('[data-reveal]');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

revealItems.forEach((item) => revealObserver.observe(item));

/* ---------- Back to top ---------- */
const backToTop = document.getElementById('backToTop');
function onScrollBackToTop() {
  if (window.scrollY > 500) {
    backToTop.classList.add('is-visible');
  } else {
    backToTop.classList.remove('is-visible');
  }
}
window.addEventListener('scroll', onScrollBackToTop, { passive: true });
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ---------- Footer year ---------- */
document.getElementById('year').textContent = new Date().getFullYear();
