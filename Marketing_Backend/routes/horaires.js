const express = require('express');
const horaires = express.Router();
const { CreneauHoraire,ModeleAutomobile,Reservation } = require('../db'); // Importer l'instance Sequelize
const verifyJWT = require('./jwtUtils.js'); 
const Sequelize = require('sequelize');

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

horaires.get('/spehoraires', async (req, res) => {
  try {
    const modeles = await ModeleAutomobile.findAll();

    const creneauModeles = await Promise.all(
      modeles.map(async (modele) => {
        const horaires = await CreneauHoraire.findAll({
          attributes: [
            'heureDebut',
            'heureFin',
            [Sequelize.literal('reservations.quantiteReservee'), 'quantiteReservee'],
          ],
          include: [
            {
              model: Reservation,
              as: 'reservations',
              where: {
                modeleId: modele.id,
                quantiteReservee: {
                  [Sequelize.Op.lt]: modele.quantiteMax,
                },
              },
              attributes: [],
            },
          ],
          order: [['heureDebut', 'ASC']],
        });

        return {
          id: modele.id,
          modele: modele.modele,
          horaires,
        };
      })
    );

    res.status(200).json(creneauModeles);
    
  } catch (error) {
    // Gestion des erreurs
  }
  });



horaires.post('/', verifyJWT, async (req, res) => {
  try {
    const horairesData = req.body.horaires;
    if (!horairesData || !Array.isArray(horairesData)) {
      return res.status(400).json({ error: 'Invalid data format' });
    }

    const creneaux = await Promise.all(
      horairesData.map((horaire) =>
        CreneauHoraire.create({
          heureDebut: horaire.heureDebut,
          heureFin: horaire.heureFin,
        })
      )
    );

    const modeleAutomobiles = await ModeleAutomobile.findAll();
    if (modeleAutomobiles) {
      await Promise.all(
        modeleAutomobiles.map((modele) =>
          Promise.all(
            creneaux.map((creneau) =>
              Reservation.create({
                quantiteReservee: 0,
                modeleId: modele.id,
                creneauId: creneau.id,
              })
            )
          )
        )
      );
    }

    res.status(201).json({ message: 'Horaires inserted successfully' });
  } catch (error) {
    console.error('Error inserting horaires:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

horaires.delete('/', verifyJWT, async (req, res) => {
  try {
    await CreneauHoraire.destroy({ where: {} });
    res.status(200).json({ message: 'Horaires deleted successfully' });
  } catch (error) {
    console.error('Error deleting horaires:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = horaires;
