const express = require('express'); //On importe Express pour créer un "mini-routeur"

// On instancie le routeur dd'Express. routeur deviendre une 'mini-app' dédié 
// aux cartes que l'on branchera plus tard dans app.js avec app.use('/cards', ...)
const router = express.Router();

const Card = require('../models/cards'); // On importe le modèle Mongoose 'Card' afin de manipuler la collection "cards"

// ------------------------------------------------------------------------------------------------------------------------------------
//  POST /cards   -> CREER UNE NOUVELLE CARTE
// ------------------------------------------------------------------------------------------------------------------------------------
router.post('/', async (req, res) => {
    try {
        const newCard = await Card.create(req.body);
        res.status(201).json(newCard);
    } catch (err) {
        res.status(400).json({message : "Création impossible", error : err.message});
    }
});



// -----------------------------------------------------------------------------------------------------------------------------------
// PUT /cards -> METTRE A JOUR UNE CARTE
// -----------------------------------------------------------------------------------------------------------------------------------

router.put('/:id', async (req, res) => {
    try  {
        const updated = await Card.findByIdAndUpdate(req.params.id, req.body, {new : true});
        if (!updated) // Carte non trouvé
            return res.status(404).json({message : "Carte non trouvée"});
        res.json(updated);  //Carte modifié renvoyée au client
    } catch (err) {
        res.status(400).json({message : "Mise à jour impossible", error : err.message});
    }
});



// -----------------------------------------------------------------------------------------------------------------------------------
// DELETE /cards -> SUPPRIMER UNE CARTE
// -----------------------------------------------------------------------------------------------------------------------------------

router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Card.findByIdAndDelete(req.params.id);
        if (!deleted)
            return res.status(404).json({message : "Carte non trouvé"});
        res.json({message : "Carte supprimée"});
    } catch (err) {
        res.status(400).json({message : "Erreur lors de la suppression", error : err.message});
    }
});


// -------------------------------------------------------------------------------------------------------------------------------------
// GET /cards -> LISTER TOUTES LES CARTES
// -------------------------------------------------------------------------------------------------------------------------------------
router.get('/cards', async (req, res) => {
    try {
        const allCards = await Card.find();
        if (!allCards || allCards.length === 0)
            return res.status(404).json({message : "Aucune carte trouvées"});

        res.status(200).json({message : "Carte trouvées", data: allCards});
    } catch (err) {
        res.status(400).json({message : "Erreur lors du chargement des cartes", error : err.message});
    }
})



// -------------------------------------------------------------------------------------------------------------------------------------
// GET /cards -> LISTER TOUTES LES CARTES D'UNE SOUS-CATEGORIE
// -------------------------------------------------------------------------------------------------------------------------------------
router.get('/cards/subcategories/:subcategoryId', async (req, res) => {
    try {
        const cards = await Card.find({ subcategoryId : req.params.subcategoryId});

        if (!cards || cards.length === 0 )
            return res.status(404).json({massage : "Cartes non trouvées"});
        res.status(200).json({message : "Carte trouvées", data: cards});
    } catch (err) {
        res.status(404).json({message : "Erreur lors de la récupération des cartes", error: err.message});
    }
})



// -------------------------------------------------------------------------------------------------------------------------------------
// GET /cards -> LISTER TOUTES LES CARTES D'UNE CATEGORIE
// -------------------------------------------------------------------------------------------------------------------------------------
router.get('/cards/categories/:categoriesId', async (req, res) => {
    try {
        const cards = await Card.find({ categoriesId : req.params.categoriesId});

        if (!cards || cards.length === 0 )
            return res.status(404).json({massage : "Cartes non trouvées"});
        res.status(200).json({message : "Carte trouvées", data: cards});
    } catch (err) {
        res.status(404).json({message : "Erreur lors de la récupération des cartes", error: err.message});
    }
})




// -------------------------------------------------------------------------------------------------------------------------------------
// GET /cards/:id -> RECUPERER UNE CARTE PAR SON ID 
// -------------------------------------------------------------------------------------------------------------------------------------
router.get('/cards/:cardId', async (req, res) => {
    try {
        const card = await Card.find({ cardId : req.params.cardId});

        if (!card || card.length === 0 )
            return res.status(404).json({message : "Carte non trouvé"});
        res.status(200).json({message : "Carte trouvé", data: card});
    } catch (err) {
        res.status(404).json({message : "Erreur lors de la récupération de la carte", error: err.message});
    }
})





module.exports = router;




// 5. Protéger toutes tes routes avec le middleware et filtrer avec userId


// routes/cards.js
const auth = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
    const cards = await Card.find({ userId: req.userId });
    res.json(cards);
});

router.post('/', auth, async (req, res) => {
    const newCard = await Card.create({ ...req.body, userId: req.userId });
    res.status(201).json(newCard);
});
