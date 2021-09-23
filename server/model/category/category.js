const mongoose = require("mongoose");
let Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

let categorySchema = new Schema({
    categoryId :{
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
    type: String,
   
  // required: true,
   },
   
   edited_by :{
       type : Number,
      //required: true,
       
   },
//     category_id:{
//        type:Number,
//      //  required: true,
//    },
   categoryname_en:{
   type:String,
   required:true,
},
   categoryname_ml:{
       type:String,
       required: true,

   },
//    category_icon_svg:{
//        type:String,
//       required: true,

//   },
//    web_banner_image:{
//        type:String,
    //   required:true,
//    },
//    app_banner_image:{
//     type:String,
    //required:true,
// },
category_is_active:{
    type:Number,
    default:1,
 //   required:true,
},

isListed:{
    type:Boolean,
    default:true,
},
   
  },
  { timestamps: true }
);



let Category = mongoose.model("category", categorySchema);

module.exports = Category;
