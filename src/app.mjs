import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes/index.routes.mjs";
import connectDB from "./configs/db.configs.mjs";

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