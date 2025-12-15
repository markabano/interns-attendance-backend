import express from "express";
import {
  getAttendances,
  createAttendance,
  deleteAttendance,
  updateAttendance,
} from "../controllers/attendance.controller.mjs";

const router = express.Router();

router.get("/getAttendances", getAttendances);
router.post("/createAttendance", createAttendance);
router.patch("/updateAttendance/:id", updateAttendance);
router.delete("/deleteAttendance/:id", deleteAttendance);

export default router;
