'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const donors = await queryInterface.sequelize.query(
      'SELECT * FROM `Donors`;', 
      { type: Sequelize.QueryTypes.SELECT }
    );

    for (const donor of donors) {
      await queryInterface.sequelize.query(
        `UPDATE \`Users\`
         SET \`donor_id\` = :donor_id
         WHERE \`id\` = :user_id;`, 
        {
          replacements: { donor_id: donor.id, user_id: donor.userId },
          type: Sequelize.QueryTypes.UPDATE,
        }
      );
    }
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
