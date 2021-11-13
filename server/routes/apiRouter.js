const validationMiddleware = require('../middleware/validation-middleware');
const express = require("express");
const router = express.Router();
const models = require("../model");
const {customerLogin} = require('../controller/API/loginController');
const {resendOtp}=require('../controller/API/ResendOtpController');
const {uploadCustomerImage,uploadCustomerSingleImage}= require('../controller/API/fileUploadController');
const {verifyOtp}=require('../controller/API/VerifyOtpController');
const {listUserLocalbodies}=require('../controller/API/localbodyController');
const { jwtauth } = require("../lib/jwtlib");
router.post('/login/',validationMiddleware.customerLogin,customerLogin);
router.post('/verifyOtp',verifyOtp);
router.post('/resendOtp',resendOtp);
router.post(
    '/uploadImage/',
    uploadCustomerImage.single('image'),
    uploadCustomerSingleImage
  );
router.get("/get_localbodies/:id", [jwtauth], async (req, res) => {
    try {
      let item = await listUserLocalbodies(req);
      res.status(200).json({
        status:200,
        data:item

      });
    } catch (err) {
      console.log(err);
      res.status(400).json({
        response:"failed",
        message: err.message,
      });
    }
  });
module.exports = router;