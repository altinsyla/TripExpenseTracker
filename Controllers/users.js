const Users = require("../Models/Users");
const Expenses = require("../Models/Expenses");
const Trips = require("../Models/Trips");

const getAllUsers = async (req, res) => {
  try {
    const users = await Users.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getSingleUser = async (req, res) => {
  const { id } = req.params.id;
  try {
    const user = await Users.findOne(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createUser = async (req, res) => {
  const {
    username,
    firstName,
    lastName,
    email,
    password,
    registerDate,
    country,
    city,
    role,
  } = req.body;

  if (
    !username ||
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    !country ||
    !city ||
    !role
  ) {
    return res.status(400).json({ message: "Required fields are missing" });
  }

  try {
    const existingUser = await Users.findOne({ username });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User with this userID already exists" });
    }

    const newUser = await Users.create({
      username,
      firstName,
      lastName,
      email,
      password,
      registerDate: registerDate || new Date(),
      country,
      city,
      role,
    });

    res.status(201).json(newUser);
  } catch (error) {
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

const getAllUserTrips = async (req, res) => {
  const userID = req.params.id;

  try {
    const trips = await Trips.find({ participants: userID })
      .populate({
        path: "participants",
        select: "username -_id",
      })
      .populate({
        path: "transportTypes",
        select: "transportType -_id",
      })
      .select("-_id -tripID");
    res.status(200).json(trips);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const aggregateUsersByCountry = async (req, res) => {
  try {
    const userCountsByCountry = await Users.aggregate([
      {
        $group: {
          _id: "$country",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          country: "$_id",
          count: 1,
        },
      },
      { $sort: { _id: 1 } }, // sort ascend
    ]);

    res.status(200).json(userCountsByCountry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  getAllUserTrips,
  aggregateUsersByCountry,
};
