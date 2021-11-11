const validationMiddleware = require('../middleware/validation-middleware');
const express = require("express");
const router = express.Router();
const models = require("../model");
const {customerLogin} = require('../controller/API/loginController');
const {resendOtp}=require('../controller/API/ResendOtpController');
const {uploadCustomerImage,uploadCustomerSingleImage}= require('../controller/API/fileUploadController');
const {verifyOtp}=require('../controller/API/VerifyOtpController');
router.post('/login/',validationMiddleware.customerLogin,customerLogin);
router.post('/verifyOtp',verifyOtp);
router.post('/resendOtp',resendOtp);
router.post(
    '/uploadImage/',
    uploadCustomerImage.single('image'),
    uploadCustomerSingleImage
  );
module.exports = router;