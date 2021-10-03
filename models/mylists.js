'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class myLists extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      myLists.belongsTo(models.users, {
        as: 'bookList',
        foreignKey: {
          name: 'user_id',
        },
      });

      myLists.hasMany(models.books, {
        as: 'bookIdList',
        foreignKey: {
          name: 'book_id',
        },
      });
    }
  };
  myLists.init({
    user_id: DataTypes.INTEGER,
    book_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'myLists',
  });
  return myLists;
};