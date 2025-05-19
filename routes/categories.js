const express = require('express'); //On importe Express pour créer un "mini-routeur"

// On instancie le routeur dd'Express. routeur deviendre une 'mini-app' dédié 
// aux categories que l'on branchera plus tard dans app.js avec app.use('/category', ...)
const router = express.Router();

const Category = require('../models/categories'); // On importe le modèle Mongoose 'Category' afin de manipuler la collection "category"

// ------------------------------------------------------------------------------------------------------------------------------------
//  POST /category   -> CREER UNE NOUVELLE CATEGORIE
// ------------------------------------------------------------------------------------------------------------------------------------
router.post('/', async (req, res) => {
    try {
        const newCategory = await Category.create(req.body);
        res.status(201).json(newCategory);
    } catch (err) {
        res.status(400).json({message : "Creation impossible", error : err.message});
    }
});



// -----------------------------------------------------------------------------------------------------------------------------------
// PUT /category -> METTRE A JOUR UNE CATEGORIE
// -----------------------------------------------------------------------------------------------------------------------------------

router.put('/:id', async (req, res) => {
    try  {
        const updated = await Category.findByIdAndUpdate(req.params.id, req.body, {new : true});
        if (!updated) // categorie non trouvé
            return res.status(404).json({message : "Categorie non trouvee"});
        res.json(updated);  //categorie modifié renvoyée au client
    } catch (err) {
        res.status(400).json({message : "Mise a jour impossible", error : err.mesage});
    }
});



// -----------------------------------------------------------------------------------------------------------------------------------
// DELETE /category -> SUPPRIMER UNE CATEGORIE
// -----------------------------------------------------------------------------------------------------------------------------------

router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Category.findByIdAndDelete(req.params.id);
        if (!deleted)
            return res.status(404).json({message : "categorie non trouve"});
        res.json({message : "categorie supprimee"});
    } catch (err) {
        res.status(400).json({message : "Erreur lors de la suppression", error : err.message});
    }
});















module.exports = router;