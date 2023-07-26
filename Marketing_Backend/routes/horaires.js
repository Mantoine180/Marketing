const express = require('express');
const horaires = express.Router();
const { CreneauHoraire } = require('../db'); // Importer l'instance Sequelize


horaires.get('/', async (req, res) => {
    try {
      const horaires = await CreneauHoraire.findAll();
  
      // Extraire uniquement les noms des horaires de début et de fin à partir des résultats
      const crenauHoraires = horaires.map(creneau => {
        return {
          heureDebut: creneau.heureDebut,
          heureFin: creneau.heureFin
        };
      });
  
      res.json(crenauHoraires);
    } catch (error) {
      console.error('Error fetching horaires:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
module.exports = horaires;
/*horaires.post('/', async (req, res) => {
  /*const data = req.body;

  const concessionCreated = await Concession.create(data);
  res.json(concessionCreated);
});

horaires.delete('/', async (req, res) => {
  try {
    // Effacer toutes les données de la table Concession
    await Concession.destroy({
      where: {},
      truncate: true
    });

    res.json({ message: 'All horaires deleted successfully' });
  } catch (error) {
    console.error('Error deleting horaires:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

horaires.delete('/:concession', async (req, res) => {
  const { concession } = req.params;
  
  try {
    const deletedConcession = await Concession.destroy({
      where: {
        nomConcession: concession
      }
    });

    if (deletedConcession === 1) {
      res.json({ message: 'The concession deleted successfully' });
    } else {
      res.status(404).json({ error: 'Concession not found' });
    }
  } catch (error) {
    console.error('Error deleting concession:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
})*/;

