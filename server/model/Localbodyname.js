const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let localbodynameSchema = new Schema(
  {
    local_id: {
      type: String,
      required: false,
      unique: true,
    },
    localbody_id: {
      type: String,
      required: true,
    },
    localbody_time: {
      type: String,
      required: false,
    },
    localbody_ip: {
        type: String,
        required: true,
      },
      localbody_status: {
        type: String,
        required: true,
      },
      localbody_addedby: {
        type: String,
        required: true,
      },
      localbody_name: {
        type: String,
        required: true,
      },
      short_code: {
        type: String,
        required: true,
      },
      state_id: {
        type: String,
        required: true,
      },
      dist_id: {
        type: String,
        required: true,
      },
      local_body_id: {
        type: String,
        required: true,
      },
    isListed: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true,collection:'tbl_local_body_name'}
);

let localbodyname = mongoose.model("tbl_local_body_name",localbodynameSchema);

module.exports = localbodyname;
