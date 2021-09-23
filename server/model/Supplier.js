const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let supplierSchema = new Schema(
  {
    supplierid: {
      type: Number,

      unique: true,
    },
    ip: {
      type: String,
      default: 1,
    },
    status: {
      type: Number,
      default: 1, //ON
      required: "Status required",
    },
    //  created_at :{
    //       type : Date,
    //  },
    added_by: {
      type: Number,
      required: "Added_by required",
    },
    //  updated_at :{
    //      type : Date,
    //  },
    edited_by: {
      type: Number,
      required: "editedby required",
    },

    supplier_name_en: {
      type: String,
      required: true,
    },
    supplier_contact_person: {
      type: String,
      // required: true,
    },
    supplier_contact_number: {
      type: Number,
      // required: true,
    },
    supplier_contact_number_alternate: {
      type: Number,
      // required: true,
    },
    supplier_email: {
      type: String,
      // required: true,
    },
    supplier_address: {
      type: String,
      // required: true,
    },
    supplier_pan_no: {
      type: Number,
      // required: true,
    },
    supplier_bank_account_no: {
      type: Number,
      // required: true,
    },
    supplier_bank_name: {
      type: String,
      // required: true,
    },
    supplier_branch_name: {
      type: String,
      // required: true,
    },
    state_id: {
      type: Number,
      // required: true,
    },
    isListed: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

let Supplier = mongoose.model("supplier", supplierSchema);

module.exports = Supplier;
