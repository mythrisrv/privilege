const validationMiddleware = require('../middleware/validation-middleware');
const express = require("express");
const router = express.Router();
const models = require("../model");
const {customerLogin} = require('../controller/API/loginController');
const {uploadCustomerImage,uploadCustomerSingleImage}= require('../controller/API/fileUploadController');
router.post('/login/',validationMiddleware.customerLogin,customerLogin);
router.post(
    '/uploadImage/',
    uploadCustomerImage.single('image'),
    uploadCustomerSingleImage
  );
module.exports = router;