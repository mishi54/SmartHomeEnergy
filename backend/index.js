import express from "express";
import dotenv from "dotenv";
import { sequelize } from "./models/index.js";
import authRouter from "./routes/auth.js";
import userRouter from "./routes/user.js";
import cors from "cors";
import { errorHandler } from "./middleware/errorHandler.js";
import session from "express-session";
import bodyParser from 'body-parser';
import path from "path";
import { fileURLToPath } from 'url';
import telemetryRouter from "./routes/telemetry.js";
import chatRouter from "./routes/chat.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const corsOption = {
  origin: true,
  credentials: true,
};
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors(corsOption));

app.use('/storage/uploads', express.static('storage/uploads'));

app.get("/", (req, res) => {
  console.log("server listening on port", port);
  return res.sendStatus(200);
});
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,  
    httpOnly: true,
    sameSite: "lax",
    maxAge: 24 * 60 * 60 * 1000, 
  },
}));

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.use("/api/telemetry", telemetryRouter);
app.use("/api/chat", chatRouter);

app.use(errorHandler);
app.listen(port, () => {
  console.log("server listening on port", port);
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });



