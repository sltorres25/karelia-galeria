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

// Initial artworks seed data
const initialArtworks = [
  { id: "4", title: "Cañaveral", artist: "Carlos René Aguilera", category: "Texturado", technique: "Acrílico sobre lienzo", dimensions: "150 x 100 cm", year: "2024", price: "2.500 €", status: "Disponible", image: "/src/Artistas/Carlos Rene Aguilera/Cañaveral 150x100 cm.jpeg", description: "Composición dinámica con rica textura acrílica y metáforas visuales caribeñas." },
  { id: "5", title: "Laberinto del Tiempo", artist: "Carlos René Aguilera", category: "Expresionismo", technique: "Acrílico sobre lienzo", dimensions: "120 x 120 cm", year: "2025", price: "3.200 €", status: "Disponible", image: "/src/Artistas/Carlos Rene Aguilera/120x120 cm.jpg", description: "Formas enredadas y sogas en una metáfora sobre el tiempo y la insularidad." },
  { id: "6", title: "Fuera del Radar", artist: "Gerlys Álvarez", category: "Abstracto", technique: "Acrílico sobre cartulina", dimensions: "140 x 56 cm", year: "2020", price: "1.800 €", status: "Disponible", image: "/src/Artistas/Gerlys Alvarez/140 x 56 cm.jpg", description: "Abstracción marina de gran profundidad gestual e intensidad lumínica." },
  { id: "7", title: "Marea Silenciosa", artist: "Gerlys Álvarez", category: "Abstracto", technique: "Acrílico sobre lienzo", dimensions: "100 x 80 cm", year: "2025", price: "2.100 €", status: "Disponible", image: "/src/Artistas/Gerlys Alvarez/IMG-20260127-WA0006.jpg", description: "Exploración de ritmos marinos y texturas de luz serena." },
  { id: "8", title: "Abismo Azul", artist: "Gerlys Álvarez", category: "Texturado", technique: "Acrílico sobre lienzo", dimensions: "120 x 90 cm", year: "2025", price: "2.800 €", status: "Disponible", image: "/src/Artistas/Gerlys Alvarez/IMG-20260127-WA0007.jpg", description: "Superficie de pigmentos azules marinos cargada de fuerza espiritual." },
  { id: "9", title: "Pensamiento", artist: "Luis Molina", category: "Expresionismo", technique: "Óleo sobre lienzo", dimensions: "60 x 80 cm", year: "2023", price: "1.950 €", status: "Disponible", image: "/src/Artistas/Luis Molina/Pensamiento.jpeg", description: "Folclore afrocubano y manejo maestro de la luz matutina." },
  { id: "10", title: "Después de la máscara", artist: "Manuel López Oliva", category: "Expresionismo", technique: "Acrílico sobre lienzo", dimensions: "120 x 100 cm", year: "2023", price: "4.500 €", status: "Disponible", image: "/src/Artistas/Manuel Lopez Oliva/Después de la máscara.jpg", description: "Escenario teatral con el símbolo de la máscara social." },
  { id: "11", title: "El poder de la piña", artist: "Manuel López Oliva", category: "Expresionismo", technique: "Acrílico sobre lienzo", dimensions: "80 x 100 cm", year: "2023", price: "3.900 €", status: "Disponible", image: "/src/Artistas/Manuel Lopez Oliva/El poder de la piña.jpg", description: "Simbolismo figurativo sobre identidad y cultura tropical." },
  { id: "14", title: "Génesis", artist: "Maykel Herrera", category: "Expresionismo", technique: "Técnica mixta sobre lienzo", dimensions: "60 x 45 cm", year: "2023", price: "2.200 €", status: "Disponible", image: "/src/Artistas/Maykel Herrera/Génesis.jpg", description: "Retrato expresivo de mirada intensa con poética irónica." },
  { id: "15", title: "Expedición", artist: "Maykel Herrera", category: "Expresionismo", technique: "Óleo sobre lienzo", dimensions: "110 x 150 cm", year: "2011", price: "4.800 €", status: "Vendida", image: "/src/Artistas/Maykel Herrera/Expedicion. 2011. 43 x 59 in.jpg", description: "Gran formato de figuración expresiva emblemática del autor." },
  { id: "16", title: "Fantasía Mística", artist: "Orestes Gaulhiac", category: "Geométrico", technique: "Acrílico sobre lienzo", dimensions: "91 x 91 cm", year: "2024", price: "3.100 €", status: "Disponible", image: "/src/Artistas/Orestes Gaulhiac/Gaulhiac. 36 x 36 in .jpeg", description: "Escena de ensueño naif que une humanos y animales caribeños." },
  { id: "17", title: "La novia alada", artist: "Orestes Gaulhiac", category: "Geométrico", technique: "Óleo sobre lienzo", dimensions: "120 x 90 cm", year: "2024", price: "3.600 €", status: "Disponible", image: "/src/Artistas/Orestes Gaulhiac/La novia alada.jpeg", description: "Mística naif con una vibrante paleta caribeña." },
  { id: "18", title: "Construcción del Espacio", artist: "Pedro Ávila Gendis", category: "Abstracto", technique: "Técnica mixta sobre lienzo", dimensions: "91 x 119 cm", year: "2023", price: "2.700 €", status: "Disponible", image: "/src/Artistas/Pedro Avila/Pedro Alvarez Gendis. 36x47 in.jpg", description: "Abstracción lírica con gran tensión cromática." },
  { id: "23", title: "Rostro Geométrico I", artist: "Miguel Ulloa", category: "Expresionismo", technique: "Óleo sobre lienzo", dimensions: "100 x 80 cm", year: "2024", price: "2.400 €", status: "Disponible", image: "/src/Artistas/Miguel Ulloa/WhatsApp Image 2026-06-17 at 11.13.26.jpeg", description: "Retrato estilizado con estructuras geométricas." },
  { id: "26", title: "Composición Silente", artist: "Cruz Escobedo", category: "Abstracto", technique: "Técnica mixta sobre lienzo", dimensions: "160 x 109 cm", year: "2024", price: "3.800 €", status: "Disponible", image: "/src/Artistas/Cruz Escobedo/Cruz Escobedo. 63 x 43 in.jpeg", description: "Precisión hiperrealista y abstracción de materiales." },
  { id: "27", title: "Muro y Tiempo", artist: "Silvia Castagnino", category: "Texturado", technique: "Técnica mixta sobre lienzo", dimensions: "68 x 97 cm", year: "2010", price: "2.900 €", status: "Disponible", image: "/src/Artistas/Silvia Castagnino/Silvia Castagnino. 27 x 38.5 in. 2010.jpg", description: "Abstracción matérica con texturas orgánicas resinosas." },
  { id: "31", title: "El Beso", artist: "Alex Stevenson", category: "Expresionismo", technique: "Acrílico sobre lienzo", dimensions: "106 x 116 cm", year: "2023", price: "3.500 €", status: "Disponible", image: "/src/Artistas/Alex Stevenson/El Beso. 42 x 46 in.png", description: "Realismo figurativo de fuerza corporal y emoción pura." },
  { id: "34", title: "Road to Gold", artist: "Orlando Boffill", category: "Expresionismo", technique: "Acrílico sobre lienzo", dimensions: "100 x 80 cm", year: "2024", price: "2.600 €", status: "Disponible", image: "/src/Artistas/Orlando Boffill/Road to Gold.jpg", description: "Expresionismo lúdico con personajes enigmáticos." }
];

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
    artworks: initialArtworks,
    content: initialContent,
    theme: initialTheme
  };
}

class JSONDatabase {
  constructor() {
    this.init();
  }

  init() {
    if (!fs.existsSync(DB_FILE)) {
      const seed = getSeedData();
      fs.writeFileSync(DB_FILE, JSON.stringify(seed, null, 2), 'utf8');
    }
  }

  read() {
    try {
      const raw = fs.readFileSync(DB_FILE, 'utf8');
      return JSON.parse(raw);
    } catch (err) {
      console.error('Error reading database file:', err);
      const seed = getSeedData();
      this.write(seed);
      return seed;
    }
  }

  write(data) {
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
      return true;
    } catch (err) {
      console.error('Error writing database file:', err);
      return false;
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
      // Create new artwork if id doesn't exist
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
