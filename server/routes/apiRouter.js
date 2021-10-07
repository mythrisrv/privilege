const validationMiddleware = require('../middleware/validation-middleware');
const express = require("express");
const router = express.Router();
const models = require("../model");
const {customerLogin} = require('../controller/API/loginController');
router.post('/login/',validationMiddleware.customerLogin,customerLogin);
module.exports = router;