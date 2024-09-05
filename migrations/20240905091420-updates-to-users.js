'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn('users', "email");
    await queryInterface.addColumn('users', 'gender', {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.addColumn('users', 'phonenumber', {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.addColumn('users', 'alt_phonenumber', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('users', 'phonenumber');
    await queryInterface.removeColumn('users', 'alt_phonenumber');
    await queryInterface.removeColumn('users', 'gender');
    await queryInterface.addColumn('users', 'email', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    });
  }
};



