const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let master_branch = new Schema(
  {
    division:{
        type:String,
        required: true,
    },
    bname:{
        type:String,
        required: true,
    },
    scode:{
        type:String,
        required: true,
    },
  },
  { collection: "master_branch" }
);

let masterBranch = mongoose.model("master_Branch", master_branch);

module.exports = masterBranch;
