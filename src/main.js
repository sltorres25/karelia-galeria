import './style.css';

// Artwork Metadata Database
const artworksData = {
  1: {
    title: "Pulsaciones Andinas",
    artist: "Sofía Silva",
    category: "Abstracto",
    technique: "Acrílico sobre lienzo",
    dimensions: "120 x 150 cm",
    year: "2025",
    price: "$4,500 USD",
    image: "/src/assets/artworks/artwork1.png"
  },
  2: {
    title: "Ecos de Oaxaca",
    artist: "Mateo Torres",
    category: "Texturado",
    technique: "Pigmentos orgánicos y arena",
    dimensions: "100 x 100 cm",
    year: "2024",
    price: "$3,800 USD",
    image: "/src/assets/artworks/artwork2.png"
  },
  3: {
    title: "Fronteras Flotantes",
    artist: "Valentina Herrera",
    category: "Geométrico",
    technique: "Acrílico y óleo sobre lienzo",
    dimensions: "80 x 120 cm",
    year: "2025",
    price: "$3,200 USD",
    image: "/src/assets/artworks/artwork3.png"
  },
  4: {
    title: "Abstracción Rosa",
    artist: "Diego Franco",
    category: "Expresionismo",
    technique: "Óleo gestual sobre lienzo",
    dimensions: "140 x 140 cm",
    year: "2024",
    price: "$5,100 USD",
    image: "/src/assets/artworks/artwork4.png"
  },
  5: {
    title: "Sombras Urbanas",
    artist: "Mateo Torres",
    category: "Texturado",
    technique: "Óleo y pan de oro sobre lienzo",
    dimensions: "110 x 130 cm",
    year: "2025",
    price: "$4,200 USD",
    image: "/src/assets/artworks/artwork5.png"
  },
  6: {
    title: "Geometría del Ritmo",
    artist: "Sofía Silva",
    category: "Geométrico",
    technique: "Acrílico sobre tabla de madera",
    dimensions: "90 x 90 cm",
    year: "2025",
    price: "$2,900 USD",
    image: "/src/assets/artworks/artwork6.png"
  }
};

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initScrollReveal();
  initStatsCounters();
  initArtworkFilter();
  initArtworkModal();
  initTestimonialSlider();
  initContactForms();
});

/* -------------------------------------------------------------
 * Navbar & Mobile Menu Logic
 * ------------------------------------------------------------- */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Sticky scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Close menu when clicking links
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
      }
    });
  }
}

/* -------------------------------------------------------------
 * Scroll Reveal Animations
 * ------------------------------------------------------------- */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.scroll-reveal');
  
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // Unobserve after showing
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });
}

/* -------------------------------------------------------------
 * Numerical Statistics Counter
 * ------------------------------------------------------------- */
function initStatsCounters() {
  const statNumbers = document.querySelectorAll('.stat-number');
  
  const countObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const targetElement = entry.target;
        const targetValue = parseInt(targetElement.getAttribute('data-target'), 10);
        animateCounter(targetElement, targetValue);
        observer.unobserve(targetElement);
      }
    });
  }, {
    threshold: 0.5
  });

  statNumbers.forEach(num => {
    countObserver.observe(num);
  });
}

function animateCounter(element, target) {
  let start = 0;
  const duration = 1500; // ms
  const frameRate = 1000 / 60; // 60 FPS
  const totalFrames = Math.round(duration / frameRate);
  const increment = target / totalFrames;
  let currentFrame = 0;

  const timer = setInterval(() => {
    currentFrame++;
    start += increment;
    
    if (currentFrame >= totalFrames) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(start);
    }
  }, frameRate);
}

/* -------------------------------------------------------------
 * Catologue filtration logic
 * ------------------------------------------------------------- */
function initArtworkFilter() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const artworkItems = document.querySelectorAll('.artwork-item');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Toggle active states
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filterValue = button.getAttribute('data-filter');

      artworkItems.forEach(item => {
        const category = item.getAttribute('data-category');
        
        // Soft fade out first
        item.classList.remove('show');
        
        // Small delay to let fade-out render, then display matching items
        setTimeout(() => {
          if (filterValue === 'all' || category === filterValue) {
            item.classList.add('show');
          }
        }, 100);
      });
    });
  });

  // Support link clicks from the artists section
  const artistLinks = document.querySelectorAll('.artist-link');
  artistLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const filter = link.getAttribute('data-filter');
      if (filter) {
        const targetBtn = document.querySelector(`.filter-btn[data-filter="${filter}"]`);
        if (targetBtn) {
          targetBtn.click();
        }
      }
    });
  });
}

/* -------------------------------------------------------------
 * Lightbox Modal Logic
 * ------------------------------------------------------------- */
function initArtworkModal() {
  const modal = document.getElementById('artwork-modal');
  const modalBackdrop = document.getElementById('modal-backdrop');
  const modalClose = document.getElementById('modal-close');
  const artworkCards = document.querySelectorAll('.artwork-item');
  
  // Modal Fields
  const mImage = document.getElementById('modal-image');
  const mCategory = document.getElementById('modal-category');
  const mTitle = document.getElementById('modal-title');
  const mArtist = document.getElementById('modal-artist');
  const mTechnique = document.getElementById('modal-technique');
  const mDimensions = document.getElementById('modal-dimensions');
  const mYear = document.getElementById('modal-year');
  const mPrice = document.getElementById('modal-price');
  const mInquiryId = document.getElementById('inquiry-artwork-id');
  const mInquiryStatus = document.getElementById('inquiry-status');
  const mInquiryForm = document.getElementById('inquiry-form');

  artworkCards.forEach(card => {
    // Click on image wrapper triggers the modal
    const wrapper = card.querySelector('.artwork-image-wrapper');
    if (wrapper) {
      wrapper.addEventListener('click', () => {
        const id = card.getAttribute('data-id');
        const data = artworksData[id];
        
        if (data) {
          // Fill modal fields
          mImage.src = data.image;
          mImage.alt = `${data.title} - ${data.artist}`;
          mCategory.textContent = data.category;
          mTitle.textContent = data.title;
          mArtist.textContent = data.artist;
          mTechnique.textContent = data.technique;
          mDimensions.textContent = data.dimensions;
          mYear.textContent = data.year;
          mPrice.textContent = data.price;
          mInquiryId.value = id;
          
          // Clear status from previous views
          if (mInquiryStatus) {
            mInquiryStatus.textContent = '';
            mInquiryStatus.className = 'inquiry-status';
          }
          if (mInquiryForm) {
            mInquiryForm.reset();
            const textarea = document.getElementById('inquiry-message');
            if (textarea) {
              textarea.value = `Estoy interesado/a en recibir detalles de cotización y envío internacional para la obra "${data.title}" de ${data.artist}.`;
            }
          }

          // Open Modal
          modal.style.display = 'flex';
          document.body.style.overflow = 'hidden'; // Lock background scrolling
          
          // Trigger CSS transition delay
          setTimeout(() => {
            modal.classList.add('active');
          }, 10);
        }
      });
    }
  });

  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Unlock scroll
    
    // Wait for animation, then hide
    setTimeout(() => {
      modal.style.display = 'none';
    }, 400);
  };

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);

  // Close on Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* -------------------------------------------------------------
 * Testimonials Quote Slider
 * ------------------------------------------------------------- */
function initTestimonialSlider() {
  const slides = document.querySelectorAll('#testimonial-slider .slide');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  
  if (slides.length === 0) return;
  
  let currentIndex = 0;
  let autoSlideTimer = null;

  function showSlide(index) {
    // Handle wrap-around index
    if (index >= slides.length) {
      currentIndex = 0;
    } else if (index < 0) {
      currentIndex = slides.length - 1;
    } else {
      currentIndex = index;
    }

    slides.forEach((slide, idx) => {
      if (idx === currentIndex) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });
  }

  function startAutoSlide() {
    stopAutoSlide();
    autoSlideTimer = setInterval(() => {
      showSlide(currentIndex + 1);
    }, 6000); // 6s duration
  }

  function stopAutoSlide() {
    if (autoSlideTimer) {
      clearInterval(autoSlideTimer);
    }
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      showSlide(currentIndex + 1);
      startAutoSlide(); // reset timer
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      showSlide(currentIndex - 1);
      startAutoSlide(); // reset timer
    });
  }

  // Initialize first slide and timer
  showSlide(0);
  startAutoSlide();
}

/* -------------------------------------------------------------
 * Contact & Inquiry Form Submissions
 * ------------------------------------------------------------- */
function initContactForms() {
  // Main Contact Form
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      
      // Loading visual state
      submitBtn.textContent = 'Enviando...';
      submitBtn.disabled = true;
      formStatus.textContent = '';
      formStatus.className = 'form-status';

      // Simulate network request
      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Success feedback
        formStatus.textContent = '¡Gracias! Tu mensaje ha sido enviado con éxito. Un asesor de la galería te contactará en un plazo de 24 horas.';
        formStatus.classList.add('success');
        
        contactForm.reset();
      }, 1500);
    });
  }

  // Modal Inquiry Form
  const inquiryForm = document.getElementById('inquiry-form');
  const inquiryStatus = document.getElementById('inquiry-status');

  if (inquiryForm && inquiryStatus) {
    inquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = inquiryForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      
      submitBtn.textContent = 'Procesando consulta...';
      submitBtn.disabled = true;
      inquiryStatus.textContent = '';
      inquiryStatus.className = 'inquiry-status';

      // Simulate network request
      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Success feedback
        inquiryStatus.textContent = 'Consulta registrada. Hemos reservado temporalmente la pieza para ti y enviado los detalles de cotización a tu correo.';
        inquiryStatus.classList.add('success');
        
        inquiryForm.reset();
      }, 1200);
    });
  }
}
