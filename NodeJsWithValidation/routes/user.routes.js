const express = require('express');
const router = express.Router();
const {createUser} = require('../controllers/user.controller')
const {createValidation} = require('../validation/validation');

router.post("/", createValidation, createUser);

module.exports = router;