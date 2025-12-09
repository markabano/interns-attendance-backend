import express from "express";
import {
  createIntern,
  deleteIntern,
  fetchInterns,
  updateIntern,
} from "../controllers/manageIntern.controller.mjs";

const router = express.Router();

router.post("/createIntern", createIntern);
router.get("/fetchInterns", fetchInterns);
router.patch("/updateIntern/:internId", updateIntern);
router.delete("/deleteIntern/:internId", deleteIntern);

export default router;
