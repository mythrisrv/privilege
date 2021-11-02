const validationMiddleware = require('../middleware/validation-middleware');
const express = require("express");
const router = express.Router();
const models = require("../model");
const { jwtauth } = require("../lib/jwtlib");
const {
   createGroup,
   getGroupsList
} = require('../controller/groupController');



//create localbody
router.post('/',[validationMiddleware.createGroup,jwtauth], async (req, res) => {
  try {
    console.log(req.body);
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

//Get groups list
router.get("/list",[jwtauth] , async (req, res) => {
  try {
    let item = await getGroupsList(req)
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


module.exports=router;