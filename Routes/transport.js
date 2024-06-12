const express = require("express");
const transportController = require("../Controllers/transport");
const router = express.Router();

router.get("/", transportController.getAllTransports);
router.get("/:id", transportController.getSingleTransport);
router.post("/", transportController.createTransport);
router.patch("/:id", transportController.updateTransport);
router.delete("/:id", transportController.deleteTransport);

module.exports = router;
