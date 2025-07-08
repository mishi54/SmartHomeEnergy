import express from "express";
import { submitTelemetry, fetchDeviceTelemetry, getTelemetrySummary } from "../controller/telemetryController.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth, submitTelemetry);
router.get("/summary", auth, getTelemetrySummary);
router.get("/:deviceId", auth, fetchDeviceTelemetry);


export default router;
