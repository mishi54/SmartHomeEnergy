import { sequelize } from "../models/index.js";

export const saveTelemetry = async ({ deviceId, timestamp, energyWatts, userId }) => {
  return await sequelize.models.telemetrydata.create({
    deviceId,
    timestamp,
    energyWatts,
    userId,
  });
};
export const getDeviceTelemetry = async (deviceId, userId) => {
  const data = await sequelize.models.telemetrydata.findAll({
    where: {
      deviceId: deviceId.trim(),
      userId,
    },
    order: [["timestamp", "DESC"]],
  });
  return data;
};

