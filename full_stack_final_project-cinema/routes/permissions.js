const express = require("express");
const axios = require("axios");
const router = express.Router();
const permissions = require("../data/permissions.js");

router.get("/", (req, res) => {
  const { id } = req.query;
  //   console.log("permissions", permissions, id);
  //   const filteredData = permissions.filter((item) => item.id === id);
  console.log("filteredData", permissions);
  res.json(permissions);
});
module.exports = router;
