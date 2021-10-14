const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let companySchema = new Schema(
  {
    companyId: {
      type: String,
      required: true,
      unique: true,
    },
    company_name: {
      type: String,
      required: true,
    },
    company_shortcode: {
      type: String,
      required: true,
    },
    company_person: {
      type: String,
      required: true,
    },
    company_design: {
      type: String,
    },
    cust_image: {
    data:Buffer,
    contentType:String
    },
    company_state: {
      type: String,
      required: true,
    },
    company_district: {
      type: String,
      required: true,
    },
    company_address: {
      type: String,
      required: true,
    },
    company_land: {
      type: String,
    },
    company_mob: {
      type: String,
      required: true,
    },
    company_pin: {
      type: String,
      required: true,
    },
    company_email: {
      type: String,
      required: true,
    },
    company_web: {
      type: String,
    },
    company_logo: {
      type: String,
      required: true,
    },
    company_gstin: {
      type: String,
    },
    company_pan: {
      type: String,
    },
    company_cin: {
      type: String,
    },
    company_tds: {
      type: String,
    },
    latitude: {
      type: String,
    },
    longitude: {
      type: String,
    },
    isListed: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true ,collection: 'tbl_company'}
);

let company = mongoose.model("tbl_company", companySchema);

module.exports = company;
