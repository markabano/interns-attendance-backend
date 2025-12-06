import mongoose from "mongoose";

const leaveModel = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    type: {
      type: String,
      enum: ["sick", "vacation", "emergency", "others"],
      required: true,
    },

    reason: {
      type: String,
      required: true,
    },

    dateFrom: {
      type: Date,
      required: true,
    },

    dateTo: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Leave", leaveModel);
