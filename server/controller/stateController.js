let models = require("../model");
getStatesList = (req) => {
    return new Promise(async (resolve, reject) => {
      try {
        let state = await models.State.find(
        ).sort({_id:-1});
          resolve(state);    
      } catch (err) {
        console.log(err);
        reject({
          message: err.message,
        });
      }
    });
  };
  module.exports = {
    
    getStatesList,
   
  };