const express = require("express");
const userRole = require('../Controllers/userRole');
const router = express.Router();

router.get('/', userRole.getAllUserRoles);
router.get('/:id', userRole.getSingleRole); // Added /api/expenses prefix
router.post('/', userRole.createRole);
router.patch('/:id', userRole.updateRole); // Added /api/expenses prefix
router.delete('/:id', userRole.deleteRole); // Added /api/expenses prefix

module.exports = router;