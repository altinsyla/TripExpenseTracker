const Feedback = require("../Models/Feedback");

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
    const id = req.params.id;
    const existingFeedbackByRoll = await Feedback.findOne({ id });
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

module.exports = {
  getAllFeedbacks,
  getSingleFeedback,
  createFeedback,
  updateFeedback,
  deleteFeedback,
};
