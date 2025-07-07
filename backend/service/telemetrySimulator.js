import { saveTelemetry } from "./telemetryService.js";
import { v4 as uuidv4 } from "uuid";

export const simulateInitialTelemetry = async (userId) => {
  const startOfToday = new Date();
  startOfToday.setUTCHours(0, 0, 0, 0);

  const ENTRIES_PER_DEVICE = 10;
  const deviceMap = {
    "Living Room AC": uuidv4(),
    "Kitchen Fridge": uuidv4(),
    "Washing Machine": uuidv4(),
    "Bedroom Heater": uuidv4(),
    "TV Console": uuidv4(),
  };

  for (let i = 0; i < ENTRIES_PER_DEVICE; i++) {
    const timestamp = new Date(startOfToday.getTime() + i * 60000).toISOString();

    for (const [deviceName, deviceId] of Object.entries(deviceMap)) {
      const energyWatts = +(Math.random() * (250 - 5) + 5).toFixed(2);
      await saveTelemetry({
        deviceId,
        deviceName,
        timestamp,
        energyWatts,
        userId,
      });
    }
  }

  console.log(`Initial telemetry (5x10) with names created for user ${userId}`);
};
