document.addEventListener('DOMContentLoaded', () => {

  /* =========================
     MENU MOBILE
  ========================== */
  const mobileMenu = document.getElementById('mobile-menu');
  const navList = document.querySelector('.nav-list');

  if (mobileMenu && navList) {
    mobileMenu.addEventListener('click', () => {
      navList.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      const expanded = mobileMenu.getAttribute('aria-expanded') === 'true';
      mobileMenu.setAttribute('aria-expanded', (!expanded).toString());
    });

    document.querySelectorAll('.nav-list a').forEach(link => {
      link.addEventListener('click', () => {
        navList.classList.remove('active');
        mobileMenu.classList.remove('active');
        mobileMenu.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* =========================
     LAZY LOAD REAL
  ========================== */
  const lazyImages = document.querySelectorAll('img[data-src]');

  if ('IntersectionObserver' in window && lazyImages.length) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        observer.unobserve(img);
      });
    }, {
      rootMargin: '200px'
    });

    lazyImages.forEach(img => imageObserver.observe(img));
  }

  /* =========================
     ANIMAÇÕES DE SCROLL
  ========================== */
  const animatedElements = document.querySelectorAll('[data-animate]');

  if ('IntersectionObserver' in window && animatedElements.length) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          return;
        }

        entry.target.classList.remove('visible');
      });
    }, {
      threshold: 0.2,
      rootMargin: '0px 0px -10% 0px'
    });

    animatedElements.forEach(el => revealObserver.observe(el));
  }

  /* =========================
     LIGHTBOX (GALERIA)
  ========================== */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeBtn = document.querySelector('.close');

  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (!img) return;

      const fullSrc = img.dataset.full || img.currentSrc || img.src;
      if (!fullSrc) return;

      lightboxImg.src = fullSrc;
      lightboxImg.alt = img.alt || 'Tatuagem ampliada';
      lightbox.style.display = 'flex';
      document.body.style.overflow = 'hidden';
      closeBtn?.focus();
    });
  });

  if (closeBtn && lightbox) {
    closeBtn.addEventListener('click', () => {
      lightbox.style.display = 'none';
      document.body.style.overflow = 'auto';
    });

    lightbox.addEventListener('click', e => {
      if (e.target === lightbox) {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
      }
    });

    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && lightbox.style.display === 'flex') {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
      }
    });
  }

  /* =========================
     FORMULÁRIO → WHATSAPP
  ========================== */
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const size = document.getElementById('size').value;
      const description = document.getElementById('description').value.trim();

      if (!name || !size || !description) {
        alert('Preencha todos os campos.');
        return;
      }

      const phone = '5531995281748';

      const message =
        `Olá, me chamo ${name}.\n` +
        `Vim pelo site!\n` +
        `Tamanho aproximado: ${size}\n` +
        `Descrição: ${description}`;

      const whatsappURL = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

      window.open(whatsappURL, '_blank');
    });
  }

});
