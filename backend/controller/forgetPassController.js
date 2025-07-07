import { asyncHandler } from "../util/asyncHandler.js";
import { ApiResponse } from "../util/ApiResponse.js";
import { ApiError } from "../util/ApiError.js";
import Joi from "joi";
import validator from "../util/validator.js";
import {
  sendOtpToEmail,
  verifyOtp,
  resetPassword,
} from "../service/forgetPassword.js";
export const forgotPassword = asyncHandler(async (req, res) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
  });

  const error = await validator(schema, req.body);
  if (error) {
    throw new ApiError(400, error);
  }
  req.session.email = req.body.email;

  await sendOtpToEmail(req.body.email);

  return res
    .status(200)
    .json(new ApiResponse(200, null, "OTP sent successfully to your email"));
});
export const verifyOtpHandler = asyncHandler(async (req, res) => {
  const schema = Joi.object({
    otp: Joi.string().length(6).required(),
  });

  const error = await validator(schema, req.body);
  if (error) {
    throw new ApiError(400, error);
  }

  const email = req.session.email;

  if (!email) {
    throw new ApiError(
      400,
      "Email not found. Please request a password reset first."
    );
  }

  await verifyOtp(email, req.body.otp);

  return res
    .status(200)
    .json(new ApiResponse(200, null, "OTP verified successfully"));
});
export const resetPasswordHandler = asyncHandler(async (req, res) => {
  const schema = Joi.object({
    password: Joi.string().required(),
    confirmPassword: Joi.valid(Joi.ref("password")).required().messages({
      "any.only": "Passwords do not match",
    }),
  });

  const error = await validator(schema, req.body);
  if (error) {
    throw new ApiError(400, error);
  }

  const email = req.session.email;

  if (!email) {
    throw new ApiError(
      400,
      "Email not found. Please request a password reset first."
    );
  }

  await resetPassword(email, req.body.password);
  req.session.email = null;
  return res
    .status(200)
    .json(new ApiResponse(200, null, "Password reset successfully"));
});