const Feedback = require("../Models/Feedback");
const Users = require("../Models/Users");
const Trips = require("../Models/Trips");

const getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getSingleFeedback = async (req, res) => {
  const id = req.params.id;
  try {
    const feedback = await Feedback.findOne({ _id: id });
    res.status(200).json(feedback);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createFeedback = async (req, res) => {
  const { userID, description, trip } = req.body;

  console.log(req.body);

  if (!userID || !description || !trip) {
    return res.status(400).json({ message: "Required fields are missing" });
  }

  try {
    const existingFeedbackByRoll = await Feedback.findOne({ tripID: trip, userID: userID });
    if (existingFeedbackByRoll) {
      return res
        .status(409)
        .json({ message: "Feedback with this id number already exists" });
    }

    const newFeedback = await Feedback.create({
      userID,
      description,
      trip,
    });

    res.status(201).json(newFeedback);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateFeedback = async (req, res) => {
  const id = req.params.id;
  try {
    const updateFeedback = await Feedback.findOneAndUpdate(
      { _id: id },
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json(updateFeedback);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteFeedback = async (req, res) => {
  const id = req.params.id;
  try {
    await Feedback.findOneAndDelete({ _id: id });
    res.status(204).json({ message: "Feedback deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//Ky raport i gjen feedbacks nga nje user per nje trip te caktum
const getSummaryReport = async (req, res) => {
  try {
    const totalFeedbacks = await Feedback.countDocuments({});
    
    const feedbackByTrip = await Feedback.aggregate([
      { $group: { _id: "$trip", count: { $sum: 1 } } }
    ]);

    const feedbackByUser = await Feedback.aggregate([
      { $group: { _id: "$userID", count: { $sum: 1 } } }
    ]);

    res.status(200).json({
      totalFeedbacks,
      feedbackByTrip,
      feedbackByUser
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Ky Raport merr te gjitha te dhenat e userit per feedbacks.
const getDetailedReport = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().populate('userID' && 'trip');

    res.status(200).json({
      feedbacks
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  getAllFeedbacks,
  getSingleFeedback,
  createFeedback,
  updateFeedback,
  deleteFeedback,
  getSummaryReport,
  getDetailedReport,
};
