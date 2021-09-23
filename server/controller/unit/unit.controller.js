let models = require("../../model");

createUnit = (req) => {

    return new Promise(async (resolve, reject) => {
      try {
        let unit = new models.Unit(req.body);
        let numberOfunit = await models.Unit.countDocuments();
        unit.unitId = numberOfunit + 1;
        unit.ip = req.ip,
        unit = await unit.save();
        resolve(unit);
      } catch (err) {
        console.log(err);
        reject({
          message: err.message,
        });
      }
    });
  };


  
getUnitList = (req) => {
    return new Promise(async (resolve, reject) => {
      try {
        let unit = await models.Unit.find({
          isListed: true,
        });
    //   console.log(tax);
        resolve(unit);
      } catch (err) {
        console.log(err);
        reject({
          message: err.message,
        });
      }
    });
  };

  getUnitData = (req) => {
    return new Promise(async (resolve, reject) => {
      try {
        let unit = await models.Unit.findOne({
             
         _id:  req.params.unitId,
        });
        

        resolve(unit);
      } catch (err) {
        console.log(err);
        reject({
          message: err.message,
        });
      }
    });
  };


  
updateUnit = (req) => {
    return new Promise(async (resolve, reject) => {
      try {
        
        let unit = await models.Unit.findByIdAndUpdate(
          req.params.unitId,
          req.body,
          {
            new: true,
          }
        );
        
        resolve(unit);
      } catch (err) {
        console.log(err);
        reject({
          message: err.message,
        });
      }
    });
  };

  deleteUnit = (req) => {
    return new Promise(async (resolve, reject) => {
      try {
        let unit = await models.Unit.findByIdAndUpdate(
          
          req.params.unitId,
          
          { status:0, isListed: false },
          { new: true }
        );
        resolve(unit);
      } catch (err) {
        console.log(err);
        reject({
          message: err.message,
        });
      }
    });
  };


  
module.exports = {
    createUnit,
    getUnitList,
    getUnitData,
    updateUnit,
    deleteUnit

};
