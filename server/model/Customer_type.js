const mongoose = require("mongoose");
let Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const { isInteger } = require("lodash");
let customer_type_Schema = new Schema(
    {
        _id:{
            type:Number
        },
      customer_type_id: {
        type: Number,
        required: true,
        unique: true,
      },
      customer_type_ip: {
        type: String,
        required: true,
      },
      customer_type_status: {
        type: Number,
        required: true,
      },
      createdAt: {
        type: Date,
        required: true,
      },
      updatedAt: {
        type: Date,
        required: true,
      },
      customer_type_addedby: {
        type: String,
      },
      customer_type_updatedby: {
        type: String,
      },
      customer_type_date: {
        type:Date,
        required: true,
      },
      customer_type_time: {
        type:Date,
      },
      cust_name: {
        type: String,
      },
      customer_type_name: {
        type: String,
        required: true,
      },
      
    },
    { timestamps: true ,collection:'tbl_customer_type'}
  );
  let Customer_type = mongoose.model("tbl_customer_type",customer_type_Schema);

  module.exports = Customer_type;