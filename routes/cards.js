const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const Card = require('../models/cards');

// -------------------------------------------------------------------
// GET /cards → LISTER TOUTES LES CARTES DE L’UTILISATEUR
// -------------------------------------------------------------------
router.get('/', auth, async (req, res) => {
  try {
    const cards = await Card.find({ userId: req.userId });
    if (!cards || cards.length === 0) {
      return res.status(404).json({ message: "Aucune carte trouvée" });
    }
    res.status(200).json({ message: "Cartes trouvées", data: cards });
  } catch (err) {
    res.status(400).json({ message: "Erreur lors du chargement des cartes", error: err.message });
  }
});

// -------------------------------------------------------------------
// GET /cards/subcategories/:subcategoryId → cartes par sous-catégorie
// -------------------------------------------------------------------
router.get('/subcategories/:subcategoryId', auth, async (req, res) => {
  try {
    const cards = await Card.find({
      subcategoryId: req.params.subcategoryId,
      userId: req.userId
    });

    if (!cards || cards.length === 0) {
      return res.status(404).json({ message: "Cartes non trouvées" });
    }

    res.status(200).json({ message: "Cartes trouvées", data: cards });
  } catch (err) {
    res.status(400).json({ message: "Erreur lors de la récupération des cartes", error: err.message });
  }
});

// -------------------------------------------------------------------
// GET /cards/categories/:categoryId → cartes par catégorie
// -------------------------------------------------------------------
router.get('/categories/:categoryId', auth, async (req, res) => {
  try {
    const cards = await Card.find({
      categoryId: req.params.categoryId,
      userId: req.userId
    });

    if (!cards || cards.length === 0) {
      return res.status(404).json({ message: "Cartes non trouvées" });
    }

    res.status(200).json({ message: "Cartes trouvées", data: cards });
  } catch (err) {
    res.status(400).json({ message: "Erreur lors de la récupération des cartes", error: err.message });
  }
});

// -------------------------------------------------------------------
// GET /cards/:cardId → récupérer une carte par son ID
// -------------------------------------------------------------------
router.get('/:cardId', auth, async (req, res) => {
  try {
    const card = await Card.findOne({
      _id: req.params.cardId,
      userId: req.userId
    });

    if (!card) {
      return res.status(404).json({ message: "Carte non trouvée" });
    }

    res.status(200).json({ message: "Carte trouvée", data: card });
  } catch (err) {
    res.status(400).json({ message: "Erreur lors de la récupération de la carte", error: err.message });
  }
});

// -------------------------------------------------------------------
// POST /cards → créer une nouvelle carte
// -------------------------------------------------------------------
router.post('/', auth, async (req, res) => {
  try {
    const newCard = await Card.create({
      ...req.body,
      userId: req.userId
    });
    res.status(201).json(newCard);
  } catch (err) {
    res.status(400).json({ message: "Création impossible", error: err.message });
  }
});

// -------------------------------------------------------------------
// PUT /cards/:id → mettre à jour une carte
// -------------------------------------------------------------------
router.put('/:id', auth, async (req, res) => {
  try {
    const updated = await Card.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Carte non trouvée" });
    }

    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: "Mise à jour impossible", error: err.message });
  }
});

// -------------------------------------------------------------------
// DELETE /cards/:id → supprimer une carte
// -------------------------------------------------------------------
router.delete('/:id', auth, async (req, res) => {
  try {
    const deleted = await Card.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId
    });

    if (!deleted) {
      return res.status(404).json({ message: "Carte non trouvée" });
    }

    res.json({ message: "Carte supprimée" });
  } catch (err) {
    res.status(400).json({ message: "Erreur lors de la suppression", error: err.message });
  }
});

module.exports = router;
