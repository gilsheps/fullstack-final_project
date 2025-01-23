const express = require("express");
const membersService = require("../services/membersService");
const axios = require("axios");
const router = express.Router();

router.get("/", async (req, res) => {
  const filters = req.body;
  const members = await membersService.getAllMembers(filters);
  res.json(members);
});

router.post("/", async (req, res) => {
  try {
    const {data} = await membersService.createNewMember(req.body);
    console.log("post", data);
    res.status(200).send("Member created");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.put("/:id", async (req, res) => {
  try {
    await membersService.updateMember(req.params.id, req.body);
    res.status(200).send("Member updated");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await membersService.deleteMember(id);
    res.send(`Member with id: ${id} was deleted`);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Populate Members
router.get("/populate", async (req, res) => {
  try {
    const response = await axios.get(process.env.USERS_URL);
    const members = response.data.map((user) => ({
      name: user.name,
      email: user.email,
      city: user.address.city,
    }));
    membersService.saveAllMembers(members);
    res.status(200).send("Members populated successfully");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
