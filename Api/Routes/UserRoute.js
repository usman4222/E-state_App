const express = require("express");
const { test } = require("../Controller/UserController");
const router = express.Router();

router.get('/', test);

module.exports = router;
