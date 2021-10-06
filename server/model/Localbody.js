const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let localbodySchema = new Schema(
  {
   
     localbody_status:{
        type: Number,
        default: 0, //ON
     },
     localbody_name:{
         type:String,
         required: true
        
     },
    
    },
  { timestamps: true,collection:'tbl_local_body' }
);

let localbody = mongoose.model("tbl_local_body", localbodySchema);

module.exports = localbody;
