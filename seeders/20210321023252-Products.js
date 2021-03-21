'use strict';

const { NOW } = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

     await queryInterface.bulkInsert('Products', [
       {
       name : 'silver bracelet',
       imageUrl : 'http://www.fope.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/7/4/744b_top_b_4.jpeg',
       price : 123123,
       stock : 5,
       createAt :new Date(),
       updatedAt: new Date()
      },
      {
       name : 'kelly bracelet',
       imageUrl : 'https://assets.hermes.com/is/image/hermesproduct/kelly-bracelet-small-model--109032B%2000-worn-2-0-0-1100-1100_b.jpg',
       price : 30000,
       stock : 2,
       createAt :new Date(),
       updatedAt: new Date()
      },
      {
      name : 'mother daughter bracelet',
       imageUrl : 'https://media.kohlsimg.com/is/image/kohls/3588823?wid=1200&hei=1200&op_sharpen=1',
       price : 700000,
       stock : 2,
       createAt :new Date(),
       updatedAt: new Date()
      }
  
  ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

     await queryInterface.bulkDelete('Products', null, {});
  }
};
