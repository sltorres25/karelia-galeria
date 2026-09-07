import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, '..', 'data');
const DB_FILE = path.join(DATA_DIR, 'database.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Dynamically extract ALL artworks from src/main.js
function getArtworksFromMainJs() {
  try {
    const mainJsPath = path.join(__dirname, '..', 'src', 'main.js');
    if (fs.existsSync(mainJsPath)) {
      const content = fs.readFileSync(mainJsPath, 'utf8');
      const match = content.match(/const artworksData = (\{[\s\S]*?\n\};)/);
      if (match) {
        const jsCode = match[1].replace(/const artworksData = /, '').replace(/;\s*$/, '');
        const fn = new Function(`return ${jsCode}`);
        const rawObj = fn();
        return Object.entries(rawObj).map(([id, art]) => ({
          id: String(id),
          title: art.title || 'Sin título',
          artist: art.artist || 'Artista Desconocido',
          category: art.category || 'Abstracto',
          technique: art.technique || 'Técnica mixta',
          dimensions: art.dimensions || 'En consulta',
          year: art.year || '2024',
          price: art.price || 'Consultar',
          status: art.status || 'Disponible',
          image: art.image || '',
          description: art.description || `${art.technique || 'Obra original'} de ${art.artist}.`
        }));
      }
    }
  } catch (err) {
    console.error('Error parsing artworksData from main.js:', err);
  }
  return [
    { id: "4", title: "Cañaveral", artist: "Carlos René Aguilera", category: "Texturado", technique: "Acrílico sobre lienzo", dimensions: "150 x 100 cm", year: "2024", price: "2.500 €", status: "Disponible", image: "/src/Artistas/Carlos Rene Aguilera/Cañaveral 150x100 cm.jpeg", description: "Composición dinámica con rica textura acrílica." }
  ];
}

// Initial site text content seed
const initialContent = {
  hero_title: "Arte latinoamericano y caribeño <em>original</em> para coleccionistas de todo el mundo.",
  hero_desc: "Conectamos el talento de los artistas más inspiradores de América Latina con coleccionistas que aprecian la autenticidad, la textura y la historia detrás de cada trazo.",
  hero_btn1: "Descubrir Artistas",
  hero_btn2: "Ver Colección",
  about_title: "Nuestra Filosofía",
  about_subtitle: "Pasión por la autenticidad y el arte caribeño",
  about_desc: "En Arte Mestizo seleccionamos cuidadosamente obras únicas de maestros consagrados y jóvenes promesas del arte contemporáneo caribeño y latinoamericano.",
  contact_title: "Contacto & Asesoría Privada",
  contact_desc: "¿Deseas recibir detalles sobre una obra, cotizar un envío internacional o agendar una consulta privada? Nuestro equipo está a tu disposición.",
  contact_email: "contacto@artemestizo.com",
  contact_phone: "+34 910 000 000",
  artists_section_title: "Artistas destacados",
  works_section_title: "Obras destacadas",
  works_section_subtitle: "Explora una cuidada selección de pinturas únicas. Filtra según el estilo que mejor combine con tu espacio o colección."
};

// Initial visual theme seed (Design Tokens)
const initialTheme = {
  primary: "#c5a880",
  secondary: "#a88a62",
  bg: "#faf9f6",
  text: "#161616",
  btn: "#161616",
  accent: "#dcc39f"
};

// Get default database object with hashed passwords for initial seed
function getSeedData() {
  const salt = bcrypt.genSaltSync(10);
  const artworks = getArtworksFromMainJs();
  return {
    users: [
      {
        id: "usr_admin1",
        email: "admin1@artemestizo.com",
        passwordHash: bcrypt.hashSync("Admin2026!Key1", salt),
        name: "Administrador Principal",
        role: "admin",
        createdAt: new Date().toISOString()
      },
      {
        id: "usr_admin2",
        email: "admin2@artemestizo.com",
        passwordHash: bcrypt.hashSync("Admin2026!Key2", salt),
        name: "Administrador Galería",
        role: "admin",
        createdAt: new Date().toISOString()
      },
      {
        id: "usr_client1",
        email: "usuario@artemestizo.com",
        passwordHash: bcrypt.hashSync("User2026!Key", salt),
        name: "Elena Gómez",
        role: "user",
        address: "Calle Velázquez 45, 3ºA, Madrid",
        phone: "+34 612 345 678",
        favorites: ["4", "6", "10"],
        inquiries: [
          { artworkId: "4", date: "2026-08-12", status: "Respondida", message: "Interesada en envío asegurado a Madrid." }
        ],
        createdAt: new Date().toISOString()
      }
    ],
    artworks,
    content: initialContent,
    theme: initialTheme
  };
}

class JSONDatabase {
  constructor() {
    this.memoryDb = null;
    this.init();
  }

  init() {
    if (!this.memoryDb) {
      if (fs.existsSync(DB_FILE)) {
        try {
          const raw = fs.readFileSync(DB_FILE, 'utf8');
          this.memoryDb = JSON.parse(raw);
        } catch (e) {
          this.memoryDb = getSeedData();
        }
      } else {
        this.memoryDb = getSeedData();
        try {
          fs.writeFileSync(DB_FILE, JSON.stringify(this.memoryDb, null, 2), 'utf8');
        } catch (e) {
          // Read-only filesystem
        }
      }
    }
  }

  read() {
    if (!this.memoryDb) {
      this.init();
    }
    return this.memoryDb;
  }

  write(data) {
    this.memoryDb = data;
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
      return true;
    } catch (err) {
      try {
        const tmpPath = path.join('/tmp', 'database.json');
        fs.writeFileSync(tmpPath, JSON.stringify(data, null, 2), 'utf8');
      } catch (tmpErr) {
        // Fallback: in-memory state updated successfully
      }
      return true;
    }
  }

  // Users
  getUserByEmail(email) {
    const db = this.read();
    return db.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  }

  getUserById(id) {
    const db = this.read();
    return db.users.find(u => u.id === id);
  }

  createUser(userData) {
    const db = this.read();
    if (db.users.some(u => u.email.toLowerCase() === userData.email.toLowerCase())) {
      throw new Error('El correo electrónico ya está registrado.');
    }
    const salt = bcrypt.genSaltSync(10);
    const newUser = {
      id: 'usr_' + Date.now(),
      email: userData.email,
      passwordHash: bcrypt.hashSync(userData.password, salt),
      name: userData.name || userData.email.split('@')[0],
      role: 'user',
      address: userData.address || '',
      phone: userData.phone || '',
      favorites: [],
      inquiries: [],
      createdAt: new Date().toISOString()
    };
    db.users.push(newUser);
    this.write(db);
    return newUser;
  }

  updateUser(id, updates) {
    const db = this.read();
    const index = db.users.findIndex(u => u.id === id);
    if (index === -1) return null;
    db.users[index] = { ...db.users[index], ...updates };
    this.write(db);
    return db.users[index];
  }

  getAllUsers() {
    const db = this.read();
    return db.users.map(({ passwordHash, ...user }) => user);
  }

  // Artworks
  getAllArtworks() {
    const db = this.read();
    return db.artworks;
  }

  getArtworkById(id) {
    const db = this.read();
    return db.artworks.find(a => String(a.id) === String(id));
  }

  updateArtwork(id, updates) {
    const db = this.read();
    const index = db.artworks.findIndex(a => String(a.id) === String(id));
    if (index === -1) {
      const newArtwork = {
        id: String(id || Date.now()),
        ...updates
      };
      db.artworks.push(newArtwork);
      this.write(db);
      return newArtwork;
    }
    db.artworks[index] = { ...db.artworks[index], ...updates };
    this.write(db);
    return db.artworks[index];
  }

  // Content
  getContent() {
    const db = this.read();
    return db.content;
  }

  updateContent(newContent) {
    const db = this.read();
    db.content = { ...db.content, ...newContent };
    this.write(db);
    return db.content;
  }

  // Theme
  getTheme() {
    const db = this.read();
    return db.theme;
  }

  updateTheme(newTheme) {
    const db = this.read();
    db.theme = { ...db.theme, ...newTheme };
    this.write(db);
    return db.theme;
  }
}

export const db = new JSONDatabase();
