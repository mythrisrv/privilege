const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let privilageSchema = new Schema(
  {
    status: {
      type: Number,
    },
    privilege_name: {
      type: String,
      required: true,
    },
    privilege_code: {
      type: String,
      required: true,
    },
    alloted_divisions: {
      type: String,
      required: true,
    },
    alloted_branches: {
      type: String,
      required: true,
    },
    alloted_mainmenus: {
      type: String,
      required: true,
    },
    alloted_submenus: {
      type: String,
      required: true,
    },
    isListed: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true,collection:'privilege' }
);

let privilage = mongoose.model("privilege", privilageSchema);

module.exports = privilage;
