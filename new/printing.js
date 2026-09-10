// ---------------------------------------------------------------------
// Lightbox carousel for printing sample photos. Click any product photo
// (or its expand button) to open a full-size carousel of that
// category's sample images.
//
// To add more samples per category, just add more filenames to the
// arrays below (assets/print-shirts-4.jpg, -5.jpg, etc.) — nothing
// else needs to change.
// ---------------------------------------------------------------------

const GALLERIES = {
  shirts: [
    'assets/print-shirts-1.jpg',
    'assets/print-shirts-2.jpg',
    'assets/print-shirts-3.jpg',
  ],
  tarpaulins: [
    'assets/print-tarpaulins-1.jpg',
    'assets/print-tarpaulins-2.jpg',
    'assets/print-tarpaulins-3.jpg',
  ],
  stickers: [
    'assets/print-stickers-1.jpg',
    'assets/print-stickers-2.jpg',
    'assets/print-stickers-3.jpg',
  ],
  other: [
    'assets/print-other-1.jpg',
    'assets/print-other-2.jpg',
    'assets/print-other-3.jpg',
  ],
};

document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.getElementById('lightbox');
  if (!overlay) return;

  const imgEl = document.getElementById('lightbox-img');
  const phEl = document.getElementById('lightbox-placeholder');
  const phLabel = phEl.querySelector('.img-ph-label');
  const counterEl = document.getElementById('lightbox-counter');
  const closeBtn = document.getElementById('lightbox-close');
  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');

  let currentImages = [];
  let currentIndex = 0;
  let lastFocused = null;

  function showSlide(index) {
    currentIndex = (index + currentImages.length) % currentImages.length;
    const src = currentImages[currentIndex];

    imgEl.style.display = 'none';
    phEl.style.display = 'none';

    const probe = new Image();
    probe.onload = () => {
      imgEl.src = src;
      imgEl.style.display = 'block';
    };
    probe.onerror = () => {
      phLabel.innerHTML = `Sample photo not added yet<br><small>${src}</small>`;
      phEl.style.display = 'flex';
    };
    probe.src = src;

    counterEl.textContent = `${currentIndex + 1} / ${currentImages.length}`;
  }

  function openGallery(key) {
    currentImages = GALLERIES[key] || [];
    if (!currentImages.length) return;

    lastFocused = document.activeElement;
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    showSlide(0);
    closeBtn.focus();
    document.addEventListener('keydown', onKeydown);
  }

  function closeGallery() {
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
    imgEl.src = '';
    document.removeEventListener('keydown', onKeydown);
    if (lastFocused) lastFocused.focus();
  }

  function onKeydown(e) {
    if (e.key === 'Escape') closeGallery();
    if (e.key === 'ArrowLeft') showSlide(currentIndex - 1);
    if (e.key === 'ArrowRight') showSlide(currentIndex + 1);
  }

  document.querySelectorAll('.media-frame[data-gallery]').forEach((frame) => {
    frame.addEventListener('click', () => openGallery(frame.dataset.gallery));
    frame.setAttribute('tabindex', '0');
    frame.setAttribute('role', 'button');
    frame.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openGallery(frame.dataset.gallery);
      }
    });
  });

  closeBtn.addEventListener('click', closeGallery);
  prevBtn.addEventListener('click', () => showSlide(currentIndex - 1));
  nextBtn.addEventListener('click', () => showSlide(currentIndex + 1));

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeGallery();
  });
});
