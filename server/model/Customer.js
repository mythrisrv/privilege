const mongoose = require("mongoose");
let Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const { isInteger } = require("lodash");
let customerSchema = new Schema(
    {
      cust_ip: {
        type: String,
        required: true,
        unique: true,
      },
      cust_status: {
        type: String,
        required: true,
      },
      cust_added_by: {
        type: String,
      },
      cust_updated_by: {
        type: String,
        required: true,
      },
      cust_time: {
        type:String,
        required: true,
      },
      cust_reg_no: {
        type: String,
        required: true,
        unique: true,
      },
      cust_name: {
        type: String,
      },
      cust_address: {
        type: String,
        required: true,
      },
      cust_address1: {
        type: String,
      },
      district: {
        type: Schema.Types.ObjectId,
        ref: "districts",
      },
      localbody_type: {
        type: Schema.Types.ObjectId,
        ref: "tbl_local_body",
      },
      localbody_name: {
        type: Schema.Types.ObjectId,
        ref: "tbl_local_body_name",
      },
      cust_type: {
        type: Schema.Types.ObjectId,
        ref: "privilege",
      },
      cust_package_id: {
        type: String,
      },
      cust_group_id: {
        type:Number,
        ref: "tbl_group",
      },
      ward: {
        type: String,
        required: true,
      },
      cust_house_no: {
        type: String,
      },
      cust_phone: {
        type: String,
        required: true,
      },
      cust_landline_no: {
        type: String,
        required: true,
      },
      cust_watsapp_no: {
        type: String,
      },
      cust_email: {
        type: String,
      },
      cust_no_members: {
        type: String,
      },
      cust_qr_code: {
        type: String,
        required: true,
      },
    },
    { timestamps: true ,collection:'tbl_customer'}
  );
  let Customer = mongoose.model("tbl_customer",customerSchema);

  module.exports = Customer;