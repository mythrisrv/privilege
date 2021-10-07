const express = require("express");
const router = express.Router();
const models = require("../model");
const { jwtauth } = require("../lib/jwtlib");
const {
    getUserData,
  } = require("../controller/API/QRcodeSearchController");
router.get("/list", async (req, res) => {
    try {
      let item = await getUserData(req);
      res.status(200).json({
        status: 200,
        data: item,
      });
    } catch (err) {
      console.log(err);
      res.status(400).json({
        message: err.message,
      });
    }
  });
  module.exports = router;