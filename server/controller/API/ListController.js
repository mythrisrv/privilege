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
        }).select("_id group_name");
        resolve(group)
      } catch (err) {
        console.log(err);
        reject({
          message: err.message,
        });
      }
    });
  };
  /*****************************/
  /*customer type List
  /*****************************/
  CustomerTypeList = (req) => {
    return new Promise(async (resolve, reject) => {
      try {
        let CustomerType = await models.Customer_type.find({
          customer_type_status: 0,
        }).select("_id customer_type_id customer_type_name");
        resolve(CustomerType);
      } catch (err) {
        console.log(err);
        reject({
          message: err.message,
        });
      }
    });
  };
   /*****************************/
  /*Package List
  /*****************************/
  PackageList = (req) => {
    return new Promise(async (resolve, reject) => {
      try {
        let PackageList = await models.Thariff.find({
          tariff_status: 0,
        }).select(" _id tariff_id package_name");
        resolve(PackageList);
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
    GroupList,
    CustomerTypeList,
    PackageList
  };