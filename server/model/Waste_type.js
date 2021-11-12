const mongoose = require("mongoose");
let Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const { isInteger } = require("lodash");
let waste_type_Schema = new Schema(
    {
       waste_cat_name: {
        type: String,
        required: true,
      },
      waste_cat_ip: {
        type: String,
        required: true,
      },
      waste_cat_status: {
        type: Number,
        required: true,
      },
     
      waste_company: {
        type: String,
        required: true,
      },
     
    },
    { timestamps: true ,collection:'tbl_waste_cat'}
  );
  let Waste_type = mongoose.model("tbl_waste_cat",waste_type_Schema);

  module.exports = Waste_type;