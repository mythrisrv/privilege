const express = require("express");
const router = express.Router();
const models = require("../model");
const { jwtauth } = require("../lib/jwtlib");
const {
  createBranch,
  getBranchsList,
  getBranchesListOptions,
  getBranchData,
  updateBranch,
  deleteBranch,
} = require("../controller/branchController");

// Create new branch
router.post("/", [jwtauth], async (req, res) => {
  try {
    let item = await createBranch(req);
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

// Get branches list
router.get("/list", [jwtauth], async (req, res) => {
  try {
    let item = await getBranchsList(req);
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

// Get branches list options
router.get("/list/options/:companyId", [jwtauth], async (req, res) => {
  try {
    let item = await getBranchesListOptions(req);
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

// Get branch data
router.get("/:branchId", [jwtauth], async (req, res) => {
  try {
    let item = await getBranchData(req);
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

// Updata branch data
router.put("/:branchId", [jwtauth], async (req, res) => {
  try {
    let item = await updateBranch(req);
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

router.delete("/:branchId", [jwtauth], async (req, res) => {
  try {
    let item = await deleteBranch(req);
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
