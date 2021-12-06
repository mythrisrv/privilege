const mongoose = require("mongoose");
let Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const { isInteger } = require("lodash");
let groupSchema = new Schema(
    {
        group_id: {
        type: String,
        required: true,
        unique: true,
      },
      group_ip: {
        type: String,
        required: true,
      },
      group_status: {
        type: Number,
      },
      group_date:{
        type:String
      },
      group_time:{
        type:String
      },
      created_At: {
        type: Date,
        default:Date.now(),
      },
      updated_at: {
        type:Date,
      },
      group_addedby: {
        type: Schema.Types.ObjectId,
        ref:"users"
      },
      group_name: {
        type: String,
      },
      group_state_id: {
        //type: Schema.Types.ObjectId,
       // ref: "states",
      },
     
      group_district: {
        type: Schema.Types.ObjectId,
        ref: "districts",
      },
      group_localbody_type_id: {
        type: Schema.Types.ObjectId,
        ref: "tbl_local_body",
      },
      group_localbody_name_id: {
        type: Schema.Types.ObjectId,
        ref: "tbl_local_body_name",
      },
      group_ward:[ {
        type:Schema.Types.ObjectId,
        ref:"tbl_ward"
      }],
      group_incentive: {
        type: String,
      },
    },
    { /*timestamps: true ,*/collection:'tbl_group' }
  );
  let group = mongoose.model("tbl_group",groupSchema);

  module.exports = group;