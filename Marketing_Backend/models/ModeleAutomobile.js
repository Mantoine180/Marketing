const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const ModeleAutomobile = sequelize.define('ModeleAutomobile', {
    modele: {  // <-- changement ici
      type: DataTypes.STRING,
      allowNull: false
    },
    photo: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    concessionId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Concessions', 
        key: 'id'
      }
    }
  });

  return ModeleAutomobile;
};
