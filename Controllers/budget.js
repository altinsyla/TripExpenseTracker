const Budget = require("../Models/Budget");

const getAllBudgets = async (req, res) => {
  try {
    const budgets = await Budget.find();
    res.status(200).json(budgets);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getSingleBudget = async (req, res) => {
  const id = req.params.id;
  try {
    const budget = await Budget.findOne({ _id: id });
    res.status(200).json(budget);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createBudget = async (req, res) => {
  const { tripID, userID, budget } = req.body;

  console.log(req.body);

  if (!tripID || !userID || !budget) {
    return res.status(400).json({ message: "Required fields are missing" });
  }

  try {
    const existingBudgetByRoll = await Budget.findOne({tripID: tripID, userID: userID});  
    if (existingBudgetByRoll) {
      return res
        .status(409)
        .json({ message: "Budget with this id number already exists" });
    }

    const newBudget = await Budget.create({
      tripID,
      userID,
      budget,
    });

    res.status(201).json(newBudget);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateBudget = async (req, res) => {
  const id = req.params.id;

  try {
    const updateBudget = await Budget.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    res.status(200).json(updateBudget);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteBudget = async (req, res) => {
  const id = req.params.id;
  try {
    await Budget.findOneAndDelete({ _id: id });
    res.status(204).json({ message: "Budget deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getBudgetSpentPerTrip = async (req, res) => {
  try {
    const budgetPerTrip = await Budget.aggregate([
      {
        //krijon ni grup qe merr id e tripit edhe shumen e buxhetit nbaz te _id
        $group: {
          _id: "$tripID",
          totalBudget: { $sum: "$budget" },
        },
      },
      {
        //lookup e lidh tabelen e Bugjetit me tabelen e Tripit
        $lookup: {
          from: "trips",
          localField: "_id", //Main Table Budget (e merr id e Bugjetit)
          foreignField: "_id", //Join Table Trips (e merr id e Tripit
          as: "tripDetails", // e krijon ni View si tripDetails 
        },
      },
      {
        // unwind e kontrollon a nese ka tripDetails pra nese ekziston
        $unwind: {
          path: "$tripDetails",
          preserveNullAndEmptyArrays: true, // Qikjo ndodh kur ska trip
        },
      },
      {
        //i grupon si rezultat e qet name, lokacionin, daten e fillimit dhe daten e mbarimit
        $project: {
          tripName: "$tripDetails.name",
          location: "$tripDetails.location",
          startDate: "$tripDetails.startDate",
          endDate: "$tripDetails.endDate",
          totalBudget: 1
        },
      },
    ]);

    if (!budgetPerTrip || budgetPerTrip.length === 0) {
      return res.status(404).json({ message: "No budget data found" });
    }

    res.status(200).json(budgetPerTrip);
  } catch (error) {
    console.error("Error fetching budget data:", error);
    res.status(500).json({ message: "Internal server error"});
  }
};

module.exports = {
  getAllBudgets,
  getSingleBudget,
  createBudget,
  updateBudget,
  deleteBudget,
  getBudgetSpentPerTrip,
};
