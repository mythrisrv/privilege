const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let privilageSchema = new Schema(
  {
    privilageId: {
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
    isListed: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

let privilage = mongoose.model("privilage", privilageSchema);

module.exports = privilage;
