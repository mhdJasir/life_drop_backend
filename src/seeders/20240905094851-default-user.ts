import { QueryInterface, Sequelize } from 'sequelize';
import bcrypt from 'bcrypt';

module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: Sequelize): Promise<void> {
    const hashedPassword = await bcrypt.hash('jasir@123', 10);
    await queryInterface.bulkInsert('Users', [
      {
        name: 'Muhammed Jasir',
        gender: 'Male',
        phonenumber: '9567216391',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down(queryInterface: QueryInterface, Sequelize: Sequelize): Promise<void> {
    await queryInterface.bulkDelete('Users', {}, {});
  },
};