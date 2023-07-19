const express = require('express');
const router = express.Router();
const { Concession } = require('./db'); // Importer l'instance Sequelize

router.get('/', (req, res) => {
  res.send('Hello World!');
});

router.get('/api/concession', async (req, res) => {
  console.log(Concession);
  const concessions = await Concession.findAll();
  res.json(concessions);
});

router.post('/api/concession', async (req, res) => {
  const data = req.body;

  const concessionCreated = await Concession.create(data);
  res.json(concessionCreated);
});

module.exports = router;