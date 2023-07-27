const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const CreneauHoraire = sequelize.define('CreneauHoraire', {
    heureDebut: {
      type: DataTypes.TIME,
      allowNull: false
    },
    heureFin: {
      type: DataTypes.TIME,
      allowNull: false
    }
  });

  return CreneauHoraire;
};
