import { saveTelemetry } from "./telemetryService.js";
import { v4 as uuidv4 } from "uuid";

export const simulateInitialTelemetry = async (userId) => {
  const startOfToday = new Date();
  startOfToday.setUTCHours(0, 0, 0, 0);

  const NUM_DEVICES = 5;
  const ENTRIES_PER_DEVICE = 10;

  const devices = Array.from({ length: NUM_DEVICES }, () => uuidv4());

  for (let i = 0; i < ENTRIES_PER_DEVICE; i++) {
    const timestamp = new Date(startOfToday.getTime() + i * 60000).toISOString();

    for (const deviceId of devices) {
      const energyWatts = +(Math.random() * (250 - 5) + 5).toFixed(2);
      await saveTelemetry({ deviceId, timestamp, energyWatts, userId });
    }
  }

  console.log(`Initial telemetry (5x10) created for user ${userId}`);
};
