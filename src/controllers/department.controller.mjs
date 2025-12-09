import Department from "../models/department.model.mjs";

export const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find().sort({ createdAt: -1 });
    res
      .status(200)
      .json({ message: "Departments fetched", department: departments });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const createDepartment = async (req, res) => {
  try {
    const { departmentName } = req.body;

    const isExist = await Department.findOne({ departmentName });
    if (isExist) {
      return res.status(400).json({ message: "Department already exist." });
    }

    const newDepartment = await Department.create({
      name: departmentName,
    });

    res.status(200).json({
      message: "Department Created Successfully",
      department: newDepartment,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const updateDepartment = async (req, res) => {
  try {
    const { departmentId } = req.params;
    const { departmentName } = req.body;

    const updatedDepartment = await Department.findByIdAndUpdate(
      departmentId,
      { name: departmentName },
      { new: true }
    );

    res.status(200).json({
      message: "Department Updated Successfully",
      department: updatedDepartment,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const deleteDepartment = async (req, res) => {
  try {
    const { departmentId } = req.params;

    await Department.findByIdAndDelete(departmentId);

    res.status(200).json({
      message: "Department Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
