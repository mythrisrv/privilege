const validationMiddleware = require('../middleware/validation-middleware');
const express = require("express");
const router = express.Router();
const models = require("../model");
const { jwtauth } = require("../lib/jwtlib");
const {
    WasteItemsList
  } = require("../controller/API/WasteController");
  /*****************************
       Waste item list
  *****************************/
  router.get("/List",/*[validationMiddleware.getWasteitems],*/async (req, res) => {
    try {
      
      let item = await WasteItemsList(req);
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