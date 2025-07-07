
import multer from "multer";
import path from "path";

const storage = multer.memoryStorage();

export const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    const allowedTypes = [".csv", ".xlsx", ".xls"];
    const ext = path.extname(file.originalname).toLowerCase();
    if (!allowedTypes.includes(ext)) {
      return cb(new Error("Only .csv, .xlsx, and .xls files are allowed"));
    }
    cb(null, true);
  },
});
