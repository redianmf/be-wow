'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transactions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      transactions.belongsTo(models.users, {
        as: 'admin',
        foreignKey: {
          name: 'admin_id',
        },
      }),

      transactions.belongsTo(models.users, {
        as: 'user',
        foreignKey: {
          name: 'user_id',
        },
      }),

      transactions.belongsTo(models.books, {
        as: 'books',
        foreignKey: {
          name: 'book_id',
        },
      })

    }
  };
  transactions.init({
    transferProof: DataTypes.STRING,
    remainingActive: DataTypes.INTEGER,
    userStatus: DataTypes.STRING,
    paymentStatus: DataTypes.STRING,
    admin_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    book_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'transactions',
  });
  return transactions;
};