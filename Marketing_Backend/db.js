const { Sequelize, DataTypes } = require('sequelize');
const defineClient = require('./models/Client');
const defineReservation = require('./models/Reservation');
const defineModeleAutomobile = require('./models/ModeleAutomobile');
const defineCreneauHoraire = require('./models/CreneauHoraire');
const defineConcession = require('./models/Concession');
const defineInfo=require('./models/Data') // Ajoutez ceci

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
const Info=defineInfo(sequelize);

// Définissez les relations
Client.belongsTo(Reservation, { as: 'reservation', foreignKey: 'reservationId' });
Reservation.hasOne(Client, { as: 'client', foreignKey: 'reservationId' });

Reservation.belongsTo(ModeleAutomobile, { as: 'modele', foreignKey: 'modeleId' });
ModeleAutomobile.hasMany(Reservation, { as: 'reservations', foreignKey: 'modeleId' });

Reservation.belongsTo(CreneauHoraire, { as: 'creneau', foreignKey: 'creneauId' });
CreneauHoraire.hasMany(Reservation, { as: 'reservations', foreignKey: 'creneauId' });

ModeleAutomobile.belongsTo(Concession, { as: 'concession', foreignKey: 'concessionId' }); // Ajoutez ceci
Concession.hasMany(ModeleAutomobile, { as: 'modeles', foreignKey: 'concessionId' }); // Ajoutez ceci

// Synchronisez la base de données
sequelize.sync();

module.exports = {
  sequelize,
  Info,
  Client,
  Reservation,
  ModeleAutomobile,
  CreneauHoraire,
  Concession // Ajoutez ceci
};
