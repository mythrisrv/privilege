let models = require("../model");

createCompany = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      req.body.company_name=req.body.company_name.trim();
      let companyType_info=await models.Company.findOne({
        company_name:{'$regex':req.body.company_name,'$options':'i'},
        company_status:0
      }).select("company_name");
      if(companyType_info)
      {
        return reject({
          message: "This Company is already exists",
        });
      }

      let company = new models.Company(
      {
        company_name:req.body.company_name,
        company_shortcode:req.body.company_shortcode,
        company_person:req.body.company_person,
        company_design:req.body.company_design,
        company_mob:req.body.company_mob,        
        company_land:req.body.company_land,
        company_email:req.body.company_email,
        company_web:req.body.company_web,
        company_address:req.body.company_address,
        company_state:req.body.company_state,
        company_district:req.body.company_district,
        company_pin:req.body.company_pin,
        company_gstin:req.body.company_gstin,
        company_pan:req.body. company_pan,
        company_cin:req.body.company_cin,
        company_tds:req.body.company_tds,
        company_logo:req.body.company_logo,
        company_latitude:req.body.company_latitude,
        company_longitude:req.body.company_longitude,
        // company_addedby:req.user._id,
        company_addedby:req.user._id,
      },
        );
      let numberOfCompanies = await models.Company.countDocuments();
      numberOfCompanies++;
     company.company_unqid ="CH"+numberOfCompanies.toString().padStart(5, '0');
      company = await company.save();
      if(company)
      { 
        //########## user activity log ###########
          await models.userActivity({
          activity_ip : req.ip,
          activity_action : "New Company Added",
          activity_user : req.user.firstname,
          activity_user_id : req.user._id,
          activity_desc:'New Company "' +req.body.company_name +'" has been added by ' +req.user.username
         }).save();

         let companys = await models.Company.find({
          _id: company._id,
        }).populate("company_addedby","username -_id")
        .sort({_id:-1})
      resolve(companys);
    }
    else
    {
      reject({
        message: "Something went wrong",
      });
    }

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
        company_status:0,
      }) 
      .sort({_id:-1})
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
      // var whereStatement = {company_status:"0"};
      // let companies = await models.Company.find(whereStatement).select("company_name");
      let companies = await models.Company.find({company_status: 0,}).select("company_name");
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
      req.body.company_name=req.body.company_name.trim();
      let companyType_info=await models.Company.findOne({
        company_name:{'$regex':req.body.company_name,'$options':'i'},
        _id:{$ne:req.body._id},
        company_status: 0
      }).select("company_name");
      if(companyType_info)
      {
        return reject({
          message: "This Company is already exists",
        });
      }
      let data={
        company_name:req.body.company_name,
        company_shortcode:req.body.company_shortcode,
        company_person:req.body.company_person,
        company_design:req.body.company_design,
        company_mob:req.body.company_mob,        
        company_land:req.body.company_land,
        company_email:req.body.company_email,
        company_web:req.body.company_web,
        company_address:req.body.company_address,
        company_state:req.body.company_state,
        company_district:req.body.company_district,
        company_pin:req.body.company_pin,
        company_gstin:req.body.company_gstin,
        company_pan:req.body. company_pan,
        company_cin:req.body.company_cin,
        company_tds:req.body.company_tds,
        company_logo:req.body.company_logo,
        company_latitude:req.body.company_latitude,
        company_longitude:req.body.company_longitude,
        company_updatedby:req.user._id,
        
      }
      let company = await models.Company.findByIdAndUpdate(
        req.body._id,
        //req.params.companyId,
        data,
        {
          new: true,
        }
      );
      if(company)
      {
        //########## user activity log ###########
        await models.userActivity({
           activity_ip : req.ip,
           activity_action : "Company Edited",
           activity_user : req.user.firstname,
           activity_user_id : req.user.users_id,
           activity_desc:'Company "' +req.body.company_name +'" has been edited by ' +req.user.username
        }).save();
        
       let companys = await models.Company.find({
         _id: req.body._id,
       })
       .populate("company_addedby","username -_id")
       .sort({_id:-1})
      resolve(companys);
      }
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
        // req.body._id,
        req.params._id,
        { company_status:1 },
        { new: true }
      );
 //########## user activity log ###########
 await models.userActivity({
   activity_ip : req.ip,
   activity_action : "Company Deleted",
   activity_user : req.user.firstname,
   activity_user_id : req.user._id,
   activity_desc:'Company "' +company.company_name +'" has been deleted by ' +req.user.username
  }).save();
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
