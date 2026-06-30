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
  },
  {
    id: "miguel-ulloa",
    name: "Miguel Ulloa",
    flag: "🇩🇴",
    country: "Puerto Plata, Rep. Dominicana",
    bio: "Pintor dominicano distinguido por sus retratos estilizados y el uso de formas geométricas que estructuran la figura humana con una vibrante paleta de colores.",
    image: "/src/Artistas/Miguel Ulloa/WhatsApp Image 2026-06-17 at 11.13.26.jpeg",
    filter: "expresionismo"
  },
  {
    id: "cruz-escobedo",
    name: "Cruz Escobedo",
    flag: "🇲🇽",
    country: "Jalisco, México",
    bio: "Pintor hiperrealista mexicano que destaca por capturar la realidad cotidiana con precisión y texturas profundas al óleo y técnica mixta.",
    image: "/src/Artistas/Cruz Escobedo/Cruz Escobedo. 63 x 43 in.jpeg",
    filter: "abstracto"
  },
  {
    id: "silvia-castagnino",
    name: "Silvia Castagnino",
    flag: "🇦🇷",
    country: "La Pampa, Argentina",
    bio: "Reconocida artista plástica argentina enfocada en la abstracción matérica y en la fuerza de las texturas orgánicas a través de técnicas mixtas.",
    image: "/src/Artistas/Silvia Castagnino/Silvia Castagnino. 27 x 38.5 in. 2010.jpg",
    filter: "texturado"
  },
  {
    id: "alex-stevenson",
    name: "Alex Stevenson",
    flag: "🇨🇴",
    country: "Cesar, Colombia",
    bio: "Pintor y dibujante colombiano cuya obra explora la fuerza expresiva del cuerpo humano y las emociones profundas mediante el realismo figurativo.",
    image: "/src/Artistas/Alex Stevenson/El Beso. 42 x 46 in.png",
    filter: "expresionismo"
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
  },
  23: {
    title: "Rostro Geométrico I",
    artist: "Miguel Ulloa",
    category: "Expresionismo",
    technique: "Óleo sobre lienzo",
    dimensions: "100 x 80 cm",
    year: "2024",
    price: "$4,200 USD",
    image: "/src/Artistas/Miguel Ulloa/WhatsApp Image 2026-06-17 at 11.13.26.jpeg"
  },
  24: {
    title: "Rostro Geométrico II",
    artist: "Miguel Ulloa",
    category: "Expresionismo",
    technique: "Óleo sobre lienzo",
    dimensions: "100 x 80 cm",
    year: "2024",
    price: "$4,200 USD",
    image: "/src/Artistas/Miguel Ulloa/WhatsApp Image 2026-06-17 at 11.13.27.jpeg"
  },
  25: {
    title: "Estudio de Personaje",
    artist: "Miguel Ulloa",
    category: "Expresionismo",
    technique: "Óleo sobre lienzo",
    dimensions: "100 x 80 cm",
    year: "2023",
    price: "$3,800 USD",
    image: "/src/Artistas/Miguel Ulloa/WhatsApp Image 2026-06-17 at 11.13.28.jpeg"
  },
  26: {
    title: "Composición Silente",
    artist: "Cruz Escobedo",
    category: "Abstracto",
    technique: "Técnica mixta sobre lienzo",
    dimensions: "63 x 43 in",
    year: "2024",
    price: "$5,400 USD",
    image: "/src/Artistas/Cruz Escobedo/Cruz Escobedo. 63 x 43 in.jpeg"
  },
  27: {
    title: "Muro y Tiempo",
    artist: "Silvia Castagnino",
    category: "Texturado",
    technique: "Técnica mixta sobre lienzo",
    dimensions: "27 x 38.5 in",
    year: "2010",
    price: "$4,100 USD",
    image: "/src/Artistas/Silvia Castagnino/Silvia Castagnino. 27 x 38.5 in. 2010.jpg"
  },
  28: {
    title: "Materia en Movimiento",
    artist: "Silvia Castagnino",
    category: "Texturado",
    technique: "Técnica mixta y resina",
    dimensions: "27 x 5 x 39 in",
    year: "2007",
    price: "$4,300 USD",
    image: "/src/Artistas/Silvia Castagnino/Silvia Castagnino. 27 x 5 x 39 in.  2007.jpg"
  },
  29: {
    title: "Texturas del Alba",
    artist: "Silvia Castagnino",
    category: "Texturado",
    technique: "Técnica mixta",
    dimensions: "24 x 36 in",
    year: "2021",
    price: "$3,800 USD",
    image: "/src/Artistas/Silvia Castagnino/20210625_103035.jpeg"
  },
  30: {
    title: "Huellas del Pasado",
    artist: "Silvia Castagnino",
    category: "Texturado",
    technique: "Técnica mixta",
    dimensions: "24 x 36 in",
    year: "2021",
    price: "$3,800 USD",
    image: "/src/Artistas/Silvia Castagnino/20210625_103044.jpeg"
  },
  31: {
    title: "El Beso",
    artist: "Alex Stevenson",
    category: "Expresionismo",
    technique: "Acrílico sobre lienzo",
    dimensions: "42 x 46 in",
    year: "2023",
    price: "$4,900 USD",
    image: "/src/Artistas/Alex Stevenson/El Beso. 42 x 46 in.png"
  },
  32: {
    title: "Tensión Anatómica",
    artist: "Alex Stevenson",
    category: "Expresionismo",
    technique: "Óleo sobre lienzo",
    dimensions: "48 x 52 in",
    year: "2024",
    price: "$5,200 USD",
    image: "/src/Artistas/Alex Stevenson/48 x 52 in.jpeg"
  },
  33: {
    title: "Vuelo Interior",
    artist: "Alex Stevenson",
    category: "Expresionismo",
    technique: "Óleo sobre lienzo",
    dimensions: "50 x 55 in",
    year: "2024",
    price: "$5,500 USD",
    image: "/src/Artistas/Alex Stevenson/50 x 55 in.jpeg"
  }
};

// Artwork Themes Mapping (Bilingual)
const artworkThemes = {
  1: { es: "Composición espacial", en: "Spatial composition" },
  2: { es: "Paisaje abstracto", en: "Abstract landscape" },
  3: { es: "Búsqueda interior", en: "Inner search" },
  4: { es: "Marina caribeña", en: "Caribbean seascape" },
  5: { es: "Tiempo y laberinto", en: "Time and labyrinth" },
  6: { es: "Marina expresiva", en: "Expressive seascape" },
  7: { es: "Marina silenciosa", en: "Silent seascape" },
  8: { es: "Abismo marino", en: "Marine abyss" },
  9: { es: "Estudio de luz", en: "Light study" },
  10: { es: "Teatralidad y máscara", en: "Theatricality and mask" },
  11: { es: "Ritual expresionista", en: "Expressionist ritual" },
  12: { es: "Naturaleza orgánica", en: "Organic nature" },
  13: { es: "Naturaleza y textura", en: "Nature and texture" },
  14: { es: "Retrato social", en: "Social portrait" },
  15: { es: "Retrato social", en: "Social portrait" },
  16: { es: "Fantasía mística", en: "Mystical fantasy" },
  17: { es: "Fantasía mística", en: "Mystical fantasy" },
  18: { es: "Arquitectura y memoria", en: "Architecture and memory" },
  19: { es: "Memoria urbana", en: "Urban memory" },
  20: { es: "Sinfonía del alba", en: "Symphony of dawn" },
  21: { es: "Misticismo psíquico", en: "Psychic mysticism" },
  22: { es: "Textura y memoria", en: "Texture and memory" },
  23: { es: "Retrato geométrico", en: "Geometric portrait" },
  24: { es: "Retrato geométrico", en: "Geometric portrait" },
  25: { es: "Estudio figurativo", en: "Figurative study" },
  26: { es: "Composición silente", en: "Silent composition" },
  27: { es: "Textura y tiempo", en: "Texture and time" },
  28: { es: "Materia en movimiento", en: "Matter in motion" },
  29: { es: "Texturas del alba", en: "Textures of dawn" },
  30: { es: "Huellas de memoria", en: "Traces of memory" },
  31: { es: "Retrato y afecto", en: "Portrait and affection" },
  32: { es: "Anatomía expresiva", en: "Expressive anatomy" },
  33: { es: "Figuración interior", en: "Inner figuration" }
};

// Assign themes dynamically to artworksData at startup
Object.entries(artworksData).forEach(([id, artwork]) => {
  artwork.theme = artworkThemes[id] || { es: "Composición libre", en: "Free composition" };
});

function getFlagSvg(flagEmoji) {
  const cubaFlag = `
    <svg class="artist-flag-svg" width="20" height="13" viewBox="0 0 30 20" fill="none" style="display:inline-block; vertical-align:middle; border-radius:1px; box-shadow:0 1px 2px rgba(0,0,0,0.1); margin-right:6px;" xmlns="http://www.w3.org/2000/svg">
      <rect width="30" height="4" fill="#002590"/>
      <rect y="4" width="30" height="4" fill="#ffffff"/>
      <rect y="8" width="30" height="4" fill="#002590"/>
      <rect y="12" width="30" height="4" fill="#ffffff"/>
      <rect y="16" width="30" height="4" fill="#002590"/>
      <path d="M0 0L15 10L0 20Z" fill="#D21034"/>
      <path d="M5 10L5.8 11.8L7.8 11.8L6.2 13L6.8 14.8L5 13.7L3.2 14.8L3.8 13L2.2 11.8L4.2 11.8Z" fill="#ffffff"/>
    </svg>
  `;

  const drFlag = `
    <svg class="artist-flag-svg" width="20" height="13" viewBox="0 0 30 20" fill="none" style="display:inline-block; vertical-align:middle; border-radius:1px; box-shadow:0 1px 2px rgba(0,0,0,0.1); margin-right:6px;" xmlns="http://www.w3.org/2000/svg">
      <rect width="13" height="8" fill="#002D62"/>
      <rect x="17" width="13" height="8" fill="#CE1126"/>
      <rect y="12" width="13" height="8" fill="#CE1126"/>
      <rect x="17" y="12" width="13" height="8" fill="#002D62"/>
      <rect x="13" width="4" height="20" fill="#FFFFFF"/>
      <rect y="8" width="30" height="4" fill="#FFFFFF"/>
      <rect x="14" y="9" width="2" height="2" fill="#007A33"/>
    </svg>
  `;

  const colombiaFlag = `
    <svg class="artist-flag-svg" width="20" height="13" viewBox="0 0 30 20" fill="none" style="display:inline-block; vertical-align:middle; border-radius:1px; box-shadow:0 1px 2px rgba(0,0,0,0.1); margin-right:6px;" xmlns="http://www.w3.org/2000/svg">
      <rect width="30" height="10" fill="#FCD116"/>
      <rect y="10" width="30" height="5" fill="#003893"/>
      <rect y="15" width="30" height="5" fill="#CE1126"/>
    </svg>
  `;

  const mexicoFlag = `
    <svg class="artist-flag-svg" width="20" height="13" viewBox="0 0 30 20" fill="none" style="display:inline-block; vertical-align:middle; border-radius:1px; box-shadow:0 1px 2px rgba(0,0,0,0.1); margin-right:6px;" xmlns="http://www.w3.org/2000/svg">
      <rect width="10" height="20" fill="#006847"/>
      <rect x="10" width="10" height="20" fill="#FFFFFF"/>
      <rect x="20" width="10" height="20" fill="#CE1126"/>
      <circle cx="15" cy="10" r="1.5" fill="#8B5A2B"/>
      <path d="M14 11.5c0 .5.5 1 1 1s1-.5 1-1" stroke="#006847" stroke-width="0.5" fill="none"/>
    </svg>
  `;

  const argentinaFlag = `
    <svg class="artist-flag-svg" width="20" height="13" viewBox="0 0 30 20" fill="none" style="display:inline-block; vertical-align:middle; border-radius:1px; box-shadow:0 1px 2px rgba(0,0,0,0.1); margin-right:6px;" xmlns="http://www.w3.org/2000/svg">
      <rect width="30" height="6.67" fill="#75AADB"/>
      <rect y="6.67" width="30" height="6.67" fill="#FFFFFF"/>
      <rect y="13.34" width="30" height="6.67" fill="#75AADB"/>
      <circle cx="15" cy="10" r="1.5" fill="#FCBF49"/>
      <circle cx="15" cy="10" r="0.8" fill="#D62828"/>
    </svg>
  `;

  if (flagEmoji === '🇩🇴') return drFlag;
  if (flagEmoji === '🇨🇴') return colombiaFlag;
  if (flagEmoji === '🇲🇽') return mexicoFlag;
  if (flagEmoji === '🇦🇷') return argentinaFlag;
  return cubaFlag;
}

function renderGallery() {
  const artistsGrid = document.getElementById('artists-grid');
  const artworksGrid = document.getElementById('artworks-grid');
  const currentLang = localStorage.getItem('preferred-language') || 'es';

  if (artistsGrid) {
    const showAll = artistsGrid.getAttribute('data-show-all') === 'true';
    artistsGrid.innerHTML = artistsData.map((artist, index) => {
      const bio = currentLang === 'en' ? (artistTranslationsEn[artist.id]?.bio || artist.bio) : artist.bio;
      const country = currentLang === 'en' ? (artistTranslationsEn[artist.id]?.country || artist.country) : artist.country;
      const exploreText = currentLang === 'en' ? "Explore works" : "Explorar obras";
      return `
        <div class="artist-card scroll-reveal ${(!showAll && index >= 4) ? 'hidden-item' : ''}">
          <div class="artist-image-container">
            <img src="${getImageUrl(artist.image)}" alt="${artist.name}" class="artist-image" loading="lazy" />
          </div>
          <div class="artist-info">
            <div class="artist-meta">
              <span class="artist-flag">${getFlagSvg(artist.flag)}</span>
              <span class="artist-country">${country}</span>
            </div>
            <h3 class="artist-name">${artist.name}</h3>
            <p class="artist-bio">${bio}</p>
            <a href="obras.html?artista=${encodeURIComponent(artist.name)}" class="artist-link" data-filter="${artist.filter}">${exploreText} &rarr;</a>
          </div>
        </div>
      `;
    }).join('');
  }

  if (artworksGrid) {
    artworksGrid.innerHTML = Object.entries(artworksData).map(([id, artwork]) => {
      const title = currentLang === 'en' ? (artworkTitlesEn[id] || artwork.title) : artwork.title;
      const technique = translateTechnique(artwork.technique, currentLang);
      const actionText = currentLang === 'en' ? "More details" : "Ampliar detalles";
      const isSold = soldArtworks.includes(parseInt(id, 10));
      const soldClass = isSold ? ' sold' : '';
      const soldText = currentLang === 'en' ? 'SOLD' : 'VENDIDO';
      const soldAttr = isSold ? ` data-sold-text="${soldText}"` : '';
      return `
        <div class="artwork-item show${soldClass}" data-category="${artwork.category.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}" data-id="${id}"${soldAttr}>
          <div class="artwork-card">
            <div class="artwork-image-wrapper">
              <img src="${getImageUrl(artwork.image)}" alt="${title} de ${artwork.artist}" class="artwork-image" loading="lazy" />
              <div class="artwork-overlay">
                <div class="artwork-details-action">
                  <span class="btn-circle">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </span>
                  <span class="action-text">${actionText}</span>
                </div>
              </div>
            </div>
            <div class="artwork-info">
              <h3 class="artwork-title">${title}</h3>
              <p class="artwork-artist">${artwork.artist}</p>
              <div class="artwork-meta">
                <span class="artwork-spec">${technique} • ${artwork.dimensions}</span>
                <span class="artwork-price">${artwork.price}</span>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initLanguageSwitcher();
  renderGallery();
  initNavbar();
  initScrollReveal();
  initStatsCounters();
  initArtworkFilter();
  initArtworkModal();
  initTestimonialSlider();
  initContactForms();
  initArtistsReveal();
  initObrasCatalogPage();

  // E-commerce Initializers
  initCartToggleEvents();
  initAddToCartEvent();
  initCheckoutEvents();
  updateCartUI();
  applySoldStatesToGallery();

  // Premium Interactive & Motion Effects
  initPremiumInteractiveEffects();
  initHeroParallax();
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
      const isSubpage = window.location.pathname.includes('artistas.html') || window.location.pathname.includes('obras.html');
      if (!isSubpage) {
        navbar.classList.remove('scrolled');
      }
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

  // Active page logic & scroll spy
  const currentPath = window.location.pathname;
  if (currentPath.includes('artistas.html')) {
    const link = document.querySelector('.nav-menu a[href*="artistas"]');
    if (link) link.classList.add('active');
  } else if (currentPath.includes('obras.html')) {
    const link = document.querySelector('.nav-menu a[href*="obras"]');
    if (link) link.classList.add('active');
  } else {
    // Scroll spy for index.html sections
    const sections = document.querySelectorAll('section[id]');
    
    function scrollSpy() {
      const scrollY = window.scrollY;
      
      sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 120; // offset for sticky navbar
        const sectionId = current.getAttribute('id');
        
        const navLink = document.querySelector(`.nav-menu a[href$="#${sectionId}"], .nav-menu a[href$="${sectionId}"]`);
        if (navLink) {
          if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink.classList.add('active');
          } else {
            navLink.classList.remove('active');
          }
        }
      });
    }

    window.addEventListener('scroll', scrollSpy);
    scrollSpy(); // run on load
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
let artworksExpanded = false;
let currentFilter = 'all';

function updateArtworkVisibility() {
  const artworkItems = document.querySelectorAll('.artwork-item');
  let visibleCount = 0;

  artworkItems.forEach(item => {
    const category = item.getAttribute('data-category');
    const matchesFilter = (currentFilter === 'all' || category === currentFilter);
    
    if (matchesFilter) {
      visibleCount++;
      const shouldShow = artworksExpanded || visibleCount <= 3;
      if (shouldShow) {
        item.classList.add('show');
        item.classList.remove('hidden-item');
      } else {
        item.classList.remove('show');
        item.classList.add('hidden-item');
      }
    } else {
      item.classList.remove('show');
      item.classList.add('hidden-item');
    }
  });

  const btnObras = document.getElementById('btn-see-more-artworks');
  if (btnObras) {
    let totalMatching = 0;
    artworkItems.forEach(item => {
      const category = item.getAttribute('data-category');
      if (currentFilter === 'all' || category === currentFilter) {
        totalMatching++;
      }
    });

    if (totalMatching <= 3) {
      btnObras.style.display = 'none';
    } else {
      btnObras.style.display = 'inline-flex';
      btnObras.textContent = artworksExpanded ? 'Ver menos obras' : 'Ver más obras';
    }
  }
}

function initArtistsReveal() {
  const btnArtists = document.getElementById('btn-see-more-artists');

  if (btnArtists) {
    btnArtists.addEventListener('click', () => {
      window.location.href = 'artistas.html';
    });
  }
}

function initArtworkFilter() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const btnObras = document.getElementById('btn-see-more-artworks');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      currentFilter = button.getAttribute('data-filter');
      updateArtworkVisibility();
    });
  });

  if (btnObras) {
    btnObras.addEventListener('click', () => {
      window.location.href = 'obras.html';
    });
  }

  // Support link clicks from the artists section is now handled by direct href navigation to obras.html

  updateArtworkVisibility();
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
  const mStyle = document.getElementById('modal-style');
  const mTheme = document.getElementById('modal-theme');
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
          const currentLang = localStorage.getItem('preferred-language') || 'es';
          const title = currentLang === 'en' ? (artworkTitlesEn[id] || data.title) : data.title;
          const category = translateCategory(data.category, currentLang);
          const technique = translateTechnique(data.technique, currentLang);
          const theme = typeof data.theme === 'object' ? (data.theme[currentLang] || data.theme['es']) : data.theme;

          // Fill modal fields
          mImage.src = getImageUrl(data.image);
          mImage.alt = `${title} - ${data.artist}`;
          mCategory.textContent = category;
          mTitle.textContent = title;
          mArtist.textContent = data.artist;
          if (mStyle) mStyle.textContent = category;
          if (mTheme) mTheme.textContent = theme;
          mTechnique.textContent = technique;
          mDimensions.textContent = data.dimensions;
          mYear.textContent = data.year;
          mPrice.textContent = data.price;
          mInquiryId.value = id;

          const mAddToCartBtn = document.getElementById('modal-add-to-cart');
          if (mAddToCartBtn) {
            mAddToCartBtn.setAttribute('data-id', id);
            updateAddToCartButtonState(id);
          }
          
          // Clear status from previous views
          if (mInquiryStatus) {
            mInquiryStatus.textContent = '';
            mInquiryStatus.className = 'inquiry-status';
          }
          if (mInquiryForm) {
            mInquiryForm.reset();
            const textarea = document.getElementById('inquiry-message');
            if (textarea) {
              textarea.value = currentLang === 'en'
                ? `I am interested in receiving quotation and international shipping details for the artwork "${title}" by ${data.artist}.`
                : `Estoy interesado/a en recibir detalles de cotización y envío internacional para la obra "${title}" de ${data.artist}.`;
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

/* -------------------------------------------------------------
 * Interactive Artworks Catalog Page Logic
 * ------------------------------------------------------------- */
function initObrasCatalogPage() {
  const catalogGrid = document.getElementById('obras-page-grid');
  if (!catalogGrid) return; // Not on the works catalog page!

  const filterCategory = document.getElementById('filter-category');
  const filterArtist = document.getElementById('filter-artist');
  const filterCountry = document.getElementById('filter-country');
  const sortPrice = document.getElementById('sort-price');

  // Helper to parse price string to number for sorting (e.g. "$4,500 USD" -> 4500)
  function parsePrice(priceStr) {
    return parseFloat(priceStr.replace(/[^0-9.]/g, '')) || 0;
  }

  // Helper to get artist's country
  function getArtistCountry(artistName) {
    const artist = artistsData.find(a => a.name === artistName);
    if (!artist) return "Desconocido";
    const parts = artist.country.split(',');
    return parts[parts.length - 1].trim();
  }

  // Populate dynamic dropdowns with language awareness
  function populateCatalogDropdowns() {
    const currentLang = localStorage.getItem('preferred-language') || 'es';
    
    if (filterArtist) {
      const defaultText = currentLang === 'en' ? 'All artists' : 'Todos los artistas';
      const artists = [...new Set(artistsData.map(a => a.name))].sort();
      filterArtist.innerHTML = `<option value="all">${defaultText}</option>` + 
        artists.map(a => `<option value="${a}">${a}</option>`).join('');
    }

    if (filterCountry) {
      const defaultText = currentLang === 'en' ? 'All countries' : 'Todos los países';
      const countries = [...new Set(artistsData.map(a => {
        const parts = a.country.split(',');
        return parts[parts.length - 1].trim();
      }))].sort();
      
      filterCountry.innerHTML = `<option value="all">${defaultText}</option>` + 
        countries.map(c => {
          const translatedName = translateCountry(c, currentLang);
          return `<option value="${c}">${translatedName}</option>`;
        }).join('');
    }
  }

  populateCatalogDropdowns();

  // Pre-filter by artist if specified in URL query params
  const urlParams = new URLSearchParams(window.location.search);
  const artistParam = urlParams.get('artista');
  if (artistParam && filterArtist) {
    const matchingArtist = artistsData.find(a => a.name.toLowerCase() === artistParam.toLowerCase());
    if (matchingArtist) {
      filterArtist.value = matchingArtist.name;
    }
  }

  // Function to render filtered and sorted list of artworks
  function renderCatalog(items) {
    const currentLang = localStorage.getItem('preferred-language') || 'es';
    catalogGrid.innerHTML = items.map(([id, artwork]) => {
      const title = currentLang === 'en' ? (artworkTitlesEn[id] || artwork.title) : artwork.title;
      const technique = translateTechnique(artwork.technique, currentLang);
      const actionText = currentLang === 'en' ? "More details" : "Ampliar detalles";
      const isSold = soldArtworks.includes(parseInt(id, 10));
      const soldClass = isSold ? ' sold' : '';
      const soldText = currentLang === 'en' ? 'SOLD' : 'VENDIDO';
      const soldAttr = isSold ? ` data-sold-text="${soldText}"` : '';
      return `
        <div class="artwork-item show${soldClass}" data-id="${id}"${soldAttr} style="display: block; opacity: 1; transform: none;">
          <div class="artwork-card">
            <div class="artwork-image-wrapper">
              <img src="${getImageUrl(artwork.image)}" alt="${title} de ${artwork.artist}" class="artwork-image" loading="lazy" />
              <div class="artwork-overlay">
                <div class="artwork-details-action">
                  <span class="btn-circle">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </span>
                  <span class="action-text" style="color: #ffffff;">${actionText}</span>
                </div>
              </div>
            </div>
            <div class="artwork-info">
              <h3 class="artwork-title">${title}</h3>
              <p class="artwork-artist">${artwork.artist}</p>
              <div class="artwork-meta">
                <span class="artwork-spec">${technique} • ${artwork.dimensions}</span>
                <span class="artwork-price">${artwork.price}</span>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Re-attach click event listeners for the modal on the newly rendered items
    bindModalEventsToCatalog();
  }

  // Filter and sort runner
  function runFilterAndSort() {
    const cat = filterCategory.value.toLowerCase();
    const art = filterArtist.value;
    const cnt = filterCountry.value;
    const sort = sortPrice.value;

    let items = Object.entries(artworksData); // entries: [id, data]

    // Category filter
    if (cat !== 'all') {
      items = items.filter(([_, data]) => {
        const itemCat = data.category.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        return itemCat === cat;
      });
    }

    // Artist filter
    if (art !== 'all') {
      items = items.filter(([_, data]) => data.artist === art);
    }

    // Country filter
    if (cnt !== 'all') {
      items = items.filter(([_, data]) => getArtistCountry(data.artist) === cnt);
    }

    // Sorting
    if (sort === 'asc') {
      items.sort((a, b) => parsePrice(a[1].price) - parsePrice(b[1].price));
    } else if (sort === 'desc') {
      items.sort((a, b) => parsePrice(b[1].price) - parsePrice(a[1].price));
    }

    renderCatalog(items);
  }

  // Attach change listeners to filters
  [filterCategory, filterArtist, filterCountry, sortPrice].forEach(el => {
    if (el) el.addEventListener('change', runFilterAndSort);
  });

  // Initial run to render all artworks on load
  runFilterAndSort();

  // Expose hooks for language switcher to trigger re-renders
  window.runCatalogFilterAndSort = runFilterAndSort;
  window.populateCatalogDropdowns = populateCatalogDropdowns;
}

function bindModalEventsToCatalog() {
  const modal = document.getElementById('artwork-modal');
  if (!modal) return;
  
  const mImage = document.getElementById('modal-image');
  const mCategory = document.getElementById('modal-category');
  const mTitle = document.getElementById('modal-title');
  const mArtist = document.getElementById('modal-artist');
  const mStyle = document.getElementById('modal-style');
  const mTheme = document.getElementById('modal-theme');
  const mTechnique = document.getElementById('modal-technique');
  const mDimensions = document.getElementById('modal-dimensions');
  const mYear = document.getElementById('modal-year');
  const mPrice = document.getElementById('modal-price');
  const mInquiryId = document.getElementById('inquiry-artwork-id');
  const mInquiryStatus = document.getElementById('inquiry-status');
  const mInquiryForm = document.getElementById('inquiry-form');

  const catalogItems = document.querySelectorAll('#obras-page-grid .artwork-item');
  catalogItems.forEach(card => {
    const wrapper = card.querySelector('.artwork-image-wrapper');
    if (wrapper) {
      wrapper.addEventListener('click', () => {
        const id = card.getAttribute('data-id');
        const data = artworksData[id];
        if (data) {
          const currentLang = localStorage.getItem('preferred-language') || 'es';
          const title = currentLang === 'en' ? (artworkTitlesEn[id] || data.title) : data.title;
          const category = translateCategory(data.category, currentLang);
          const technique = translateTechnique(data.technique, currentLang);
          const theme = typeof data.theme === 'object' ? (data.theme[currentLang] || data.theme['es']) : data.theme;

          mImage.src = getImageUrl(data.image);
          mImage.alt = `${title} - ${data.artist}`;
          mCategory.textContent = category;
          mTitle.textContent = title;
          mArtist.textContent = data.artist;
          if (mStyle) mStyle.textContent = category;
          if (mTheme) mTheme.textContent = theme;
          mTechnique.textContent = technique;
          mDimensions.textContent = data.dimensions;
          mYear.textContent = data.year;
          mPrice.textContent = data.price;
          mInquiryId.value = id;

          const mAddToCartBtn = document.getElementById('modal-add-to-cart');
          if (mAddToCartBtn) {
            mAddToCartBtn.setAttribute('data-id', id);
            updateAddToCartButtonState(id);
          }

          if (mInquiryStatus) {
            mInquiryStatus.textContent = '';
            mInquiryStatus.className = 'inquiry-status';
          }
          if (mInquiryForm) {
            mInquiryForm.reset();
            const textarea = document.getElementById('inquiry-message');
            if (textarea) {
              textarea.value = currentLang === 'en'
                ? `I am interested in receiving quotation and international shipping details for the artwork "${title}" by ${data.artist}.`
                : `Estoy interesado/a en recibir detalles de cotización y envío internacional para la obra "${title}" de ${data.artist}.`;
            }
          }

          modal.style.display = 'flex';
          document.body.style.overflow = 'hidden';
          setTimeout(() => {
            modal.classList.add('active');
          }, 10);
        }
      });
    }
  });
}

/* -------------------------------------------------------------
 * Translation & Bilingual System
 * ------------------------------------------------------------- */
const artworkTitlesEn = {
  1: "Dynamic Quietude",
  2: "Fragments of the Wind",
  3: "Invisible Paths",
  4: "Sensitive Horizon",
  5: "Labyrinth of Time",
  6: "Out of the Radar",
  7: "Silent Tide",
  8: "Blue Abyss",
  9: "Study of Light",
  10: "Carnival Mask",
  11: "Ritual Dance",
  12: "Organic Composition I",
  13: "Organic Composition II",
  14: "Prayer",
  15: "Expedition",
  16: "Under the Rain",
  17: "Jungle Tales",
  18: "Construction of Space",
  19: "Urban Structures",
  20: "Symphony of the Dawn",
  21: "Meeting of Souls",
  22: "Reflections of Memory",
  23: "Geometric Face I",
  24: "Geometric Face II",
  25: "Character Study",
  26: "Silent Composition",
  27: "Wall and Time",
  28: "Matter in Motion",
  29: "Textures of the Dawn",
  30: "Traces of the Past",
  31: "The Kiss",
  32: "Anatomical Tension",
  33: "Inner Flight"
};

const artistTranslationsEn = {
  "alexis-pantoja": {
    country: "Manzanillo, Cuba",
    bio: "His painting reinterprets expressive figuration and the fantastic through dynamic compositions with gestural brushstrokes and rich textures."
  },
  "carlos-rene-aguilera": {
    country: "Santiago de Cuba, Cuba",
    bio: "Explores Caribbean visuality through entangled forms, ropes, and a deep metaphor about insularity and escaping confinement."
  },
  "gerlys-alvarez": {
    country: "Mariel, Cuba",
    bio: "Seascape painter and portraitist who captures the mysterious power of the sea and the human condition."
  },
  "luis-molina": {
    country: "Havana, Cuba",
    bio: "Represents Afro-Cuban folklore and rural life under the intense Caribbean sun, with a singular mastery of light."
  },
  "manuel-lopez-oliva": {
    country: "Manzanillo, Cuba",
    bio: "Conceives the artwork as a theatrical stage, using the mask as a symbol of identity and social theatricality."
  },
  "maria-consuelo": {
    country: "Havana, Cuba",
    bio: "Her organic abstractions investigate texture and the natural intimate rhythms of the Caribbean geography."
  },
  "maykel-herrera": {
    country: "Havana, Cuba",
    bio: "Through expressive portraits of children, he creates poetic and ironic metaphors about reality and social psychology."
  },
  "orestes-gaulhiac": {
    country: "Santiago de Cuba, Cuba",
    bio: "Noted for his dreamlike scenes that blend humans, animals, and a vibrant naive Caribbean nature."
  },
  "pedro-alvarez-gendis": {
    country: "Camagüey, Cuba",
    bio: "His abstract compositions investigate architectural space, chromatic tension, and urban memory."
  },
  "pedro-avila": {
    country: "Havana, Cuba",
    bio: "Conceives lyrical abstraction as an inner territory of pure emotions and intense gestural brushstrokes."
  },
  "vicente-dopico": {
    country: "Havana, Cuba",
    bio: "Master of Caribbean symbolic expressionism whose hybrid figures explore the deep, introspective psyche."
  },
  "miguel-ulloa": {
    country: "Puerto Plata, Dominican Republic",
    bio: "Dominican painter distinguished by stylized portraits and geometric forms structuring the human figure."
  },
  "cruz-escobedo": {
    country: "Jalisco, Mexico",
    bio: "Mexican painter who stands out for capturing daily reality with precision and deep textures."
  },
  "silvia-castagnino": {
    country: "La Pampa, Argentina",
    bio: "Renowned Argentine visual artist focused on material abstraction and the strength of organic textures."
  },
  "alex-stevenson": {
    country: "Cesar, Colombia",
    bio: "Colombian painter whose work explores the expressive power of the human body through figurative realism."
  }
};

const translations = {
  es: {
    nav: {
      artists: "Artistas",
      works: "Obras",
      concept: "Concepto",
      about: "Nosotros",
      contact: "Contacto",
      explore: "Explorar Colección"
    },
    hero: {
      title: "Arte latinoamericano y caribeño <em>original</em> para coleccionistas de todo el mundo.",
      desc: "Conectamos el talento de los artistas más inspiradores de América Latina con coleccionistas que aprecian la autenticidad, la textura y la historia detrás de cada trazo.",
      btn_artists: "Descubrir Artistas",
      btn_collection: "Ver Colección"
    },
    concepto: {
      tag: "NUESTRO CONCEPTO",
      title: "Arte con identidad, Alma y Textura",
      p1: "En Arte Mestizo seleccionamos cada pieza considerando su valor estético y su capacidad para transmitir emociones. Nos enfocamos en artistas de América Latina y el Caribe cuyas creaciones destacan por la riqueza de sus texturas y el uso de técnicas tradicionales como el óleo y el acrílico.",
      p2: "Creemos que colgar una obra original en tu espacio no es solo decorar, es establecer un puente directo con la visión del artista y la herencia cultural de nuestra región. Cada lienzo cuenta una historia de mestizaje y pasión.",
      stat_works: "Obras de arte",
      stat_artists: "Artistas representados",
      stat_countries: "Países de origen",
      badge_title: "Artista del Mes",
      badge_location: "Maykel Herrera — \"Rezo\""
    },
    featured: {
      tag: "ARTISTA DESTACADO",
      btn_gallery: "Explorar su galería"
    },
    proceso: {
      tag: "Modelo de Adquisición",
      title: "Cómo funciona nuestra galería virtual",
      desc: "Nos especializamos en conectar directamente a coleccionistas con arte latinoamericano y caribeño excepcional a través de un modelo transparente de compra y reventa internacional.",
      step1_title: "Adquisición Directa",
      step1_desc: "Compramos obras originales directamente de los talleres de los artistas más inspiradores de la región, asegurando condiciones comerciales justas y la trazabilidad de cada pieza.",
      step2_title: "Autenticación y Certificación",
      step2_desc: "Cada obra que adquirimos es meticulosamente catalogada e inspeccionada. Se entrega con su Certificado de Autenticidad original, garantizando la legitimidad y procedencia de su inversión.",
      step3_title: "Logística y Envío Asegurado",
      step3_desc: "Nos encargamos del embalaje profesional especializado y del envío internacional puerta a puerta con seguro total, asegurando que la obra llegue en perfectas condiciones a cualquier parte del mundo."
    },
    test: {
      tag: "Opiniones",
      title: "La experiencia de nuestros coleccionistas",
      slide1_quote: "“Adquirir una obra a través de Arte Mestizo ha sido una de las mejores decisiones. La selección de obras es impecable y la atención personalizada nos hizo sentir parte del proceso en todo momento.”",
      slide1_author: "Alejandro M.",
      slide1_role: "Coleccionista de Arte, México",
      slide2_quote: "“Su plataforma digital y el envío internacional son sumamente eficientes. La obra llegó en perfectas condiciones a Chicago y superó mis expectativas en cuanto a textura y color real.”",
      slide2_author: "Sarah K.",
      slide2_role: "Coleccionista, Chicago, EE.UU.",
      slide3_quote: "“La asesoría personalizada me ayudó a encontrar la pieza perfecta para mi colección. Representan la verdadera esencia y dinamismo del arte latinoamericano y caribeño contemporáneo.”",
      slide3_author: "Jean-Pierre L.",
      slide3_role: "Coleccionista, París, Francia"
    },
    contact: {
      tag: "Hablemos de Arte",
      title: "Hablemos de arte.",
      desc: "Si buscas asesoramiento artístico personalizado para tu hogar u oficina, tienes dudas sobre una obra o deseas coordinar una sesión de asesoría virtual, no dudes en escribirnos.",
      name: "Nombre Completo",
      email: "Correo Electrónico",
      phone: "Teléfono (opcional)",
      msg: "Mensaje",
      role_buyer: "Soy Comprador / Coleccionista",
      role_artist: "Soy Artista",
      role_label: "¿Quién eres?",
      subject: "Asunto",
      message_label: "Mensaje o Consulta",
      btn_send: "Enviar Mensaje"
    },
    footer: {
      desc: "Galería de arte latinoamericano y caribeño original que conecta artistas comprometidos con coleccionistas que buscan trascendencia visual y conceptual.",
      explore: "Explorar",
      contact: "Contacto",
      write_us: "Escríbenos",
      private: "Consultas Privadas",
      legal: "Legal",
      terms: "Términos de servicio",
      privacy: "Política de privacidad",
      cert: "Garantía de autenticidad",
      bottom: "&copy; 2026 Arte Mestizo. Todos los derechos reservados. Diseñado para coleccionistas exigentes.",
      bottom_sub: "Arte Latinoamericano y Caribeño Certificado."
    },
    modal: {
      technique: "Técnica:",
      dimensions: "Dimensiones:",
      year: "Año:",
      price: "Precio:",
      style: "Estilo:",
      theme: "Tema:",
      cert_text: "Incluye Certificado de Autenticidad firmado por el artista",
      form_title: "Consultar disponibilidad e información de envío",
      form_name: "Nombre Completo",
      form_email: "Correo Electrónico",
      form_msg: "Mensaje",
      form_btn: "Enviar Consulta de Obra",
      add_to_cart: "Comprar Obra (Añadir al Carrito)",
      already_in_cart: "Ya en el Carrito",
      sold: "Obra Vendida"
    },
    cart: {
      title: "Tu Carrito",
      empty: "El carrito está vacío",
      total_label: "Total:",
      checkout_btn: "Finalizar Compra"
    },
    checkout: {
      title: "Finalizar Compra",
      summary_items: "Obras seleccionadas:",
      summary_total: "Total a pagar:",
      shipping_title: "Información de Envío",
      label_name: "Nombre Completo",
      label_email: "Correo Electrónico",
      label_phone: "Teléfono de Contacto",
      label_address: "Dirección de Entrega",
      label_city: "Ciudad",
      label_country: "País",
      payment_title: "Detalles de Pago (Simulación)",
      label_card: "Número de Tarjeta (16 dígitos)",
      label_expiry: "Vencimiento (MM/YY)",
      label_cvv: "CVV",
      submit_btn: "Pagar y Completar Pedido"
    },
    artists: {
      tag: "Nuestros Creadores",
      title: "Catálogo Completo de Artistas",
      desc: "Conoce a los talentos destacados de América Latina y el Caribe cuyas obras originales forman parte de nuestra selecta colección virtual.",
      title_featured: "Artistas destacados",
      link_all: "Conoce a todos los artistas &rarr;",
      btn_more: "Ver todos los artistas"
    },
    works: {
      tag: "Colección Exclusiva",
      title: "Catálogo de Obras",
      desc: "Encuentra la pieza perfecta para tu colección. Filtrar por tipo, artista, país de origen, o reordena según el precio.",
      filter_label: "Filtrar por:",
      filter_style: "Tipo de Estilo",
      filter_artist: "Artista",
      filter_country: "País de Origen",
      filter_all_styles: "Todos los estilos",
      filter_all_categories: "Todas las categorías",
      filter_all_artists: "Todos los artistas",
      filter_all_countries: "Todos los países",
      style_abstract: "Abstracto",
      style_expressionism: "Expresionismo",
      style_geometric: "Geométrico",
      style_textured: "Texturado",
      sort_label: "Ordenar por Precio",
      sort_default: "Por defecto",
      sort_asc: "Precio: Menor a Mayor",
      sort_desc: "Precio: Mayor a Menor",
      title_featured: "Obras destacadas",
      subtitle_featured: "Explora una cuidada selección de pinturas únicas. Filtra según el estilo que mejor combine con tu espacio o colección.",
      filter_all: "Todas",
      btn_more: "Ver más obras"
    },
    philosophy: {
      tag: "Manifiesto Artístico",
      title: "\"El arte latinoamericano y caribeño no necesita fronteras para brillar en el mundo.\"",
      p1: "En un mundo interconectado, la expresión plástica de América Latina late con una fuerza singular. Capturamos ese pulso vital a través de una rigurosa selección de obras que honra las tradiciones locales al mismo tiempo que propone lenguajes modernos y audaces.",
      p2: "Nuestros artistas no solo pintan formas; vierten memorias, reflexiones sociales y una exquisita relación física con la materia sobre cada lienzo.",
      btn_chat: "Conversa con nuestra Especialista"
    },
    trust: {
      return: "Garantía de Devolución de 30 días",
      handmade: "Óleo sobre lienzo 100% hecho a mano"
    }
  },
  en: {
    nav: {
      artists: "Artists",
      works: "Works",
      concept: "Concept",
      about: "About Us",
      contact: "Contact",
      explore: "Explore Collection"
    },
    hero: {
      title: "Original Latin American and Caribbean <em>art</em> for collectors worldwide.",
      desc: "We connect the talent of Latin America's most inspiring artists with collectors who appreciate authenticity, texture, and the story behind every stroke.",
      btn_artists: "Discover Artists",
      btn_collection: "View Collection"
    },
    concepto: {
      tag: "OUR CONCEPT",
      title: "Art with Identity, Soul and Texture",
      p1: "At Arte Mestizo, we select each piece considering its aesthetic value and its ability to convey emotions. We focus on artists from Latin America and the Caribbean whose creations stand out for their rich textures and traditional techniques like oil and acrylic.",
      p2: "We believe that hanging an original piece in your space is not just decorating; it is establishing a direct bridge with the artist's vision and the cultural heritage of our region. Each canvas tells a story of cultural blending and passion.",
      stat_works: "Artworks",
      stat_artists: "Represented Artists",
      stat_countries: "Countries of Origin",
      badge_title: "Artist of the Month",
      badge_location: "Maykel Herrera — \"Rezo\""
    },
    featured: {
      tag: "FEATURED ARTIST",
      btn_gallery: "Explore their gallery"
    },
    proceso: {
      tag: "Acquisition Model",
      title: "How our virtual gallery works",
      desc: "We specialize in directly connecting collectors with exceptional Latin American and Caribbean art through a transparent international buy-and-resell model.",
      step1_title: "Direct Acquisition",
      step1_desc: "We buy original works directly from the studios of the region's most inspiring artists, ensuring fair commercial conditions and the traceability of each piece.",
      step2_title: "Authentication & Certification",
      step2_desc: "Each work we acquire is meticulously cataloged and inspected. It is delivered with its original Certificate of Authenticity, guaranteeing the legitimacy and provenance of your investment.",
      step3_title: "Logistics & Insured Shipping",
      step3_desc: "We handle professional specialized packaging and international door-to-door shipping with full insurance, ensuring the artwork arrives in perfect condition anywhere in the world."
    },
    test: {
      tag: "Testimonials",
      title: "Our collectors' experience",
      slide1_quote: "“Acquiring a work through Arte Mestizo has been one of the best decisions. The selection of works is impeccable and the personalized attention made us feel part of the process at all times.”",
      slide1_author: "Alejandro M.",
      slide1_role: "Art Collector, Mexico",
      slide2_quote: "“Their digital platform and international shipping are highly efficient. The artwork arrived in perfect condition in Chicago and exceeded my expectations in terms of texture and real color.”",
      slide2_author: "Sarah K.",
      slide2_role: "Collector, Chicago, USA",
      slide3_quote: "“The personalized guidance helped me find the perfect piece for my collection. They represent the true essence and dynamism of contemporary Latin American and Caribbean art.”",
      slide3_author: "Jean-Pierre L.",
      slide3_role: "Collector, Paris, France"
    },
    contact: {
      tag: "Let's Talk About Art",
      title: "Let's talk about art.",
      desc: "If you are looking for personalized art advisory for your home or office, have questions about an artwork, or wish to schedule a virtual advisory session, do not hesitate to write to us.",
      name: "Full Name",
      email: "Email Address",
      phone: "Phone (optional)",
      msg: "Message",
      role_buyer: "I am a Buyer / Collector",
      role_artist: "I am an Artist",
      role_label: "Who are you?",
      subject: "Subject",
      message_label: "Message or Inquiry",
      btn_send: "Send Message"
    },
    footer: {
      desc: "Original Latin American and Caribbean art gallery connecting committed artists with collectors seeking visual and conceptual transcendence.",
      explore: "Explore",
      contact: "Contact",
      write_us: "Write to us",
      private: "Private Inquiries",
      legal: "Legal",
      terms: "Terms of service",
      privacy: "Privacy policy",
      cert: "Authenticity guarantee",
      bottom: "&copy; 2026 Arte Mestizo. All rights reserved. Designed for discerning collectors.",
      bottom_sub: "Certified Latin American and Caribbean Art."
    },
    modal: {
      technique: "Technique:",
      dimensions: "Dimensions:",
      year: "Year:",
      price: "Price:",
      style: "Style:",
      theme: "Theme:",
      cert_text: "Includes Certificate of Authenticity signed by the artist",
      form_title: "Inquire about availability and shipping info",
      form_name: "Full Name",
      form_email: "Email Address",
      form_msg: "Message",
      form_btn: "Send Artwork Inquiry",
      add_to_cart: "Buy Artwork (Add to Cart)",
      already_in_cart: "Already in Cart",
      sold: "Artwork Sold"
    },
    cart: {
      title: "Your Cart",
      empty: "Your cart is empty",
      total_label: "Total:",
      checkout_btn: "Checkout"
    },
    checkout: {
      title: "Checkout",
      summary_items: "Selected artworks:",
      summary_total: "Total to pay:",
      shipping_title: "Shipping Information",
      label_name: "Full Name",
      label_email: "Email Address",
      label_phone: "Contact Phone",
      label_address: "Shipping Address",
      label_city: "City",
      label_country: "Country",
      payment_title: "Payment Details (Simulation)",
      label_card: "Card Number (16 digits)",
      label_expiry: "Expiry Date (MM/YY)",
      label_cvv: "CVV",
      submit_btn: "Pay and Complete Order"
    },
    artists: {
      tag: "Our Creators",
      title: "Gallery Artists",
      desc: "We present an exclusive selection of established and emerging Latin American and Caribbean creators, united by their authenticity and technical mastery.",
      title_featured: "Featured Artists",
      link_all: "Meet all the artists &rarr;",
      btn_more: "See all artists"
    },
    works: {
      tag: "Exclusive Collection",
      title: "Artwork Collection",
      desc: "Find the perfect piece for your collection. Filter by style, artist, country of origin, or sort by price.",
      filter_label: "Filter by:",
      filter_style: "Type of Style",
      filter_artist: "Artist",
      filter_country: "Country of Origin",
      filter_all_styles: "All styles",
      filter_all_categories: "All categories",
      filter_all_artists: "All artists",
      filter_all_countries: "All countries",
      style_abstract: "Abstract",
      style_expressionism: "Expressionism",
      style_geometric: "Geometric",
      style_textured: "Textured",
      sort_label: "Sort by Price",
      sort_default: "Default",
      sort_asc: "Price: Low to High",
      sort_desc: "Price: High to Low",
      title_featured: "Featured Artworks",
      subtitle_featured: "Explore a curated selection of unique paintings. Filter by style that matches your space or collection.",
      filter_all: "All",
      btn_more: "See more artworks"
    },
    philosophy: {
      tag: "Artistic Manifesto",
      title: "\"Latin American and Caribbean art does not need borders to shine in the world.\"",
      p1: "In an interconnected world, the visual expression of Latin America beats with a singular force. We capture that vital pulse through a rigorous selection of works that honors local traditions while proposing modern and bold languages.",
      p2: "Our artists do not just paint shapes; they pour memories, social reflections, and an exquisite physical relationship with the medium onto each canvas.",
      btn_chat: "Speak with our Specialist"
    },
    trust: {
      return: "30-day Money Back Guarantee",
      handmade: "100% handmade oil on canvas"
    }
  }
};

function translateTechnique(tech, lang) {
  if (lang !== 'en') return tech;
  const map = {
    "Óleo sobre lienzo": "Oil on canvas",
    "Acrílico sobre lienzo": "Acrylic on canvas",
    "Técnica mixta": "Mixed media",
    "Técnica mixta sobre lienzo": "Mixed media on canvas",
    "Carboncillo sobre papel": "Charcoal on paper"
  };
  return map[tech] || tech;
}

function translateCategory(cat, lang) {
  if (lang !== 'en') return cat;
  const map = {
    "Abstracto": "Abstract",
    "Expresionismo": "Expressionism",
    "Texturado": "Textured",
    "Geométrico": "Geometric"
  };
  return map[cat] || cat;
}

function translateCountry(countryName, lang) {
  if (lang !== 'en') return countryName;
  const map = {
    "Cuba": "Cuba",
    "Rep. Dominicana": "Dominican Republic",
    "México": "Mexico",
    "Argentina": "Argentina",
    "Colombia": "Colombia"
  };
  return map[countryName] || countryName;
}

function getNestedTranslation(obj, path) {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
}

function translatePage(lang) {
  // Translate static text elements with data-i18n
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(el => {
    const key = el.getAttribute('data-i18n');
    const translation = getNestedTranslation(translations[lang], key);
    if (translation) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = translation;
      } else {
        el.innerHTML = translation;
      }
    }
  });

  // Translate tooltip titles with data-i18n-title
  const elementsTitle = document.querySelectorAll('[data-i18n-title]');
  elementsTitle.forEach(el => {
    const key = el.getAttribute('data-i18n-title');
    const translation = getNestedTranslation(translations[lang], key);
    if (translation) {
      el.setAttribute('title', translation);
    }
  });

  // Re-render gallery if present
  renderGallery();

  // If on obras page, populate dropdowns in correct language and re-filter
  if (window.populateCatalogDropdowns && window.runCatalogFilterAndSort) {
    window.populateCatalogDropdowns();
    window.runCatalogFilterAndSort();
  }

  // Update Cart UI, Sold badges and modal button state
  if (typeof updateCartUI === 'function') {
    updateCartUI();
  }
  if (typeof applySoldStatesToGallery === 'function') {
    applySoldStatesToGallery();
  }
  const modal = document.getElementById('artwork-modal');
  if (modal && modal.classList.contains('active')) {
    const activeId = document.getElementById('inquiry-artwork-id')?.value;
    if (activeId && typeof updateAddToCartButtonState === 'function') {
      updateAddToCartButtonState(activeId);
    }
  }

  // Update active state on language buttons
  const buttons = document.querySelectorAll('.lang-btn');
  buttons.forEach(btn => {
    if (btn.getAttribute('data-lang') === lang) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

function initLanguageSwitcher() {
  const currentLang = localStorage.getItem('preferred-language') || 'es';
  
  // Set up event listeners for all language switch buttons
  const buttons = document.querySelectorAll('.lang-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const lang = btn.getAttribute('data-lang');
      localStorage.setItem('preferred-language', lang);
      translatePage(lang);
    });
  });

  // Trigger initial translation
  translatePage(currentLang);
}

/* -------------------------------------------------------------
 * E-commerce Shopping Cart & Checkout System
 * ------------------------------------------------------------- */
// State Variables
let cart = JSON.parse(localStorage.getItem('cartArtworkIds')) || [];
let soldArtworks = JSON.parse(localStorage.getItem('soldArtworkIds')) || [];

function saveCart() {
  localStorage.setItem('cartArtworkIds', JSON.stringify(cart));
  updateCartUI();
  if (typeof popCartCount === 'function') {
    popCartCount();
  }
}

function saveSold() {
  localStorage.setItem('soldArtworkIds', JSON.stringify(soldArtworks));
  applySoldStatesToGallery();
}

function parsePrice(priceStr) {
  if (!priceStr) return 0;
  const num = parseInt(priceStr.replace(/[^0-9]/g, ''), 10);
  return isNaN(num) ? 0 : num;
}

function formatPrice(num) {
  return '$' + num.toLocaleString('en-US') + ' USD';
}

function updateCartUI() {
  const badge = document.getElementById('cart-count');
  if (badge) {
    badge.textContent = cart.length;
    badge.style.display = cart.length > 0 ? 'flex' : 'none';
  }

  const container = document.getElementById('cart-items');
  const totalEl = document.getElementById('cart-total');
  const checkoutBtn = document.getElementById('cart-checkout-btn');
  const currentLang = localStorage.getItem('preferred-language') || 'es';

  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = `<p class="cart-empty-msg" data-i18n="cart.empty">${translations[currentLang].cart.empty}</p>`;
    if (totalEl) totalEl.textContent = formatPrice(0);
    if (checkoutBtn) checkoutBtn.disabled = true;
    return;
  }

  let total = 0;
  container.innerHTML = '';
  cart.forEach(id => {
    const item = artworksData[id];
    if (!item) return;

    const itemPrice = parsePrice(item.price);
    total += itemPrice;

    const title = currentLang === 'en' ? (artworkTitlesEn[id] || item.title) : item.title;

    const itemHtml = `
      <div class="cart-item" data-id="${id}">
        <img src="${getImageUrl(item.image)}" alt="${title}" class="cart-item-img" />
        <div class="cart-item-info">
          <h4 class="cart-item-title">${title}</h4>
          <p class="cart-item-artist">${item.artist}</p>
          <div class="cart-item-price">${item.price}</div>
        </div>
        <button class="cart-item-remove" data-id="${id}" title="${currentLang === 'en' ? 'Remove' : 'Eliminar'}">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          </svg>
        </button>
      </div>
    `;
    container.insertAdjacentHTML('beforeend', itemHtml);
  });

  if (totalEl) totalEl.textContent = formatPrice(total);
  if (checkoutBtn) checkoutBtn.disabled = false;

  // Add click listeners to remove buttons
  container.querySelectorAll('.cart-item-remove').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.getAttribute('data-id'), 10);
      cart = cart.filter(itemId => itemId !== id);
      saveCart();
      const activeId = document.getElementById('inquiry-artwork-id')?.value;
      if (activeId && parseInt(activeId, 10) === id) {
        updateAddToCartButtonState(activeId);
      }
    });
  });
}

function updateAddToCartButtonState(id) {
  const btn = document.getElementById('modal-add-to-cart');
  if (!btn) return;

  const currentLang = localStorage.getItem('preferred-language') || 'es';
  const numericId = parseInt(id, 10);

  if (soldArtworks.includes(numericId)) {
    btn.textContent = translations[currentLang].modal.sold;
    btn.disabled = true;
    btn.style.backgroundColor = '#626262';
    btn.style.borderColor = '#626262';
    btn.style.color = '#ffffff';
  } else if (cart.includes(numericId)) {
    btn.textContent = translations[currentLang].modal.already_in_cart;
    btn.disabled = true;
    btn.style.backgroundColor = '#eae7e0';
    btn.style.borderColor = '#eae7e0';
    btn.style.color = '#626262';
  } else {
    btn.textContent = translations[currentLang].modal.add_to_cart;
    btn.disabled = false;
    btn.style.backgroundColor = 'var(--accent-gold)';
    btn.style.borderColor = 'var(--accent-gold)';
    btn.style.color = '#161616';
  }
}

function applySoldStatesToGallery() {
  const cards = document.querySelectorAll('.artwork-card, .artwork-item');
  const currentLang = localStorage.getItem('preferred-language') || 'es';
  const soldText = currentLang === 'en' ? 'SOLD' : 'VENDIDO';

  cards.forEach(card => {
    const id = parseInt(card.getAttribute('data-id'), 10);
    if (soldArtworks.includes(id)) {
      card.classList.add('sold');
      card.setAttribute('data-sold-text', soldText);
    } else {
      card.classList.remove('sold');
      card.removeAttribute('data-sold-text');
    }
  });
}

function initCartToggleEvents() {
  const drawer = document.getElementById('cart-drawer');
  const backdrop = document.getElementById('cart-backdrop');
  const openBtns = document.querySelectorAll('.cart-toggle');
  const closeBtn = document.getElementById('cart-close');

  if (!drawer || !backdrop) return;

  const openCart = () => {
    drawer.classList.add('active');
    backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeCart = () => {
    drawer.classList.remove('active');
    backdrop.classList.remove('active');
    
    // Unlock scrolling if no modal is active
    const detailModal = document.getElementById('artwork-modal');
    const checkoutModal = document.getElementById('checkout-modal');
    const isModalOpen = (detailModal && detailModal.classList.contains('active')) || 
                        (checkoutModal && checkoutModal.classList.contains('active'));
    if (!isModalOpen) {
      document.body.style.overflow = '';
    }
  };

  openBtns.forEach(btn => btn.addEventListener('click', openCart));
  if (closeBtn) closeBtn.addEventListener('click', closeCart);
  backdrop.addEventListener('click', closeCart);
}

function initAddToCartEvent() {
  const btn = document.getElementById('modal-add-to-cart');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const id = parseInt(btn.getAttribute('data-id'), 10);
    if (!id || soldArtworks.includes(id) || cart.includes(id)) return;

    cart.push(id);
    saveCart();
    updateAddToCartButtonState(id);

    // Open drawer automatically
    const drawer = document.getElementById('cart-drawer');
    const backdrop = document.getElementById('cart-backdrop');
    if (drawer && backdrop) {
      drawer.classList.add('active');
      backdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  });
}

function initCheckoutEvents() {
  const checkoutBtn = document.getElementById('cart-checkout-btn');
  const checkoutModal = document.getElementById('checkout-modal');
  const closeBtn = document.getElementById('checkout-close');
  const checkoutForm = document.getElementById('checkout-form');

  if (!checkoutBtn || !checkoutModal || !checkoutForm) return;

  checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) return;

    const itemsCountEl = document.getElementById('checkout-items-count');
    const totalPriceEl = document.getElementById('checkout-total-price');
    const currentLang = localStorage.getItem('preferred-language') || 'es';

    let total = 0;
    cart.forEach(id => {
      const item = artworksData[id];
      if (item) total += parsePrice(item.price);
    });

    if (itemsCountEl) itemsCountEl.textContent = cart.length;
    if (totalPriceEl) totalPriceEl.textContent = formatPrice(total);

    // Ensure form is displayed and success is cleared if re-opened
    checkoutForm.style.display = 'block';
    const successView = checkoutModal.querySelector('.checkout-success-view');
    if (successView) successView.remove();
    const loaderView = checkoutModal.querySelector('.checkout-loader');
    if (loaderView) loaderView.remove();

    // Close cart drawer
    const drawer = document.getElementById('cart-drawer');
    const backdrop = document.getElementById('cart-backdrop');
    if (drawer && backdrop) {
      drawer.classList.remove('active');
      backdrop.classList.remove('active');
    }

    checkoutModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  });

  const closeModal = () => {
    checkoutModal.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  checkoutForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const currentLang = localStorage.getItem('preferred-language') || 'es';

    // Hide checkout form and display loader spinner
    checkoutForm.style.display = 'none';
    const body = document.getElementById('checkout-body-content');
    
    const loaderHtml = `
      <div class="checkout-loader">
        <div class="spinner"></div>
        <p style="color:#626262;">${currentLang === 'en' ? 'Processing payment...' : 'Procesando pago...'}</p>
      </div>
    `;
    body.insertAdjacentHTML('beforeend', loaderHtml);

    // Simulate 2-second gateway processing
    setTimeout(() => {
      const loader = body.querySelector('.checkout-loader');
      if (loader) loader.remove();

      // Mark purchased artworks as Sold
      cart.forEach(id => {
        const numId = parseInt(id, 10);
        if (!soldArtworks.includes(numId)) {
          soldArtworks.push(numId);
        }
      });
      saveSold();

      // Clear Cart
      cart = [];
      saveCart();

      // Display success view
      const orderNum = 'AM-' + Math.floor(100000 + Math.random() * 900000);
      const successTitle = currentLang === 'en' ? 'Purchase Successful!' : '¡Compra Realizada con Éxito!';
      const successDesc = currentLang === 'en' 
        ? 'Thank you for your acquisition. We have sent a confirmation email with delivery tracking details.'
        : 'Muchas gracias por su adquisición. Hemos enviado un correo de confirmación con los detalles de seguimiento de su entrega.';
      const successBtnText = currentLang === 'en' ? 'Close Window' : 'Cerrar Ventana';

      const successHtml = `
        <div class="checkout-success-view">
          <div class="success-icon-wrapper">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <h4>${successTitle}</h4>
          <p>${successDesc}</p>
          <div class="order-number">${orderNum}</div>
          <button class="btn btn-secondary" id="checkout-success-close-btn" style="margin-top:15px;">${successBtnText}</button>
        </div>
      `;
      body.insertAdjacentHTML('beforeend', successHtml);

      // Bind success close button
      document.getElementById('checkout-success-close-btn').addEventListener('click', closeModal);

      // Update active modal CTA (if open)
      const detailModal = document.getElementById('artwork-modal');
      if (detailModal && detailModal.classList.contains('active')) {
        const activeId = document.getElementById('inquiry-artwork-id').value;
        if (activeId) updateAddToCartButtonState(activeId);
      }
    }, 2000);
  });
}

function popCartCount() {
  const badge = document.getElementById('cart-count');
  if (badge) {
    badge.classList.remove('cart-count-pop');
    void badge.offsetWidth; // Trigger reflow to restart CSS animation
    badge.classList.add('cart-count-pop');
  }
}

function initPremiumInteractiveEffects() {
  // Glare / Shine / Radial Gradient hover reflection effect on cards
  const cards = document.querySelectorAll('.artwork-image-wrapper, .artist-image-container, .concepto-image-wrapper');
  
  cards.forEach(card => {
    // Check if shine overlay already exists to avoid duplicates
    if (card.querySelector('.shine-overlay')) return;
    
    const shine = document.createElement('div');
    shine.className = 'shine-overlay';
    card.appendChild(shine);
    
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const px = (x / rect.width) * 100;
      const py = (y / rect.height) * 100;
      
      shine.style.background = `radial-gradient(circle at ${px}% ${py}%, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 80%)`;
    });
    
    card.addEventListener('mouseleave', () => {
      shine.style.background = 'none';
    });
  });
}

function initHeroParallax() {
  const hero = document.getElementById('hero');
  const heroContent = document.querySelector('.hero-content');
  if (!hero || !heroContent) return;

  hero.addEventListener('mousemove', e => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    // Subtly shift content and background in opposite direction for parallax depth
    const moveX = (e.clientX - width / 2) / (width / 2) * 15;
    const moveY = (e.clientY - height / 2) / (height / 2) * 15;
    
    heroContent.style.transform = `translate(${moveX}px, ${moveY}px)`;
    hero.style.backgroundPosition = `calc(50% - ${moveX * 0.5}px) calc(50% - ${moveY * 0.5}px)`;
  });

  hero.addEventListener('mouseleave', () => {
    heroContent.style.transform = 'translate(0px, 0px)';
    hero.style.backgroundPosition = '50% 50%';
  });
}



