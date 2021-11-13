const express = require("express");
const router = express.Router();
const models = require("../model");
const { jwtauth } = require("../lib/jwtlib");
const {
  createCompany,
  getCompanysList,
  getCompaniesListOptions,
  getCompanyData,
  updateCompany,
  deleteCompany,
  getMasterCompaniesListOptions,
  getMasterLocalbodiesListOptions
} = require("../controller/companyController");

// Create new company
router.post("/", [jwtauth], async (req, res) => {
  try {
    let item = await createCompany(req);
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

// Get companies list
router.get("/list", [jwtauth], async (req, res) => {
  try {
    let item = await getCompanysList(req);
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

// Get companies list options
router.get("/list/options", [jwtauth], async (req, res) => {
  try {
    let item = await getCompaniesListOptions(req);
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
router.get("/list/single_options", [jwtauth], async (req, res) => {
  try {
    let item = await getMasterCompaniesListOptions(req);
    res.status(200).json({
      status: 200,
      data: item[0],
      user_company:item[1],
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: err.message,
    });
  }
});
router.get("/list/localbodies", [jwtauth], async (req, res) => {
  try {
    let item = await getMasterLocalbodiesListOptions(req);
    res.status(200).json({
      status: 200,
      data: item[0],
      user_localbody:item[1],
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: err.message,
    });
  }
});

// Get company data
router.get("/:companyId", [jwtauth], async (req, res) => {
  try {
    let item = await getCompanyData(req);
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

// Updata company data
router.put("/:companyId", [jwtauth], async (req, res) => {
  try {
    let item = await updateCompany(req);
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

router.delete("/:companyId", [jwtauth], async (req, res) => {
  try {
    let item = await deleteCompany(req);
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
