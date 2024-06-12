const express = require("express");
const feedbackController = require("../Controllers/feedback");
const router = express.Router();

router.get("/", feedbackController.getAllFeedbacks);
router.get("/:id", feedbackController.getSingleFeedback);
router.post("/", feedbackController.createFeedback);
router.patch("/:id", feedbackController.updateFeedback);
router.delete("/:id", feedbackController.deleteFeedback);

module.exports = router;
