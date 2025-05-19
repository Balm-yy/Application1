require('dotenv').config();  //Pour lire le fichier .env (connexion à la BDD)
const mongoose = require('mongoose');
const express = require('express');
const app = express();


// ------------------- LOGIN POUR ACCEDER A L'APP ---------------- */
const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.setHeader('WWW-Authenticate', 'Basic realm="Zone protégée"');
    return res.status(401).send('Authentification requise.');
  }

  const base64Credentials = authHeader.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
  const [username, password] = credentials.split(':');

  const validUser = 'Balmyy';       // remplace par ton username
  const validPass = 'OucacestduMotDePasseDefou12';     // remplace par ton mot de passe

  if (username === validUser && password === validPass) {
    next();  // accès autorisé
  } else {
    res.setHeader('WWW-Authenticate', 'Basic realm="Zone protégée"');
    return res.status(401).send('Authentification requise.');
  }
};


/* --------------------- Connexion a MongoDB --------------------- */
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
      console.log('✅ Connecté à MongoDB !');

      // Middleware pour protéger toutes les routes (après la connexion DB)
      app.use(auth);

      /* ------------------------- ROUTES API -------------------------- */
      app.use('/users',           require('./routes/user'));
      app.use('/categories',       require('./routes/category'));
      app.use('/subcategories',    require('./routes/subcategory'));
      app.use('/card',             require('./routes/card'));

      app.get('/', (req, res) => {
        res.send('Bienvenue dans ton app protégée par login/mot de passe !');
      });

      /* --------------------- Lancement du serveur ----------------------*/
      const PORT = process.env.PORT || 3000;
      app.listen(PORT, () => {
        console.log(`🚀 Serveur prêt : http://localhost:${PORT}`);
      });
    })
    .catch((err) => console.error('❌ Erreur de connexion à MongoDB : ', err));
