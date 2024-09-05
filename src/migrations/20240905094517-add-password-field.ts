'use strict';

import { QueryInterface, Sequelize ,DataTypes} from 'sequelize';


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface: QueryInterface, Sequelize: Sequelize) {
    await queryInterface.addColumn('users', 'password', {
      type: DataTypes.STRING,
      allowNull: false,
    });
  },

  async down (queryInterface: QueryInterface, Sequelize:Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
