'use strict';

const {hasshingPass} = require('../helper/password')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Admin.belongsToMany(models.Product,{through:models.Cart,foreignKey:'AdminId'})
    }
  };
  Admin.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Admin',
    hooks:{
      beforeCreate(admin,opt){
        admin.password = hasshingPass(admin.password)
        admin.role = 'customer'
      }
    }
  });
  return Admin;
};