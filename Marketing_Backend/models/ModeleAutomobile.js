const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const ModeleAutomobile = sequelize.define('ModeleAutomobile', {
    modèle: {
      type: DataTypes.STRING,
      allowNull: false
    },
    concessionId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Concessions', // nom de la table, pas le nom du modèle
        key: 'id'
      }
    }
  });

  return ModeleAutomobile;
};
