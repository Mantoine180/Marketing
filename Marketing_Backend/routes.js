const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello World!');
});

// Ajoutez vos autres routes ici.

module.exports = router;