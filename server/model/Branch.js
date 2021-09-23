const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let branchSchema = new Schema(
  {
    branchId: {
      type: String,
      required: true,
      unique: true,
    },
    company: {
      type: Schema.Types.ObjectId,
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
    branchLogo: {
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
    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },

    deliveryArea: {
      type: String,
    },
    isListed: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

branchSchema.index({ location: "2dsphere" });

let branch = mongoose.model("branch", branchSchema);

module.exports = branch;
