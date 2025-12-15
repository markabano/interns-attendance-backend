import Attendance from "../models/attendance.model.mjs";
import User from "../models/user.model.mjs";

//TODO: hoursCompleted update on creating/updating attendance

export const getAttendances = async (req, res) => {
  try {
    const attendances = await Attendance.find().sort({ createdAt: -1 });

    res
      .status(200)
      .json({ message: "Attendances fetched", attendance: attendances });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const createAttendance = async (req, res) => {
  try {
    const {
      userId,
      internId,
      date,
      timeIn,
      timeOut,
      workedHours,
      holidayType,
    } = req.body;

    if (workedHours < 0 || workedHours > 24) {
      return res.status(400).json({ message: "Invalid worked hours" });
    }

    const normalizedDate = new Date(date).setHours(0, 0, 0, 0);

    const existingAttendance = await Attendance.findOne({
      userId: internId,
      date: normalizedDate,
    });

    if (existingAttendance) {
      return res.status(400).json({
        message: "Attendance for this intern on the given date already exists",
      });
    }

    const STANDARD_HOURS = 8;

    let overtimeHours = 0;
    let undertimeHours = 0;

    if (workedHours > STANDARD_HOURS) {
      overtimeHours = workedHours - STANDARD_HOURS;
    } else if (workedHours < STANDARD_HOURS) {
      undertimeHours = STANDARD_HOURS - workedHours;
    }

    let renderedHours = workedHours;

    if (holidayType === "regular") {
      renderedHours = workedHours * 2;
    } else if (holidayType === "special") {
      renderedHours = workedHours * 1.3;
    }

    renderedHours = Number(renderedHours.toFixed(2));
    overtimeHours = Number(overtimeHours.toFixed(2));
    undertimeHours = Number(undertimeHours.toFixed(2));

    const createdBy = await User.findById(userId);
    if (!createdBy) {
      return res.status(404).json({ message: "Admin user not found" });
    }

    const attendance = await Attendance.create({
      userId: internId,
      date: normalizedDate,
      timeIn,
      timeOut,
      workedHours,
      renderedHours,
      overtimeHours,
      undertimeHours,
      holidayType,
      createdBy: createdBy._id,
    });

    res.status(201).json({
      message: "Attendance created",
      attendance,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

export const updateAttendance = async (req, res) => {
  const { id } = req.params;
  const { userId, timeIn, timeOut, workedHours, holidayType } = req.body;

  try {
    const attendance = await Attendance.findById(id);
    const createdBy = await User.findById(userId);
    console.log("CreatedBy:", createdBy);
    if (!createdBy) {
      return res.status(404).json({ message: "Admin user not found" });
    }

    if (!attendance) {
      return res.status(404).json({ message: "Attendance record not found" });
    }

    // Update raw fields (safe assignment)
    if (timeIn !== undefined) attendance.timeIn = timeIn;
    if (timeOut !== undefined) attendance.timeOut = timeOut;
    if (holidayType !== undefined) attendance.holidayType = holidayType;

    if (workedHours !== undefined) {
      if (workedHours < 0 || workedHours > 24) {
        return res.status(400).json({ message: "Invalid worked hours" });
      }

      attendance.workedHours = workedHours;

      const STANDARD_HOURS = 8;

      let overtimeHours = 0;
      let undertimeHours = 0;

      if (workedHours > STANDARD_HOURS) {
        overtimeHours = workedHours - STANDARD_HOURS;
      } else if (workedHours < STANDARD_HOURS) {
        undertimeHours = STANDARD_HOURS - workedHours;
      }

      let renderedHours = workedHours;

      if (attendance.holidayType === "regular") {
        renderedHours = workedHours * 2;
      } else if (attendance.holidayType === "special") {
        renderedHours = workedHours * 1.3;
      }

      attendance.overtimeHours = Number(overtimeHours.toFixed(2));
      attendance.undertimeHours = Number(undertimeHours.toFixed(2));
      attendance.renderedHours = Number(renderedHours.toFixed(2));
      attendance.createdBy = createdBy._id;
    }

    await attendance.save();

    res.status(200).json({
      message: "Attendance record updated successfully",
      attendance,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

export const deleteAttendance = async (req, res) => {
  const { id } = req.params;
  try {
    const attendance = await Attendance.findByIdAndDelete(id);
    if (!attendance) {
      return res.status(404).json({ message: "Attendance record not found" });
    }
    res.status(200).json({ message: "Attendance record deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
