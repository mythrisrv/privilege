const mongoose = require("mongoose");
let Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const { isInteger } = require("lodash");
let Thariff_Schema = new Schema(
    {
        _id:{
            type:Number,
        },
        tariff_id: {
        type: Number,
        required: true,
        unique: true,
      },
      tariff_ip: {
        type: String,
        required: true,
      },
      tariff_status: {
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
      tariff_addedby: {
        type: String,
      },
      tariff_updatedby: {
        type: String,
      },
      tariff_date: {
        type:Date,
        required: true,
      },
      tariff_time: {
        type:Date,
      },
      tariff_company: {
        type: String,
      },
      localbody_type: {
        type: Number,
        required: true,
      },
      package_name: {
        type: String,
        required: true,
      },
      cust_type: {
        type: Number,
        required: true,
      },
      package_reg_fee: {
        type: Number,
        required: true,
      },
      package_basic_fee: {
        type:Number,
        required: true,
      },
      package_validity: {
        type: Number,
        required: true,
      },
      package_visit_month: {
        type: Number,
        required: true,
      },
      pacakage_billing_id: {
        type: Number,
        required: true,
      },
      pacakage_bags: {
        type: String,
        required: true,
      },
    },
    { timestamps: true ,collection:'tbl_tariff'}
  );
  let Thariff = mongoose.model("tbl_tariff",Thariff_Schema);

  module.exports = Thariff;