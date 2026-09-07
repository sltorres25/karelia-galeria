import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from './db.js';
import { requireAuth, requireAdmin, JWT_SECRET } from './authMiddleware.js';

const router = express.Router();

// --- AUTH ROUTES ---

router.post('/auth/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Por favor, proporcione correo y contraseña.' });
  }

  const user = db.getUserByEmail(email);
  if (!user) {
    return res.status(401).json({ error: 'Credenciales incorrectas. Verifique el correo o contraseña.' });
  }

  const isValidPassword = bcrypt.compareSync(password, user.passwordHash);
  if (!isValidPassword) {
    return res.status(401).json({ error: 'Credenciales incorrectas. Verifique el correo o contraseña.' });
  }

  const token = jwt.sign(
    { userId: user.id, role: user.role, email: user.email },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  res.cookie('auth_token', token, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    sameSite: 'lax'
  });

  const { passwordHash, ...safeUser } = user;

  // Specify redirect path based on role as required
  const redirectUrl = user.role === 'admin' ? '/admin' : '/user-area.html';

  res.json({
    message: 'Inicio de sesión exitoso',
    user: safeUser,
    token,
    redirectUrl
  });
});

router.get('/auth/me', requireAuth, (req, res) => {
  res.json({ user: req.user });
});

router.post('/auth/logout', (req, res) => {
  res.clearCookie('auth_token');
  res.json({ message: 'Sesión cerrada correctamente.' });
});

router.post('/auth/register', (req, res) => {
  const { email, password, name, address, phone } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Correo electrónico y contraseña son obligatorios.' });
  }

  try {
    const newUser = db.createUser({ email, password, name, address, phone });
    const token = jwt.sign(
      { userId: newUser.id, role: newUser.role, email: newUser.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.cookie('auth_token', token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: 'lax'
    });

    const { passwordHash, ...safeUser } = newUser;
    res.status(201).json({
      message: 'Cuenta creada con éxito.',
      user: safeUser,
      token,
      redirectUrl: '/user-area.html'
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// --- PUBLIC DATA ROUTE ---

router.get('/data', (req, res) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  res.json({
    artworks: db.getAllArtworks(),
    content: db.getContent(),
    theme: db.getTheme()
  });
});

// --- USER PROTECTED ROUTES ---

router.put('/user/profile', requireAuth, (req, res) => {
  const { name, address, phone, favorites } = req.body;
  const updates = {};
  if (name !== undefined) updates.name = name;
  if (address !== undefined) updates.address = address;
  if (phone !== undefined) updates.phone = phone;
  if (favorites !== undefined) updates.favorites = favorites;

  const updatedUser = db.updateUser(req.user.id, updates);
  if (!updatedUser) {
    return res.status(404).json({ error: 'Usuario no encontrado.' });
  }

  const { passwordHash, ...safeUser } = updatedUser;
  res.json({ message: 'Perfil actualizado correctamente.', user: safeUser });
});

// --- ADMIN PROTECTED ROUTES ---

router.put('/admin/artworks/:id', requireAdmin, (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  if (!id) {
    return res.status(400).json({ error: 'Identificador de obra requerido.' });
  }

  const updatedArtwork = db.updateArtwork(id, updates);
  res.json({
    message: `Obra "${updatedArtwork.title}" actualizada correctamente.`,
    artwork: updatedArtwork
  });
});

router.put('/admin/content', requireAdmin, (req, res) => {
  const newContent = req.body;
  if (!newContent || typeof newContent !== 'object') {
    return res.status(400).json({ error: 'Datos de contenido no válidos.' });
  }

  const updatedContent = db.updateContent(newContent);
  res.json({
    message: 'Contenido editable de la web actualizado correctamente.',
    content: updatedContent
  });
});

router.put('/admin/theme', requireAdmin, (req, res) => {
  const newTheme = req.body;
  if (!newTheme || typeof newTheme !== 'object') {
    return res.status(400).json({ error: 'Datos de tema no válidos.' });
  }

  const updatedTheme = db.updateTheme(newTheme);
  res.json({
    message: 'Paleta de colores de la web actualizada correctamente.',
    theme: updatedTheme
  });
});

router.get('/admin/users', requireAdmin, (req, res) => {
  const users = db.getAllUsers();
  res.json({ users });
});

export default router;
