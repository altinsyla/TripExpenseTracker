const userRole = require('../Models/userRole');

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
  const {
    roleID,
    roleName,
  } = req.body;


  // Check for required fields
  if (
    !roleID ||
    !roleName
  ) {
    return res.status(400).json({ message: "Required fields are missing" });
  }

  try {
    // Check for duplicate registration ID
    const existingRoleByRoll = await userRole.findOne({ roleID });
    if (existingRoleByRoll) {
      return res
        .status(409)
        .json({ message: "User Role with this idcard number already exists" });
    }

    // Create a new student object with the provided data
    const newRole = await userRole.create({
        roleID,
        roleName,
    });

    // Respond with the created student object
    res.status(201).json(newRole);
  } catch (error) {
    // Handle internal server errors
    res.status(500).json({ message: error.message });
  }
};

const updateRole = async (req, res) => {
  const id = req.params.id;
  try {
    const updateTrip = await userRole.findOneAndUpdate(
      { roleID: id },
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json(updateRole);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteRole = async (req, res) => {
  const id = req.params.id;
  try {
    await userRole.findOneAndDelete({ roleID: id });
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
