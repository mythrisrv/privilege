let models = require("../model");

createCompany = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let company = new models.Company(req.body);
      let numberOfCompanies = await models.Branch.countDocuments();
      company.companyId = numberOfCompanies + 1;
      company = await company.save();
      resolve(company);
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
      let company = await models.Company.find({
        isListed: true,
      });
      resolve(company);
    } catch (err) {
      console.log(err);
      reject({
        message: err.message,
      });
    }
  });
};

getCompaniesListOptions = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let companies = await models.Company.find({
        isListed: true,
      }).select("_id name");
      resolve(companies);
    } catch (err) {
      console.log(err);
      reject({
        message: err.message,
      });
    }
  });
};

getCompanyData = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let company = await models.Company.findOne({
        _id: req.params.companyId,
      });
      resolve(company);
    } catch (err) {
      console.log(err);
      reject({
        message: err.message,
      });
    }
  });
};

updateCompany = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let company = await models.Company.findByIdAndUpdate(
        req.params.companyId,
        req.body,
        {
          new: true,
        }
      );
      resolve(company);
    } catch (err) {
      console.log(err);
      reject({
        message: err.message,
      });
    }
  });
};

deleteCompany = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let company = await models.Company.findByIdAndUpdate(
        req.params.companyId,
        { isListed: false },
        { new: true }
      );
      resolve(company);
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
  getCompaniesList,
  getCompaniesListOptions,
  getCompanyData,
  updateCompany,
  deleteCompany,
};
