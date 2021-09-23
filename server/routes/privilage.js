const express = require("express");
const router = express.Router();
const models = require("../model");
const { jwtauth } = require("../lib/jwtlib");

const {
  createPrivilage,
  getPrivilagesListOptions,
  getPrivilagesList,
  getPrivilageData,
  updatePrivilage,
  deletePrivilage,
} = require("../controller/privilageController");

// Create new privilage
router.post("/", [jwtauth], async (req, res) => {
  try {
    let item = await createPrivilage(req);
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

// Get privilages list options
router.get("/list/options", [jwtauth], async (req, res) => {
  try {
    let item = await getPrivilagesListOptions(req);
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

// Get privilages list
router.get("/list", [jwtauth], async (req, res) => {
  try {
    let item = await getPrivilagesList(req);
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

// Get privilage data
router.get("/:privilageId", [jwtauth], async (req, res) => {
  try {
    let item = await getPrivilageData(req);
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

// Updata privilage data
router.put("/:privilageId", [jwtauth], async (req, res) => {
  try {
    let item = await updatePrivilage(req);
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

router.delete("/:privilageId", [jwtauth], async (req, res) => {
  try {
    let item = await deletePrivilage(req);
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
