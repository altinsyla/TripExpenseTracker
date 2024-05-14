const Feedback = require('../Models/Feedback');

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
  const {
    feedbackID,
    userID,
    description
  } = req.body;

  console.log(req.body);

  // Check for required fields
  if (
    !feedbackID ||
    !userID ||
    !description
  ) {
    return res.status(400).json({ message: "Required fields are missing" });
  }

  try {
    // Check for duplicate registration ID
    const existingFeedbackByRoll = await Feedback.findOne({ feedbackID });
    if (existingFeedbackByRoll) {
      return res
        .status(409)
        .json({ message: "Feedback with this id number already exists" });
    }

    // Create a new student object with the provided data
    const newFeedback = await Feedback.create({
        feedbackID,
        userID,
        description,
    });

    // Respond with the created student object
    res.status(201).json(newFeedback);
  } catch (error) {
    // Handle internal server errors
    res.status(500).json({ message: error.message });
  }
};

const updateFeedback = async (req, res) => {
  const id = req.params.id;
  try {
    const updateFeedback = await Feedback.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
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
    deleteFeedback
};
