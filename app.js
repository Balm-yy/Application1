require('dotenv').config();  //Pour lire le fichier .env (connexion à la BDD)
const mongoose = require('mongoose');
const express = require('express');
const path = require('path')
const app = express();
const cors = require('cors');



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
  const validPass = '125478!';     // remplace par ton mot de passe



  if (username === validUser && password === validPass) {
    next();  // accès autorisé
  } else {
    res.setHeader('WWW-Authenticate', 'Basic realm="Zone protégée"');
    return res.status(401).send('Authentification requise.');
  }
};

// Middleware pour protéger toutes les routes
app.use(auth);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'app.html'));
});




/* -------------------- Connexion au Origines ------------------ */
const corsOptions = {
  origin : 'http://localhost:5501', //URL du front-end
  credentials: true, //Autorise l'envoi des cookies, token dans les requêtes corss-origin
  optionSuccessStatus: 200 //Pour les anciennes versions de navigateurs
}
app.use(cors(corsOptions)); /*Permet d'utiliser toutes les origines si aucun paramètre */


//Permet de configurer seulement certaines origines
/*app.use(cors({
  origin: 'http://localhost:5501'  // Lien de mon front-end
}))
*/

/* --------------------- Connexion a MongoDB --------------------- */
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ Connecté à MongoDB !'))
    .catch((err) => console.error('❌ Erreur de connexion à MongoDB : ', err));





/* ------------------------- ROUTES API -------------------------- */
app.use('/users',           require('./routes/users'));
app.use('/categories',       require('./routes/categories'));
app.use('/subcategories',    require('./routes/subcategories'));
app.use('/cards',             require('./routes/cards'));




/* ----------------- Front-End statique (optionnel) -------------------------- */
app.use(express.static(path.join(__dirname, 'public')));



/* --------------------- Lancement du serveur ----------------------*/
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
    console.log(`🚀 Serveur prêt : http://localhost:${PORT}`)
);