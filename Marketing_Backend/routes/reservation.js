const express = require('express');
const reservation = express.Router();
const { Reservation,ModeleAutomobile} = require('../db'); // Importer l'instance Sequelize

reservation.get('/idconcession', async (req, res) => { 
  const modele = req.query.modele;
  const concessionId = req.query.concessionId;

  try {
    const foundModele = await ModeleAutomobile.findOne({
      where: {
        modele: modele,
        concessionId: concessionId
      }
    });

    if (foundModele) {
      console.log('Modèle trouvé:', foundModele.id);
      res.status(200).send(foundModele.id.toString());
    } else {
      console.log('Modèle non trouvé');
      res.status(404).json({ message: 'Model not found' });
    }
  } catch (error) {
    console.error('Erreur serveur:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


  
reservation.post('/', async (req, res) => {
  try {
    // Prenez les données du corps de la requête
    const { quantiteMax,creneauId,modeleId } = req.body; // Utilisez "modele" sans accent
    // Validation
    if (!quantiteMax || !creneauId|| !modeleId) {
      return res.status(400).json({ message: 'Modèle et concessionId sont nécessaires' });
    }

    // Insérez le nouveau modèle
    const newReservation = await Reservation.create({ quantiteReservee:0, quantiteMax:quantiteMax,modeleId:modeleId,creneauId:creneauId });
    // Répondez avec succès
    res.status(201).json(newReservation);
    
  } catch (error) {
    console.error("Erreur lors de l'insertion des reservations:", error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

reservation.delete('/', async (req, res) => {
  try {

  } catch (error) {
    console.error('Error deleting reservation:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

    module.exports = reservation;    