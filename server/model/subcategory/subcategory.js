const mongoose = require("mongoose");
let Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

let subcategorySchema = new Schema({

    subcategoryId :{
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
  // required: true,
   },
   
   edited_by :{
       type : Number,
     // required: true,
       
   },
    category:{
        type: Schema.Types.ObjectId,
        ref: "category",
      // required: true,
   },
   subcategory_name_english:{
   type:String,
   required:true,
},
   subcategory_name_malayalam:{
       type:String,
       required: true,

   },
sub_image_name:{
       type:String,
      // required: true,

   },

    subcategory_active:{
    type:Number,
   // required:true,
},

isListed:{
    type:Boolean,
    default:true,
},
   
  },
  { timestamps: true }
);



let subCategory = mongoose.model("subcategory", subcategorySchema);

module.exports = subCategory;
