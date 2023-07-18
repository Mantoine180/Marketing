const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Concession = sequelize.define('Concession', {
    nomConcession: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  return Concession;
};
