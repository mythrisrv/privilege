let models = require("../../model");
let moment = require("moment");

customerLogin = (req) => {
    var mob = req.body.phone;
    return new Promise(async (resolve, reject) => {
      try {
        let user= await models.User.findOne({
            mobile: mob,
        });
        resolve(user);
      } catch (err) {
        console.log(err);
        reject({
          message: err.message,
        });
      }
    });
  };
  

module.exports = {
    customerLogin,
};
