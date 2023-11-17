const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Reservation = sequelize.define('Reservation', {
    quantiteReservee: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    modeleId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'ModeleAutomobiles', // nom de la table, pas le nom du modèle
        key: 'id'
      }
    },
    creneauId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'CreneauHoraires', // nom de la table, pas le nom du modèle
        key: 'id'
      }
    }
  });

  Reservation.associate = (models) => {
    Reservation.belongsToMany(models.Client, {
      through: models.ClientReservation,
      foreignKey: 'reservationId', // Clé étrangère dans la table intermédiaire
    });
  };
  return Reservation;
};

