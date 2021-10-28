let models = require("../model");
let moment = require("moment");

createLocalbody = (req) => {
    var ip = req.ip;
    const format2 = "YYYY-MM-DD"
    var date2 = new Date();
    date = moment(date2).format(format2);
    time = moment(date2).format("hh:mm A");
 console.log(req.body);
  return new Promise(async (resolve, reject) => {
    try {
      //let  = new models.Customer(req.body);
      let localbody = new models.Localbody( 
        { 
          localbody_status:0,
          company_name:req.body.company_name,
          district_name:req.body.district_name,
          localbody_type:req.body.localbody_type,
           localbody_name:req.body.localbody_name,
           short_code:req.body.short_code
         }
       );
      let numberOflocalbodies = await models.Localbody.countDocuments();
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
      let localbody = await models.Localbody.find({
        localbody_status: 0,
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
      let localbodies = await models.Localbody.find({
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
      let localbody= await models.Localbody.findOne({
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
      console.log(req.params)
      let localbody = await models.Localbody.findByIdAndUpdate(
        req.params.localbody_Id,
        req.body,
        {
          new: true,
        }
      );
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
      let localbody = await models.Localbody.findByIdAndUpdate(
        req.params.localbody_Id,
        { localbody_status:1 },
        { new: true }
      );
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
