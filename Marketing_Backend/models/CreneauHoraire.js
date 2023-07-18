const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const CreneauHoraire = sequelize.define('CreneauHoraire', {
    heureDebut: {
      type: DataTypes.DATE,
      allowNull: false
    },
    heureFin: {
      type: DataTypes.DATE,
      allowNull: false
    }
  });

  return CreneauHoraire;
};
