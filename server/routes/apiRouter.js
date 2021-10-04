const validationMiddleware = require('../middleware/validation-middleware');
const {customerLogin} = require('../Controller/API/loginController');
const express = require('express');
const router = express.Router();
const models = require("../model");
// const { jwtauth } = require("../lib/jwtlib");
router.get('/customerLogin',[validationMiddleware.customerLogin], async (req, res) => {
    try {
      let item = await customerLogin(req);
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