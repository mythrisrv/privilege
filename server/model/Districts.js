const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let districtSchema = new Schema(
  {
    
    district_name: {
      type: String,
    },
    district_ip: {
      type: String,
    },
    district_status: {
      type: Number,
      default:0,
    },
    district_addedby: {
      type: Schema.Types.ObjectId,
      // ref: "users",
    },
    district_updatedby: {
      type: Schema.Types.ObjectId,
      // ref: "users",
    },
    state_id: {
      type: Number,
    },
    country_id: {
      type: Number,
    },
    district_date: {
      type: String,
    },
    district_time: {
      type: String,
    },
    
  },
  { timestamps: true,collection:'districts' }
);

let district = mongoose.model("districts", districtSchema);

module.exports = district;
