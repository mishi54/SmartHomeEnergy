import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const BASE_URL = "http://localhost:3000";
const REGISTER_URL = `${BASE_URL}/api/auth/register`;
const LOGIN_URL = `${BASE_URL}/api/auth/login`;
const TELEMETRY_URL = `${BASE_URL}/api/telemetry`;

const userInfo = {
  name: "Simulated User",
  email: `user${Date.now()}@test.com`,
  password: "123456",
  confirmPassword: "123456",
  role: "user"
};

const NUM_DEVICES = 5;
const INTERVAL_SECONDS = 60;
const HOURS = 24;
const DELAY_MS = 10; 

const startOfToday = new Date();
startOfToday.setUTCHours(0, 0, 0, 0);

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const simulate = async () => {
  try {
    const regRes = await axios.post(REGISTER_URL, userInfo);
    console.log("Registered:", regRes.data.data.user.email);
    const loginRes = await axios.post(LOGIN_URL, {
      email: userInfo.email,
      password: userInfo.password,
      attempt: 0,
    });
    const token = loginRes.data.data.token;
    const headers = { Authorization: `Bearer ${token}` };
    console.log("✅ Logged in. Token acquired.");
    const devices = Array.from({ length: NUM_DEVICES }, () => uuidv4());
    console.log("Devices assigned to user:", devices);
    for (let sec = 0; sec < HOURS * 3600; sec += INTERVAL_SECONDS) {
      const timestamp = new Date(startOfToday.getTime() + sec * 1000).toISOString();

      for (const deviceId of devices) {
        const payload = {
          deviceId,
          timestamp,
          energyWatts: +(Math.random() * (250 - 5) + 5).toFixed(2),
        };

        try {
          await axios.post(TELEMETRY_URL, payload, { headers });
          console.log("Sent:", payload);
        } catch (err) {
          console.error("Error sending:", err.response?.data || err.message);
        }
      }

      await sleep(DELAY_MS);
    }

    console.log("Simulation complete!");
    console.log("User email:", userInfo.email);
    console.log("Device IDs:", devices);
  } catch (err) {
    console.error("Fatal error:", err.response?.data || err.message);
  }
};

simulate();
