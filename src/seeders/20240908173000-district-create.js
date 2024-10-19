'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Districts', [
      {
        name: 'Kasaragod',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Kannur',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Wayanad',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Kozhikode',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Malappuram',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Palakkad',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Thrissur',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Ernakulam',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Alappuzha',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Kottayam',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Idukki',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Pathanamthitta',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Kollam',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Thiruvananthapuram',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Districts', null, {});
  }
};
