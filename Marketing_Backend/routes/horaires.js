const express = require('express');
const horaires = express.Router();
const { CreneauHoraire } = require('../db'); // Importer l'instance Sequelize
const verifyJWT = require('./jwtUtils.js'); 

horaires.get('/',async (req, res) => {
  try {
    const horaires = await CreneauHoraire.findAll();

    // Extraire uniquement les noms des horaires de début, de fin, et les ids à partir des résultats
    const crenauHoraires = horaires.map(creneau => {
      return {
        id: creneau.id, // Ajout du champ id
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


  horaires.post('/',verifyJWT,  async (req, res) => {
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

  horaires.delete('/',verifyJWT,  async (req, res) => {
    try {
      await CreneauHoraire.destroy({ where: {} });
      res.status(200).json({ message: 'Horaires deleted successfully' });
    } catch (error) {
      console.error('Error deleting horaires:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

module.exports = horaires;

