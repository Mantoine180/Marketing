const express = require('express');
const routes = require('./routes'); // Assurez-vous que le chemin d'accès est correct
const { sequelize } = require('./db'); // Importer l'instance Sequelize
const cors = require('cors');

const app = express();
const port = 3000;

app.use(express.json()); // Middleware pour parser les requêtes JSON
app.use(cors());// Active les en-têtes CORS pour toutes les routes

app.use('/', routes); // Utiliser les routes définies dans routes.js

sequelize.authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
