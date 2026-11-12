window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

window.addEventListener('load', () => {

  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 100);

});

console.log("Portfolio Website Loaded Successfully");
const menuToggle = document.getElementById('menu-toggle');

const mobileNav = document.getElementById('mobile-nav');

const icon = menuToggle.querySelector('i');

menuToggle.addEventListener('click', () => {

  mobileNav.classList.toggle('active');

  document.body.classList.toggle('menu-open');

  if (mobileNav.classList.contains('active')) {

    icon.classList.remove('fa-bars');
    icon.classList.add('fa-xmark');

  } else {

    icon.classList.remove('fa-xmark');
    icon.classList.add('fa-bars');
  }

});

/* Close after click */

document.querySelectorAll('#mobile-nav a').forEach(link => {

  link.addEventListener('click', () => {

    mobileNav.classList.remove('active');

    document.body.classList.remove('menu-open');

    icon.classList.remove('fa-xmark');
    icon.classList.add('fa-bars');

  });

});


/* =========================
   ANIMATIONS & 3D EFFECTS
========================= */

(() => {

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* Scroll progress bar */

  const bar = document.createElement('div');
  bar.className = 'scroll-progress';
  document.body.appendChild(bar);

  const updateBar = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
  };

  window.addEventListener('scroll', updateBar, { passive: true });
  updateBar();

  /* Scroll reveal */

  const groups = [
    '#about p',
    '.services-grid .card',
    '.projects-subheading',
    '.projects-grid .project-card',
    '.testimonial-desc',
    '.testimonial-grid .testimonial-card',
    '.contact-section > p',
    '.contact-section .buttons',
    '.contact-form',
    'footer'
  ];

  const revealItems = [];

  groups.forEach(selector => {
    document.querySelectorAll(selector).forEach((el, i) => {
      el.classList.add('reveal');
      el.style.setProperty('--delay', `${(i % 3) * 0.12}s`);
      revealItems.push(el);
    });
  });

  const headings = document.querySelectorAll('.section h2');

  if (reduceMotion || !('IntersectionObserver' in window)) {

    revealItems.forEach(el => el.classList.add('in-view'));
    headings.forEach(el => el.classList.add('in-view'));

  } else {

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    revealItems.forEach(el => observer.observe(el));
    headings.forEach(el => observer.observe(el));
  }

  if (reduceMotion || !finePointer) return;

  /* 3D tilt + spotlight on cards */

  document.querySelectorAll('.card, .project-card, .testimonial-card').forEach(card => {

    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;

      card.style.setProperty('--ry', `${(x - 0.5) * 10}deg`);
      card.style.setProperty('--rx', `${(0.5 - y) * 10}deg`);
      card.style.setProperty('--mx', `${x * 100}%`);
      card.style.setProperty('--my', `${y * 100}%`);
    });

    card.addEventListener('mouseleave', () => {
      card.style.setProperty('--rx', '0deg');
      card.style.setProperty('--ry', '0deg');
    });
  });

  /* Hero: subtle 3D parallax following the mouse */

  const hero = document.querySelector('.hero');
  const heroContent = document.querySelector('.hero-content');

  if (hero && heroContent) {

    hero.addEventListener('mousemove', e => {
      const r = hero.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;

      heroContent.style.transform = `rotateY(${x * 6}deg) rotateX(${-y * 6}deg)`;
    });

    hero.addEventListener('mouseleave', () => {
      heroContent.style.transform = 'rotateY(0) rotateX(0)';
    });
  }

})();

/* Footer year updates automatically */

const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
