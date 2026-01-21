// Basic interactivity: mobile nav toggle, testimonials carousel, simple "add to cart" demo, and year.
document.addEventListener('DOMContentLoaded', function () {
  // Mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  navToggle?.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    if (mainNav) {
      mainNav.style.display = expanded ? 'none' : 'block';
    }
  });

  // Testimonials carousel (simple)
  const track = document.querySelector('.carousel-track');
  const items = track ? Array.from(track.children) : [];
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');
  let index = 0;

  function showIndex(i) {
    if (!track) return;
    index = (i + items.length) % items.length;
    items.forEach((el, idx) => {
      if (idx === index) {
        el.style.position = 'relative';
        el.style.opacity = '1';
        el.style.pointerEvents = 'auto';
        el.style.transform = 'none';
      } else {
        el.style.position = 'absolute';
        el.style.opacity = '0';
        el.style.pointerEvents = 'none';
        el.style.transform = 'translateY(8px) scale(0.995)';
      }
    });
    track.setAttribute('data-index', String(index));
  }

  prevBtn?.addEventListener('click', () => showIndex(index - 1));
  nextBtn?.addEventListener('click', () => showIndex(index + 1));

  // Auto-advance testimonials every 6s
  let carouselTimer = setInterval(() => showIndex(index + 1), 6000);
  [prevBtn, nextBtn].forEach(b => b?.addEventListener('click', () => {
    clearInterval(carouselTimer);
    carouselTimer = setInterval(() => showIndex(index + 1), 6000);
  }));

  showIndex(0);

  // Add to cart demo (no backend)
  document.querySelectorAll('.add-cart').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const target = e.currentTarget;
      const name = target.dataset.name || 'Item';
      const price = target.dataset.price || '0';
      // Very small inline toast
      const toast = document.createElement('div');
      toast.className = 'mini-toast';
      toast.textContent = `${name} added • $${price}`;
      Object.assign(toast.style, {
        position: 'fixed',
        right: '1rem',
        bottom: '1rem',
        background: '#081426',
        color: '#fff',
        padding: '0.6rem 0.9rem',
        borderRadius: '8px',
        boxShadow: '0 8px 20px rgba(2,6,23,0.35)',
        zIndex: 9999,
        opacity: 0,
        transition: 'opacity 250ms',
      });
      document.body.appendChild(toast);
      requestAnimationFrame(() => toast.style.opacity = 1);
      setTimeout(() => {
        toast.style.opacity = 0;
        setTimeout(() => toast.remove(), 250);
      }, 1800);
    });
  });

  // Fill current year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (href.length > 1) {
        const el = document.querySelector(href);
        if (el) {
          e.preventDefault();
          el.scrollIntoView({behavior: 'smooth', block: 'start'});
        }
      }
      // close mobile nav if open
      if (window.innerWidth <= 980) {
        mainNav && (mainNav.style.display = 'none');
        navToggle && navToggle.setAttribute('aria-expanded','false');
      }
    });
  });
});