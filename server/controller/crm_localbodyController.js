let models = require("../model");
let moment = require("moment");
const { populate } = require("../model/User");

createLocalbody = (req) => {
  
    var ip = req.ip;
    const format2 = "DD-MM-YYYY"
    var date2 = new Date();
    date = moment(date2).format(format2);
    time = moment(date2).format("HH:mm");

  return new Promise(async (resolve, reject) => {
    try {
    
      let localbody = new models.LocalbodyName( 
        { 
          localbody_ip:ip,
          localbody_status:0,
          localbody_time:time,
        local_body_id:req.body.localbodytype._id,
           localbody_name:req.body.localbody_name,
           short_code:req.body.short_code,
           localbody_date:date,
           localbody_addedby:req.user._id,
           localbody_company:req.body.company._id,
           dist_id:req.body.district._id,

         }
        
       );
      
        
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
       }).populate("localbody_company","company_name ")
      .populate("localbody_addedby","username ")
      .populate("dist_id","district_name ")
      .populate("local_body_id","localbody_type_name ")
       .sort({_id:-1})
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
      if(req.query.id==="undefined")
      {
        let localbodies = await models.LocalbodyName.find({
          localbody_status:0,
        }).select("localbody_name");
        console.log(localbodies);
        resolve(localbodies);
     
    }else
    {
      let localbodies = await models.LocalbodyName.find({
        $and:[ {localbody_status:0},{dist_id:req.query.id}]
       }).select("localbody_name");
       console.log(localbodies);
       resolve(localbodies);
     
    }
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
        _id:req.params.localbodyId
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
    console.log(req.body)
    try {
     
 req.body.updatedAt=Date.now()
 req.body.localbody_updatedby=req.user._id

      let localbody = await models.LocalbodyName.findByIdAndUpdate(
         req.params.localbody_Id,
        req.body,
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
getLocalbodyTypes = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let localbodyType = await models.Localbody.find({
        localbody_status: "0",
      })
      
      resolve(localbodyType);
    } catch (err) {
      console.log(err);
      reject({
        message: err.message,
      });
    }
  });
};

getTypesLocalbodies = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      if(req.query.id==="undefined")
      {
        let localbodies = await models.LocalbodyName.find({
          localbody_status:0,
        }).select("localbody_name");
        console.log(localbodies);
        resolve(localbodies);
     
    }else
    {
      let localbodies = await models.LocalbodyName.find({
        $and:[ {localbody_status:0},{local_body_id:req.query.id}]
       }).select("localbody_name");
       console.log(localbodies);
       resolve(localbodies);
     
    }
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
    getLocalbodyTypes,
    getTypesLocalbodies
    // getcustomertypeListwithnames

};
