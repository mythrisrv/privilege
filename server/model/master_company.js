const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let master_company = new Schema(
  {
    companyName: {
      type: String,
      required: true,
    },
    shortCode: {
      type: String,
      required: true,
    },
    // contactPerson: {
    //   type: String,
    //   required: true,
    // },
    // designation: {
    //   type: String,
    //   required: true,
    // },
    // mobileNo: {
    //   type: String,
    //   required: true,
    // },
    // landlineNo: {
    //   type: String,
    //   required: true,
    // },
    // emailId: {
    //   type: String,
    //   required: true,
    // },
    // website: {
    //   type: String,
    //   required: true,
    // },
    // address: {
    //   type: String,
    //   required: true,
    // },
    // state: {
    //   type: String,
    //   required: true,
    // },
    // city: {
    //   type: String,
    //   required: true,
    // },
    // pincode: {
    //   type: Number,
    //   required: true,
    // },
    // gstin: {
    //   type: String,
    //   required: true,
    // },
    // panno: {
    //   type: String,
    //   required: true,
    // },
    // cinno: {
    //   type: String,
    //   required: true,
    // },
    // tdsno: {
    //   type: String,
    //   required: true,
    // },
    // img: {
    //   data: Buffer,
    //   contentType: String,
    // },
    // latitude: {
    //   type: String,
    //   required: true,
    // },
    // longitude: {
    //   type: String,
    //   required: true,
    // },
  },
  { collection: "master_company" }
);

let masterCompany = mongoose.model("master_Company", master_company);

module.exports = masterCompany;
