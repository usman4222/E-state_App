const express = require("express");
const { test } = require("../Controllers/UserController");
const router = express.Router();

router.get('/', test);

module.exports = router;
