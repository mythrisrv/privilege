const mongoose = require("mongoose");
let Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");


let productSchema = new Schema({

product_id :{
        type: Number,
       required:true,    
   },
ip :{
       type: String,
       
   },
status :{
       type: Number,
       default:1,
       
   },
   
added_by :{
   type : Number,
   required: true,
   },
   
edited_by :{
       type : Number,
      required: true,
       
   },
product_category:{
       type:Number,
       required:true,
   },
product_subcategory:{
    type:Number,
    required:true,
},
product_thirdcategory:{
    type:Number,
    required:true,
},
product_brand_id:{
    type:Number,
    required:true,
},
product_name_english:{
    type:String,
    required:true,
},
product_name_manglish:{
    type:String,
    required:true,
},
product_name_malayalam:{
    type:String,
    required:true,
},
barcode:{
    type:Number,
    required:true,
},
product_description:{
    type:String,
    required:true,
},
product_description_short:{
    type:String,
    required:true,
},
product_warranty:{
    type:Number,
    required:true,
},

product_mrp:{
    type:Number,
    required:true,
},
product_cost:{
    type:Number,
    required:true,
},
product_web_price:{
    type:Number,
    required:true,
},
product_ios_price:{
    type:Number,
    required:true,
},
product_and_price:{
    type:Number,
    required:true,
},
product_offer_price:{
    type:Number,
    required:true,
},
available_timing:{
    type:String,
    required:true,
},
product_unit_id:{
    type:Number,
    required:true,
},
product_unit_quantity:{
    type:Number,
    required:true,
},
reorder_point:{
    type:Number,
    required:true,
},
gst_slab_id:{
    type:Number,
    required:true,
},
product_shipping_charge:{
    type:Number,
    required:true,
},
max_order_quantity:{
    type:Number,
    required:true,
},
min_order_quantity:{
    type:Number,
    required:true,
},
product_availability:{
    type:Number,
    required:true,
},
product_image_main:{
    type:Number,
    required:true,
},
product_image_subone:{
    type:String,
    required:true,
},
product_image_subtwo:{
    type:String,
    required:true,
},
product_image_subthree:{
    type:String,
    required:true,
},
product_image_subfour:{
    type:String,
    required:true,
},
isListed:{
    type:Boolean,
    default:true,
},
   
  },
  { timestamps: true }
);



let Product = mongoose.model("product", productSchema);

module.exports = Product;
