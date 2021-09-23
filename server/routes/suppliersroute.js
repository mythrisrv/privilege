const express = require("express");
const router = express.Router();
const models = require("../model/suppliers/suppliers");



const {
    createSuppliers,
    getSuppliersList,
    getSuppliersData,
    updateSuppliers,
    deleteSuppliers
} = require("../controller/suppliers/suppliers.controller");
// Create new company
router.post("/",  async (req, res) => {
    
    try {
      let item = await createSuppliers(req);
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
          // console.log("hy");

    try {
      let item = await getSuppliersList(req);
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


  
// Get suppliers data
router.get("/:supplierid",  async (req, res) => {
    try {
      let item = await getSuppliersData(req);
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

  // Updata suppliers data
router.put("/:supplierid",  async (req, res) => {
    try {
      let item = await updateSuppliers(req);
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
  
  router.delete("/:supplierid",  async (req, res) => {
    try {
      let item = await deleteSuppliers(req);
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