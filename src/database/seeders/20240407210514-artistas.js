'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
    await queryInterface.bulkInsert('artistas', [{
        id:1,
        nombre: 'Abel',
        apellido: 'Pintos'
    },
    {
      id:2,
      nombre: 'Leon',
      apellido: 'Gieco'
    },
    {
      id:3,
      nombre: 'Jorge',
      apellido: 'Drexler'
    }], {});
    
  },

  async down (queryInterface, Sequelize) {
   
    await queryInterface.bulkDelete('artistas', null, {});
    
  }
};
