const express = require('express');
const client = express.Router();
const { Client, Reservation, CreneauHoraire,ClientReservation,ModeleAutomobile } = require('../db'); // Importer l'instance Sequelize

// Create a new client
client.post('/', async (req, res) => {
    try {
        const { horaire, nom, prenom, email, telephone, modele_id } = req.body;

        // Recherche du créneau horaire
        const foundHoraire = await CreneauHoraire.findOne({
            where: {
                heureDebut: horaire,
            }
        });

        if (!foundHoraire) {
            return res.status(404).send('Créneau horaire non trouvé');
        }

        // Recherche de la réservation
        const foundReservation = await Reservation.findOne({
            where: {
                modeleId: modele_id,
                creneauId: foundHoraire.id
            }
        });

        const foundModele = await ModeleAutomobile.findOne({
            where: {
                id: modele_id,
            }   
        });

        if (!foundReservation) {
            return res.status(404).send('Réservation non trouvée');
        }

        if (foundReservation.quantiteReservee < foundModele.quantiteMax) {
            let clientID;
            const foundClients = await Client.findOne({
                where: {
                    email: email,
                }
            });


            if (foundClients) {
                const foundClientReservation = await ClientReservation.findOne({
                    where: {
                        clientId: foundClients.id,
                        reservationId: foundReservation.id
                    }
                });

                if (foundClientReservation) {
                    return res.status(400).send('Client déjà enregistré pour cette réservation'); 
                }
                clientID = foundClients.id;
            }

            else {
                const newClient = await Client.create({
                    nom: nom,
                    prenom: prenom,
                    email: email,
                    telephone: telephone,
                });
                console.log(newClient);
                clientID = newClient.id;
            }
            const newClientReservation = await ClientReservation.create({
                clientId: clientID,
                reservationId: foundReservation.id
            }, {
                fields: ['clientId', 'reservationId'] // Liste des colonnes à inclure dans la création
            });
            
            foundReservation.quantiteReservee += 1;

            // Enregistrement des modifications de quantiteReservee
            await foundReservation.save();
            return res.status(201).send(newClientReservation);
        } else {
            return res.status(400).send('Dépassement de la quantité maximale de réservations');
        }
    }catch (error) {
        console.error('Erreur :', error);
        return res.status(500).send('Erreur lors de la création du client');
    }
} );

module.exports = client;
