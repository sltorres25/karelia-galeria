import './admin.css';

let currentAdminUser = null;
let allArtworks = [];
let allUsers = [];
let currentTheme = {};
let currentContent = {};

// DOM Elements
const adminApp = document.getElementById('admin-app');
const adminUserNameEl = document.getElementById('admin-user-name');
const adminAvatarEl = document.getElementById('admin-avatar');
const tabTitleEl = document.getElementById('tab-title');
const tabSubtitleEl = document.getElementById('tab-subtitle');
const navItems = document.querySelectorAll('.nav-item');
const panels = document.querySelectorAll('.admin-panel');
const toastContainer = document.getElementById('toast-container');

// Tab Titles Map
const tabInfo = {
  dashboard: { title: 'Resumen General', subtitle: 'Métricas clave y estado general de la galería' },
  artworks: { title: 'Obras y Precios', subtitle: 'Modifique precios, dimensiones, disponibilidad y datos de las obras' },
  appearance: { title: 'Paleta de Colores', subtitle: 'Personalice los colores globales de la web pública' },
  content: { title: 'Textos de la Web', subtitle: 'Edite los textos e información mostrada en las páginas' },
  users: { title: 'Gestión de Usuarios', subtitle: 'Cuentas de usuario registradas y roles de acceso' }
};

// Initialize Admin App
document.addEventListener('DOMContentLoaded', async () => {
  await checkAdminAuth();
  setupNavigation();
  setupThemePickers();
  setupEventListeners();
});

// Security Check
async function checkAdminAuth() {
  try {
    const res = await fetch('/api/auth/me');
    if (!res.ok) {
      window.location.href = '/?showLogin=true';
      return;
    }
    const data = await res.json();
    
    // Strict Role Enforcement
    if (!data.user || data.user.role !== 'admin') {
      alert('Acceso denegado. Se requieren permisos de administrador.');
      window.location.href = '/user-area.html';
      return;
    }

    currentAdminUser = data.user;
    adminUserNameEl.textContent = currentAdminUser.name || currentAdminUser.email;
    adminAvatarEl.textContent = (currentAdminUser.name || currentAdminUser.email).charAt(0).toUpperCase();
    
    // Show admin interface
    adminApp.style.display = 'flex';
    
    // Load initial data
    await loadAdminData();
  } catch (err) {
    console.error('Error verifying auth:', err);
    window.location.href = '/?showLogin=true';
  }
}

// Load data from API
async function loadAdminData() {
  try {
    const [dataRes, usersRes] = await Promise.all([
      fetch('/api/data'),
      fetch('/api/admin/users')
    ]);

    if (dataRes.ok) {
      const data = await dataRes.json();
      allArtworks = data.artworks || [];
      currentTheme = data.theme || {};
      currentContent = data.content || {};
    }

    if (usersRes.ok) {
      const uData = await usersRes.json();
      allUsers = uData.users || [];
    }

    renderDashboardStats();
    renderArtworksTable(allArtworks);
    populateThemeForm(currentTheme);
    populateContentForm(currentContent);
    renderUsersTable(allUsers);
  } catch (err) {
    showToast('Error al cargar datos del servidor', 'error');
  }
}

// Navigation Tabs
function setupNavigation() {
  navItems.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');
      switchAdminTab(targetTab);
    });
  });
}

window.switchAdminTab = function(tabKey) {
  navItems.forEach(item => {
    if (item.getAttribute('data-tab') === tabKey) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });

  panels.forEach(panel => {
    if (panel.id === `panel-${tabKey}`) {
      panel.classList.add('active');
    } else {
      panel.classList.remove('active');
    }
  });

  if (tabInfo[tabKey]) {
    tabTitleEl.textContent = tabInfo[tabKey].title;
    tabSubtitleEl.textContent = tabInfo[tabKey].subtitle;
  }
};

// --- DASHBOARD ---
function renderDashboardStats() {
  document.getElementById('stat-total-artworks').textContent = allArtworks.length;
  const availableCount = allArtworks.filter(a => a.status === 'Disponible').length;
  const soldCount = allArtworks.filter(a => a.status === 'Vendida').length;
  
  document.getElementById('stat-available-artworks').textContent = availableCount;
  document.getElementById('stat-sold-artworks').textContent = soldCount;
  document.getElementById('stat-users').textContent = allUsers.length;

  // Theme preview swatches
  const swatchContainer = document.getElementById('dashboard-theme-preview');
  if (swatchContainer && currentTheme) {
    swatchContainer.innerHTML = `
      <div style="display:flex; gap:8px; flex-wrap:wrap; margin-top:10px;">
        <span class="badge" style="background:${currentTheme.primary}; color:#000; padding:6px 12px; border-radius:6px; font-weight:600;">Principal: ${currentTheme.primary}</span>
        <span class="badge" style="background:${currentTheme.secondary}; color:#fff; padding:6px 12px; border-radius:6px; font-weight:600;">Secundario: ${currentTheme.secondary}</span>
        <span class="badge" style="background:${currentTheme.bg}; color:#000; padding:6px 12px; border-radius:6px; font-weight:600; border:1px solid #ccc;">Fondo: ${currentTheme.bg}</span>
      </div>
    `;
  }
}

// --- ARTWORKS TABLE & EDIT MODAL ---
function renderArtworksTable(artworks) {
  const tbody = document.getElementById('artworks-table-body');
  if (!tbody) return;

  if (artworks.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding:2rem; color:var(--admin-text-muted);">No se encontraron obras registrados.</td></tr>`;
    return;
  }

  tbody.innerHTML = artworks.map(art => {
    const statusClass = (art.status || 'Disponible').toLowerCase();
    return `
      <tr>
        <td>
          <div class="table-artwork-item" style="display:flex; align-items:center;">
            <span style="width:28px; height:28px; background:rgba(197,168,128,0.15); color:var(--admin-gold); border-radius:6px; display:inline-flex; align-items:center; justify-content:center; font-size:14px; margin-right:10px;">🎨</span>
            <strong>${art.title}</strong>
          </div>
        </td>
        <td>${art.artist || '-'}</td>
        <td><strong style="color:var(--admin-gold);">${art.price || 'Consultar'}</strong></td>
        <td>${art.dimensions || '-'}</td>
        <td>${art.category || '-'}</td>
        <td><span class="badge-status ${statusClass}">${art.status || 'Disponible'}</span></td>
        <td>
          <button class="btn btn-admin-secondary" style="padding:4px 10px; font-size:0.75rem;" onclick="openEditArtworkModal('${art.id}')">
            ✏️ Editar
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

// Search Filter
document.getElementById('artworks-search')?.addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase();
  const filtered = allArtworks.filter(a => 
    a.title.toLowerCase().includes(query) ||
    a.artist.toLowerCase().includes(query) ||
    a.category.toLowerCase().includes(query)
  );
  renderArtworksTable(filtered);
});

// Edit Artwork Modal Trigger
window.openEditArtworkModal = function(id) {
  const artwork = allArtworks.find(a => String(a.id) === String(id));
  if (!artwork) return;

  document.getElementById('modal-form-title').textContent = `Editar Obra: "${artwork.title}"`;
  document.getElementById('edit-artwork-id').value = artwork.id;
  document.getElementById('edit-title').value = artwork.title || '';
  document.getElementById('edit-price').value = artwork.price || '';
  document.getElementById('edit-dimensions').value = artwork.dimensions || '';
  document.getElementById('edit-artist').value = artwork.artist || '';
  document.getElementById('edit-category').value = artwork.category || 'Abstracto';
  document.getElementById('edit-status').value = artwork.status || 'Disponible';
  document.getElementById('edit-year').value = artwork.year || '';
  document.getElementById('edit-technique').value = artwork.technique || '';
  document.getElementById('edit-description').value = artwork.description || '';

  document.getElementById('artwork-edit-modal').classList.add('active');
};

window.closeArtworkModal = function() {
  document.getElementById('artwork-edit-modal').classList.remove('active');
};

// Add New Artwork Trigger
document.getElementById('btn-add-artwork')?.addEventListener('click', () => {
  document.getElementById('modal-form-title').textContent = 'Añadir Nueva Obra';
  document.getElementById('edit-artwork-id').value = 'new_' + Date.now();
  document.getElementById('edit-title').value = '';
  document.getElementById('edit-price').value = 'Consultar';
  document.getElementById('edit-dimensions').value = '';
  document.getElementById('edit-artist').value = '';
  document.getElementById('edit-category').value = 'Abstracto';
  document.getElementById('edit-status').value = 'Disponible';
  document.getElementById('edit-year').value = new Date().getFullYear().toString();
  document.getElementById('edit-technique').value = 'Acrílico sobre lienzo';
  document.getElementById('edit-description').value = '';

  document.getElementById('artwork-edit-modal').classList.add('active');
});

// Save Artwork Changes
document.getElementById('artwork-edit-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = document.getElementById('edit-artwork-id').value;

  const payload = {
    title: document.getElementById('edit-title').value,
    price: document.getElementById('edit-price').value,
    dimensions: document.getElementById('edit-dimensions').value,
    artist: document.getElementById('edit-artist').value,
    category: document.getElementById('edit-category').value,
    status: document.getElementById('edit-status').value,
    year: document.getElementById('edit-year').value,
    technique: document.getElementById('edit-technique').value,
    description: document.getElementById('edit-description').value
  };

  try {
    const res = await fetch(`/api/admin/artworks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.error || 'Error al guardar la obra');

    showToast(`✅ Obra "${payload.title}" guardada con éxito.`, 'success');
    closeArtworkModal();
    await loadAdminData();
  } catch (err) {
    showToast(err.message, 'error');
  }
});

// --- THEME & COLOR PALETTE ---
function setupThemePickers() {
  const fields = ['primary', 'secondary', 'bg', 'text', 'btn', 'accent'];
  fields.forEach(field => {
    const picker = document.getElementById(`color-${field}`);
    const hex = document.getElementById(`hex-${field}`);
    
    if (picker && hex) {
      picker.addEventListener('input', (e) => {
        hex.value = e.target.value;
        updateLivePreview();
      });
      hex.addEventListener('input', (e) => {
        if (/^#[0-9A-F]{6}$/i.test(e.target.value)) {
          picker.value = e.target.value;
          updateLivePreview();
        }
      });
    }
  });
}

function populateThemeForm(theme) {
  if (!theme) return;
  Object.keys(theme).forEach(key => {
    const picker = document.getElementById(`color-${key}`);
    const hex = document.getElementById(`hex-${key}`);
    if (picker && hex) {
      picker.value = theme[key];
      hex.value = theme[key];
    }
  });
  updateLivePreview();
}

function updateLivePreview() {
  const primary = document.getElementById('color-primary')?.value || '#c5a880';
  const secondary = document.getElementById('color-secondary')?.value || '#a88a62';
  const bg = document.getElementById('color-bg')?.value || '#faf9f6';
  const text = document.getElementById('color-text')?.value || '#161616';
  const btn = document.getElementById('color-btn')?.value || '#161616';
  const accent = document.getElementById('color-accent')?.value || '#dcc39f';

  const previewBox = document.getElementById('live-preview-box');
  const prevBadge = document.getElementById('prev-badge');
  const prevTitle = document.getElementById('prev-title');
  const prevText = document.getElementById('prev-text');
  const prevBtnPrimary = document.getElementById('prev-btn-primary');
  const prevBtnOutline = document.getElementById('prev-btn-outline');

  if (previewBox) {
    previewBox.style.backgroundColor = bg;
    if (prevBadge) {
      prevBadge.style.backgroundColor = accent;
      prevBadge.style.color = text;
    }
    if (prevTitle) prevTitle.style.color = text;
    if (prevText) prevText.style.color = text;
    if (prevBtnPrimary) {
      prevBtnPrimary.style.backgroundColor = btn;
      prevBtnPrimary.style.color = '#ffffff';
    }
    if (prevBtnOutline) {
      prevBtnOutline.style.color = primary;
      prevBtnOutline.style.borderColor = primary;
    }
  }
}

// Save Theme Form
document.getElementById('theme-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const themePayload = {
    primary: document.getElementById('color-primary').value,
    secondary: document.getElementById('color-secondary').value,
    bg: document.getElementById('color-bg').value,
    text: document.getElementById('color-text').value,
    btn: document.getElementById('color-btn').value,
    accent: document.getElementById('color-accent').value
  };

  try {
    const res = await fetch('/api/admin/theme', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(themePayload)
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.error || 'Error al guardar el tema');

    currentTheme = result.theme;
    showToast('🎨 Paleta de colores actualizada correctamente.', 'success');
    renderDashboardStats();
  } catch (err) {
    showToast(err.message, 'error');
  }
});

// Reset Theme
document.getElementById('btn-reset-theme')?.addEventListener('click', async () => {
  const defaultTheme = {
    primary: "#c5a880",
    secondary: "#a88a62",
    bg: "#faf9f6",
    text: "#161616",
    btn: "#161616",
    accent: "#dcc39f"
  };
  populateThemeForm(defaultTheme);
  showToast('Restablecidos valores por defecto en el formulario.', 'info');
});

// --- EDITABLE CONTENT ---
function populateContentForm(content) {
  if (!content) return;
  Object.keys(content).forEach(key => {
    const input = document.querySelector(`[name="${key}"]`);
    if (input) {
      input.value = content[key];
    }
  });
}

document.getElementById('content-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const contentPayload = {};
  formData.forEach((val, key) => {
    contentPayload[key] = val;
  });

  try {
    const res = await fetch('/api/admin/content', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contentPayload)
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.error || 'Error al guardar el contenido');

    currentContent = result.content;
    showToast('📝 Textos de la web actualizados con éxito.', 'success');
  } catch (err) {
    showToast(err.message, 'error');
  }
});

// --- USERS TABLE ---
function renderUsersTable(users) {
  const tbody = document.getElementById('users-table-body');
  if (!tbody) return;

  if (users.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding:2rem; color:var(--admin-text-muted);">No hay usuarios.</td></tr>`;
    return;
  }

  tbody.innerHTML = users.map(u => `
    <tr>
      <td><strong>${u.name || 'Sin Nombre'}</strong></td>
      <td>${u.email}</td>
      <td>
        <span class="badge-status ${u.role === 'admin' ? 'vendida' : 'disponible'}">
          ${u.role === 'admin' ? 'Administrador' : 'Cliente'}
        </span>
      </td>
      <td>${u.phone || '-'}</td>
      <td>${u.createdAt ? new Date(u.createdAt).toLocaleDateString('es-ES') : '-'}</td>
    </tr>
  `).join('');
}

// Event Listeners (Logout & Helpers)
function setupEventListeners() {
  document.getElementById('btn-admin-logout')?.addEventListener('click', async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      window.location.href = '/';
    } catch (err) {
      window.location.href = '/';
    }
  });
}

function showToast(message, type = 'success') {
  if (!toastContainer) return;
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `<span>${message}</span>`;
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}
