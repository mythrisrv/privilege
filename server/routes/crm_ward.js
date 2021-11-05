const validationMiddleware = require('../middleware/validation-middleware');
const express = require("express");
const router = express.Router();
const models = require("../model");
const { jwtauth } = require("../lib/jwtlib");
const {
    createWard,
    getWardsList,
    getWardsListOptions,
    getWardData,
    updateWard,
    deleteWard,
} = require('../controller/crm_wardController');




router.post('/',[validationMiddleware.createWardvalidator,jwtauth], async (req, res) => {
  try {
    let item = await createWard(req);
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

//Get ward list
router.get("/list", [jwtauth], async (req, res) => {
  try {
    // let item = await getDistrictsList(req);
    let item = await getWardsList(req)
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


// router.get('/list/',validationMiddleware.getDistrictList,getDistrictList);
// // Get list options
router.get("/list/options", [jwtauth], async (req, res) => {
  try {
    let item = await getWardsListOptions(req);
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



// Get ward data
router.get("/:ward_Id", [jwtauth], async (req, res) => {
  try {
    let item = await getWardData(req);
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


// Updata ward data
router.put("/:ward_Id", [jwtauth], async (req, res) => {
  try {
    let item = await updateWard(req);
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



//Delete ward by id
router.delete("/:ward_Id", [jwtauth], async (req, res) => {
  try {
    let item = await deleteWard(req);
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