const userRole = require("../Models/userRole");

const getAllUserRoles = async (req, res) => {
  try {
    const roles = await userRole.find();
    res.status(200).json(roles);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getSingleRole = async (req, res) => {
  const id = req.params.id;
  try {
    const role = await userRole.findOne({ _id: id });
    res.status(200).json(role);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createRole = async (req, res) => {
  const { roleName } = req.body;

  console.log(req.body);

  if (!roleName) {
    return res.status(400).json({ message: "Required fields are missing" });
  }

  try {
    const existingRoleByRoll = await userRole.findOne({ roleName });
    if (existingRoleByRoll) {
      return res
        .status(409)
        .json({ message: "User Role with this idcard number already exists" });
    }

    const newRole = await userRole.create({
      roleName,
    });

    res.status(201).json(newRole);
  } catch (error) {
    // Handle internal server errors
    res.status(500).json({ message: error.message });
  }
};

const updateRole = async (req, res) => {
  const id = req.params.id;
  try {
    const updateRole = await userRole.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    res.status(200).json({ message: "User Role updated successfully!" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteRole = async (req, res) => {
  const id = req.params.id;
  try {
    await userRole.findOneAndDelete({ _id: id });
    res.status(204).json({ message: "User Role deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getAllUserRoles,
  getSingleRole,
  createRole,
  updateRole,
  deleteRole,
};
