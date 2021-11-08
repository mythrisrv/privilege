const express = require("express");
const router = express.Router();
const models = require("../model");
const { jwtauth } = require("../lib/jwtlib");
const {
    userProfile
  } = require("../controller/API/UserController");
  router.get("/Profile/:id",[jwtauth], async (req, res) => {
    try {
      let item = await userProfile(req);
      res.status(200).json({
        status: 200,
        data: item,
      });
    } catch (err) {
      console.log(err);
      res.status(400).json({
        status: 400,
        message: err.message,
      });
    }
  });
  module.exports = router;