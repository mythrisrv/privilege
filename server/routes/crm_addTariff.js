const validationMiddleware = require('../middleware/validation-middleware');
const express = require("express");
const router = express.Router();
const models = require("../model");
const { jwtauth } = require("../lib/jwtlib");
const{getTariffList,createTariff,updatePackage,
  deletePackage,updateStatus}=require("../controller/crm_addTariff")

router.get("/list", [jwtauth], async (req, res) => {
    try {
    
      let item = await getTariffList(req)
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
  router.get("/list/localbodies", [jwtauth], async (req, res) => {
    try {
    
      let item = await getTariffLocalbodyList(req)
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

  router.post('/',[validationMiddleware.addTariff,jwtauth], async (req, res) => {
    try {
      console.log(req.body)
      let item = await createTariff(req);
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

 /* router.put("/:tariff_Id", [jwtauth], async (req, res) => {
    try {
      let item = await updatePackage(req);
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
*/
  router.delete("/:tariff_Id", [jwtauth], async (req, res) => {
    try {
      let item = await deletePackage(req);
      res.status(200).json({
        status: 200,
        message: "Item deleted successfully",
      });
    } catch (err) {
      console.log(err);
      res.status(400).json({
        message: err.message,
      });
    }
  });
  router.put('/update/:package_id',jwtauth, async (req, res) => {
    try {
      console.log(req.body)
      let item = await updateStatus(req);
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