const express = require("express");
const router = express.Router();
const models = require("../model/brand/brand");



const {
    createBrand,
    getBrandList,
    getBrandData,
    updateBrand,
    deleteBrand,
} = require("../controller/brand/brand.controller.js");
// Create new Brand
router.post("/",  async (req, res) => {
    
    try {
      let item = await createBrand(req);
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
      let item = await getBrandList(req);
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


  
// Get brand data
router.get("/:brandId",  async (req, res) => {
    try {
      let item = await getBrandData(req);
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

  // Updata brand data
router.put("/:brandId",  async (req, res) => {
    try {
      let item = await updateBrand(req);
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
  
  router.delete("/:brandId",  async (req, res) => {
    try {
      let item = await deleteBrand(req);
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
