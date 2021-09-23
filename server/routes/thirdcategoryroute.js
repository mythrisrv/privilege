const express = require("express");
const router = express.Router();
const models = require("../model");

const {
    createthirdCategory,
    getthirdCategoriesList,
    getthirdCategoryData,
    updatethirdCategory,
    deletethirdCategory,
    
} = require("../controller/thirdcategory/thirdcategory.controller");

//Create new category
router.post("/", async (req, res) => {
    
  try {
    let item = await createthirdCategory(req);
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
    let item = await getthirdCategoriesList(req);
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
router.get("/:thirdcategoryId", async (req, res) => {
  try {
    let item = await getthirdCategoryData(req);
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
router.put("/:thirdcategoryId", async (req, res) => {
  try {
    let item = await updatethirdCategory(req);
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
router.delete("/:thirdcategoryId", async (req, res) => {
  try {
    let item = await deletethirdCategory(req);
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