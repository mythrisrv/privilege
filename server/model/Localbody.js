const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let localbodySchema = new Schema(
  {
    localbody_status:{
      type:String,
      

    },
   
    localbody_type_id:{
      type:String

    },
    localbody_type_name:{
      type:String
    },

    },
  { timestamps: true,collection:'tbl_local_body' }
);

let localbody = mongoose.model("tbl_local_body", localbodySchema);

module.exports = localbody;
