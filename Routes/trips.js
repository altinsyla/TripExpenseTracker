const express = require("express");
const tripsController = require("../Controllers/trips");
const router = express.Router();

router.get("/", tripsController.getAllTrips);
router.get("/upcomingtrips", tripsController.getUpcomingTrips);
router.get("/expenses/:id", tripsController.getTripExpenses);
router.get("/expenses/user/:id", tripsController.getExpensesFromSingleUser);
router.get("/:id", tripsController.getSingleTrip);
router.get("/:id/categories", tripsController.getExpenseCategories);
router.post("/", tripsController.createTrip);
router.patch("/:id", tripsController.updateTrip);
router.delete("/:id", tripsController.deleteTrip);

module.exports = router;
