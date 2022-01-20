const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let branchSchema = new Schema(
  {
    branch_status: {
      type: String,
      default:0,
    },
    branchId: {
      type: String,
      required: true,
      unique: true,
    },
    company: {
      type: Schema.Types.ObjectId,
      ref: "tbl_company",
      required: true,
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
      type:Schema.Types.String,
      ref: "states",
      required: true,
    },
    city: {
      type:Schema.Types.String,
      ref: "cities",
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    landLineNumber: {
      type: String,
      required: true,
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
      unique: true,
    },
    website: {
      type: String,
      required: true,
    },
    branchLogo: {
      type: String,
      // required: true,
    },
    gstin: {
      type: String,
      required: true,
    },
    panNumber: {
      type: String,
      required: true,
    },
    cinNumber: {
      type: String,
      required: true,
    },
    tdsNumber: {
      type: String,
      required: true,
    },
    // location: {
    //   type: {
    //     type: String,
    //     enum: ["Point"],
    //     required: true,
    //   },
    //   coordinates: {
    //     type: [Number],
    //     required: true,
    //   },
    // },

    deliveryArea: {
      type: String,
      required: true,
    },
    deliverytype:{
      type: String,
      required: true,
    },
    deliveryslot:{
      type: String, 
      required: true,
    },
    branch_latitude: {
      type: String,
      required: true,
    },
    branch_longitude: {
      type: String,
     required: true,
    },
    branch_addedby: {
      type: Schema.Types.ObjectId,
       ref: "users",
    },
    branch_updatedby: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },

    // isListed:{
    //   type: Boolean,
    //   default: true,
    // },
  },
  { timestamps: true }
);

branchSchema.index({ location: "2dsphere" });

let branch = mongoose.model("branch", branchSchema);

module.exports = branch;
