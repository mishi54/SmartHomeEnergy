import Joi from "joi";
import { asyncHandler } from "../util/asyncHandler.js";
import { ApiError } from "../util/ApiError.js";
import { ApiResponse } from "../util/ApiResponse.js";
import { saveTelemetry, getDeviceTelemetry } from "../service/telemetryService.js";
import validator from "../util/validator.js";

export const submitTelemetry = asyncHandler(async (req, res) => {
  const schema = Joi.object({
    deviceId: Joi.string().required(),
    timestamp: Joi.date().iso().required(),
    energyWatts: Joi.number().required(),
  });

  const error = await validator(schema, req.body);
  if (error) {
    throw new ApiError(400, error);
  }

  const result = await saveTelemetry({
    ...req.body,
    userId: req.user.id,
  });

  return res.status(201).json(new ApiResponse(201, result, "Telemetry saved successfully"));
});

export const fetchDeviceTelemetry = asyncHandler(async (req, res) => {
  const { deviceId } = req.params;
console.log("Device ID:", deviceId);
  if (!deviceId) {
    throw new ApiError(400, "Device ID is required");
  }

  const data = await getDeviceTelemetry(deviceId,req.user.id);
  console.log(data);
  return res.status(200).json(new ApiResponse(200, data, "Device telemetry fetched"));
});
