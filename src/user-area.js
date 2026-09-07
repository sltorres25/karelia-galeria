import './admin.css';

let currentUser = null;
let allArtworks = [];

document.addEventListener('DOMContentLoaded', async () => {
  await checkUserAuth();
  setupEventListeners();
});

async function checkUserAuth() {
  try {
    const res = await fetch('/api/auth/me');
    if (!res.ok) {
      window.location.href = '/?showLogin=true';
      return;
    }

    const data = await res.json();
    currentUser = data.user;

    // Strict Redirection if admin attempts to open user area
    if (currentUser.role === 'admin') {
      window.location.href = '/admin';
      return;
    }

    // Display user app
    document.getElementById('user-app').style.display = 'block';
    document.getElementById('user-welcome-title').textContent = `Hola, ${currentUser.name || currentUser.email}`;

    // Populate form
    document.getElementById('u-name').value = currentUser.name || '';
    document.getElementById('u-email').value = currentUser.email || '';
    document.getElementById('u-phone').value = currentUser.phone || '';
    document.getElementById('u-address').value = currentUser.address || '';

    // Load artworks for favorites display
    const dataRes = await fetch('/api/data');
    if (dataRes.ok) {
      const gData = await dataRes.json();
      allArtworks = gData.artworks || [];
    }

    renderFavorites();
    renderInquiries();
  } catch (err) {
    console.error('Error loading user auth:', err);
    window.location.href = '/?showLogin=true';
  }
}

function renderFavorites() {
  const container = document.getElementById('user-favorites-container');
  if (!container) return;

  const favIds = currentUser.favorites || [];
  const favArtworks = allArtworks.filter(a => favIds.includes(String(a.id)));

  if (favArtworks.length === 0) {
    container.innerHTML = `<p style="color:var(--admin-text-muted); font-size:0.85rem;">No has guardado obras favoritas aún.</p>`;
    return;
  }

  container.innerHTML = favArtworks.map(art => `
    <div class="favorite-card">
      <img src="${art.image || '/src/assets/artworks/artwork6.png'}" alt="${art.title}" />
      <div class="favorite-card-info">
        <h4>${art.title}</h4>
        <p>${art.price || 'Consultar'}</p>
      </div>
    </div>
  `).join('');
}

function renderInquiries() {
  const container = document.getElementById('user-inquiries-container');
  if (!container) return;

  const inquiries = currentUser.inquiries || [];
  if (inquiries.length === 0) {
    container.innerHTML = `<p style="color:var(--admin-text-muted); font-size:0.85rem;">No has realizado consultas de cotización recientemente.</p>`;
    return;
  }

  container.innerHTML = inquiries.map(inq => {
    const art = allArtworks.find(a => String(a.id) === String(inq.artworkId));
    return `
      <div style="background:var(--admin-bg-input); padding:0.85rem; border-radius:8px; margin-bottom:0.5rem; border:1px solid var(--admin-border);">
        <div style="display:flex; justify-space-between; align-items:center;">
          <strong style="font-size:0.85rem; color:#fff;">Obra: ${art ? art.title : 'Consulta General'}</strong>
          <span class="badge-status disponible" style="font-size:0.7rem;">${inq.status || 'Enviada'}</span>
        </div>
        <p style="font-size:0.8rem; color:var(--admin-text-muted); margin-top:0.25rem;">"${inq.message || ''}"</p>
      </div>
    `;
  }).join('');
}

function setupEventListeners() {
  document.getElementById('user-profile-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const payload = {
      name: document.getElementById('u-name').value,
      phone: document.getElementById('u-phone').value,
      address: document.getElementById('u-address').value
    };

    try {
      const res = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Error al actualizar el perfil');

      currentUser = result.user;
      alert('✅ Tus datos personales han sido actualizados correctamente.');
    } catch (err) {
      alert('Error: ' + err.message);
    }
  });

  document.getElementById('btn-user-logout')?.addEventListener('click', async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    window.location.href = '/';
  });
}
