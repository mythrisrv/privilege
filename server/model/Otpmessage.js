const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let otpSchema = new Schema(
  {
    
    mobile: {
      type: String,
    },
    otp: {
      type: String,
    },
    ip: {
      type: String,
    },
    status: {
      type: Number,
    },
    
  },
  { timestamps: true,collection:'otpmessages' }
);

let Otpmessage = mongoose.model("otpmessages", otpSchema);

module.exports = Otpmessage;
