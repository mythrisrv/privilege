let models = require("../model");
getCitiesList = (req) => {
    return new Promise(async (resolve, reject) => {
      try {
        let city = await models.Cities.find({state_id:req.query.state_id}
        ).select("name")
        // .where("state_id").in(state_id).select("name")
        .sort({_id:-1});
          resolve(city);    
      } catch (err) {
        console.log(err);
        reject({
          message: err.message,
        });
      }
    });
  };
  module.exports = {
    
    getCitiesList,
   
  };