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

// getCompaniesListOptions = (req) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       let companies = await models.Company.find({
//         isListed: true,
//       }).select("_id name");
//       resolve(companies);
//     } catch (err) {
//       console.log(err);
//       reject({
//         message: err.message,
//       });
//     }
//   });
// };
getCompaniesListOptions = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      var whereStatement = {company_status:"0"};
      let companies = await models.Company.find(whereStatement).select("company_name");
      
      resolve(companies);
    } catch (err) {
      console.log(err);
      reject({
        message: err.message,
      });
    }
  });
};
getMasterCompaniesListOptions = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      var id = req.query.id;
      var userInfo = await models.User.findOne({_id:id});
      if(userInfo)
      {
        var company_id = userInfo.company;
        if(userInfo.privilage=="61718a27e65a5639a3211feb")
        {
          var companies = await models.Company.find({company_status:"0"}).select("company_name");
          var user_company = await models.Company.find({company_status:"0",_id:company_id}).select("company_name");
        }
        else
        {
          var user_company = await models.Company.find({company_status:"0",_id:company_id}).select("company_name");
          var companies = user_company;
        }
        
  
        resolve([companies,user_company]);
      }
      else
      {
        resolve([[],[]]);
      }
      
      
      
    } catch (err) {
      console.log(err);
      reject({
        message: err.message,
      });
    }
  });
};
getMasterLocalbodiesListOptions = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      var id = req.query.id;
      var userInfo = await models.User.findOne({_id:id});
      if(userInfo)
      {
      var privilege = userInfo.privilage;
      if(req.query.cid)
      {
        var company_id = req.query.cid;
      }
      else
      {
        var company_id = userInfo.company;
      }
      
      var localbodies = userInfo.local_body;

        if(privilege=="61718a27e65a5639a3211feb")
        {
          var localbodies = await models.LocalbodyName.find({localbody_status:0,localbody_company:company_id});
          var user_localbody = [];
        }
        else
        {
          if(localbodies)
          {
            var id_arr = localbodies.split(',');
            var localbodies = await models.LocalbodyName.find({localbody_status:0,_id:{$in:id_arr}});
            var user_localbody = localbodies;
          }
          else
          {
            resolve([[],[]]);
          }
          
        }
        
        resolve([localbodies,user_localbody]);
      }
      else
      {
        resolve([[],[]]);
      }
      
      
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
  getMasterCompaniesListOptions,
  getMasterLocalbodiesListOptions
};
