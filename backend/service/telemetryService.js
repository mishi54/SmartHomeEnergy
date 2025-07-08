import { sequelize } from "../models/index.js";
import { Sequelize } from "sequelize";

export const saveTelemetry = async ({ deviceId, timestamp, energyWatts,deviceName, userId }) => {
  return await sequelize.models.telemetrydata.create({
    deviceId,
    deviceName,
    timestamp,
    energyWatts,
    userId,
  });
};
export const getDeviceTelemetry = async (deviceId, userId) => {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const data = await sequelize.models.telemetrydata.findAll({
    where: {
      deviceId: deviceId.trim(),
      userId,
      timestamp: {
        [Sequelize.Op.gte]: sevenDaysAgo,
      },
    },
    order: [["timestamp", "ASC"]],
  });
  return data;
};



export const getTelemetrySummaryByUser = async (userId) => {
  console.log("User ID:", userId);
  const records = await sequelize.models.telemetrydata.findAll({
    where: { userId },
    // raw: true,
  });
console.log("Records fetched:", records.length);
  if (!records.length) return [];

  const grouped = {};
  for (const row of records) {
    const key = row.deviceId;
    if (!grouped[key]) {
      grouped[key] = {
        deviceName: row.deviceName,
        deviceId: row.deviceId,
        energy: [],
      };
    }
    grouped[key].energy.push(row.energyWatts);
  }

  return Object.values(grouped).map((item) => {
    const total = item.energy.reduce((a, b) => a + b, 0);
    const avg = total / item.energy.length;
    return {
      deviceName: item.deviceName,
      deviceId: item.deviceId,
      total: +total.toFixed(2),
      average: +avg.toFixed(2),
    };
  });
};
