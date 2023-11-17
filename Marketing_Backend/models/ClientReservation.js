const { DataTypes } = require('sequelize');

// models/ClientReservation.js
module.exports = (sequelize) => {
    const ClientReservation = sequelize.define('ClientReservation', {
      clientId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Client',
          key: 'id'
        }
      },
      reservationId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Reservation',
          key: 'id'
        }
      }
    });
  
    return ClientReservation;
  };
  