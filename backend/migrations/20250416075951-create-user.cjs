"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
      },
      email_verified_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      otp: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      forgot_password_otp: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      otp_expiration: {
        type: Sequelize.DATE,
        allowNull: true,
      },      
      image: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: "active",
      },
      blockUntil: {
        type: Sequelize.DATE,
        allowNull: true,
      },
       role:{
        type:Sequelize.STRING,
        allowNull:true,
       }
       ,createdAt: {
        allowNull: false,
          type: 'TIMESTAMP WITHOUT TIME ZONE',
      },
      updatedAt: {
        allowNull: false,
          type: 'TIMESTAMP WITHOUT TIME ZONE',
      },
      deletedAt: {
        allowNull: true,
          type: 'TIMESTAMP WITHOUT TIME ZONE',
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("users",'otp_expiration');
  },
};
