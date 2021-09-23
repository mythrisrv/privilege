const express = require("express");
const router = express.Router();

const { createSuperAdmin } = require("../controller/setupController");

// Create company
router.post("/company", async (req, res) => {
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

// Create branch
router.post("/branch", async (req, res) => {
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

// Create privilage
router.post("/privilage", async (req, res) => {
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

// Create super admin
router.post("/super-admin", async (req, res) => {
  try {
    let item = await createSuperAdmin(req);
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
