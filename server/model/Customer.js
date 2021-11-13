const mongoose = require("mongoose");
let Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const { isInteger } = require("lodash");
let customerSchema = new Schema(
    {
      cust_id: {
        type: Number,
        unique: true,
      },
      cust_ip: {
        type: String,
        required: true,
      },
      cust_status: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
       
      },
      updatedAt: {
        type: Date,
        
      },
      cust_added_by: {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
      cust_updated_by: {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
      cust_time: {
        type:String,
        required: true,
      },
      cust_date: {
        type:String,
        required: true,
      },
      cust_reg_no: {
        type: String,
      },
      cust_name: {
        type: String,
      },
      cust_image: {
        type: Buffer,
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
        ref: "tbl_customer_type",
      },
      cust_package_id: {
        type: Schema.Types.ObjectId,
        ref: "tbl_tariff",
      },
      cust_group_id: {
        type: Schema.Types.ObjectId,
        ref: "tbl_group",
      },
      ward: {
        type: Schema.Types.ObjectId,
        ref: "tbl_ward",
      },
      cust_house_num: {
        type: String,
        required: true,
      },
      cust_phone: {
        type: String,
        required: true,
      },
      cust_image: {
        type:String,
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
        type: Number,
      },
      cust_qr_code: {
        type: String,
        required: true,
      },
      cust_serial_no: {
        type: String,
        required: true,
      },
      cust_designation: {
        type: String,
        required: true,
      },
      cust_latitude: {
        type: String,
        required: true,
      },
      cust_longitude: {
        type: String,
        required: true,
      },
      cust_verification_status:{
        type: Number,
        required: true
      },
      cust_verification_at: {
        type: Date,
       },
      cust_company: {
        type: Schema.Types.ObjectId,
        ref: "tbl_company",
      },
      cust_billing_type:{
        type: String
      }
     
    },
   
    { timestamps: { currentTime: ()=> Date.now()} ,collection:'tbl_customer'}
  );
  let Customer = mongoose.model("tbl_customer",customerSchema);

  module.exports = Customer;