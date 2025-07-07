import bcrypt from "bcryptjs";
import { sequelize } from "../models/index.js";

export const updateUserData = async (userId, data) => {
  const user = await sequelize.models.user.findByPk(userId, {
    attributes: { exclude: ["password"] },
  });
  if (!user) {
    throw new Error("User not found");
  }

  const updateData = {};

  if (data.name) updateData.name = data.name;
  if (data.password) {
    const salt = bcrypt.genSaltSync(10);
    updateData.password = bcrypt.hashSync(data.password, salt);
  }
  if (data.profile_image) {
    updateData.image = data.profile_image;
  }
 if(data.role) updateData.role=data.role;
  await user.update(updateData);
  return user;
};

export const getUserData = async (userId) => {
  const user = await sequelize.models.user.findByPk(userId, {
    attributes: { exclude: ["password"] },
  });

  return user;
};
