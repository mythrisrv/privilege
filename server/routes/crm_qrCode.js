const express = require("express");
const router = express.Router();
const models = require("../model");
const { jwtauth } = require("../lib/jwtlib");

const{createQrcode,getQrcodeList}=require("../controller/crm_qrCode")

router.post("/", [jwtauth],async (req, res) => {
    try {

      let item = await createQrcode(req);
      console.log(item)
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

  router.get("/list", [jwtauth], async (req, res) => {
    try {
      // let item = await getDistrictsList(req);
      let item = await getQrcodeList(req)
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