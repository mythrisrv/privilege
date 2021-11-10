const express = require("express");
const router = express.Router();

//import model
const Branch = require("../model/master_branch");

//submit branch
router.post("/", async (req, res) => {
  try {
    const division = req.body.division;
    const bname = req.body.bname;
    const scode = req.body.scode;

    const sendBranch = new Branch({
      division: division,
      bname: bname,
      scode: scode,
    });

    const created = await sendBranch.save();
    console.log(created);
    res.status(200).send("send");
  } catch (error) {
    res.status(400).send(error);
  }
});

//get branch
router.get("/getBranch", (req, res) => {
  res.send("Getting Data");
});

module.exports = router;
