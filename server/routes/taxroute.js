const express = require("express");
const router = express.Router();
const models = require("../model/tax/tax");



const {
    createTax,
    getTaxList,
    getTaxData,
    updateTax,
    deleteTax
} = require("../controller/tax/tax.controller");
// Create new Tax
router.post("/",  async (req, res) => {
    
    try {
      let item = await createTax(req);
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


  router.get("/list",  async (req, res) => {
          

    try {
      let item = await getTaxList(req);
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


  
// Get tax data
router.get("/:taxId",  async (req, res) => {
    try {
      let item = await getTaxData(req);
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

  // Updata tax data
router.put("/:taxId",  async (req, res) => {
    try {
      let item = await updateTax(req);
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
  
  router.delete("/:taxId",  async (req, res) => {
    try {
      let item = await deleteTax(req);
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
  
  module.exports = router;
