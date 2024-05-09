const Users = require("../Models/Users");

const getAllUsers = async (req, res) => {
  try {
    const users = await Student.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getSingleUser = async (req, res) => {
  const id = req.params.id;
  try {
    const users = await Users.findOne({ _id: id });
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// const createStudent = async (req, res) => {
//     const student = req.body;
//     const { firstname, lastname, idcard, subjects } = req.body;

//     const newStudent = new Student(student);
//     try {
//         await newStudent.save();
//         res.status(201).json(newStudent);
//     } catch (error) {
//         res.status(409).json({ message: error.message });
//     }
// };

const createUser = async (req, res) => {
  const {
    userID,
    firstname,
    lastname,
    email,
    passoword,
    registerDate,
    country,
    city,
    role,
  } = req.body;

  console.log(req.body);

  // Check for required fields
  if (
    !userID ||
    !firstname ||
    !lastname ||
    !email ||
    !passoword ||
    !registerDate ||
    !country ||
    !city ||
    !role
  ) {
    return res.status(400).json({ message: "Required fields are missing" });
  }

  try {
    // Check for duplicate registration ID
    const existingUserByRoll = await Users.findOne({ userID });
    if (existingUserByRoll) {
      return res
        .status(409)
        .json({ message: "User with this idcard number already exists" });
    }

    // Create a new student object with the provided data
    const newUser = await Users.create({
      userID,
      firstname,
      lastname,
      email,
      passoword,
      registerDate: new Date(),
      country,
      city,
      role,
    });

    // Respond with the created student object
    res.status(201).json(newUser);
  } catch (error) {
    // Handle internal server errors
    res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  const id = req.params.id;
  try {
    const updateUser = await Users.findOneAndUpdate(
      { userID: id },
      req.body,
      { new: true }
    );
    res.status(200).json(updateUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    await Users.findOneAndDelete({ userID: id });
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
  deleteUser
};
