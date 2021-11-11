let models = require("../../model");
let moment = require("moment");
const multer = require('multer');

userProfile = (req) => {
    let user_id= req.params.id;

    return new Promise(async (resolve, reject) => {
    
      try {
        let userProfile = await models.User.find({
          status: 0,_id:user_id
        }).select("firstName lastName email mobile privilage company ward username local_body user_group").populate("company","company_name").populate("branch","name").populate("privilage","privilege_name").populate("ward","ward_name").populate("local_body","localbody_type_name").populate("user_group","group_name")
        
        console.log(userProfile);
        if(userProfile.length>0)
        {
          resolve(userProfile);
        }
        else{
          reject({
            message: "user not found",
          });
        }
   
   
      } catch (err) {
        reject({
          message: err.message,
        });
      }
    });
  };
  module.exports = {
    userProfile,
   
  };