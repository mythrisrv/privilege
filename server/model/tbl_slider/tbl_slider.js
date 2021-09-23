const mongoose = require("mongoose");
let Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

let sliderSchema = new Schema({

    slider_id :{
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
   slider_name:{
       type:String,
       required: true,
   },
   category_id:{
    type: Schema.Types.ObjectId,
    ref: "category",
},
   android_banner:{
       type:String,
       

   },
   ios_banner:{
       type:String,
       

   },
   web_banner:{
       type:String,
      // required:true,
   },
   web_banner_webp:{
    type:String,
    //required:true,
},
    app_banner_webp:{
    type:String,
   // required:true,
},
slider_url_web:{
    type:String,
    //required:true,
},
slider_url_app:{
    type:String,
    //required:true,
},
isListed:{
    type:Boolean,
    default:true,
},
   
  },
  { timestamps: true }
);



let Slider = mongoose.model("slider", sliderSchema);

module.exports = Slider;
