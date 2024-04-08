'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
    await queryInterface.bulkInsert('albumes', [{
        id:1,
        nombre: 'El Desembarco',
        duracion: '64'
    },
    {
      id:2,
      nombre: 'Bandidos Rurales',
      duracion: '60'
    },
    {
      id:3,
      nombre: 'Sea',
      duracion: '43'
    },{
      
      id:4,
      nombre: 'Bailar En La Cueva',
      duracion: '45'
    },{
      
      id:5,
      nombre: 'Sueño Dorado',
      duracion: '44'
    },{
      
      id:6,
      nombre: 'Reflejo Real',
      duracion: '46'
    }], {});
    
  },

  async down (queryInterface, Sequelize) {
   
    await queryInterface.bulkDelete('albumes', null, {});
    
  }
};
