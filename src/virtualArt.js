/**
 * Virtual Art Room Visualizer ("Ver obra en tu espacio")
 * Premium Client-Side Canvas Perspective Visualizer
 * Karelia Galería
 */

import { renderWarpedArtwork, drawEditorHandles, getQuadBilinearPoint } from './perspectiveWarp.js';

class VirtualArtRoom {
  constructor() {
    this.modalEl = null;
    this.currentArtwork = null;
    this.roomImage = null; // Loaded HTMLImageElement of room photo
    this.artworkImage = null; // Loaded HTMLImageElement of artwork
    
    // Canvas & Contexts
    this.editorCanvas = null;
    this.editorCtx = null;
    this.resultCanvas = null;
    this.resultCtx = null;

    // Corner points [TL, TR, BR, BL] normalized (0..1) relative to room image
    this.normalizedCorners = [
      { x: 0.30, y: 0.25 }, // Top-Left
      { x: 0.70, y: 0.25 }, // Top-Right
      { x: 0.70, y: 0.65 }, // Bottom-Right
      { x: 0.30, y: 0.65 }  // Bottom-Left
    ];

    // Transformed pixel corners on editor canvas
    this.pixelCorners = [];

    // State & Settings
    this.frameType = 'none'; // 'none' | 'black' | 'wood'
    this.scale = 1.0; // 0.5 to 1.8
    this.offset = { x: 0, y: 0 }; // pixel drag offset
    this.shadowConfig = { opacity: 0.35, blur: 20, offsetX: 6, offsetY: 14 };

    this.activeStep = 'upload'; // 'upload' | 'editor' | 'result'
    this.activeHandleIndex = -1;
    this.hoveredHandleIndex = -1;
    this.isDraggingArtwork = false;
    this.dragStart = { x: 0, y: 0 };

    this.sampleRooms = [
      { name: "Salón Moderno", url: "/src/assets/hero-bg.png" },
      { name: "Galería Elegante", url: "/src/assets/philosophy-gallery.png" }
    ];
  }

  /**
   * Initializes DOM modal elements and event listeners
   */
  init() {
    if (document.getElementById('virtual-room-modal')) return;

    const modalHtml = `
      <div id="virtual-room-modal" class="virtual-room-modal">
        <div class="virtual-room-overlay" id="vroom-overlay"></div>
        <div class="virtual-room-card">
          <button class="virtual-room-close" id="vroom-close" aria-label="Cerrar">&times;</button>
          
          <!-- Header -->
          <div class="vroom-header">
            <span class="vroom-tag">Visualizador Privado</span>
            <h2 class="vroom-title">Ver esta obra en tu espacio</h2>
            <p class="vroom-subtitle">Descubre cómo lucirá sobre tu pared antes de adquirirla.</p>
          </div>

          <!-- Privacy Notice -->
          <div class="vroom-privacy-banner">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            <span>Tu fotografía se procesa de forma segura en tu dispositivo y no se almacena en ningún servidor.</span>
          </div>

          <!-- Active Artwork Preview Pill -->
          <div class="vroom-artwork-pill" id="vroom-artwork-pill">
            <img src="" alt="" id="vroom-pill-img" class="vroom-pill-img" />
            <div class="vroom-pill-details">
              <span id="vroom-pill-title" class="vroom-pill-title">Título</span>
              <span id="vroom-pill-artist" class="vroom-pill-artist">Artista</span>
            </div>
            <span id="vroom-pill-dim" class="vroom-pill-dim">📐 60 × 80 cm</span>
          </div>

          <!-- STEP 1: UPLOAD PHOTO -->
          <div class="vroom-step-view" id="vroom-step-upload">
            <div class="vroom-dropzone" id="vroom-dropzone">
              <input type="file" id="vroom-file-input" accept="image/jpeg,image/png,image/webp" style="display:none;" />
              <div class="dropzone-icon-wrapper">
                <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                  <circle cx="12" cy="13" r="4"/>
                </svg>
              </div>
              <h3>Sube una foto de tu habitación o pared</h3>
              <p>Arrastra tu imagen aquí o haz clic para seleccionarla desde tu dispositivo</p>
              <button class="btn btn-secondary" id="vroom-btn-select-file">Subir una foto</button>
            </div>

            <!-- Sample Rooms Selector -->
            <div class="vroom-samples-section">
              <p class="samples-title">¿No tienes una foto a mano? Prueba con una habitación de ejemplo:</p>
              <div class="vroom-samples-grid">
                <button class="sample-room-btn" data-url="/src/assets/philosophy-gallery.png">
                  <span>🏛️ Galería Elegante</span>
                </button>
                <button class="sample-room-btn" data-url="/src/assets/hero-bg.png">
                  <span>🛋️ Salón Contemporáneo</span>
                </button>
              </div>
            </div>
          </div>

          <!-- STEP 2: INTERACTIVE EDITOR -->
          <div class="vroom-step-view" id="vroom-step-editor" style="display:none;">
            <div class="editor-instructions">
              <strong>Selecciona dónde quieres colocar la obra:</strong> Arrastra las 4 esquinas para adaptar la pared a la perspectiva deseada.
            </div>

            <div class="canvas-container-wrapper" id="canvas-container-wrapper">
              <canvas id="vroom-editor-canvas"></canvas>
            </div>

            <!-- Toolbar Controls -->
            <div class="vroom-editor-controls">
              
              <!-- Scale Slider -->
              <div class="control-group">
                <label for="vroom-scale-slider">Tamaño:</label>
                <input type="range" id="vroom-scale-slider" min="0.4" max="1.8" step="0.05" value="1.0" />
                <span id="vroom-scale-label">100%</span>
              </div>

              <!-- Frame Selector -->
              <div class="control-group">
                <label>Marco:</label>
                <div class="btn-group-toggle">
                  <button class="frame-opt-btn active" data-frame="none">Sin marco</button>
                  <button class="frame-opt-btn" data-frame="black">Marco negro</button>
                  <button class="frame-opt-btn" data-frame="wood">Marco madera</button>
                </div>
              </div>

              <!-- Actions -->
              <div class="editor-action-buttons">
                <button class="btn btn-outline btn-sm" id="vroom-btn-reset">🔄 Reiniciar</button>
                <button class="btn btn-outline btn-sm" id="vroom-btn-change-photo">📷 Cambiar foto</button>
                <button class="btn btn-primary" id="vroom-btn-finish">✨ Ver Resultado</button>
              </div>

            </div>
          </div>

          <!-- STEP 3: RESULT VIEW -->
          <div class="vroom-step-view" id="vroom-step-result" style="display:none;">
            <div class="result-canvas-wrapper">
              <canvas id="vroom-result-canvas"></canvas>
            </div>

            <div class="result-cta-box">
              <h3>¿Te imaginas esta obra en tu espacio?</h3>
              <p>Adquiere la pieza original directamente o descarga el resultado para compartirlo.</p>
              
              <div class="result-buttons-row">
                <button class="btn btn-primary" id="vroom-btn-buy">🛒 Comprar esta obra</button>
                <button class="btn btn-secondary" id="vroom-btn-download">📥 Descargar imagen</button>
                <button class="btn btn-outline" id="vroom-btn-edit-again">✏️ Ajustar de nuevo</button>
              </div>
            </div>
          </div>

        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);
    this.modalEl = document.getElementById('virtual-room-modal');
    this.editorCanvas = document.getElementById('vroom-editor-canvas');
    this.editorCtx = this.editorCanvas.getContext('2d');
    this.resultCanvas = document.getElementById('vroom-result-canvas');
    this.resultCtx = this.resultCanvas.getContext('2d');

    this.bindEvents();
  }

  bindEvents() {
    // Close modal
    document.getElementById('vroom-close').addEventListener('click', () => this.close());
    document.getElementById('vroom-overlay').addEventListener('click', () => this.close());

    // File input & Dropzone
    const fileInput = document.getElementById('vroom-file-input');
    const dropzone = document.getElementById('vroom-dropzone');
    const selectBtn = document.getElementById('vroom-btn-select-file');

    selectBtn.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) {
        this.handleFileUpload(e.target.files[0]);
      }
    });

    // Drag & Drop
    dropzone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropzone.classList.add('dragover');
    });
    dropzone.addEventListener('dragleave', () => dropzone.classList.remove('dragover'));
    dropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropzone.classList.remove('dragover');
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        this.handleFileUpload(e.dataTransfer.files[0]);
      }
    });

    // Sample rooms
    document.querySelectorAll('.sample-room-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const url = btn.getAttribute('data-url');
        this.loadRoomFromUrl(url);
      });
    });

    // Editor Canvas Interactive Dragging (Mouse & Touch)
    const canvas = this.editorCanvas;

    const getPos = (e) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      return {
        x: (clientX - rect.left) * (canvas.width / rect.width),
        y: (clientY - rect.top) * (canvas.height / rect.height)
      };
    };

    const handlePointerDown = (e) => {
      if (this.activeStep !== 'editor') return;
      const pos = getPos(e);
      
      // Check if clicking handle
      const hitIdx = this.hitTestHandle(pos);
      if (hitIdx !== -1) {
        this.activeHandleIndex = hitIdx;
        e.preventDefault();
        return;
      }

      // Check if clicking inside quad to drag artwork
      if (this.isPointInsideQuad(pos, this.pixelCorners)) {
        this.isDraggingArtwork = true;
        this.dragStart = pos;
        e.preventDefault();
      }
    };

    const handlePointerMove = (e) => {
      if (this.activeStep !== 'editor') return;
      const pos = getPos(e);

      // Handle hover
      this.hoveredHandleIndex = this.hitTestHandle(pos);
      canvas.style.cursor = (this.hoveredHandleIndex !== -1 || this.activeHandleIndex !== -1)
        ? 'pointer'
        : (this.isPointInsideQuad(pos, this.pixelCorners) ? 'move' : 'default');

      if (this.activeHandleIndex !== -1) {
        e.preventDefault();
        // Update handle position
        this.pixelCorners[this.activeHandleIndex] = { x: pos.x, y: pos.y };
        this.renderEditor();
      } else if (this.isDraggingArtwork) {
        e.preventDefault();
        const dx = pos.x - this.dragStart.x;
        const dy = pos.y - this.dragStart.y;
        this.dragStart = pos;

        this.pixelCorners.forEach(p => {
          p.x += dx;
          p.y += dy;
        });
        this.renderEditor();
      }
    };

    const handlePointerUp = () => {
      this.activeHandleIndex = -1;
      this.isDraggingArtwork = false;
      this.renderEditor();
    };

    canvas.addEventListener('mousedown', handlePointerDown);
    canvas.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseup', handlePointerUp);

    canvas.addEventListener('touchstart', handlePointerDown, { passive: false });
    canvas.addEventListener('touchmove', handlePointerMove, { passive: false });
    window.addEventListener('touchend', handlePointerUp);

    // Scale slider
    const scaleSlider = document.getElementById('vroom-scale-slider');
    const scaleLabel = document.getElementById('vroom-scale-label');
    scaleSlider.addEventListener('input', (e) => {
      const newScale = parseFloat(e.target.value);
      this.applyScale(newScale);
      scaleLabel.textContent = `${Math.round(newScale * 100)}%`;
    });

    // Frame buttons
    document.querySelectorAll('.frame-opt-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.frame-opt-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.frameType = btn.getAttribute('data-frame');
        this.renderEditor();
      });
    });

    // Reset button
    document.getElementById('vroom-btn-reset').addEventListener('click', () => {
      this.resetCornersToDefault();
      this.renderEditor();
    });

    // Change photo button
    document.getElementById('vroom-btn-change-photo').addEventListener('click', () => {
      this.switchStep('upload');
    });

    // Finish / View Result
    document.getElementById('vroom-btn-finish').addEventListener('click', () => {
      this.renderFinalResult();
      this.switchStep('result');
    });

    // Edit again from result view
    document.getElementById('vroom-btn-edit-again').addEventListener('click', () => {
      this.switchStep('editor');
    });

    // Buy artwork from result CTA
    document.getElementById('vroom-btn-buy').addEventListener('click', () => {
      this.close();
      // Open inquiry/cart modal for current artwork
      const cartBtn = document.getElementById('modal-add-to-cart');
      if (cartBtn && this.currentArtwork) {
        cartBtn.click();
      }
    });

    // Download image
    document.getElementById('vroom-btn-download').addEventListener('click', () => {
      this.downloadResultImage();
    });
  }

  /**
   * Opens Virtual Room Modal for specified artwork
   */
  open(artworkData) {
    this.init();
    this.currentArtwork = artworkData;

    // Populate Pill Badge
    document.getElementById('vroom-pill-title').textContent = artworkData.title || 'Obra';
    document.getElementById('vroom-pill-artist').textContent = artworkData.artist || 'Artista';
    document.getElementById('vroom-pill-dim').textContent = `📐 ${artworkData.dimensions || '60 × 80 cm'}`;
    const pillImg = document.getElementById('vroom-pill-img');
    pillImg.src = artworkData.image || '';

    // Load artwork image
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      this.artworkImage = img;
      if (this.roomImage) {
        this.resetCornersToDefault();
        this.switchStep('editor');
      } else {
        this.switchStep('upload');
      }
    };
    img.src = artworkData.image || '';

    this.modalEl.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    setTimeout(() => this.modalEl.classList.add('active'), 10);
  }

  close() {
    if (!this.modalEl) return;
    this.modalEl.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(() => {
      this.modalEl.style.display = 'none';
    }, 400);
  }

  switchStep(step) {
    this.activeStep = step;
    document.getElementById('vroom-step-upload').style.display = step === 'upload' ? 'block' : 'none';
    document.getElementById('vroom-step-editor').style.display = step === 'editor' ? 'block' : 'none';
    document.getElementById('vroom-step-result').style.display = step === 'result' ? 'block' : 'none';

    if (step === 'editor') {
      setTimeout(() => this.setupEditorCanvas(), 50);
    }
  }

  handleFileUpload(file) {
    if (!file.type.match(/^image\/(jpeg|png|webp)$/i)) {
      alert('Por favor selecciona una imagen válida en formato JPG, PNG o WEBP.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      this.loadRoomFromUrl(e.target.result);
    };
    reader.readAsDataURL(file);
  }

  loadRoomFromUrl(url) {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      this.roomImage = img;
      this.resetCornersToDefault();
      this.switchStep('editor');
    };
    img.src = url;
  }

  setupEditorCanvas() {
    if (!this.roomImage) return;

    const container = document.getElementById('canvas-container-wrapper');
    const maxW = Math.min(container.clientWidth || 800, 1000);
    const maxH = 550;

    const imgW = this.roomImage.naturalWidth || this.roomImage.width;
    const imgH = this.roomImage.naturalHeight || this.roomImage.height;
    const aspect = imgW / imgH;

    let width = maxW;
    let height = width / aspect;

    if (height > maxH) {
      height = maxH;
      width = height * aspect;
    }

    this.editorCanvas.width = Math.round(width);
    this.editorCanvas.height = Math.round(height);

    this.resetCornersToDefault();
    this.renderEditor();
  }

  resetCornersToDefault() {
    if (!this.editorCanvas || !this.artworkImage) return;

    const cw = this.editorCanvas.width;
    const ch = this.editorCanvas.height;

    // Default artwork wall position centered
    const artW = this.artworkImage.naturalWidth || 300;
    const artH = this.artworkImage.naturalHeight || 400;
    const aspect = artW / artH;

    const quadH = ch * 0.45;
    const quadW = quadH * aspect;

    const cx = cw * 0.5;
    const cy = ch * 0.45;

    this.pixelCorners = [
      { x: cx - quadW / 2, y: cy - quadH / 2 }, // Top-Left
      { x: cx + quadW / 2, y: cy - quadH / 2 }, // Top-Right
      { x: cx + quadW / 2, y: cy + quadH / 2 }, // Bottom-Right
      { x: cx - quadW / 2, y: cy + quadH / 2 }  // Bottom-Left
    ];

    this.scale = 1.0;
    document.getElementById('vroom-scale-slider').value = 1.0;
    document.getElementById('vroom-scale-label').textContent = '100%';
  }

  applyScale(newScale) {
    if (this.pixelCorners.length < 4) return;
    const factor = newScale / this.scale;
    this.scale = newScale;

    // Center of quad
    const cx = (this.pixelCorners[0].x + this.pixelCorners[1].x + this.pixelCorners[2].x + this.pixelCorners[3].x) / 4;
    const cy = (this.pixelCorners[0].y + this.pixelCorners[1].y + this.pixelCorners[2].y + this.pixelCorners[3].y) / 4;

    this.pixelCorners = this.pixelCorners.map(p => ({
      x: cx + (p.x - cx) * factor,
      y: cy + (p.y - cy) * factor
    }));

    this.renderEditor();
  }

  hitTestHandle(pos) {
    const hitRadius = 24; // Generous touch target
    for (let i = 0; i < this.pixelCorners.length; i++) {
      const p = this.pixelCorners[i];
      const dist = Math.hypot(p.x - pos.x, p.y - pos.y);
      if (dist <= hitRadius) return i;
    }
    return -1;
  }

  isPointInsideQuad(p, quad) {
    // Cross-product point in convex polygon check
    let inside = false;
    for (let i = 0, j = quad.length - 1; i < quad.length; j = i++) {
      const xi = quad[i].x, yi = quad[i].y;
      const xj = quad[j].x, yj = quad[j].y;
      const intersect = ((yi > p.y) !== (yj > p.y)) && (p.x < (xj - xi) * (p.y - yi) / (yj - yi) + xi);
      if (intersect) inside = !inside;
    }
    return inside;
  }

  renderEditor() {
    if (!this.editorCtx || !this.roomImage) return;

    const ctx = this.editorCtx;
    const cw = this.editorCanvas.width;
    const ch = this.editorCanvas.height;

    ctx.clearRect(0, 0, cw, ch);

    // 1. Draw Room Photo
    ctx.drawImage(this.roomImage, 0, 0, cw, ch);

    // 2. Draw Perspective Artwork with Shadow & Frame
    if (this.artworkImage && this.pixelCorners.length === 4) {
      renderWarpedArtwork(ctx, this.artworkImage, this.pixelCorners, {
        gridSize: 18,
        frame: this.frameType,
        shadow: this.shadowConfig
      });
    }

    // 3. Draw Editor Handles & Guidelines
    drawEditorHandles(ctx, this.pixelCorners, this.activeHandleIndex, this.hoveredHandleIndex);
  }

  renderFinalResult() {
    if (!this.resultCanvas || !this.roomImage) return;

    const imgW = this.roomImage.naturalWidth || 1200;
    const imgH = this.roomImage.naturalHeight || 800;

    this.resultCanvas.width = imgW;
    this.resultCanvas.height = imgH;

    const ctx = this.resultCtx;
    ctx.clearRect(0, 0, imgW, imgH);

    // 1. Draw HD Room Photo
    ctx.drawImage(this.roomImage, 0, 0, imgW, imgH);

    // Scale pixel corners to high-res room image coordinates
    const scaleX = imgW / this.editorCanvas.width;
    const scaleY = imgH / this.editorCanvas.height;

    const hdCorners = this.pixelCorners.map(p => ({
      x: p.x * scaleX,
      y: p.y * scaleY
    }));

    // 2. Draw HD Perspective Artwork
    if (this.artworkImage) {
      renderWarpedArtwork(ctx, this.artworkImage, hdCorners, {
        gridSize: 24,
        frame: this.frameType,
        shadow: {
          opacity: 0.38,
          blur: Math.round(24 * scaleX),
          offsetX: Math.round(8 * scaleX),
          offsetY: Math.round(16 * scaleY)
        }
      });
    }
  }

  downloadResultImage() {
    if (!this.resultCanvas) return;
    const link = document.createElement('a');
    const titleSlug = (this.currentArtwork?.title || 'obra').toLowerCase().replace(/[^a-z0-9]+/g, '-');
    link.download = `arte-mestizo-${titleSlug}-en-tu-espacio.png`;
    link.href = this.resultCanvas.toDataURL('image/png');
    link.click();
  }
}

export const virtualArtRoom = new VirtualArtRoom();
