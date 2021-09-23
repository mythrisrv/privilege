const express = require("express");
const router = express.Router();
const models = require("../model");

const {
    createSlider,
    getSlidersList,
    getSliderData,
    updateSlider,
    deleteSlider,
  
  
} = require("../controller/slider/slider.controller");

// Create new company
router.post("/", async (req, res) => {
    
  try {
    let item = await createSlider(req);
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

// Get companies list
router.get("/list", async (req, res) => {
  try {
    let item = await getSlidersList(req);
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

// Get company data
router.get("/:slider_id", async (req, res) => {
  try {
    let item = await getSliderData(req);
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

// Updata company data
router.put("/:slider_id", async (req, res) => {
  try {
    let item = await updateSlider(req);
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

router.delete("/:slider_id", async (req, res) => {
  try {
    let item = await deleteSlider(req);
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