
const express = require("express");
const router = express.Router();
const models = require("../model/tbl_banner/tbl_banner");



const {
    createBanner,
    getBannerList,
    getBannerData,
    updateBanner,
    deleteBanner,
} = require("../controller/tablebanner/tablebanner.controller");
// Create new Banner
router.post("/",  async (req, res) => {
    
    try {
      let item = await createBanner(req);
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
      let item = await getBannerList(req);
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


  
// Get banner data
router.get("/:banner_id",  async (req, res) => {
    try {
      let item = await getBannerData(req);
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

  // Updata banner data
router.put("/:banner_id",  async (req, res) => {
    try {
      let item = await updateBanner(req);
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
  
  router.delete("/:banner_id",  async (req, res) => {
    try {
      let item = await deleteBanner(req);
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
