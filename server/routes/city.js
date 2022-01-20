const express = require("express");
const router = express.Router();
const models = require("../model");
const {getCitiesList} = require('../controller/citiesController');
router.get("/list", async (req, res) => {
    try {
  
      let item = await getCitiesList(req)
      console.log(item)
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