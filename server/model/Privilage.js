const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let privilageSchema = new Schema(
  {
    status: {
      type: String,
      default:0,
    },
    privilege_name: {
      type: String,
      required: true,
    },
    privilege_code: {
      type: String,
      required: true,
    },
    // alloted_divisions: {
    //   type: String,
    //   // required: true,
    // },
    // alloted_branches: {
    //   type: String,
    //   // required: true,
    // },
    alloted_mainmenus: [{
      type:Schema.Types.ObjectId,
      // required: true,
    }],
    alloted_submenus:[{
      type:Schema.Types.ObjectId,
      // required: true,
    }],
    alloted_companies:[{
      type:Schema.Types.ObjectId,
      ref: "tbl_company",
    }] ,
    alloted_localbodies:[{
      type:Schema.Types.ObjectId,
      ref: "tbl_local_body_name",
    }] 
 privilege_addedby: {
      type: Schema.Types.ObjectId,
       ref: "users",
    },
    privilege_updatedby: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },

   
    // isListed: {
    //   type: Boolean,
    //   default: true,
    // },
  },
  { timestamps: true,collection:'privilege' }
);

let privilage = mongoose.model("privilege", privilageSchema);

module.exports = privilage;
