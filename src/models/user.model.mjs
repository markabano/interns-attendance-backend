import mongoose from "mongoose";

const ScheduleSchema = new mongoose.Schema({
  timeIn: { type: String, required: true }, // "08:00"
  timeOut: { type: String, required: true }, // "17:00"
  breakStart: { type: String, default: "12:00" },
  breakEnd: { type: String, default: "13:00" },
});

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    // For Interns
    department: { type: String, required: false },
    requiredHours: { type: Number, required: false },
    hoursCompleted: { type: Number, required: false, default: 0 },
    schedule: { type: ScheduleSchema, required: false },
    mustChangePassword: { type: Boolean, default: true },

    role: { type: String, enum: ["admin", "intern"], default: "intern" },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
