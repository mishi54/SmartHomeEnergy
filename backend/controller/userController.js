import Joi from "joi";
import { updateUserData, getUserData } from "../service/userService.js";
import validator from "../util/validator.js";
import { ApiResponse } from "../util/ApiResponse.js";
import { ApiError } from "../util/ApiError.js";
import { asyncHandler } from "../util/asyncHandler.js";

export const updateUser = asyncHandler(async (req, res) => {
  const updateSchema = Joi.object({
    name: Joi.string().required(),
    password: Joi.string().optional(),
    confirmPassword: Joi.valid(Joi.ref("password")).optional().messages({
          "any.only": "Passwords do not match",
        }),
    role:Joi.string().optional(),
    brokerage_name:Joi.string().optional(),
  });

  const error = await validator(updateSchema, req.body);
  if (error) {
    throw new ApiError(400, error);
  }

  const { profile_image = [] } = req.files || {};
  const imagePath =
    profile_image.length > 0 ? profile_image[0].path : req.user.image;

  const updatedUser = await updateUserData(req.user.id, {
    name: req.body.name,
    password: req.body.password,
    profile_image: imagePath,
    role:req.body.role,
    brokerage_name:req.body.brokerage_name,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, updatedUser, "User updated successfully"));
});

export const getUser = asyncHandler(async (req, res) => {
  const user = await getUserData(req.user.id);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, user, "User fetched successfully"));
});
