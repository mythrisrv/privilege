const validationMiddleware = require('../middleware/validation-middleware');
const express = require("express");
const router = express.Router();
const models = require("../model");
const { jwtauth } = require("../lib/jwtlib");
const {
    createCustomer
} = require('../controller/API/CustomerController');
router.post('/create', async (req, res) => {
    try {
      let item = await createCustomer(req);
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