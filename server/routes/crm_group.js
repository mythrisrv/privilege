const validationMiddleware = require('../middleware/validation-middleware');
const express = require("express");
const router = express.Router();
const models = require("../model");
const { jwtauth } = require("../lib/jwtlib");
const {
   createGroup,
   getGroupsList,
   deleteGroup,
   updateGroup,
   getGroupData,
   getGroupsListOptions
} = require('../controller/crm_groupController');



//create localbody
router.post('/',[validationMiddleware.createGroup,jwtauth], async (req, res) => {
  try {
    console.log(req.body)
    let item = await createGroup(req);
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
    let item = await getGroupsList(req)
    
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
    let item = await getGroupsListOptions(req);
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



// Get localbody data
router.get("/:group_Id", [jwtauth], async (req, res) => {
  try {
    let item = await getGroupData(req);
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
router.put("/:group_Id", [jwtauth], async (req, res) => {
  try {
    let item = await updateGroup(req);
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
router.delete("/:group_Id", [jwtauth], async (req, res) => {
  try {
    let item = await deleteGroup(req);
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