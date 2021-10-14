const mongoose = require("mongoose");
let Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const { isInteger } = require("lodash");
let ThariffAssign_Schema = new Schema(
    {
      tariff_assign_id: {
        type: Number,
        required: false,
        unique: true,
      },
      tariff_assign_ip: {
        type: String,
        required: true,
      },
      tariff_assign_status: {
        type: Number,
        required: true,
      },
      createdAt: {
        type: Date,
        required: false,
      },
      updatedAt: {
        type: Date,
        required: false,
      },
      tariff_assign_addedby: {
        type: String,
      },
      tariff_assign_date: {
        type:Date,
        required: true,
      },
      tariff_assign_time: {
        type:String,
      },
      tariff_assign_customer_id: {
        type: Schema.Types.ObjectId,
        ref: "tbl_customer",
      },
      tariff_assign_pack_id: {
      type: Schema.Types.ObjectId,
        ref: "tbl_tariff",
      },
      tariff_assign_company: {
        type: Schema.Types.ObjectId,
          ref: "tbl_company",
        },
        tariff_reg_number: {
        type: String,
        required: false,
      },
      tariff_assign_active_status: {
        type: Number,
        required: true,
      },
     
    },
    { timestamps: true ,collection:'tbl_tariff_assign'}
  );
  let ThariffAssign = mongoose.model("tbl_tariff_assign",ThariffAssign_Schema);

  module.exports = ThariffAssign;