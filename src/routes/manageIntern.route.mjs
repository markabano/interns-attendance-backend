import express from "express";
import {
  createIntern,
  deleteIntern,
  fetchInterns,
} from "../controllers/manageIntern.controller.mjs";

const router = express.Router();

router.post("/createIntern", createIntern);
router.get("/fetchInterns", fetchInterns);
router.delete("/deleteIntern/:internId", deleteIntern);

export default router;
