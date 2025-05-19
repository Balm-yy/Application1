const express = require('express'); //On importe Express pour créer un "mini-routeur"

// On instancie le routeur dd'Express. routeur deviendre une 'mini-app' dédié 
// aux subcategories que l'on branchera plus tard dans app.js avec app.use('/Subcategorys', ...)
const router = express.Router();

const Subcategory = require('../models/Subcategory'); // On importe le modèle Mongoose 'Subcategory' afin de manipuler la collection "Subcategorys"

// ------------------------------------------------------------------------------------------------------------------------------------
//  POST /Subcategorys   -> CREER UNE NOUVELLE SUBCATEGORIE
// ------------------------------------------------------------------------------------------------------------------------------------
router.post('/', async (req, res) => {
    try {
        const newSubcategory = await Subcategory.create(req.body);
        res.status(201).json(newSubcategory);
    } catch (err) {
        res.status(400).json({message : "Création impossible", error : err.message});
    }
});



// -----------------------------------------------------------------------------------------------------------------------------------
// PUT /Subcategorys -> METTRE A JOUR UNE SUBCATEGORIE
// -----------------------------------------------------------------------------------------------------------------------------------

router.put('/:id', async (req, res) => {
    try  {
        const updated = await Subcategory.findByIdAndUpdate(req.params.id, req.body, {new : true});
        if (!updated) // subcategorie non trouvé
            return res.status(404).json({message : "subcategorie non trouvée"});
        res.json(updated);  //subcategorie modifié renvoyée au client
    } catch (err) {
        res.status(400).json({message : "Mise à jour impossible", error : err.mesage});
    }
});



// -----------------------------------------------------------------------------------------------------------------------------------
// DELETE /Subcategorys -> SUPPRIMER UNE SUBCATEGORIE
// -----------------------------------------------------------------------------------------------------------------------------------

router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Subcategory.findByIdAndDelete(req.params.id);
        if (!deleted)
            return res.status(404).json({message : "subcategorie non trouvé"});
        res.json({message : "subcategorie supprimé"});
    } catch (err) {
        res.status(400).json({message : "Erreur lors de la suppression", error : err.message});
    }
});


// -------------------------------------------------------------------------------------------------------------------------------------
// GET /Subcategorys -> LISTER TOUTES LES SUBCATEGORIES
// -------------------------------------------------------------------------------------------------------------------------------------





// -------------------------------------------------------------------------------------------------------------------------------------
// GET /Subcategorys/:id -> RECUPERER UNE SUBCATEGORIE PAR SON ID 
// -------------------------------------------------------------------------------------------------------------------------------------














module.exports = router;