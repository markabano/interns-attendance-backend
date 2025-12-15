import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: { type: Date, required: true },
    timeIn: { type: String, required: true },
    timeOut: { type: String },

    // Time calculations
    renderedHours: { type: Number },
    workedHours: { type: Number },
    overtimeHours: { type: Number, default: 0 },
    undertimeHours: { type: Number, default: 0 },

    holidayType: {
      type: String,
      enum: ["regular", "special", ""],
      default: "",
    },

    // Who created this record?
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    // How/Why was this created?
    // source: {
    //   type: String,
    //   enum: ["intern", "admin"],
    //   required: true,
    // },
  },
  { timestamps: true }
);

export default mongoose.model("Attendance", attendanceSchema);
