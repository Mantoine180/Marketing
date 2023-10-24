const express = require('express');
const concessions = express.Router();
const { Concession } = require('../db'); // Importer l'instance Sequelize
const verifyJWT = require('./jwtUtils.js'); 

concessions.get('/', async (req, res) => {
  try {
    const concessions = await Concession.findAll({
      raw: true, // Récupérer les données brutes (JSON) sans le nom de la table
      attributes: ['nomConcession'], // Inclure uniquement le champ nomConcession dans la réponse
    });

    // Extraire uniquement les noms de concession à partir des résultats
    const nomsConcessions = concessions.map(concession => concession.nomConcession);

    res.json(nomsConcessions);
  } catch (error) {
    console.error('Error fetching horaires:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

concessions.post('/',verifyJWT, async (req, res) => {
  const data = req.body;

  const concessionCreated = await Concession.create(data);
  res.json(concessionCreated);
});

concessions.delete('/',verifyJWT,  async (req, res) => {
  try {
    // Effacer toutes les données de la table Concession
    await Concession.destroy({
      where: {},
      truncate: true
    });

    res.json({ message: 'All concessions deleted successfully' });
  } catch (error) {
    console.error('Error deleting concessions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

concessions.delete('/:concession',verifyJWT,  async (req, res) => {
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
});

module.exports = concessions;