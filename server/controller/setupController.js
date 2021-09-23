let models = require("../model");
const jwt = require("jsonwebtoken");
const env = process.env.NODE_ENV || "development";
const config = require("../config")[env];

createCompany = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      companyExists = await models.Company.findOne();
      if (companyExists) {
        reject({
          message: "Company already exists",
        });
      } else {
        let company = new models.Company(req.body);
        company.companyId = 1;
        company = await company.save();
        resolve(company);
      }
    } catch (err) {
      console.log(err);
      reject({
        message: err.message,
      });
    }
  });
};

createBranch = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      branchExists = await models.Branch.findOne();
      if (branchExists) {
        reject({
          message: "Branch already exists",
        });
      } else {
        let branch = new models.Branch(req.body);
        branch.branchId = 1;
        branch = await branch.save();
        resolve(branch);
      }
    } catch (err) {
      console.log(err);
      reject({
        message: err.message,
      });
    }
  });
};

createPrivilage = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      privilageExists = await models.Privilage.findOne();
      if (privilageExists) {
        reject({
          message: "Privilage already exists",
        });
      } else {
        let privilage = new models.Privilage(req.body);
        privilage.privilageId = 1;
        privilage = await privilage.save();
        resolve(privilage);
      }
    } catch (err) {
      console.log(err);
      reject({
        message: err.message,
      });
    }
  });
};

createSuperAdmin = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let { password } = req.body;
      userExists = await models.User.findOne();
      if (userExists) {
        reject({
          message: "Super admin already exist",
        });
      } else {
        let user = new models.User(req.body);
        user.userId = 1;
        user.password = user.generatePasswordHash(password);
        user = await user.save();
        user.token = jwt.sign(
          {
            _id: user._id,
          },
          config.secret,
          {
            expiresIn: "10d",
          }
        );
        resolve(user);
      }
    } catch (err) {
      console.log(err);
      reject({
        message: err.message,
      });
    }
  });
};

module.exports = {
  createCompany,
  createBranch,
  createPrivilage,
  createSuperAdmin,
};
