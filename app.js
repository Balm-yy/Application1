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
  const validPass = '125478';

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

// --------------------- Connexion à MongoDB ---------------------
console.log('MONGO_URI:', process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Connecté à MongoDB !');

    // Routes API
   console.log('⏳ Loading /users route...');
    app.use('/users', require('./routes/users'));

     console.log('⏳ Loading /categories route...');
    app.use('/categories', require('./routes/categories'));

    console.log('⏳ Loading /subcategories route...');
    app.use('/subcategories', require('./routes/subcategories'));


    console.log('⏳ Loading /cards route...');
    app.use('/cards', require('./routes/cards'));



    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`🚀 Serveur prêt : http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error('❌ Erreur de connexion à MongoDB : ', err));



// 🔄 Catch-all route → renvoie categories.html ou page principale
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'app.html')); // ou page d'accueil ou login
});

