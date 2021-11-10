const mongoose = require("mongoose");
let Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const { isInteger } = require("lodash");
let waste_collect_schema = new Schema(
    {
       
        waste_clt_ip: {
        type: String,
        required: true,
      },
      waste_clt_status: {
        type: Number,
        required: true,
      },
      waste_clt_addedby: {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
      waste_clt_updatedby: {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
      waste_clt_date:{
        type: Date,
        required: true,  
      },
      waste_clt_time:{
        type: String,
        required: true,  
      },
      waste_clt_cust_id: {
        type: Schema.Types.ObjectId,
        ref: "tbl_customer",
      },
      cust_update_wasteitem_id: {
        type: Schema.Types.ObjectId,
        ref: "tbl_waste_items",
      },
      waste_clt_company: {
        type: Schema.Types.ObjectId,
        ref: "tbl_company",
      },
      waste_clt_localbody_id: {
        type: Schema.Types.ObjectId,
        ref: "tbl_local_body",
      },
      waste_clt_ward_id: {
        type: Schema.Types.ObjectId,
        ref: "tbl_ward",
      },
      waste_clt_group_id: {
        type: Schema.Types.ObjectId,
        ref: "tbl_group",
      },
      waste_clt_total_amount: {
        type:Number,
        required: true,
      },
      wase_clt_active_status: {
        type:Number,
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
    },
    { timestamps: true ,collection:'tbl_waste_collect'}
  );
  let waste_collect = mongoose.model("tbl_waste_collect",waste_collect_schema);

  module.exports = waste_collect;