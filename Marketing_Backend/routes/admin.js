const express = require('express');
const admin = express.Router();
const { Admin } = require('../db');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const verifyJWT = require('./jwtUtils.js'); 


admin.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const adminUser = await Admin.findOne({ where: { email } });
    if (adminUser) {
      if (bcrypt.compareSync(password, adminUser.password)) {
        const token = jwt.sign({ email: adminUser.email }, process.env.JWT_SECRET);
        console.log('Token :', token);
        res.status(200).json({ token });
      } else {
        res.status(401).json({ error: 'Mot de passe incorrect' });
      }
    } else {
      res.status(401).json({ error: 'Aucun utilisateur trouvé avec cet email' });
    }
  } catch (error) {
    console.error('Erreur d\'authentification', error);
    res.status(500).json({ error: 'Erreur d\'authentification' });
  }
});

// Exemple de route protégée avec vérification JWT
admin.get('/verify', verifyJWT, (req, res) => {
  // Si le middleware verifyJWT passe, cela signifie que le JWT est valide
  res.status(200).json({ message: 'JWT valide' });
});

module.exports = admin;
