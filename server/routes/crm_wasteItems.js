const validationMiddleware = require('../middleware/validation-middleware');
const express = require("express");
const router = express.Router();
const models = require("../model");
const { jwtauth } = require("../lib/jwtlib");
const {
    WasteItemsList,
    WasteTypesList,
    WasteCategoryList
  } = require("../controller/crm_wasteItems");
  /*****************************
       Waste item list
  *****************************/
  router.get("/list",[jwtauth],async (req, res) => {
    try {
      let item = await WasteItemsList(req);
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

  router.get("/list/types",/*[jwtauth],*/async (req, res) => {
    try {
      let item = await WasteTypesList(req);
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


  router.get("/list/categories",/*[jwtauth],*/async (req, res) => {
    try {
      let item = await WasteCategoryList(req);
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