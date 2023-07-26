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

  horaires.post('/', async (req, res) => {
    try {
      const horairesData = req.body.horaires; // Assurez-vous que le client envoie les données du tableau horaires dans le corps de la requête POST
      if (!horairesData || !Array.isArray(horairesData)) {
        return res.status(400).json({ error: 'Invalid data format' });
      }
  
      // Boucle pour insérer les horaires dans la base de données
      for (const horaire of horairesData) {
        await CreneauHoraire.create({
          heureDebut: horaire.heureDebut,
          heureFin: horaire.heureFin
        });
      }
  
      res.status(201).json({ message: 'Horaires inserted successfully' });
    } catch (error) {
      console.error('Error inserting horaires:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

module.exports = horaires;

