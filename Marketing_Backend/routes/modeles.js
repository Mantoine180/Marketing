const express = require('express');
const modeles = express.Router();
const { ModeleAutomobile,Concession } = require('../db'); // Importer l'instance Sequelize


/*modele.get('/', async (req, res) => {
  try {
    const modele = await ModeleAutomobile.findAll({
      raw: true, // Récupérer les données brutes (JSON) sans le nom de la table
      attributes: ['nomConcession'], // Inclure uniquement le champ nomConcession dans la réponse
    });

    // Extraire uniquement les noms de concession à partir des résultats
    const nomsmodeles = modele.map(concession => concession.nomConcession);

    res.json(nomsmodeles);
  } catch (error) {
    console.error('Error fetching horaires:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});*/

modeles.get('/:concession', async (req, res) => {
  const { concession } = req.params;

  try {
    // Recherchez l'ID de la concession en utilisant son nom
    const foundConcession = await Concession.findOne({
      where: {
        nomConcession: concession
      }
    });

    if (foundConcession) {
      console.log('Concession trouvée :', foundConcession.id); // Affiche l'ID de la concession trouvée
      res.status(200).json({ id: foundConcession.id });
    } else {
      console.log('Concession non trouvée');
      res.status(404).json({ message: 'Concession not found' });
    }
  } catch (error) {
    console.error('Erreur serveur :', error);
    res.status(500).json({ message: 'Server error' });
  }
});

modeles.post('/', async (req, res) => {

});


modeles.delete('/', async (req, res) => {
  try {
    // Effacer toutes les données de la table Concession
    await Concession.destroy({
      where: {},
      truncate: true
    });

    res.json({ message: 'All marque deleted successfully' });
  } catch (error) {
    console.error('Error deleting marque:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

modeles.delete('/:concession', async (req, res) => {
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

module.exports = modeles;