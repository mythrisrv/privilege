let models = require("../../model");
/*****************************/
 /*District List
/*****************************/
DistrictList = (req) => {
    return new Promise(async (resolve, reject) => {
      try {
        let district = await models.District.find({
          district_status: 0,
        }).select("_id district_name");
        resolve(district);
      } catch (err) {
        console.log(err);
        reject({
          message: err.message,
        });
      }
    });
  };
  /*****************************/
  /*Ward List
  /*****************************/
  WardList = (req) => {
    return new Promise(async (resolve, reject) => {
      try {
        let ward = await models.Ward.find({
          ward_status: 0,
        }).select("_id ward_name ward_no");
        resolve(ward);
      } catch (err) {
        console.log(err);
        reject({
          message: err.message,
        });
      }
    });
  };
  /*****************************/
  /*Group List
  /*****************************/
  GroupList = (req) => {
    return new Promise(async (resolve, reject) => {
      try {
        let group = await models.group.find({
          group_status: 0,
        }).select("_id group_id group_name group_ward");
        resolve(group);
      } catch (err) {
        console.log(err);
        reject({
          message: err.message,
        });
      }
    });
  };
  module.exports = {
    DistrictList,
    WardList,
    GroupList
  };