const express = require('express');
const modeles = express.Router();
const { ModeleAutomobile,Concession } = require('../db'); // Importer l'instance Sequelize

modeles.get('/', async (req, res) => {
  try {
    const models = await ModeleAutomobile.findAll({
      attributes: ['modele', 'photo'],
      include: [
        {
          model: Concession,
          as: 'concession', // Le même alias que dans votre modèle
          attributes: ['nomConcession'],
        },
      ],
    });

    // Transformez les données pour obtenir la structure souhaitée
    const transformedModels = models.map((model) => ({
      modele: model.modele,
      photo: model.photo,
      concession: model.concession ? model.concession.nomConcession : '', // Si la concession existe, incluez son nom, sinon une chaîne vide
    }));

    res.status(200).json(transformedModels);
  } catch (error) {
    console.error('Erreur serveur :', error);
    res.status(500).json({ message: 'Server error' });
  }
});


modeles.get('/id/:concession', async (req, res) => {
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
    const { modele, concessionId, photo} = req.body; // Utilisez "modele" sans accent
    // Validation
    if (!modele || !concessionId) {
      return res.status(400).json({ message: 'Modèle et concessionId sont nécessaires' });
    }

    // Insérez le nouveau modèle
    const newModel = await ModeleAutomobile.create({ modele: modele, concessionId: concessionId,photo:photo });
    // Répondez avec succès
    res.status(201).json(newModel);
    
  } catch (error) {
    console.error("Erreur lors de l'insertion du modèle:", error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

modeles.delete('/', async (req, res) => {
  console.log(req.params)
  const modeleName = req.query.modele;
  const concessionName = req.query.concession;
  console.log(modeleName)
  try {
    // Recherchez le modèle à supprimer par nom du modèle et concession
    const modelToDelete = await ModeleAutomobile.findOne({
      where: {
        modele: modeleName,
      },
      include: [
        {
          model: Concession,
          as: 'concession', // Le même alias que dans votre modèle
          where: {
            nomConcession: concessionName,
          },
        },
      ],
    });
  
    if (modelToDelete) {
      // Supprimez le modèle
      await modelToDelete.destroy();
      // Répondez avec succès
      res.status(200).json({ message: 'Modèle supprimé' });
    } else {
      res.status(404).json({ message: 'Modèle non trouvé' });
    }
  } catch (error) {
    console.error("Erreur lors de la suppression du modèle:", error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
  
});
module.exports = modeles;