import mongoose from "mongoose";

const attendanceModel = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    date: {
      type: String, // e.g. "2025-12-05"
      required: true,
    },

    timeIn: {
      type: Date,
    },

    timeOut: {
      type: Date,
    },

    method: {
      type: String,
      enum: ["web", "qr", "manual", "gps"],
      default: "web",
    },

    location: {
      lat: Number,
      lng: Number,
    },

    remarks: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Attendance", attendanceModel);
