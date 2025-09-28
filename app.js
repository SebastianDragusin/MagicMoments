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

// === Netlify Forms via fetch + popup „Mulțumim” ===
function encodeForm(data) {
  return Object.keys(data)
    .map(k => encodeURIComponent(k) + "=" + encodeURIComponent(data[k]))
    .join("&");
}

const formEl = document.getElementById("contactForm");
const submitBtn = document.getElementById("contactSubmit");
const modal = document.getElementById("thankyou");
const modalClose = document.querySelector(".modal-close");
const modalClose2 = document.getElementById("closeThanks");

function openModal(){ modal.classList.add("show"); modal.setAttribute("aria-hidden","false"); }
function closeModal(){ modal.classList.remove("show"); modal.setAttribute("aria-hidden","true"); }

formEl?.addEventListener("submit", async (e) => {
  e.preventDefault();

  // anti-bot: dacă honeypot-ul e completat, ieșim
  if (formEl.querySelector('input[name="bot-field"]')?.value) return;

  submitBtn.disabled = true;
  submitBtn.textContent = "Se trimite…";

  // construim payload-ul pentru Netlify
  const formData = new FormData(formEl);
  const payload = { "form-name": formEl.getAttribute("name") };
  for (const [k, v] of formData.entries()) payload[k] = v;

  try {
    await fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encodeForm(payload),
    });
    formEl.reset();
    openModal();
  } catch (err) {
    console.error(err);
    alert("Eroare la trimitere. Te rugăm încearcă din nou.");
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Trimite";
  }
});

// închiderea popup-ului
modalClose?.addEventListener("click", closeModal);
modalClose2?.addEventListener("click", closeModal);
modal?.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });
