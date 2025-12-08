import express from "express";
import authRoutes from "./auth.route.mjs";
import manageInternRoutes from "./manageIntern.route.mjs";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/manageIntern", manageInternRoutes);

export default router;
