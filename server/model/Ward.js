const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let wardSchema = new Schema(
  {
    ward_ip:{
        type: String,
        default: 1, 
     },
     ward_status:{
        type: Number,
        default: 0, //ON
    },
    ward_addedby:{
        type: Schema.Types.ObjectId,
         ref: "users",
  
     },
    ward_updatedby:{
        type: Schema.Types.ObjectId,
        ref: "users",
    
       },
     ward_date:{
        type: String,
      },
     ward_time:{
        type: String,
     },
    ward_name:{
        type: String,
     },
     ward_no:{
        type: String,
     },
     state_id:{
        //type: Schema.Types.ObjectId,
        // ref: "state",
      },
     dist_id:{
        //type: Schema.Types.ObjectId,
        // ref: "districts",
      },
     localbody_type_id:{
        type: Schema.Types.ObjectId,
        // ref: "tbl_local_body",
       },
     localbody_name_id:{
        type: Schema.Types.ObjectId,
         ref: "tbl_local_body_name",
      },
    ward_company:{
        type: String,
    },
    createdAt:{
       type:Date,
       default:Date.now(),
    },
    updatedAt:{
       type:Date
    }
  },
  { /*timestamps: true,*/collection:'tbl_ward' }
);

let ward = mongoose.model("tbl_ward", wardSchema);

module.exports = ward;
