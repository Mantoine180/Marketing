// models/.js
const { DataTypes } = require('sequelize');
var bcrypt = require("bcrypt-nodejs");
module.exports = (sequelize) => {
  const Admin = sequelize.define('Admin', {
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        this.setDataValue('password', bcrypt.hashSync(value));
      }
    },

  });

  return Admin;
};
