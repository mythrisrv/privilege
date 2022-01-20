const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let companysSchema = new Schema(
  {
    // company_ip: {
    //   type: String,
    // },
    company_status: {
      type: String,
      default:0,
    },
    company_addedby: {
      type: Schema.Types.ObjectId,
       ref: "users",
    },
    company_updatedby: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    company_date: {
      type: String,
    },
    createdAt:{
      type:Date,
      default:Date.now()
    },
    updatedAt:{
      type:Date,
    },
    company_unqid: {
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
      required: true,
    },
    // cust_image: {
    // data:Buffer,
    // contentType:String
    // },
    company_state: {
      type: Number,
      ref: "states",
      required: true,

    },
    company_district: {
      type: Number,
      ref: "cities",
     
    },
    company_address: {
      type: String,
      required: true,
    },
    company_land: {
      type: String,
      required: true,
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
      unique: true,
    },
    company_web: {
      type: String,
      required: true,
    },
    company_logo: {
      type: String,
      
    },
    company_gstin: {
      type: String,
      required: true,
    },
    company_pan: {
      type: String,
      required: true,
    },
    company_cin: {
      type: String,
      required: true,
    },
    company_tds: {
      type: String,
      required: true,
    },
    company_latitude: {
      type: String,
      required: true,
    },
    company_longitude: {
      type: String,
     required: true,
    },
    localbodies:{
      type:Schema.Types.ObjectId,
      ref: "tbl_local_body_name",
    }



  },
  { timestamps: true ,collection: 'tbl_company'}
);

let company = mongoose.model("tbl_company", companysSchema);

module.exports = company;
