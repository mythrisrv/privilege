const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let submenuSchema = new Schema(
  {
    sub_ip: {
      type: String,   
    },
    sub_date: {
      type: Date,
    },
    sub_status: {
      type: Number,
      default:0,
    },
    sub_main_id: {
      type: Schema.Types.ObjectId,
      ref: "tbl_menu_main",
    },
    sub_name: {
      type: String,
    },
    sub_link: {
      type: String,
    },
    sub_icon: {
      type: String,
    },
    sub_option_availability: {
      type:String,
    },
    sub_order: {
      type: Number,
    },
    
  },
  { timestamps: true,collection:'tbl_menu_sub' }
);

let sub_menu = mongoose.model("tbl_menu_sub", submenuSchema);

module.exports = sub_menu;
