let models = require("../../model/");


createTimeslot = (req) => { 
    
  return new Promise(async (resolve, reject) => {
    try {
      let timeslot = new models.Timeslot(req.body);
      let numberOfTimeslots = await models.Timeslot.countDocuments();
      timeslot.timeslot_id = numberOfTimeslots + 1;
      timeslot.ip = req.ip,
      
      timeslot = await timeslot.save();
      resolve(timeslot);
    } catch (err) {
      console.log(err);
      reject({
        message: err.message,
      });
    }
  });
};

getTimeslotsList = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let timeslot = await models.Timeslot.find({
        isListed: true,
      });
     
    
      console.log(timeslot);
      resolve(timeslot);
    } catch (err) {
      console.log(err);
      reject({
        message: err.message,
      });
    }
  });
};

getTimeslotData = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let timeslot = await models.Timeslot.findOne({
        _id:req.params.timeslot_id,
      });
      resolve(timeslot);
    } catch (err) {
      console.log(err);
      reject({
        message: err.message,
      });
    }
  });
};

updateTimeslot = async(req,res) => {
   
  return new Promise(async (resolve, reject) => {
    try {
      let timeslot = await models.Timeslot.findByIdAndUpdate(
        req.params.timeslot_id,
        req.body,
        {
          new: true,
          
        },
        
      );
      resolve(timeslot);
    } catch (err) {
      console.log(err);
      reject({
        message: err.message,
      });
    }
  });
};

deleteTimeslot = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let timeslot = await models.Timeslot.findByIdAndUpdate(
        req.params.timeslot_id,
    
        {isListed:false , status:0},
        { new: true },
        
        
      );
      resolve(timeslot);
    } catch (err) {
      console.log(err);
      reject({
        message: err.message,
      });
    }
  });
};

module.exports = {
  createTimeslot,
  getTimeslotsList,
  getTimeslotData,
  updateTimeslot,
  deleteTimeslot,
};