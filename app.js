require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const app = express();

// 🔐 Authentification basique
const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.setHeader('WWW-Authenticate', 'Basic realm="Zone protégée"');
    return res.status(401).send('Authentification requise.');
  }

  const base64Credentials = authHeader.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
  const [username, password] = credentials.split(':');

  const validUser = 'Balmyy';
  const validPass = 'LeMDPleplusSimple12';

  if (username === validUser && password === validPass) {
    next();
  } else {
    res.setHeader('WWW-Authenticate', 'Basic realm="Zone protégée"');
    return res.status(401).send('Authentification requise.');
  }
};

// 🔐 Protéger TOUTES les routes, y compris le front
app.use(auth);

// 📁 Servir les fichiers statiques
app.use(express.static(path.join(__dirname, 'public')));

// 🔄 Catch-all route → renvoie index.html ou page principale
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'categories.html')); // ou 'categories.html'
});

// --------------------- Connexion à MongoDB ---------------------
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Connecté à MongoDB !');

    // Routes API
    app.use('/users', require('./routes/user'));
    app.use('/categories', require('./routes/category'));
    app.use('/subcategories', require('./routes/subcategory'));
    app.use('/card', require('./routes/card'));

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`🚀 Serveur prêt : http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error('❌ Erreur de connexion à MongoDB : ', err));
