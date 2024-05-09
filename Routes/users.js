const express = require("express");
const usersController = require("../Controllers/users");
const router = express.Router();

router.get('/users', usersController.getAllUsers);
router.get('/users/:id', usersController.getSingleUser);
router.post('/users', usersController.createUser);
router.patch('/users/:id', usersController.updateUser);
router.delete('/users/:id', usersController.deleteUser);

module.exports = router;
