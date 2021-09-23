let models = require("../model");

createBranch = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let branch = new models.Branch(req.body);
      let numberOfBranches = await models.Branch.countDocuments();
      branch.branchId = numberOfBranches + 1;
      branch = await branch.save();
      resolve(branch);
    } catch (err) {
      console.log(err);
      reject({
        message: err.message,
      });
    }
  });
};

getCompaniesList = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let branch = await models.Branch.find({
        isListed: true,
      });
      resolve(branch);
    } catch (err) {
      console.log(err);
      reject({
        message: err.message,
      });
    }
  });
};

getBranchesListOptions = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let branch = await models.Branch.find({
        company: req.params.companyId,
        isListed: true,
      }).select("_id name");
      resolve(branch);
    } catch (err) {
      console.log(err);
      reject({
        message: err.message,
      });
    }
  });
};
getBranchData = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let branch = await models.Branch.findOne({
        _id: req.params.branchId,
      });
      resolve(branch);
    } catch (err) {
      console.log(err);
      reject({
        message: err.message,
      });
    }
  });
};

updateBranch = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let branch = await models.Branch.findByIdAndUpdate(
        req.params.branchId,
        req.body,
        {
          new: true,
        }
      );
      resolve(branch);
    } catch (err) {
      console.log(err);
      reject({
        message: err.message,
      });
    }
  });
};

deleteBranch = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let branch = await models.Branch.findByIdAndUpdate(
        req.params.branchId,
        { isListed: false },
        { new: true }
      );
      resolve(branch);
    } catch (err) {
      console.log(err);
      reject({
        message: err.message,
      });
    }
  });
};

module.exports = {
  createBranch,
  getCompaniesList,
  getBranchesListOptions,
  getBranchData,
  updateBranch,
  deleteBranch,
};
