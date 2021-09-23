const express = require("express");
const router = express.Router();
const models = require("../model/unit/unit");



const {
    createUnit,
    getUnitList,
    getUnitData,
    updateUnit,
    deleteUnit
} = require("../controller/unit/unit.controller");
// Create new Unit
router.post("/",  async (req, res) => {
    
    try {
      let item = await createUnit(req);
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
      let item = await getUnitList(req);
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


  
// Get Unit data
router.get("/:unitId",  async (req, res) => {
    try {
      let item = await getUnitData(req);
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
router.put("/:unitId",  async (req, res) => {
    try {
      let item = await updateUnit(req);
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
  
  router.delete("/:unitId",  async (req, res) => {
    try {
      let item = await deleteUnit(req);
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
