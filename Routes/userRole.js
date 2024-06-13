const express = require("express");
const userRole = require("../Controllers/userRole");
const router = express.Router();

router.get("/", userRole.getAllUserRoles);
router.get("/:id", userRole.getSingleRole);
router.post("/", userRole.createRole);
router.patch("/:id", userRole.updateRole);
router.delete("/:id", userRole.deleteRole);

module.exports = router;
