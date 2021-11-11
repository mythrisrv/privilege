
const validationMiddleware = require('../middleware/validation-middleware');
const express = require("express");
const router = express.Router();
const models = require("../model");
const { jwtauth } = require("../lib/jwtlib");
const {getMenuList} = require('../controller/menuController');

router.get("/list", async (req, res) => {
  try {
    // let item = await getDistrictsList(req);
    let item = await getMenuList(req)
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
