const mongoose = require("mongoose");
let Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

let thirdcategorySchema = new Schema({

    thirdcategoryId :{
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
   default:1,
   //required: true,
   },
   
   edited_by :{
       type : Number,
       defaul:1,
     // required: true,
       
   },
    
   thirdcategory_name_english:{
   type:String,
   required:true,
},
   thirdcategory_name_malayalam:{
       type:String,
       required: true,

   },
   thirdcate_sub_category:{
       type:String,
      // required: true,

   },
   thirdcategory_active:{
    type:Number,
    default:1,  //active
},
   third_cat_image:{
       type:String,
      // required:true,
   },

 

isListed:{
    type:Boolean,
    default:true,
},
   
  },
  { timestamps: true }
);



let thirdCategory = mongoose.model("thirdcategory", thirdcategorySchema);

module.exports = thirdCategory;