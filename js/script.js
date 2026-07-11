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

/* ---------- Typewriter hero title (loops forever) ---------- */
let typewriterStarted = false;
function startTypewriter() {
  if (typewriterStarted) return;
  typewriterStarted = true;

  const el = document.getElementById('typewriter');
  if (!el) return;
  const text = el.getAttribute('data-text') || '';
  if (!text) return;

  const TYPE_SPEED = 42;
  const DELETE_SPEED = 18;
  const HOLD_AFTER_TYPE = 2800;
  const HOLD_AFTER_DELETE = 300;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let i = 0;
  let currentWord = null;
  // Explicit stack of appended nodes (letter spans or space text nodes),
  // so deleting just pops the last entry instead of re-walking the DOM.
  let entries = [];

  function typeStep() {
    if (i < text.length) {
      const ch = text[i];
      let node;
      if (ch === ' ') {
        node = document.createTextNode(' ');
        el.appendChild(node);
        currentWord = null;
      } else {
        if (!currentWord) {
          currentWord = document.createElement('span');
          currentWord.className = 'word';
          el.appendChild(currentWord);
        }
        node = document.createElement('span');
        node.className = 'letter';
        node.textContent = ch;
        currentWord.appendChild(node);
      }
      entries.push(node);
      i++;
      if (reduceMotion) {
        typeStep();
      } else {
        setTimeout(typeStep, TYPE_SPEED);
      }
    } else if (!reduceMotion) {
      setTimeout(deleteStep, HOLD_AFTER_TYPE);
    }
  }

  function deleteStep() {
    const node = entries.pop();
    if (node) {
      const parent = node.parentNode;
      if (parent) {
        parent.removeChild(node);
        if (parent !== el && parent.childNodes.length === 0) {
          el.removeChild(parent);
        }
      }
      setTimeout(deleteStep, DELETE_SPEED);
    } else {
      i = 0;
      currentWord = null;
      setTimeout(typeStep, HOLD_AFTER_DELETE);
    }
  }

  typeStep();
}

/* ---------- Hero particle network ---------- */
(function heroParticleNetwork() {
  const wrap = document.getElementById('heroParticles');
  const hero = document.querySelector('.hero');
  if (!wrap || !hero) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const canvas = document.createElement('canvas');
  wrap.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const colors = ['255,255,255', '245,130,31', '42,172,209'];
  const linkDist = 130;
  const mouse = { x: 0, y: 0, active: false };

  let dpr, w, h, particles, rafId, resizeTimer;

  function particleCount() {
    const density = w * h / 12000;
    return Math.round(Math.min(170, Math.max(70, density)));
  }

  function build() {
    const n = particleCount();
    particles = Array.from({ length: n }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.7 + 0.6,
      c: colors[Math.floor(Math.random() * colors.length)]
    }));
  }

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = hero.clientWidth;
    h = hero.clientHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    build();
  }

  function step() {
    ctx.clearRect(0, 0, w, h);

    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;

      if (mouse.active) {
        const dx = p.x - mouse.x, dy = p.y - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 16000) {
          const d = Math.sqrt(d2) || 1;
          const f = (128 - d) / 128;
          p.x += (dx / d) * f * 1.1;
          p.y += (dy / d) * f * 1.1;
        }
      }

      if (p.x < -10) p.x = w + 10; else if (p.x > w + 10) p.x = -10;
      if (p.y < -10) p.y = h + 10; else if (p.y > h + 10) p.y = -10;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.c},0.6)`;
      ctx.fill();
    }

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i], b = particles[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < linkDist) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(255,255,255,${0.16 * (1 - dist / linkDist)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    rafId = requestAnimationFrame(step);
  }

  hero.addEventListener('pointermove', (e) => {
    const rect = hero.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
    mouse.active = true;
  });
  hero.addEventListener('pointerleave', () => { mouse.active = false; });

  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 200);
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(rafId);
    } else {
      rafId = requestAnimationFrame(step);
    }
  });

  resize();
  rafId = requestAnimationFrame(step);
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

/* ---------- Scroll reveal (replays in + out on every pass) ---------- */
const revealItems = document.querySelectorAll('[data-reveal]');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    entry.target.classList.toggle('in-view', entry.isIntersecting);
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
