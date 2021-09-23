
const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let timeslotSchema = new Schema({

timeslot_id :{
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
 
   },
edited_by :{
       type : Number,
       required:true,     
   },
from_time:{
    type:String,
    required:true,  
  },
to_time:{
   type:String,
    },
isListed:{
    type:Boolean,
    default:true,
},
 },
  { timestamps: true }  
  
);



let Timeslot = mongoose.model("timeslot", timeslotSchema);

module.exports = Timeslot;