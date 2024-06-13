const express = require("express");
const tripsController = require("../Controllers/trips");
const router = express.Router();

router.get("/", tripsController.getAllTrips);
router.get("/:id", tripsController.getSingleTrip);
router.post("/", tripsController.createTrip);
router.patch("/:id", tripsController.updateTrip);
router.delete("/:id", tripsController.deleteTrip);
router.get("/upcomingtrips", tripsController.getUpcomingTrips);


module.exports = router;
