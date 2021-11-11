const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let menuSchema = new Schema(
  {
    main_ip: {
      type: String,
      
    },
    main_date: {
      type: Date,
    },
    main_status: {
      type: Number,
      default:0,
    },
    main_department: {
      type: Number,
    },
    main_menuname: {
      type: String,
    },
    main_link: {
      type: String,
    },
    main_icon: {
      type: String,
    },
    menu_order: {
      type: Number,
    },
    submenu:[]
    
  },
  { timestamps: true,collection:'tbl_menu_main' }
);

let main_menu = mongoose.model("tbl_menu_main", menuSchema);

module.exports = main_menu;
