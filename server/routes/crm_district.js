
const validationMiddleware = require('../middleware/validation-middleware');
const express = require("express");
const router = express.Router();
const models = require("../model");
const { jwtauth } = require("../lib/jwtlib");
const {createDistrict} = require('../controller/districtController');
const {updateDistrict} = require('../controller/crm_districtController');
const {deleteDistrict} = require('../controller/crm_districtController');
const {getDistrictsListOptions} = require('../controller/crm_districtController');
const {getDistrictData} = require('../controller/crm_districtController');
const {getDistrictList} = require('../controller/crm_districtController');



// Create new district
// router.post("/", [jwtauth], async (req, res) => {
//   try {
//     let item = await createDistrict(req);
//     res.status(200).json({
//       status: 200,
//       data: item,
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(400).json({
//       message: err.message,
//     });
//   }
// });
router.post('/',[validationMiddleware.createDistrict,jwtauth], async (req, res) => {
  try {
    let item = await createDistrict(req);
    
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
// getDistrictList
// Get districts list
router.get("/list", [jwtauth], async (req, res) => {
  try {
    // let item = await getDistrictsList(req);
    let item = await getDistrictList(req)
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
// router.get('/list/',validationMiddleware.getDistrictList,getDistrictList);
// // Get companies list options
router.get("/list/options", [jwtauth], async (req, res) => {
  try {
    let item = await getDistrictsListOptions(req);
    
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



// Get customer data
router.get("/:districtId", [jwtauth], async (req, res) => {
  try {
    let item = await getDistrictData(req);
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


// Updata customer data
router.put("/:districtId", [jwtauth], async (req, res) => {
    
  try {
    let item = await updateDistrict(req);
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



//Delete customer by id
router.delete("/:districtId", [jwtauth], async (req, res) => {
  try {
    let item = await deleteDistrict(req);
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
