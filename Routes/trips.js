const express = require("express");
const tripsController = require("../Controllers/trips");
const router = express.Router();

router.get('/trips', tripsController.getAllTrips);
router.get('/trips/:id', tripsController.getSingleTrip);
router.post('/trips', tripsController.createTrip);
router.patch('/trips/:id', tripsController.updateTrip);
router.delete('/trips/:id', tripsController.deleteTrip);

module.exports = router;

