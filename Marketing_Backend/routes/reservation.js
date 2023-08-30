const express = require('express');
const reservation = express.Router();
const { Reservation,CreneauHoraire,ModeleAutomobile } = require('../db'); // Importer l'instance Sequelize

reservation.get('/:concessionId/:modele', async (req, res) => { 
  const { modele, concessionId } = req.params;

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

    res.status(201).json({ message: 'reservation inserted successfully' });
    } catch (error) {
    console.error('Error inserting reservation:', error);
    res.status(500).json({ error: 'Internal server error' });
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