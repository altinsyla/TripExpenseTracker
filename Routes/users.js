const express = require("express");
const usersController = require("../Controllers/users");
const router = express.Router();

router.get("/", usersController.getAllUsers);
router.get("/:id", usersController.getSingleUser);
router.post("/", usersController.createUser);
router.patch("/:id", usersController.updateUser);
router.delete("/:id", usersController.deleteUser);

module.exports = router;
