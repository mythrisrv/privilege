const mongoose = require("mongoose");
let Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const { isInteger } = require("lodash");


let Thariff_Schema = new Schema(
    {
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
        //required: true,
      },
      updatedAt: {
        type: Date,
       // required: true,
      },
      tariff_addedby: {
        type: Schema.Types.ObjectId,
        ref:"users"
      },
      tariff_updatedby: {
        type: String,
      },
      tariff_date: {
        type:Date,
        required: true,
      },
      tariff_time: {
        type:String,
      },
      tariff_company: {
        type: Schema.Types.ObjectId,
        ref:"tbl_company"
      },
      localbody_type: {
        type: Schema.Types.ObjectId,
        required: true,
        ref:"tbl_local_body"
      },
      localbody_name: {
        type: Schema.Types.ObjectId,
        required: true,
        ref:"tbl_local_body_name"
      },
      package_name: {
        type: String,
        required: true,
      },
      cust_type: {
        type: Schema.Types.ObjectId,
       required: true,
        ref:"tbl_customer_type"
        
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
      package_billing_id:[{
       type:Schema.Types.ObjectId,
   
      ref: "tbl_waste_items",
     
      }],
    package_bags:[ {
      type: Number,
      required: true,
    }],
    package_active_status:{
      type:Number,
      default:0,

    },
  },
    { timestamps: true ,collection:'tbl_tariff'}
  );
  let Thariff = mongoose.model("tbl_tariff",Thariff_Schema);

  module.exports = Thariff;