const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let userActivitySchema = new Schema(
  {
    activity_ip:{
      type:Schema.Types.String,
    },
    activity_action:{
      type:String
    },
    activity_user_id:{
      type:Schema.Types.ObjectId,
      ref: "users",
    },
    // activity_user:{
    //   type:Schema.Types.Date
    // },
    activity_desc:{
      type:Schema.Types.String
    }

    },
  { timestamps: true,collection:'user_activity_logs' }
);

let userActivity = mongoose.model("user_activity_logs", userActivitySchema);

module.exports = userActivity;