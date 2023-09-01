const express = require('express');
const modeles = express.Router();
const { ModeleAutomobile,Concession } = require('../db'); // Importer l'instance Sequelize

modeles.get('/:concession', async (req, res) => {
  const { concession } = req.params;

  try {
    // Recherchez l'ID de la concession en utilisant son nom
    const foundConcession = await Concession.findOne({
      where: {
        nomConcession: concession
      }
    });

    if (foundConcession) {
      console.log('Concession trouvée :', foundConcession.id); // Affiche l'ID de la concession trouvée
      res.status(200).send(foundConcession.id.toString());
    } else {
      console.log('Concession non trouvée');
      res.status(404).json({ message: 'Concession not found' });
    }
  } catch (error) {
    console.error('Erreur serveur :', error);
    res.status(500).json({ message: 'Server error' });
  }
});

modeles.post('/', async (req, res) => {
  try {
    // Prenez les données du corps de la requête
    const { modele, concessionId } = req.body; // Utilisez "modele" sans accent
    // Validation
    if (!modele || !concessionId) {
      return res.status(400).json({ message: 'Modèle et concessionId sont nécessaires' });
    }

    // Insérez le nouveau modèle
    const newModel = await ModeleAutomobile.create({ modele: modele, concessionId: concessionId });
    // Répondez avec succès
    res.status(201).json(newModel);
    
  } catch (error) {
    console.error("Erreur lors de l'insertion du modèle:", error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});


module.exports = modeles;