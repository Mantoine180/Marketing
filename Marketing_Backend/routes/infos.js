const express = require('express');
const infos = express.Router();
const { Infos } = require('../db'); // Importer l'instance Sequelize

infos.put('/', async (req, res) => {
    try {
      const existingInfo = await Infos.findOne();
      if (existingInfo) {
        existingInfo.annonce = req.body.annonce;
        existingInfo.titrePrincipal = req.body.titrePrincipal;
        existingInfo.description = req.body.description;
        existingInfo.color = req.body.color;
        existingInfo.photo = req.body.photo; // Stockez le base64 dans le champ photo
        await existingInfo.save();
        return res.status(200).json({ message: 'Updated successfully!' });
      } else {
        return res.status(404).json({ message: 'Not found' });
      }
    } catch (error) {
      return res.status(500).json({ message: 'Server error' });
    }
});

infos.post('/', async (req, res) => {
    try {
        const newInfo = await Infos.create();
        return res.status(201).json(newInfo);
    } catch (error) {
        return res.status(400).json({ message: 'Not found' });
    }
});

infos.get('/', async (req, res) => {
    try {
        const info = await Infos.findOne(); // Récupérez une seule information depuis la base de données
        if (info) {
            // Si une information est trouvée, renvoyez l'annonce
            res.status(200).json({ annonce: info.annonce,titrePrincipal:info.titrePrincipal,description:info.description,color:info.color,photo:info.photo});
        } else {
            // Si aucune information n'est trouvée, renvoyez une réponse 404
            res.status(404).json({ message: 'Aucune information trouvée' });
        }
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'annonce :', error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

module.exports = infos;