import User from "../models/user.model.mjs";
import bcrypt from "bcrypt";

export const fetchInterns = async (req, res) => {
  try {
    const interns = await User.find({ role: "intern" });

    res.status(200).json({ message: "Fetch Success", data: interns });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const createIntern = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      initialPassword,
      department,
      requiredHours,
      schedule,
    } = req.body;

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already in use." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newIntern = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      initialPassword,
      department,
      requiredHours,
      schedule,
      role: "intern",
    });

    res
      .status(201)
      .json({ message: "Intern created successfully", intern: newIntern });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const updateIntern = async (req, res) => {
  try {
    const { internId } = req.params;
    const updateData = req.body;
    const updatedIntern = await User.findByIdAndUpdate(internId, updateData, {
      new: true,
    });
    res
      .status(200)
      .json({ message: "Intern updated successfully", intern: updatedIntern });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const deleteIntern = async (req, res) => {
  try {
    const { internId } = req.params;
    await User.findByIdAndDelete(internId);
    res.status(200).json({ message: "Intern deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
