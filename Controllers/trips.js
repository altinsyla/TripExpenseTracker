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
    const trip = await Trips.findOne({ tripID: id });
    res.status(200).json(trip);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createTrip = async (req, res) => {
  const {
    tripID,
    name,
    startDate,
    endDate,
    location,
    description,
    budget,
    transportType,
  } = req.body;

  console.log(req.body);

  if (
    !tripID ||
    !name ||
    !startDate ||
    !endDate ||
    !location ||
    !description ||
    !budget ||
    !transportType
  ) {
    return res.status(400).json({ message: "Required fields are missing" });
  }

  try {
    const existingTripByRoll = await Trips.findOne({ tripID });
    if (existingTripByRoll) {
      return res
        .status(409)
        .json({ message: "Trip with this idcard number already exists" });
    }

    const newTrip = await Trips.create({
      tripID,
      name,
      startDate,
      endDate,
      location,
      description,
      budget,
      transportType,
    });

    res.status(201).json(newTrip);
  } catch (error) {
    // Handle internal server errors
    res.status(500).json({ message: error.message });
  }
};

const updateTrip = async (req, res) => {
  const id = req.params.id;
  try {
    const updateTrip = await Trips.findOneAndUpdate({ tripID: id }, req.body, {
      new: true,
    });
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
