module.exports = (sequelize, DataTypes) => {
    const Reservation = sequelize.define('Reservation', {
      sender: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users', // Assuming the User model is named 'Users'
          key: 'id',
        },
      },
      receiver: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Providers', // Assuming the Provider model is named 'Providers'
          key: 'id',
        },
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    });
  
    Reservation.associate = (models) => {
      Reservation.belongsTo(models.User, { foreignKey: 'sender', as: 'senderUser' });
      Reservation.belongsTo(models.Provider, { foreignKey: 'receiver', as: 'receiverProvider' });
    };
  
    return Reservation;
  };
  