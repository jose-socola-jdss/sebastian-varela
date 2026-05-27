document.addEventListener('DOMContentLoaded', () => {
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // Hamburger Menu
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // Lightbox Modal Setup
  const galleryItems = document.querySelectorAll('.gallery-item');
  const modal = document.querySelector('.lightbox-modal');
  const modalClose = document.querySelector('.lightbox-close');
  const modalContentText = document.querySelector('.lightbox-content span');

  if (galleryItems.length > 0 && modal && modalClose) {
    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        const text = item.getAttribute('data-title');
        modalContentText.textContent = text;
        modal.classList.add('active');
      });
    });

    modalClose.addEventListener('click', () => {
      modal.classList.remove('active');
    });

    // Close when clicking overlay
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });
  }

  
  // Sebastian Varela Full-Screen Lightbox logic
  const lightbox = document.getElementById('art-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxDesc = document.getElementById('lightbox-desc');
  const closeBtn = document.querySelector('.lightbox-close');
  const items = document.querySelectorAll('.gallery-item');

  if (lightbox && items.length > 0) {
    items.forEach(item => {
      item.addEventListener('click', () => {
        const title = item.getAttribute('data-title') || "Obra Artística";
        const desc = item.getAttribute('data-desc') || "Fotografía de Autor · Impresión Giclée";
        // Extract background-image URL
        const bgImg = window.getComputedStyle(item).backgroundImage;
        let url = bgImg.replace(/url\(['"]?(.*?)['"]?\)/i, '$1');
        
        lightboxImg.src = url;
        lightboxTitle.innerText = title;
        lightboxDesc.innerText = desc;
        lightbox.style.display = "flex";
      });
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        lightbox.style.display = "none";
      });
    }

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.style.display = "none";
      }
    });
  }

  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Mensaje enviado. Sebastián Varela responderá su consulta de fotografía artística o comercial a la brevedad.');
      form.reset();
    });
  }
});

// ===== BLYP PREMIUM ENHANCEMENTS =====
window.addEventListener('load', function() {
  const loader = document.querySelector('.preloader');
  if (loader) {
    loader.classList.add('fade-out');
    setTimeout(() => loader.remove(), 600);
  }
});

document.addEventListener('DOMContentLoaded', function() {
  // Initialize Intersection Observer for Scroll Reveal
  const revealItems = document.querySelectorAll('.reveal-item, .origin-card, .service-card, .testimonial-card, .photo-card, .product-card, .member-card, .case-card, .team-card, .timeline-step, .benefit-card, .recipe-card, .pricing-card, .class-card, .room-card, .contact-grid');
  const observerOptions = {
    threshold: 0.05,
    rootMargin: '0px 0px -40px 0px'
  };
  
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  revealItems.forEach(item => {
    item.classList.add('reveal-item');
    revealObserver.observe(item);
  });

  // Contact Form Ajax Simulation
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    // Clone and replace form to remove any inline alert listeners
    const newForm = form.cloneNode(true);
    form.parentNode.replaceChild(newForm, form);
    
    newForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const submitBtn = newForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.classList.add('btn-loading');
        submitBtn.disabled = true;
      }
      
      setTimeout(() => {
        const formWrap = newForm.closest('.contact-form-wrap') || newForm.parentElement;
        if (formWrap) {
          formWrap.innerHTML = `
            <div class="contact-form-success">
              <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check-circle-2"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
              <h2 style="margin-top: 1rem; color: var(--primary); font-family: inherit;">¡Solicitud Enviada con Éxito!</h2>
              <p style="margin-top: 0.5rem; color: var(--text); opacity: 0.8; font-size: 0.95rem;">Gracias por contactarnos. Te responderemos a la brevedad en las próximas 24 horas.</p>
            </div>
          `;
        }
      }, 1500);
    });
  });
});
