const express = require("express");
const { signup } = require("../Controllers/AuthController");
const router = express.Router()

router.post('/signup', signup);


module.exports = router;