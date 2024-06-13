const express = require("express");
const feedbackController = require("../Controllers/feedback");
const router = express.Router();

router.get("/", feedbackController.getAllFeedbacks);
router.get("/:id", feedbackController.getSingleFeedback);
router.post("/", feedbackController.createFeedback);
router.patch("/:id", feedbackController.updateFeedback);
router.delete("/:id", feedbackController.deleteFeedback);
router.get("/report/summary", feedbackController.getSummaryReport);
router.get("/report/detailed",feedbackController.getDetailedReport);

module.exports = router;
