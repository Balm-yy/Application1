// routes/auth.js

const express = require('express');
const router = express.Router();
const User = require('../models/users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


// Clé secrète JWT
// A sécuriser avec une variable d’environnement
    //require('dotenv').config();
    //onst JWT_SECRET = process.env.JWT_SECRET;

const JWT_SECRET = "super_secret_key"; //const JWT_SECRET = process.env.JWT_SECRET || 'ton_secret'; 




// -------------------- REGISTER --------------------
router.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;


        // Search for an existing user
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "Email déjà utilisé" });

        // Create user
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ email, password: hashedPassword});



        res.status(201).json({message : "Utilisateur créé"});
    } catch (err) {
        res.status(404).json({error : err.message});
    }
});

//Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message : "Utilisateur non trouvé" });

    const valid = await bcrypt.compare(password, user.password );
    if (!valid) return res.status(404).json({ message : "Mot de passe incorrect" });

    const token = jwt.sign({ userId : user._id }, JWT_SECRET, { expiresIn: '24h' });
    res.json({ token });
});