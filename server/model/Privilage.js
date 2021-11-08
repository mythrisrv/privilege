const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let privilageSchema = new Schema(
  {
    privilageId: {
      type: String,
      required: true,
      unique: true,
    },
    privilege_name: {
      type: String,
      required: true,
    },
    privilege_code: {
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

let privilage = mongoose.model("privilege", privilageSchema);

module.exports = privilage;
