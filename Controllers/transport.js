const Transport = require('../Models/Transport');

const getAllTransports = async (req, res) => {
  try {
    const transports = await Transport.find();
    res.status(200).json(transports);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getSingleTransport = async (req, res) => {
  const id = req.params.id;
  try {
    const transport = await Transport.findOne({ _id: id });
    res.status(200).json(transport);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createTransport = async (req, res) => {
  const {
    transportID,
    tripID,
    transportType
  } = req.body;

  console.log(req.body);

  // Check for required fields
  if (
    !transportID ||
    !tripID ||
    !transportType
  ) {
    return res.status(400).json({ message: "Required fields are missing" });
  }

  try {
    // Check for duplicate registration ID
    const existingTransportByRoll = await Transport.findOne({ transportID });
    if (existingTransportByRoll) {
      return res
        .status(409)
        .json({ message: "Transport with this id number already exists" });
    }

    // Create a new student object with the provided data
    const newTransport = await Transport.create({
        transportID,
        tripID,
        transportType,
    });

    // Respond with the created student object
    res.status(201).json(newTransport);
  } catch (error) {
    // Handle internal server errors
    res.status(500).json({ message: error.message });
  }
};

const updateTransport = async (req, res) => {
  const id = req.params.id;
  try {
    const updateTransport = await Transport.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    res.status(200).json(updateTransport);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteTransport = async (req, res) => {
  const id = req.params.id;
  try {
    await Transport.findOneAndDelete({ _id: id });
    res.status(204).json({ message: "Transport deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
    getAllTransports,
    getSingleTransport,
    createTransport,
    updateTransport,
    deleteTransport
};
