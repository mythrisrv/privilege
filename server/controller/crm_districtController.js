let models = require("../model");
let moment = require("moment");

createDistrict = (req) => {
  var ip = req.ip;
  const format2 = "YYYY-MM-DD"
   var date2 = new Date();
   
date = moment(date2).format(format2);
time = moment(date2,"hh:mm A").format("HH:mm ");
;
  return new Promise(async (resolve, reject) => {
    try {
    
      let district = new models.District( 
        { district_status: 0,
          district_ip: ip,
          district_name: req.body.district_name,
          state_id: 19,
          country_id: 101,
          district_date: date,
          district_time: time,
         district_addedby:req.user._id,

        },
        );
       
      let numberOfDistricts = await models.District.countDocuments();
      district.Id = numberOfDistricts + 1;
      
      district = await district.save()
     // district.populate("district_addedby","username -_id").execPopulate();
      resolve(district);
     
       } catch (err) {
      console.log(err);
      reject({
        message: err.message,
      });
    }
  });
};


getDistrictList = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let district = await models.District.find({
        district_status: 0,
      }).populate("district_addedby","username -_id")
      .sort({createdAt:-1})
        

       resolve(district);
    } catch (err) {
      console.log(err);
      reject({
        message: err.message,
      });
    }
  });
};

// getDistrictsList = (req) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       let district = await models.District.find({
//         district_status: 0,
//       });
//       resolve(district);
//     } catch (err) {
//       console.log(err);
//       reject({
//         message: err.message,
//       });
//     }
//   });
// };

getDistrictListOptions = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let districts = await models.District.find({
        district_status: 0,
      }).select("district_name");
      resolve(districts);
    } catch (err) {
      console.log(err);
      reject({
        message: err.message,
      });
    }
  });
};


getDistrictData = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let district= await models.District.findOne({
        _id: req.params.districtId,
      });
      resolve(district);
    } catch (err) {
      console.log(err);
      reject({
        message: err.message,
      });
    }
  });
};

updateDistrict = (req) => {
  console.log(req.body)
   return new Promise(async (resolve, reject) => {
    try {
     let data={
       district_name:req.body.district_name,
       district_updatedby:req.user._id,
       

     }

      let district = await models.District.findByIdAndUpdate(
        req.params.districtId,
        data,
        //req.body,
        { new: true }
      )
      
    // console.log(district)
      resolve(district);
      //console.log(district)
    } catch (err) {
      console.log(err);
      reject({
        message: err.message,
      });
    }
  });
};



deleteDistrict = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let district = await models.District.findByIdAndUpdate(
        req.params.districtId,
        { district_status:1 },
        { new: true }
      );
      resolve(district);
    } catch (err) {
      console.log(err);
      reject({
        message: err.message,
      });
    }
  });
};
module.exports = {
  createDistrict,
  // getDistrictsList,
  getDistrictList,
  getDistrictListOptions,
  getDistrictData,
  updateDistrict,
  deleteDistrict,
};
