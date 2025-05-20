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





// -------------------------------------------------------------------------------------------------------------------------------------
// GET /cards/:id -> RECUPERER UNE CARTE PAR SON ID 
// -------------------------------------------------------------------------------------------------------------------------------------






module.exports = router;