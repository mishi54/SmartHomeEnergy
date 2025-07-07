'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('auth_tokens', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      token: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
            type: 'TIMESTAMP WITHOUT TIME ZONE',
      },
      updatedAt: {
        allowNull: false,
            type: 'TIMESTAMP WITHOUT TIME ZONE',
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('auth_tokens');
  }
};