// models/Client.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Client = sequelize.define('Client', {
    nom: {
      type: DataTypes.STRING,
      allowNull: false
    },
    prenom: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    telephone: {
      type: DataTypes.STRING,
    },
  });

  Client.associate = (models) => {
    Client.belongsToMany(models.Reservation, {
      through: models.ClientReservation,
      foreignKey: 'clientId', // Clé étrangère dans la table intermédiaire
    });
  };
  return Client;
};
