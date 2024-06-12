const Transport = require("../Models/Transport");

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
    const transport = await Transport.findOne({ transportID: id });
    res.status(200).json(transport);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createTransport = async (req, res) => {
  const { transportID, transportType } = req.body;

  console.log(req.body);

  if (!transportID || !transportType) {
    return res.status(400).json({ message: "Required fields are missing" });
  }

  try {
    const existingTransportByRoll = await Transport.findOne({ transportID });
    if (existingTransportByRoll) {
      return res
        .status(409)
        .json({ message: "Transport with this id number already exists" });
    }

    const newTransport = await Transport.create({
      transportID,
      transportType,
    });

    res.status(201).json(newTransport);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTransport = async (req, res) => {
  const id = req.params.id;
  try {
    const updateTransport = await Transport.findOneAndUpdate(
      { transportID: id },
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json(updateTransport);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteTransport = async (req, res) => {
  const id = req.params.id;
  try {
    await Transport.findOneAndDelete({ transportID: id });
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
  deleteTransport,
};
