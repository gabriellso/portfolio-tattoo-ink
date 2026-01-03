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
    });

    document.querySelectorAll('.nav-list a').forEach(link => {
      link.addEventListener('click', () => {
        navList.classList.remove('active');
        mobileMenu.classList.remove('active');
      });
    });
  }

  /* =========================
     LAZY LOAD REAL
  ========================== */
  const lazyImages = document.querySelectorAll('img[data-src]');

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const img = entry.target;
      const picture = img.closest('picture');

      if (picture) {
        picture.querySelectorAll('source[data-srcset]').forEach(source => {
          source.srcset = source.dataset.srcset;
          source.removeAttribute('data-srcset');
        });
      }

      img.src = img.dataset.src;
      img.removeAttribute('data-src');
      observer.unobserve(img);
    });
  }, {
    rootMargin: '200px'
  });

  lazyImages.forEach(img => imageObserver.observe(img));

  /* =========================
     ANIMAÇÕES DE SCROLL
  ========================== */
  const animatedElements = document.querySelectorAll('[data-animate]');

  if (animatedElements.length) {
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
      if (!img || !img.src) return;

      lightboxImg.src = img.dataset.full;
      lightbox.style.display = 'flex';
      document.body.style.overflow = 'hidden';
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
