const Trips = require("../Models/Trips");

const getAllTrips = async (req, res) => {
  try {
    const trips = await Trips.find();
    res.status(200).json(trips);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getSingleTrip = async (req, res) => {
  const id = req.params.id;
  try {
    const trip = await Trips.findOne({ _id: id });
    res.status(200).json(trip);
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

const createTrip = async (req, res) => {
  const {
    tripID,
    name,
    participants,
    startDate,
    endDate,
    location,
    description,
  } = req.body;

  console.log(req.body);

  // Check for required fields
  if (
    !tripID ||
    !name ||
    !participants ||
    !startDate ||
    !endDate ||
    !location ||
    !description
  ) {
    return res.status(400).json({ message: "Required fields are missing" });
  }

  try {
    // Check for duplicate registration ID
    const existingTripByRoll = await Trips.findOne({ tripID });
    if (existingTripByRoll) {
      return res
        .status(409)
        .json({ message: "Trip with this idcard number already exists" });
    }

    // Create a new student object with the provided data
    const newTrip = await Trips.create({
        tripID,
        name,
        participants,
        startDate,
        endDate,
        location,
        description,
    });

    // Respond with the created student object
    res.status(201).json(newTrip);
  } catch (error) {
    // Handle internal server errors
    res.status(500).json({ message: error.message });
  }
};

const updateTrip = async (req, res) => {
  const id = req.params.id;
  try {
    const updateTrip = await Trips.findOneAndUpdate(
      { tripID: id },
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json(updateTrip);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteTrip = async (req, res) => {
  const id = req.params.id;
  try {
    await Trips.findOneAndDelete({ tripID: id });
    res.status(204).json({ message: "Trip deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getAllTrips,
  getSingleTrip,
  createTrip,
  updateTrip,
  deleteTrip,
};
