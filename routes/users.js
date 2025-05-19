const express = require('express'); //On importe Express pour créer un "mini-routeur"

// On instancie le routeur dd'Express. routeur deviendre une 'mini-app' dédié 
// aux users que l'on branchera plus tard dans app.js avec app.use('/Users', ...)
const router = express.Router();

const User = require('../models/users'); // On importe le modèle Mongoose 'User' afin de manipuler la collection "Users"

// ------------------------------------------------------------------------------------------------------------------------------------
//  POST /Users   -> CREER UNE NOUVELLE USER
// ------------------------------------------------------------------------------------------------------------------------------------
router.post('/', async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({message : "Création impossible", error : err.message});
    }
});



// -----------------------------------------------------------------------------------------------------------------------------------
// PUT /Users -> METTRE A JOUR UNE USER
// -----------------------------------------------------------------------------------------------------------------------------------

router.put('/:id', async (req, res) => {
    try  {
        const updated = await User.findByIdAndUpdate(req.params.id, req.body, {new : true});
        if (!updated) // user non trouvé
            return res.status(404).json({message : "user non trouvée"});
        res.json(updated);  //user modifié renvoyée au client
    } catch (err) {
        res.status(400).json({message : "Mise à jour impossible", error : err.mesage});
    }
});



// -----------------------------------------------------------------------------------------------------------------------------------
// DELETE /Users -> SUPPRIMER UNE USER
// -----------------------------------------------------------------------------------------------------------------------------------

router.delete('/:id', async (req, res) => {
    try {
        const deleted = await User.findByIdAndDelete(req.params.id);
        if (!deleted)
            return res.status(404).json({message : "user non trouvé"});
        res.json({message : "USER supprimé"});
    } catch (err) {
        res.status(400).json({message : "Erreur lors de la suppression", error : err.message});
    }
});


// -------------------------------------------------------------------------------------------------------------------------------------
// GET /Users -> LISTER TOUTES LES USERS
// -------------------------------------------------------------------------------------------------------------------------------------





// -------------------------------------------------------------------------------------------------------------------------------------
// GET /Users/:id -> RECUPERER UNE USER PAR SON ID 
// -------------------------------------------------------------------------------------------------------------------------------------











module.exports = router;