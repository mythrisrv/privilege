let models = require("../model");
let moment = require("moment");
const { populate } = require("../model/User");

createLocalbody = (req) => {
    var ip = req.ip;
    const format2 = "YYYY-MM-DD"
    var date2 = new Date();
    date = moment(date2).format(format2);
    time = moment(date2).format("HH:mm A");

  return new Promise(async (resolve, reject) => {
    try {
      
      let localbody = new models.LocalbodyName( 
        { 
          localbody_ip:ip,
          localbody_status:0,
          localbody_time:time,
        localbody_type:req.body.localbody_type,
           localbody_name:req.body.localbody_name,
           short_code:req.body.short_code,
           localbody_date:date,
           localbody_addedby:req.user._id,
         }
        
       );
      
        let companyname=   await models.Company.findOne(
          { "company_name":req.body.company_name}
         )
         localbody.localbody_company=companyname._id;
      let district= await models.District.findOne(
          { "district_name":req.body.district_name});
          localbody.dist_id=district._id;
      
          let numberOflocalbodies = await models.LocalbodyName.countDocuments();
        localbody.localbody_id = numberOflocalbodies + 1;
       localbody = await localbody.save();
      resolve(localbody);
    } catch (err) {
      console.log(err);
      reject({
      message: err.message,
      });
    }
  });
};

getLocalbodiesList = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let localbody = await models.LocalbodyName.find({
        localbody_status: 0,
      }).populate("localbody_company","company_name -_id")
     .populate("localbody_addedby","username -_id")
     .populate("dist_id","district_name ")
      .sort({createdAt:-1})
      resolve(localbody);
    } catch (err) {
      console.log(err);
      reject({
        message: err.message,
      });
    }
  });
};

// getCustomersList = (req) => {
//   return new Promise(async (resolve, reject) => {
//            models.Customer.find({}).toArray(function(err, result) {
//         if (err) throw err;
//         console.log(customer);
//       });
//   });
// };

getLocalbodiesListOptions = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let localbodies = await models.LocalbodyName.find({
        localbody_status:0,
      }).select("localbody_name");
      console.log(localbodies);
      resolve(localbodies);
    } catch (err) {
      console.log(err);
      reject({
        message: err.message,
      });
    }
  });
};

getLocalbodyData = (req) => {
  return new Promise(async (resolve, reject) => {
    console.log(req.params)
    try {
      let localbody= await models.LocalbodyName.findOne({
        localbody_name:req.params.localbodyname
      });
      resolve(localbody);
    } catch (err) {
      console.log(err);
      reject({
        message: err.message,
      });
    }
  });
};

updateLocalbody = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
     

    
      let company=await models.Company.findOne({
        company_name:req.body.company_name
      })
      console.log(company)
    // req.body.localbody_company=company._id;
    let district=await models.District.findOne({
      district_name:req.body.district_name
    })
    console.log(district)
    
    let data={
      localbody_company:company._id,
      dist_id:district._id,
      localbody_type:req.body.localbody_type,
      localbody_name:req.body.localbody_name,
      short_code:req.body.short_code,
      localbody_updatedby:req.user._id,
      updatedAt:Date.now(),

    }
    // console.log(req.body);

      let localbody = await models.LocalbodyName.findByIdAndUpdate(
         req.params.localbody_Id,
        data,
        {
          new: true,
         
        }
      )
      resolve(localbody);
    } catch (err) {
      console.log(err);
      reject({
        message: err.message,
      });
    }
  });
};

deleteLocalbody = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let localbody = await models.LocalbodyName.findByIdAndUpdate(
        req.params.localbody_Id,
        { localbody_status:1 },
        { new: true }
      )
     
      resolve(localbody);
    } catch (err) {
      console.log(err);
      reject({
        message: err.message,
      });
    }
  });
};

// getcustomertypeListwithnames = (req) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       let customer = await models.Customer.find({
//           cust_status:0,
//       })
//         .lean()
//         .populate("cust_type", "customer_type_name createdAt")
//       //   .populate("company", "_id name")
//       //   .populate("branch", "_id name");

//       // users = users.map((user) => {
//       //   if (user.privilage) {
//       //     user.privilage = user.privilage.name;
//       //   }
//       //   if (user.company) {
//       //     user.company = user.company.name;
//       //   }
//       //   if (user.branch) {
//       //     user.branch = user.branch.name;
//       //   }
//       //   return user;
//       // });

//       resolve(customer);
//     } catch (err) {
//       console.log(err);
//       reject({
//         message: err.message,
//       });
//     }
//   });
// };


module.exports = {
    createLocalbody,
    getLocalbodiesList,
    getLocalbodiesListOptions,
    getLocalbodyData,
    updateLocalbody,
    deleteLocalbody,
    // getcustomertypeListwithnames

};
