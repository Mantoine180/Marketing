const express = require('express');
const router = express.Router();
const { Concession } = require('./db'); // Importer l'instance Sequelize

router.get('/', (req, res) => {
  res.send('Hello World!');
});

router.get('/api/concession', async (req, res) => {
  try {
    const concessions = await Concession.findAll({
      raw: true, // Récupérer les données brutes (JSON) sans le nom de la table
      attributes: ['nomConcession'], // Inclure uniquement le champ nomConcession dans la réponse
    });

    // Extraire uniquement les noms de concession à partir des résultats
    const nomsConcessions = concessions.map(concession => concession.nomConcession);

    res.json(nomsConcessions);
  } catch (error) {
    console.error('Error fetching concessions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.post('/api/concession', async (req, res) => {
  const data = req.body;

  const concessionCreated = await Concession.create(data);
  res.json(concessionCreated);
});

module.exports = router;