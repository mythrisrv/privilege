const mongoose = require("mongoose");
let Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const { isInteger } = require("lodash");
let invoiceSchema = new Schema(
    {
     invoice_ip: {
        type: String,
        required: true,
      },
      invoice_status: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
       
      },
      updatedAt: {
        type: Date,
        
      },
      invoice_addedby: {
        type: Schema.Types.ObjectId,
        ref:"users"
      },
      invoice_updatedby: {
        type: Number,
      },
      invoice_date: {
        type: Date,
        required: true,
      },
      invoice_time: {
        type:String,
        required: true,
      },
      invoice_no: {
        type: Number,
      },
      invoice_customer_name: {
        type: String,
      },
      invoice_cust_phone: {
        type: String,
        required: true,
      },
      invoice_package_name: {
        type: String,
      },
      invoice_customer_id: {
        type: Schema.Types.ObjectId,
        ref: "tbl_customer",
      },
      invoice_company: {
        type: Schema.Types.ObjectId,
        ref: "tbl_company",
      },
      invoice_group_id: {
        type: Schema.Types.ObjectId,
        ref: "tbl_group",
      },
      invoice_district: {
        type: Schema.Types.ObjectId,
        ref: "districts",
      },
      invoice_ward_id: {
        type: Schema.Types.ObjectId,
        ref: "tbl_ward",
      },
      invoice_package_id: {
        type: Schema.Types.ObjectId,
        ref: "tbl_tariff",
      },
      invoice_bill_dur_from: {
        type: Date,
      },
      invoice_bill_dur_to: {
        type: Date,
      },
      invoice_gstin: {
        type: String,
      },
      invoice_gst: {
        type: String,
      },
      invoice_gst_amt: {
        type: Number
      },
      invoice_total_amt: {
        type: Number,
      },
      
    },
   
    { timestamps: { currentTime: ()=> Date.now()} ,collection:'tbl_invoice'}
  );
  let Invoice = mongoose.model("tbl_invoice",invoiceSchema);

  module.exports = Invoice;