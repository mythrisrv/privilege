const validationMiddleware = require('../middleware/validation-middleware');
const {customerLogin} = require('../Controller/API/loginController');
const express = require('express');
const router = express.Router();
// const { jwtauth } = require("../lib/jwtlib");
router.post('/login/',validationMiddleware.customerLogin,customerLogin);
module.exports = router;