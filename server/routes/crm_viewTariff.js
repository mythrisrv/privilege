const validationMiddleware = require('../middleware/validation-middleware');
const express = require("express");
const router = express.Router();
const models = require("../model");
const { jwtauth } = require("../lib/jwtlib");
const{getTariffDetailes,getPackageOptions,updateTariffAssign}=require("../controller/crm_viewTariff")

router.get("/list", [jwtauth], async (req, res) => {
    try {
    
      let item = await getTariffDetailes(req)
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

  router.get("/list/options", [jwtauth], async (req, res) => {
    try {
      
      let item = await getPackageOptions(req)
      
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
  router.put("/:tariffId", [jwtauth], async (req, res) => {
    
    try {
      let item = await updateTariffAssign(req);
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