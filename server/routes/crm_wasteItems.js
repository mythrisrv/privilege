const validationMiddleware = require('../middleware/validation-middleware');
const fileupload=require("../middleware/file_upload-middleware");
const express = require("express");
const multer=require("multer");
const path=require("path");
const router = express.Router();
const models = require("../model");
const upload=multer();
const { jwtauth } = require("../lib/jwtlib");
const {
    WasteItemsList,
    WasteTypesList,
    WasteCategoryList,
    createWasteItem,
    deleteWasteItem,
  } = require("../controller/crm_wasteItems");
  /*****************************
       Waste item list
  *****************************/
  router.get("/list",[jwtauth],async (req, res) => {
    try {
      let item = await WasteItemsList(req);
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

  router.get("/list/types",[jwtauth],async (req, res) => {
    try {
      let item = await WasteTypesList(req);
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


  router.get("/list/categories",[jwtauth],async (req, res) => {
    try {
      let item = await WasteCategoryList(req);
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


 /* router.post('/',[validationMiddleware.createWasteItemvalidator,jwtauth,fileupload.upload], async (req, res) => {


   
 
    try {
     
      let item = await createWasteItem(req);
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
*/
router.post("/upload",[jwtauth,fileupload.upload],async(req,res)=>{
  console.log(req.file)
  try {
     
    let item = await createWasteItem(req);
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
})
router.delete("/:wasteItem_Id", [jwtauth], async (req, res) => {
  try {
    let item = await deleteWasteItem(req);
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