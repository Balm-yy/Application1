require('dotenv').config();  //Pour lire le fichier .env (connexion à la BDD)
const mongoose = require('mongoose');
const express = require('express');
const app = express();


/* --------------------- Connexion a MongoDB --------------------- */
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ Connecté à MongoDB !'))
    .catch((err) => console.error('❌ Erreur de connexion à MongoDB : ', err));




/* ------------------------- ROUTES API -------------------------- */
app.use('/users',           require('./routes/user'));
app.use('/categories',       require('./routes/category'));
app.use('/subcategories',    require('/.routes/subcategory'));
app.use('/card',             require('./routes/card'));




/* ----------------- Front-End statique (optionnel) -------------------------- */
app.use(express.static(path.join(__dirname, 'public')));



/* --------------------- Lancement du serveur ----------------------*/
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
    console.log('🚀 Serveur prêt : htpp://localhost:${PORT}')
);