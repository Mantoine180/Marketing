// models/Client.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Page = sequelize.define('Page', {
    titrePrincipal: {
        type: DataTypes.STRING,
        allowNull: false
      },

  });

  return Page;
};
