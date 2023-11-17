const { Sequelize, DataTypes } = require('sequelize');
const defineClient = require('./models/Client');
const defineReservation = require('./models/Reservation');
const defineModeleAutomobile = require('./models/ModeleAutomobile');
const defineCreneauHoraire = require('./models/CreneauHoraire');
const defineConcession = require('./models/Concession');
const defineInfo=require('./models/Infos') // Ajoutez ceci
const defineAdmin=require('./models/Admin') // Ajoutez ceci
const defineClientReservation=require('./models/ClientReservation') // Ajoutez ceci

// Initialisez Sequelize
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  define: {
    charset: 'utf8',
    collate: 'utf8_general_ci',
    dialectOptions: {
      cascade: true
    }
  }
});


// Définissez les modèles
const Client = defineClient(sequelize);
const Reservation = defineReservation(sequelize);
const ModeleAutomobile = defineModeleAutomobile(sequelize);
const CreneauHoraire = defineCreneauHoraire(sequelize);
const Concession = defineConcession(sequelize); // Ajoutez ceci
const Infos=defineInfo(sequelize);
const Admin=defineAdmin(sequelize);
const ClientReservation=defineClientReservation(sequelize); // Ajoutez ceci

// Définissez les relations
Client.belongsToMany(Reservation, {
  through: 'ClientReservations',
  foreignKey: 'clientId', // Nom de la colonne pour la clé étrangère client_id
  otherKey: 'reservationId' // Nom de la colonne pour la clé étrangère reservation_id
});

Reservation.belongsToMany(Client, {
  through: 'ClientReservations',
  foreignKey: 'reservationId', // Nom de la colonne pour la clé étrangère reservation_id
  otherKey: 'clientId' // Nom de la colonne pour la clé étrangère client_id
});


Reservation.belongsTo(ModeleAutomobile, { as: 'modele', foreignKey: 'modeleId' ,onDelete: 'CASCADE'});
ModeleAutomobile.hasMany(Reservation, { as: 'reservations', foreignKey: 'modeleId' ,onDelete: 'CASCADE'});

Reservation.belongsTo(CreneauHoraire, { as: 'creneau', foreignKey: 'creneauId' ,onDelete: 'CASCADE'});
CreneauHoraire.hasMany(Reservation, { as: 'reservations', foreignKey: 'creneauId' ,onDelete: 'CASCADE'});

ModeleAutomobile.belongsTo(Concession, { as: 'concession', foreignKey: 'concessionId' ,onDelete: 'CASCADE'}); // Ajoutez ceci
Concession.hasMany(ModeleAutomobile, { as: 'modeles', foreignKey: 'concessionId' ,onDelete: 'CASCADE'}); // Ajoutez ceci

// Synchronisez la base de données
sequelize.sync();

module.exports = {
  sequelize,
  Infos,
  Client,
  Reservation,
  ModeleAutomobile,
  CreneauHoraire,
  Concession, // Ajoutez ceci
  Admin, // Ajoutez ceci
  ClientReservation // Ajoutez ceci
};
