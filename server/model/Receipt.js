const mongoose = require("mongoose");
let Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const { isInteger } = require("lodash");
let receiptSchema = new Schema(
    {
     receipt_ip: {
        type: String,
        required: true,
      },
      receipt_status: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
       
      },
      updatedAt: {
        type: Date,
        
      },
      receipt_addedby: {
        type: Schema.Types.ObjectId,
        ref:"users"
      },
      receipt_updatedby: {
        type: Number,
      },
      receipt_date: {
        type: String,
        required: true,
      },
      receipt_time: {
        type:String,
        required: true,
      },
      receipt_no: {
        type: Number,
      },
      receipt_customer_name: {
        type: String,
      },
     
      receipt_cust_id: {
        type: Schema.Types.ObjectId,
        ref: "tbl_customer",
      },
      receipt_company: {
        type: Schema.Types.ObjectId,
        ref: "tbl_company",
      },
      receipt_group_id: {
        type: Schema.Types.ObjectId,
        ref: "tbl_group",
      },
      
      receipt_ward_id: {
        type: Schema.Types.ObjectId,
        ref: "tbl_ward",
      },
     
     
     
      receipt_invoice_due: {
        type: Number
      },
      receipt_usage_due: {
        type: Number
      },
      reciept_amount: {
        type: Number,
      },
      
    },
   
    { timestamps: { currentTime: ()=> Date.now()} ,collection:'tbl_receipts'}
  );
  let Receipt= mongoose.model("tbl_reciepts",receiptSchema);

  module.exports = Receipt;