let models = require("../../model");
let moment = require("moment");
const multer = require('multer');

userProfile = (req) => {
    let user_id= req.params.id;

    return new Promise(async (resolve, reject) => {
    
      try {
        let userProfile = await models.User.find({
          status: 0,_id:user_id
        }).populate("company","company_name").populate("branch","name")
   resolve(userProfile);
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