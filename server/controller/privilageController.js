let models = require("../model");

createPrivilage = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let privilage = new models.Privilage(req.body);
      let numberOfPrivilages = await models.Privilage.countDocuments({});
      privilage.privilageId = numberOfPrivilages + 1;
      privilage = await privilage.save();
      resolve(privilage);
    } catch (err) {
      console.log(err);
      reject({
        message: err.message,
      });
    }
  });
};

getPrivilagesListOptions = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let privilages = await models.Privilage.find({
        isListed: true,
      }).select("_id name");
      resolve(privilages);
    } catch (err) {
      console.log(err);
      reject({
        message: err.message,
      });
    }
  });
};

getPrivilagesList = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let privilage = await models.Privilage.find({
        isListed: true,
      });
      console.log(privilage, "ooo");
      resolve(privilage);
    } catch (err) {
      console.log(err);
      reject({
        message: err.message,
      });
    }
  });
};

getPrivilageData = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let privilage = await models.Privilage.findOne({
        _id: req.params.privilageId,
      });
      resolve(privilage);
    } catch (err) {
      console.log(err);
      reject({
        message: err.message,
      });
    }
  });
};

updatePrivilage = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let privilage = await models.Privilage.findByIdAndUpdate(
        req.params.privilageId,
        req.body,
        {
          new: true,
        }
      );
      resolve(privilage);
    } catch (err) {
      console.log(err);
      reject({
        message: err.message,
      });
    }
  });
};

deletePrivilage = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let privilage = await models.Privilage.findByIdAndUpdate(
        req.params.privilageId,
        { isListed: false },
        { new: true }
      );
      resolve(privilage);
    } catch (err) {
      console.log(err);
      reject({
        message: err.message,
      });
    }
  });
};

module.exports = {
  createPrivilage,
  getPrivilagesListOptions,
  getPrivilagesList,
  getPrivilageData,
  updatePrivilage,
  deletePrivilage,
};
