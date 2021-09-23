const express = require("express");
const router = express.Router();
const models = require("../model");

const {
    createCategory,
    getCategoriesList,
    getCategoryData,
    updateCategory,
    deleteCategory,
    getCategoriesListOptions,
    
} = require("../controller/category/category.controller");

//Create new category
router.post("/", async (req, res) => {
    console.log("hii");
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
router.get("/list/options",  async (req, res) => {
  try {
    let item = await getCategoriesListOptions(req);
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
    let item = await getCategoriesList(req);
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
router.get("/:categoryId", async (req, res) => {
  try {
    let item = await getCategoryData(req);
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
router.put("/:categoryId", async (req, res) => {
  try {
    let item = await updateCategory(req);
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
router.delete("/:categoryId", async (req, res) => {
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

module.exports = router;