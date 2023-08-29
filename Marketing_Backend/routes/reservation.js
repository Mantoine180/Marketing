const express = require('express');
const reservation = express.Router();
const { Reservation,CreneauHoraire,ModeleAutomobile } = require('../db'); // Importer l'instance Sequelize

reservation.get('/:concessionId/:modele', async (req, res) =>{ 
    const { modele,concessionId } = req.params;

    try {
      // Recherchez l'ID de la concession en utilisant son nom
      const foundModele = await ModeleAutomobile.findOne({
        where: {
          modele: modele,
          concessionId: concessionId
        }
      });
  
      if (foundModele) {
        console.log('Modèle trouvée :', foundModele.id); // Affiche l'ID de la concession trouvée
        res.status(200).send(foundModele.id.toString());
      } else {
        console.log('Concession non trouvée');
        res.status(404).json({ message: 'Concession not found' });
      }
    } catch (error) {
      console.error('Erreur serveur :', error);
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