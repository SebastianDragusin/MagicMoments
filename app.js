// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const list = document.querySelector('.nav-list');
if (toggle) {
  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true' || false;
    toggle.setAttribute('aria-expanded', String(!expanded));
    list.classList.toggle('show');
  });
}

// Smooth scroll (native behavior in modern browsers via CSS/HTML; fallback here)
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (id.length > 1) {
      e.preventDefault();
      document.querySelector(id)?.scrollIntoView({behavior:'smooth'});
      list?.classList.remove('show');
      toggle?.setAttribute('aria-expanded','false');
    }
  });
});

// Current year
document.getElementById('year').textContent = new Date().getFullYear();
