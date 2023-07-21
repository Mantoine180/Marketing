const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Infos = sequelize.define('Infos', {
      annonce: {
        type: DataTypes.STRING,
        allowNull: false
      },
      titrePrincipal: {
        type: DataTypes.STRING,
        allowNull: false
      },
      descrition: {
        type: DataTypes.STRING,
        allowNull: false
      },
      photo: {
        type: DataTypes.STRING,
        allowNull: false
      },
      color: {
        type:DataTypes.STRING,
        allowNull:false
      }
    });
  
    return Infos;
  };