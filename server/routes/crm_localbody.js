const validationMiddleware = require('../middleware/validation-middleware');
const express = require("express");
const router = express.Router();
const models = require("../model");
const { jwtauth } = require("../lib/jwtlib");
const {
    createLocalbody,
    getLocalbodiesList,
    getLocalbodiesListOptions,
    getLocalbodyData,
    updateLocalbody,
    deleteLocalbody,
    getLocalbodyTypes
} = require('../controller/crm_localbodyController');



//create localbody
router.post('/',[validationMiddleware.createLocalbody,jwtauth], async (req, res) => {
  try {
    let item = await createLocalbody(req);
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

//Get localbody list
router.get("/list", [jwtauth], async (req, res) => {
  try {
    // let item = await getDistrictsList(req);
    let item = await getLocalbodiesList(req)
    
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
    let item = await getLocalbodiesListOptions(req);
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



// Get localbody data
router.get("/list/:localbodyId", [jwtauth], async (req, res) => {
  console.log(req.params)
  try {
    let item = await getLocalbodyData(req);
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


// Updata localbody data
router.put("/:localbody_Id", [jwtauth], async (req, res) => {
  try {
    let item = await updateLocalbody(req);
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



//Delete localbody by id
router.delete("/:localbody_Id", [jwtauth], async (req, res) => {
  try {
    let item = await deleteLocalbody(req);
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

router.get("/list/types", [jwtauth], async (req, res) => {
  try {
    // let item = await getDistrictsList(req);
    let item = await getLocalbodyTypes(req)
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