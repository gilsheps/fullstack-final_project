const express = require("express");

const {
  readJsonFile,
  writeJsonFile,
  findObj,
} = require("../utils/utilsActionsAllowedController");

const today = new Date().toJSON().slice(0, 10);

const router = express.Router();

router.get("/", (req, res) => {
  const { id } = req.query;
  var resObj;
  if (id !== "undefined") {
    const [jsonArray, actions] = readJsonFile();
    const item = findObj(actions, id);
    if (!item) {
      console.log("item exists", id);
      const data = {
        id: id,
        maxActions: 10,
        date: today,
        actionAllowd: 10,
      };
      jsonArray.actions.push(data);
      writeJsonFile(jsonArray);
      resObj = { actionAllowd: data.actionAllowd };
    } else {
      jsonArray.actions = jsonArray.actions.map((action) => {
        if (action.date === today && action.id == id) {
          if (action.actionAllowd > 0) {
            let allow = --action.actionAllowd;
            allow > 0
              ? {
                  ...action,
                  actionAllowd: allow,
                }
              : res.status(403).json({ error: "no more action allow" });

            writeJsonFile(jsonArray);
            const one = findObj(jsonArray.actions, id);
            res.json({ actionAllowd: one.actionAllowd });
          } else {
            res.status(406).json({ error: "no more action allow" });
          }
        }
      });
      console.log("jsonArray.actions");
    }
  }
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const [jsonArray, actions] = readJsonFile();
  const one = findObj(jsonArray.actions,id)
  console.log("/:id",id,one)
  res.json(one);
});

module.exports = router;
