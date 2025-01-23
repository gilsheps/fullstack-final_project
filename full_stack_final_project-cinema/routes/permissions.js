const express = require("express");
const axios = require("axios");
const router = express.Router();
const permissions = require("../data/permissions.js");

router.get("/", (req, res) => {
  res.json(permissions);
});
module.exports = router;
