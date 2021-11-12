const mongoose = require("mongoose");
let Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const { isInteger } = require("lodash");
let waste_category_Schema = new Schema(
    {
       waste_category_name: {
        type: String,
        required: true,
      },
      waste_category_ip: {
        type: String,
        required: true,
      },
      waste_category_status: {
        type: Number,
        required: true,
      },
    
      waste_company: {
        type: String,
        required: true,
      },
    
 },
    { timestamps: true ,collection:'tbl_waste_category'}
  );
  let Waste_category = mongoose.model("tbl_waste_category",waste_category_Schema);

  module.exports = Waste_category;