import express from "express";
import dotenv from "dotenv";
import authRoute from "./routes/auth.route.js";
import messageRoute from "./routes/message.route.js";
import { ConnectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

dotenv.config();

// this middleware extract the data from the Body
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", authRoute);
app.use("/api/message", messageRoute);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("server running on port:", port);
  ConnectDB();
});
