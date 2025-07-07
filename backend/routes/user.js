import express from "express";
import { updateUser, getUser } from "../controller/userController.js";
import { auth } from "../middleware/auth.js";
import uploadFiles from "../util/uploadFiles.js";

const router = express.Router();

router.post("/update", auth, uploadFiles, updateUser);
router.get("/me", auth, getUser);

export default router;
