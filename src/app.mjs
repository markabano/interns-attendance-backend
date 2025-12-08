import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes/index.route.mjs";
import connectDB from "./configs/db.config.mjs";

dotenv.config();

// Connect to Database
connectDB();

const app = express();

app.use(express.json());

// Middleware
app.use(
  cors({
    origin: [
      process.env.FRONT_END_BASE_URL_DEV || "http://localhost:5173",
      process.env.FRONT_END_BASE_URL_PROD,
    ],
    credentials: true,
  })
);

// Route
app.use("/api", routes);

export default app;
