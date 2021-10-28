const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let localbodySchema = new Schema(
  {
   
     localbody_status:{
        type: Number,
        default: 0, //ON
     },
     company_name:{
       type:String,
       required:true
       
     },
     district_name:{
       type:String,
       required:true

     },
     localbody_type:{
       type:String,
       required:true

     },
     localbody_name:{
         type:String,
         required: true
        
     },
     short_code:{
       type:String,
       required:true
     }
    
    },
  { timestamps: true,collection:'tbl_local_body' }
);

let localbody = mongoose.model("tbl_local_body", localbodySchema);

module.exports = localbody;
