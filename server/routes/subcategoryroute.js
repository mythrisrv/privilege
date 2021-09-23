const express = require("express");
const router = express.Router();
const models = require("../model");

const {
    createsubCategory,
    getsubCategoriesList,
    getsubCategoryData,
    updatesubCategory,
    deletesubCategory,
    getsubCategoriesListOptions
    
} = require("../controller/subcategory/subcategory.controller");

//Create new category
router.post("/", async (req, res) => {
    
  try {
    let item = await createsubCategory(req);
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
router.get("/list/options",  async (req, res) => {
  try {
    let item = await getsubCategoriesListOptions(req);
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
    let item = await getsubCategoriesList(req);
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
router.get("/:subcategoryId", async (req, res) => {
  try {
    let item = await getsubCategoryData(req);
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
router.put("/:subcategoryId", async (req, res) => {
  try {
    let item = await updatesubCategory(req);
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
router.delete("/:subcategoryId", async (req, res) => {
  try {
    let item = await deletesubCategory(req);
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