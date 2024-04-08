'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
    await queryInterface.bulkInsert('generos', [{
        id:1,
        name: 'Folklore',
    },
    {
      id:2,
      name: 'Rock',
    },
    {
      id:3,
      name: 'Pop',
    }], {});
    
  },

  async down (queryInterface, Sequelize) {
   
    await queryInterface.bulkDelete('generos', null, {});
    
  }
};
