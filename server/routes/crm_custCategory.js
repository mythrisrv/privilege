const validationMiddleware = require('../middleware/validation-middleware');
const express = require("express");
const router = express.Router();
const models = require("../model");
const { jwtauth } = require("../lib/jwtlib");

const{getCategoryList,deleteCategory,updateCategory}=require("../controller/crm_CustomerCategory")


router.get("/list",/*[jwtauth],*/ async (req, res) => {
    try {
      // let item = await getDistrictsList(req);
      let item = await getCategoryList(req)
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
  router.post('/',[validationMiddleware.createCustCategory,jwtauth], async (req, res) => {
    try {
      let item = await createCategory(req);
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

  router.delete("/:catId", [jwtauth], async (req, res) => {
    try {
      let item = await deleteCategory(req);
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

  router.put("/:catId", [jwtauth], async (req, res) => {
    
    try {
      let item = await updateCategory(req);
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


  module.exports = router;
