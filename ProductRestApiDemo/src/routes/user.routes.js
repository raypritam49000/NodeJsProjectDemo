const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');
const isAuthenticated = require('../middleware/auth');


router.post("/login",UserController.login);
router.post("/register",isAuthenticated,UserController.register);

module.exports = router;