const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Infos = sequelize.define('Infos', {
      annonce: {
        type: DataTypes.STRING,
        allowNull: true
      },
      titrePrincipal: {
        type: DataTypes.STRING,
        allowNull: true
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true
      },
      photo: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      color: {
        type:DataTypes.STRING,
        allowNull:true
      }
    });
  
    return Infos;
  };