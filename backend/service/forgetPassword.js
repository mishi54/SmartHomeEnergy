import { sequelize } from "../models/index.js";
import { ApiError } from "../util/ApiError.js";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

export const sendOtpToEmail = async (email) => {
  const user = await sequelize.models.user.findOne({ where: { email } });

  if (!user) {
    throw new ApiError(404, "User not found with this email");
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  await user.update({
    forgot_password_otp: otp,
  });

  await transporter.sendMail({
    from: process.env.SMTP_EMAIL,
    to: email,
    subject: "Your OTP for Password Reset",
    text: `Your OTP is: ${otp}`,
  });

  return true;
};

export const verifyOtp = async (email, otp) => {
  const user = await sequelize.models.user.findOne({ where: { email } });

  if (!user || user.forgot_password_otp !== otp) {
    throw new ApiError(400, "Invalid OTP");
  }

  return true;
};
export const resetPassword = async (email, newPassword) => {
  const user = await sequelize.models.user.findOne({ where: { email } });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const hashedPassword = bcrypt.hashSync(newPassword, bcrypt.genSaltSync(10));

  await user.update({
    password: hashedPassword,
    forgot_password_otp: null,
  });

  return true;
};
