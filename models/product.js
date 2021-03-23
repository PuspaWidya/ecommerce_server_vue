'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsToMany(models.Admin,{through:models.Cart,foreignKey:'ProductId'})
    }
  };
  Product.init({
    name: {
      type : DataTypes.STRING,
      validate :{
        notEmpty :{
          args :true,
          msg : "name is required"},
      }
    },
    imageUrl: {
      type :DataTypes.STRING,
    validate:{
      notEmpty:{
        args: true,
        msg : 'imageUrl is required'
      }
    }},
    price: {
      type : DataTypes.INTEGER,
      validate:{
        min :{
          args : [0],
          msg : "minus price is not allowed"},
        notEmpty:{
          args:true,
          msg : 'price is required'
        }
      }},
    stock: {
      type : DataTypes.INTEGER,
      validate:{
        min:{
          args: [0],
          msg : 'minus stock is not allowed'
        },
        notEmpty : {
          args : true,
          msg : 'stock is required'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};