const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let messageSchema = new Schema(
  {
    ip: {
        type: String,
      },
    message_type: {
        type: Number,
      },
    message_datetime: {
      type: String,
    },
    msg_mob: {
      type: String,
    },
    msg_head: {
      type: String,
      default:0,
    },
    msg_content: {
      type: String,
      // ref: "users",
    },
    msg_from: {
      type: Number,
      // ref: "users",
    },
    
  },
  { timestamps: true,collection:'tbl_message_logs' }
);

let message_log = mongoose.model("tbl_message_logs", messageSchema);

module.exports = message_log;
