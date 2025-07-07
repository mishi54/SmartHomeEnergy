"use strict";
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class user extends Model {
    static associate(models) {
     
    }
  }

  user.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      email_verified_at: DataTypes.DATE,
      otp: DataTypes.STRING,
      forgot_password_otp: DataTypes.STRING,
      otp_expiration: DataTypes.DATE,
      image: DataTypes.STRING,
      status: DataTypes.STRING,
      subscription_status: DataTypes.STRING,
      blockUntil: DataTypes.DATE,
      role:DataTypes.STRING,
    },
    {
      sequelize,
      deletedAt: "deletedAt",
      paranoid: true,
      modelName: "user",
    }
  );

  return user;
};
