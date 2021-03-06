const validationMiddleware = require("../middleware/validation-middleware");
const express = require("express");
const router = express.Router();
const models = require("../model");
const { jwtauth } = require("../lib/jwtlib");

const { getReceiptList} = require("../controller/crm_viewReceiptController");

router.get( "/list", /*[jwtauth], */ async (req, res) => {
    try {
     
      let item = await getReceiptList(req);
      //console.log(item)
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
  }
);

module.exports = router;
