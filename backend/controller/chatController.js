import Joi from "joi";
import { asyncHandler } from "../util/asyncHandler.js";
import { ApiError } from "../util/ApiError.js";
import { ApiResponse } from "../util/ApiResponse.js";
import validator from "../util/validator.js";
import { processChatPrompt } from "../service/chatService.js";

export const handleChat = asyncHandler(async (req, res) => {
  const schema = Joi.object({
    question: Joi.string().required(),
  });

  const error = await validator(schema, req.body);
  if (error) throw new ApiError(400, error);

  const { question } = req.body;

  const answer = await processChatPrompt(req.user.id, question);

  return res.status(200).json(new ApiResponse(200, answer, "Chat response generated"));
});
