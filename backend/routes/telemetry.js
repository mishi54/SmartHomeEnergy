import express from "express";
import { submitTelemetry, fetchDeviceTelemetry } from "../controller/telemetryController.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth, submitTelemetry);
router.get("/:deviceId", auth, fetchDeviceTelemetry);

export default router;
