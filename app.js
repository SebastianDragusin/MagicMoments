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
      document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
      list?.classList.remove('show');
      toggle?.setAttribute('aria-expanded', 'false');
    }
  });
});

// Current year
document.getElementById('year').textContent = new Date().getFullYear();


// ==========================
//     Lightbox pentru galerie
// ==========================
const lb = document.getElementById('lightbox');
const lbImg = document.getElementById('lightbox-img');
const lbClose = document.querySelector('.lightbox-close');

// Deschidere la click pe imagine
document.querySelectorAll('.gallery img.zoomable').forEach(img => {
  img.addEventListener('click', () => {
    lbImg.src = img.src;
    lbImg.alt = img.alt || '';
    lb.classList.add('show');
    lb.setAttribute('aria-hidden', 'false');
  });
});

// Funcție închidere
function closeLightbox() {
  lb.classList.remove('show');
  lb.setAttribute('aria-hidden', 'true');
  lbImg.src = '';
}

// Închidere pe buton ×
lbClose?.addEventListener('click', closeLightbox);

// Închidere pe click în afara imaginii
lb?.addEventListener('click', (e) => {
  if (e.target === lb) closeLightbox();
});

// Închidere cu ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});
