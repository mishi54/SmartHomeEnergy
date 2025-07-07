import multer from "multer";
import path from "path";
import fs from "fs";
import randomNumber from "./randomNumber.js";

const uploadDir = "storage/uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const fileFilter = (req, file, cb) => {
  cb(null, true);
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueName = `${Date.now()}_${randomNumber(
      100000,
      999999
    )}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

const uploadFiles = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 30 * 1024 * 1024,
  },
}).fields([
  { name: "profile_image", maxCount: 1 },
  { name: "resume", maxCount: 1 },
  { name: "document", maxCount: 1 },
  { name: "support_image", maxCount: 1 }

]);

export default uploadFiles;
