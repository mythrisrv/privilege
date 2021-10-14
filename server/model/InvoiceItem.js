const mongoose = require("mongoose");
let Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const { isInteger } = require("lodash");
let invoiceItemSchema = new Schema(
    {
        invoice_item_id: {
        type: Number,
        unique: true,
      },
      invoice_item_ip: {
        type: String,
        required: true,
      },
      invoice_item_status: {
        type: Number,
        required: true,
      },
      createdAt: {
        type: Date,
       
      },
      updatedAt: {
        type: Date,
        
      },
      invoice_item_addedby: {
        type: Number,
      },
      invoice_item_updatedby: {
        type: Number,
      },
      invoice_no: {
        type: Number,
      },
      invoice_item: {
        type: String,
      },
      inovice_item_name: {
        type: String,
        required: true,
      },
      invoice_item_price: {
        type: String,
      },
      invoice_id: {
        type: Schema.Types.ObjectId,
        ref: "tbl_invoice",
      },
      invoice_item_quanty: {
        type: Number,
      },
      invoice_item_amt: {
        type: Number,
      },
      invoice_item_price: {
        type: Number
      },

      
    },
   
    { timestamps: { currentTime: ()=> Date.now()} ,collection:'tbl_invoice_items'}
  );
  let InvoiceItem = mongoose.model("tbl_invoice_items",invoiceItemSchema);

  module.exports = InvoiceItem;