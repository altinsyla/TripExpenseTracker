const Users = require("../Models/Users");

const getAllUsers = async (req, res) => {
  try {
    const users = await Users.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getSingleUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await Users.findOne({ _id: id });
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createUser = async (req, res) => {
  const {
    userID,
    firstname,
    lastname,
    email,
    password,
    registerDate,
    country,
    city,
    role,
  } = req.body;

  // Check for required fields
  if (
    !userID ||
    !firstname ||
    !lastname ||
    !email ||
    !password ||
    !country ||
    !city ||
    !role
  ) {
    return res.status(400).json({ message: "Required fields are missing" });
  }

  try {
    // Check for duplicate userID
    const existingUser = await Users.findOne({ userID });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User with this userID already exists" });
    }

    // Create a new user object with the provided data
    const newUser = await Users.create({
      userID,
      firstname,
      lastname,
      email,
      password,
      registerDate: registerDate || new Date(), // Default to current date or use provided date
      country,
      city,
      role,
    });

    // Respond with the created user object
    res.status(201).json(newUser);
  } catch (error) {
    // Handle internal server errors
    res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  const id = req.params.id;
  try {
    const updateUser = await Users.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    res.status(200).json(updateUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    await Users.findOneAndDelete({ _id: id });
    res.status(204).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
};
