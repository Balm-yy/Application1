const express = require('express'); //On importe Express pour créer un "mini-routeur"

// On instancie le routeur dd'Express. routeur devient une 'mini-app' dédié 
// aux categories que l'on branchera plus tard dans app.js avec app.use('/categories', ...)
const router = express.Router();

const Category = require('../models/categories'); // On importe le modèle Mongoose 'Categories' afin de manipuler la collection "category"

// ------------------------------------------------------------------------------------------------------------------------------------
//  POST /category   -> CREER UNE NOUVELLE CATEGORIE
// ------------------------------------------------------------------------------------------------------------------------------------
router.post('/', async (req, res) => {
    try {
        const newCategory = await Category.create(req.body);
        res.status(201).json(newCategory);
    } catch (err) {
        res.status(400).json({message : "Création impossible", error : err.message});
    }
});



// -----------------------------------------------------------------------------------------------------------------------------------
// PUT /category -> METTRE A JOUR UNE CATEGORIE
// -----------------------------------------------------------------------------------------------------------------------------------

router.put('/:id', async (req, res) => {
    try  {
        const updated = await Category.findByIdAndUpdate(req.params.id, req.body, {new : true});
        if (!updated) // categorie non trouvé
            return res.status(404).json({message : "Catégorie non trouvée"});
        res.json(updated);  //categorie modifié renvoyée au client
    } catch (err) {
        res.status(400).json({message : "Mise à jour impossible", error : err.message});
    }
});



// -----------------------------------------------------------------------------------------------------------------------------------
// DELETE /category -> SUPPRIMER UNE CATEGORIE
// -----------------------------------------------------------------------------------------------------------------------------------

router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Category.findByIdAndDelete(req.params.id);
        if (!deleted)
            return res.status(404).json({message : "catégorie non trouvée"});
        res.json({message : "catégorie supprimée"});
    } catch (err) {
        res.status(400).json({message : "Erreur lors de la suppression", error : err.message});
    }
});















module.exports = router;