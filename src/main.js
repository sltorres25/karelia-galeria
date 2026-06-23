import './style.css';

// Vite glob import for all images in src/Artistas
const artistImages = import.meta.glob('/src/Artistas/**/*.{jpg,jpeg,png,webp}', { eager: true });

function getImageUrl(path) {
  const resolved = artistImages[path];
  return resolved ? resolved.default : path;
}

// Artists Metadata Database
const artistsData = [
  {
    id: "alexis-pantoja",
    name: "Alexis Pantoja",
    flag: "🇨🇺",
    country: "Manzanillo, Cuba",
    bio: "Su pintura reinterpreta la figuración expresiva y lo fantástico mediante composiciones dinámicas con una pincelada gestual y texturas ricas.",
    image: "/src/Artistas/Alexis Pantoja/IMG-20250925-WA0000.jpg",
    filter: "abstracto"
  },
  {
    id: "carlos-rene-aguilera",
    name: "Carlos René Aguilera",
    flag: "🇨🇺",
    country: "Santiago de Cuba, Cuba",
    bio: "Explora la visualidad caribeña mediante formas enredadas, sogas y una profunda metáfora sobre la insularidad y el escape del confinamiento.",
    image: "/src/Artistas/Carlos Rene Aguilera/150x100 cm.jpeg",
    filter: "texturado"
  },
  {
    id: "gerlys-alvarez",
    name: "Gerlys Álvarez",
    flag: "🇨🇺",
    country: "Mariel, Cuba",
    bio: "Sobresaliente retratista y pintor de marinas que plasma la fuerza misteriosa del mar y la espina punzante del dolor y belleza humana.",
    image: "/src/Artistas/Gerlys Alvarez/140 x 56 cm.jpg",
    filter: "abstracto"
  },
  {
    id: "luis-molina",
    name: "Luis Molina",
    flag: "🇨🇺",
    country: "La Habana, Cuba",
    bio: "Representa el folclore afrocubano y la vida rural bajo el intenso mediodía caribeño, con un dominio singular de la luz y la transparencia.",
    image: "/src/Artistas/Luis Molina/18 x 24 pulgadas.jpeg",
    filter: "texturado"
  },
  {
    id: "manuel-lopez-oliva",
    name: "Manuel López Oliva",
    flag: "🇨🇺",
    country: "Manzanillo, Cuba",
    bio: "Prestigioso creador y crítico que concibe la obra como un escenario teatral, empleando la máscara como símbolo de la identidad y la teatralidad social.",
    image: "/src/Artistas/Manuel Lopez Oliva/Screenshot_20250818_140622_Drive.jpg",
    filter: "expresionismo"
  },
  {
    id: "maria-consuelo",
    name: "María Consuelo",
    flag: "🇨🇺",
    country: "La Habana, Cuba",
    bio: "Sus abstracciones orgánicas sobre soportes pesados investigan la textura y los ritmos naturales íntimos de la geografía caribeña.",
    image: "/src/Artistas/Maria Consuelo/38 x 28 in. .jpeg",
    filter: "abstracto"
  },
  {
    id: "maykel-herrera",
    name: "Maykel Herrera",
    flag: "🇨🇺",
    country: "La Habana, Cuba",
    bio: "A través del retrato expresivo de niños con miradas intensas, crea metáforas poéticas e irónicas sobre la realidad y psicología social.",
    image: "/src/Artistas/Maykel Herrera/Rezo. 59x43. Canvas.jpg",
    filter: "expresionismo"
  },
  {
    id: "orestes-gaulhiac",
    name: "Orestes Gaulhiac",
    flag: "🇨🇺",
    country: "Santiago de Cuba, Cuba",
    bio: "Destacado por sus escenas de ensueño y místicas que mezclan humanos, animales y una vibrante naturaleza caribeña naif.",
    image: "/src/Artistas/Orestes Gaulhiac/Gaulhiac. 36 x 36 in .jpeg",
    filter: "geometrico"
  },
  {
    id: "pedro-alvarez-gendis",
    name: "Pedro Álvarez Gendis",
    flag: "🇨🇺",
    country: "Camagüey, Cuba",
    bio: "Sus composiciones abstractas investigan el espacio arquitectónico, la tensión cromática y las estructuras de la memoria urbana.",
    image: "/src/Artistas/Pedro Avila/Pedro Alvarez Gendis. 36x47 in.jpg",
    filter: "abstracto"
  },
  {
    id: "pedro-avila",
    name: "Pedro Ávila",
    flag: "🇨🇺",
    country: "La Habana, Cuba",
    bio: "Concibe la abstracción lírica como un territorio interior de emociones puras, tensión y gran intensidad gestual cromática.",
    image: "/src/Artistas/Pedro Avila/48 x 71 in.jpg",
    filter: "abstracto"
  },
  {
    id: "vicente-dopico",
    name: "Vicente Dopico",
    flag: "🇨🇺",
    country: "La Habana, Cuba",
    bio: "Maestro del expresionismo simbólico caribeño cuyas espirales y figuras híbridas exploran la psique profunda e introspectiva.",
    image: "/src/Artistas/Vicente Dopico/26 x 22 in.jpeg",
    filter: "abstracto"
  }
];

// Artwork Metadata Database
const artworksData = {
  1: {
    title: "Quietud Dinámica",
    artist: "Alexis Pantoja",
    category: "Abstracto",
    technique: "Óleo sobre lienzo",
    dimensions: "150 x 150 cm",
    year: "2025",
    price: "$5,200 USD",
    image: "/src/Artistas/Alexis Pantoja/IMG-20250925-WA0000.jpg"
  },
  2: {
    title: "Fragmentos del Viento",
    artist: "Alexis Pantoja",
    category: "Expresionismo",
    technique: "Óleo sobre lienzo",
    dimensions: "120 x 100 cm",
    year: "2024",
    price: "$4,500 USD",
    image: "/src/Artistas/Alexis Pantoja/IMG-20250925-WA0003.jpg"
  },
  3: {
    title: "Rumbos Invisibles",
    artist: "Alexis Pantoja",
    category: "Abstracto",
    technique: "Óleo sobre lienzo",
    dimensions: "100 x 80 cm",
    year: "2024",
    price: "$3,900 USD",
    image: "/src/Artistas/Alexis Pantoja/IMG-20250925-WA0004.jpg"
  },
  4: {
    title: "Horizonte Sensible",
    artist: "Carlos René Aguilera",
    category: "Texturado",
    technique: "Acrílico sobre lienzo",
    dimensions: "150 x 100 cm",
    year: "2024",
    price: "$4,800 USD",
    image: "/src/Artistas/Carlos Rene Aguilera/150x100 cm.jpeg"
  },
  5: {
    title: "Laberinto del Tiempo",
    artist: "Carlos René Aguilera",
    category: "Expresionismo",
    technique: "Acrílico sobre lienzo",
    dimensions: "120 x 120 cm",
    year: "2025",
    price: "$4,200 USD",
    image: "/src/Artistas/Carlos Rene Aguilera/120x120 cm.jpg"
  },
  6: {
    title: "Fuera del Radar",
    artist: "Gerlys Álvarez",
    category: "Abstracto",
    technique: "Acrílico sobre cartulina",
    dimensions: "140 x 56 cm",
    year: "2020",
    price: "$4,200 USD",
    image: "/src/Artistas/Gerlys Alvarez/140 x 56 cm.jpg"
  },
  7: {
    title: "Marea Silenciosa",
    artist: "Gerlys Álvarez",
    category: "Abstracto",
    technique: "Acrílico sobre lienzo",
    dimensions: "100 x 80 cm",
    year: "2025",
    price: "$3,800 USD",
    image: "/src/Artistas/Gerlys Alvarez/IMG-20260127-WA0006.jpg"
  },
  8: {
    title: "Abismo Azul",
    artist: "Gerlys Álvarez",
    category: "Texturado",
    technique: "Acrílico sobre lienzo",
    dimensions: "120 x 90 cm",
    year: "2025",
    price: "$4,000 USD",
    image: "/src/Artistas/Gerlys Alvarez/IMG-20260127-WA0007.jpg"
  },
  9: {
    title: "Estudio de Luz",
    artist: "Luis Molina",
    category: "Texturado",
    technique: "Técnica mixta sobre lienzo",
    dimensions: "18 x 24 in",
    year: "2024",
    price: "$2,800 USD",
    image: "/src/Artistas/Luis Molina/18 x 24 pulgadas.jpeg"
  },
  10: {
    title: "Máscara de Carnaval",
    artist: "Manuel López Oliva",
    category: "Expresionismo",
    technique: "Óleo sobre lienzo",
    dimensions: "100 x 80 cm",
    year: "2023",
    price: "$4,500 USD",
    image: "/src/Artistas/Manuel Lopez Oliva/Screenshot_20250818_140622_Drive.jpg"
  },
  11: {
    title: "Danza Ritual",
    artist: "Manuel López Oliva",
    category: "Expresionismo",
    technique: "Óleo sobre lienzo",
    dimensions: "120 x 100 cm",
    year: "2024",
    price: "$5,000 USD",
    image: "/src/Artistas/Manuel Lopez Oliva/Screenshot_20250818_140649_Drive.jpg"
  },
  12: {
    title: "Composición Orgánica I",
    artist: "María Consuelo",
    category: "Abstracto",
    technique: "Acrílico sobre papel pesado",
    dimensions: "38 x 28 in",
    year: "2024",
    price: "$3,400 USD",
    image: "/src/Artistas/Maria Consuelo/38 x 28 in. .jpeg"
  },
  13: {
    title: "Composición Orgánica II",
    artist: "María Consuelo",
    category: "Texturado",
    technique: "Acrílico sobre papel pesado",
    dimensions: "38 x 28 in",
    year: "2024",
    price: "$3,400 USD",
    image: "/src/Artistas/Maria Consuelo/Heavvy paper. 38 x 28 in.jpeg"
  },
  14: {
    title: "Rezo",
    artist: "Maykel Herrera",
    category: "Expresionismo",
    technique: "Óleo sobre lienzo",
    dimensions: "150 x 110 cm",
    year: "2023",
    price: "$5,800 USD",
    image: "/src/Artistas/Maykel Herrera/Rezo. 59x43. Canvas.jpg"
  },
  15: {
    title: "Expedición",
    artist: "Maykel Herrera",
    category: "Expresionismo",
    technique: "Óleo sobre lienzo",
    dimensions: "43 x 59 in",
    year: "2011",
    price: "$6,200 USD",
    image: "/src/Artistas/Maykel Herrera/Expedicion. 2011. 43 x 59 in.jpg"
  },
  16: {
    title: "Bajo la Lluvia",
    artist: "Orestes Gaulhiac",
    category: "Geométrico",
    technique: "Acrílico sobre lienzo",
    dimensions: "90 x 90 cm",
    year: "2024",
    price: "$3,600 USD",
    image: "/src/Artistas/Orestes Gaulhiac/Gaulhiac. 36 x 36 in .jpeg"
  },
  17: {
    title: "Cuentos de la Selva",
    artist: "Orestes Gaulhiac",
    category: "Geométrico",
    technique: "Acrílico sobre lienzo",
    dimensions: "48 x 36 in",
    year: "2024",
    price: "$4,800 USD",
    image: "/src/Artistas/Orestes Gaulhiac/Gaulhiac. 48x36 in. .jpeg"
  },
  18: {
    title: "Construcción del Espacio",
    artist: "Pedro Álvarez Gendis",
    category: "Abstracto",
    technique: "Técnica mixta sobre lienzo",
    dimensions: "36 x 47 in",
    year: "2023",
    price: "$4,700 USD",
    image: "/src/Artistas/Pedro Avila/Pedro Alvarez Gendis. 36x47 in.jpg"
  },
  19: {
    title: "Estructuras Urbanas",
    artist: "Pedro Álvarez Gendis",
    category: "Abstracto",
    technique: "Técnica mixta sobre lienzo",
    dimensions: "47 x 36 in",
    year: "2023",
    price: "$4,700 USD",
    image: "/src/Artistas/Pedro Avila/Pedro Alvarez Gendis. 47x36 in.jpg"
  },
  20: {
    title: "Sinfonía del Alba",
    artist: "Pedro Ávila",
    category: "Abstracto",
    technique: "Técnica mixta sobre lienzo",
    dimensions: "182 x 152 cm",
    year: "2025",
    price: "$6,500 USD",
    image: "/src/Artistas/Pedro Avila/48 x 71 in.jpg"
  },
  21: {
    title: "Encuentro de Almas",
    artist: "Vicente Dopico",
    category: "Abstracto",
    technique: "Técnica mixta sobre lienzo",
    dimensions: "24 x 18 in",
    year: "2023",
    price: "$2,900 USD",
    image: "/src/Artistas/Vicente Dopico/24 x 18 in.jpeg"
  },
  22: {
    title: "Reflejos de la Memoria",
    artist: "Vicente Dopico",
    category: "Texturado",
    technique: "Técnica mixta sobre lienzo",
    dimensions: "26 x 22 in",
    year: "2023",
    price: "$3,200 USD",
    image: "/src/Artistas/Vicente Dopico/26 x 22 in.jpeg"
  }
};

function renderGallery() {
  const artistsGrid = document.getElementById('artists-grid');
  const artworksGrid = document.getElementById('artworks-grid');

  if (artistsGrid) {
    artistsGrid.innerHTML = artistsData.map(artist => `
      <div class="artist-card scroll-reveal">
        <div class="artist-image-container">
          <img src="${getImageUrl(artist.image)}" alt="${artist.name}" class="artist-image" loading="lazy" />
        </div>
        <div class="artist-info">
          <div class="artist-meta">
            <span class="artist-flag">${artist.flag}</span>
            <span class="artist-country">${artist.country}</span>
          </div>
          <h3 class="artist-name">${artist.name}</h3>
          <p class="artist-bio">${artist.bio}</p>
          <a href="#obras" class="artist-link" data-filter="${artist.filter}">Explorar obras &rarr;</a>
        </div>
      </div>
    `).join('');
  }

  if (artworksGrid) {
    artworksGrid.innerHTML = Object.entries(artworksData).map(([id, artwork]) => `
      <div class="artwork-item show" data-category="${artwork.category.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}" data-id="${id}">
        <div class="artwork-card">
          <div class="artwork-image-wrapper">
            <img src="${getImageUrl(artwork.image)}" alt="${artwork.title} de ${artwork.artist}" class="artwork-image" loading="lazy" />
            <div class="artwork-overlay">
              <div class="artwork-details-action">
                <span class="btn-circle">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </span>
                <span class="action-text">Ampliar detalles</span>
              </div>
            </div>
          </div>
          <div class="artwork-info">
            <h3 class="artwork-title">${artwork.title}</h3>
            <p class="artwork-artist">${artwork.artist}</p>
            <div class="artwork-meta">
              <span class="artwork-spec">${artwork.technique} • ${artwork.dimensions}</span>
              <span class="artwork-price">${artwork.price}</span>
            </div>
          </div>
        </div>
      </div>
    `).join('');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderGallery();
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
          mImage.src = getImageUrl(data.image);
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
