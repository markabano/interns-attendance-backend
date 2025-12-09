import express from "express";
import {
  getDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} from "../controllers/department.controller.mjs";

const router = express.Router();

router.get("/getDepartments", getDepartments);
router.post("/createDepartment", createDepartment);
router.patch("/updateDepartment/:departmentId", updateDepartment);
router.delete("/deleteDepartment/:departmentId", deleteDepartment);

export default router;
