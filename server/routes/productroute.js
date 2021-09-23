const express = require("express");
const router = express.Router();
const models = require("../model");

const {
    createProduct,
    getProductsList,
    getProductData,
    updateProduct,
    deleteProduct,
    
} = require("../controller/product/product.controller");

//Create new category
router.post("/", async (req, res) => {
   
  try {
    let item = await createProduct(req);
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

//Get categories list
router.get("/list", async (req, res) => {
  try {
    let item = await getProductsList(req);
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

//Get category data
router.get("/:product_id", async (req, res) => {
  try {
    let item = await getProductData(req);
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

//Update category data
router.put("/:product_id", async (req, res) => {
  try {
    let item = await updateProduct(req);
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
//Delete category data
router.delete("/:product_id", async (req, res) => {
  try {
    let item = await deleteProduct(req);
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