const mongoose = require("mongoose");
let Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const { isInteger } = require("lodash");
let waste_update_schema = new Schema(
    {
       
      cust_update_ip: {
        type: String,
        required: true,
      },
      cust_update_customer_id: {
        type: Schema.Types.ObjectId,
        ref: "tbl_customer",
      },
      cust_update_wasteitem_id: {
        type: Schema.Types.ObjectId,
        ref: "tbl_waste_items",
      },
      cust_update_quantity: {
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
    { timestamps: true ,collection:'tbl_customer_waste_update'}
  );
  let waste_update = mongoose.model("tbl_customer_waste_update",waste_update_schema);

  module.exports = waste_update;