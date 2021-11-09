const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let localbodynameSchema = new Schema(
  {
    local_id: {
     type: String,
     // required: false,
      //unique: true,
    },
    localbody_id: {
      type: String,
     // required: true,
    },
    localbody_date: {
      type: String,
      required: false,
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
      localbody_type:{
        type:String,
      },
      localbody_addedby: {
        type: Schema.Types.ObjectId,
        ref:"user",
      },
      localbody_updateddby: {
        type: Schema.Types.ObjectId,
        ref:"user",
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
       
      },
      dist_id: {
        type: Schema.Types.ObjectId,
        ref:"districts",
      },
      local_body_id: {
        type: String,
       // required: true,
      },
      localbody_company:{
        type:Schema.Types.ObjectId,
        ref:"tbl_company"

      },
    isListed: {
      type: Boolean,
      default: true,
    },
    createdAt:{
      type:Date,
      default:Date.now()
    },
    updatedAt:{
      type:Date,

    }
  },
  { /*timestamps: true,*/collection:'tbl_local_body_name'}
);

let localbodyname = mongoose.model("tbl_local_body_name",localbodynameSchema);

module.exports = localbodyname;
