'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      users.hasOne(models.profiles, {
        as: "profile",
        foreignKey: {
          name: "user_id",
        },
      });

      users.hasMany(models.books, {
        as: "books",
        foreignKey: {
          name: "admin_id",
        },
      });

      users.hasMany(models.transactions, {
        as: "adminTransactions",
        foreignKey: {
          name: "admin_id",
        },
      });
      
      users.hasMany(models.transactions, {
        as: "userTransactions",
        foreignKey: {
          name: "user_id",
        },
      });
    }
  };
  users.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    fullName: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};