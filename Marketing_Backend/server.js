require('dotenv').config();
const express = require('express');
const concessions = require('./routes/concessions'); // Assurez-vous que le chemin d'accès est correct
const horaires = require('./routes/horaires');
const modeles = require('./routes/modeles');
const reservation = require('./routes/reservation');
const infos = require('./routes/infos');
const admin = require('./routes/admin');

const { sequelize } = require('./db'); // Importer l'instance Sequelize
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware pour augmenter la limite de taille pour toutes les demandes
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

//const verifyJWT = require('./routes/jwtUtils.js'); 
app.use(cors()); // Active les en-têtes CORS pour toutes les routes

app.use('/api/concession', concessions); // Utiliser les routes définies dans routes.js
app.use('/api/horaires', horaires);
app.use('/api/modeles', modeles);
app.use('/api/reservation', reservation);
app.use('/api/infos', infos);
app.use('/api/admin', admin);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});
