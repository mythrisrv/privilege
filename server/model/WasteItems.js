const mongoose = require("mongoose");
let Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const { isInteger } = require("lodash");

let image_Schema=new Schema(
  {
    img:{
      type:String,
    }
  }
)

let waste_items_Schema = new Schema(
    {
       waste_items_name: {
        type: String,
        required: true,
      },
      waste_items_ip: {
        type: String,
        required: true
      },
      waste_items_status: {
        type: Number,
        required: true
      },
      waste_items_date: {
        type:String,
        required: true
      },
      waste_items_time: {
        type:String,
        required: true
      },
      waste_company: {
        type: String,
       // required: true,
      },
      waste_items_bag: {
        type: String,
        required: true
      },
      waste_items_amount:{
        type: Number,
        required: true
      },
     
        waste_items_image:[ image_Schema ] ,
     
       
      
      waste_items_type: {
        type: Schema.Types.ObjectId,
         ref: "tbl_waste_cat",
      },
      waste_item_cat: {
        type: Schema.Types.ObjectId,
         ref: "tbl_waste_category",
      },
      createdAt: {
        type: Date,
       // required: true,
      },
      updatedAt: {
        type: Date,
        //required: true,
      },
      waste_items_weight:{
        type:String

      },
      waste_item_addedby: {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
      waste_item_updatedby: {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
    },
    { timestamps: true ,collection:'tbl_waste_items'}
  );
  let Waste_items = mongoose.model("tbl_waste_items",waste_items_Schema);

  module.exports = Waste_items;