import express from "express";
import authRoutes from "./auth.route.mjs";
import manageInternRoutes from "./manageIntern.route.mjs";
import departmentRoutes from "./department.route.mjs";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/manageIntern", manageInternRoutes);
router.use("/department", departmentRoutes);

export default router;
