const Trips = require("../Models/Trips");
const Expenses = require("../Models/Expenses");

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
    res.status(500).json({ message: error.message });
  }
};

const getUpcomingTrips = async (req, res) => {
  try {
      // gjen tripet ku startdate esht me madhe se current date qe dmth ne te ardhmen
      const currentDate = new Date();
      const upcomingTrips = await Trips.find({ startDate: { $gt: currentDate } });
    res.json(upcomingTrips);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateTrip = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedTrip = await Trips.findOneAndUpdate({ tripID: id }, req.body, {
      new: true,
    });
    res.status(200).json(updatedTrip);
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

const getTripExpenses = async (req, res) => {
  const tripid = req.params.id;
  try {
    const expenses = await Expenses.find({ tripID: tripid });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getExpensesFromSingleUser = async (req, res) => {
  const userID = req.params.id;
  const tripID = req.body.tripID;

  try {
    const expenses = await Expenses.find({ tripID: tripID, userID: userID });

    res.status(200).json(expenses);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getExpenseCategories = async (req, res) => {
  const tripID = req.params.id;

  try {
    const expenses = await Expenses.find({ tripID: tripID }).populate("type");
    const expenseTypes = expenses.map((expense) => expense.type.typeName);

    res.status(200).json(expenseTypes);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  getAllTrips,
  getSingleTrip,
  createTrip,
  updateTrip,
  deleteTrip,
  getTripExpenses,
  getExpensesFromSingleUser,
  getExpenseCategories,
  getUpcomingTrips,
};