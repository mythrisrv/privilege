const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let companySchema = new Schema(
  {
    companyId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    shortCode: {
      type: String,
      required: true,
    },
    contactPerson: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
    },
    state: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    landLineNumber: {
      type: String,
    },
    mobile: {
      type: String,
      required: true,
    },
    pincode: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    website: {
      type: String,
    },
    companyLogo: {
      type: String,
      required: true,
    },
    gstin: {
      type: String,
    },
    panNumber: {
      type: String,
    },
    cinNumber: {
      type: String,
    },
    tdsNumber: {
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
  { timestamps: true }
);

let company = mongoose.model("company", companySchema);

module.exports = company;
