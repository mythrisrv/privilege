const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let QrCodeSchema = new Schema(
  {
    qrcode_ip:{
        type: String,
        default: 1, 
     },
     qrcode_status:{
        type: Number,
        default: 0, //ON
    },
    qrcode_addedby:{
        type: Schema.Types.ObjectId,
         ref: "users",
  
     },
    qrcode_updatedby:{
        type: Schema.Types.ObjectId,
        ref: "users",
    
       },
     qrcode_date:{
        type: String,
      },
     qrcode_time:{
        type: String,
     },
   
    
    qrcode_localbody_id:{
        type: Schema.Types.ObjectId,
        ref: "tbl_local_body_name",
       },
   
    qrcode_company:{
        type: String,
    },
    createdAt:{
       type:Date,
       default:Date.now(),
    },
    updatedAt:{
       type:Date
    },
    qrcode_start:{
        type:Number
    },
    qrcode_end:{
        type:Number

    },
    qrcode_file:{
        type:String
    }
  },
  { /*timestamps: true,*/collection:'tbl_qrcode' }
);

let qrcode = mongoose.model("tbl_qrcode", QrCodeSchema);

module.exports = qrcode;
