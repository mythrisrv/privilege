let models = require("../model");
let moment = require("moment");

createWard = (req) => {
  console.log(req.body)
    var ip = req.ip;
    const format2 = "DD-MM-YYYY"
    var date2 = new Date();
    date = moment(date2).format(format2);
    time = moment(date2).format("HH:mm A");
 console.log(req.user);
  return new Promise(async (resolve, reject) => {
    
    try {
      //let  = new models.Customer(req.body);
      let ward = new models.Ward( 
        { 
          ward_ip:ip,
          ward_status:0,
          ward_addedby:req.user._id,
          
          ward_date:date,
          ward_time:time,
          ward_name:req.body.ward_name,
          ward_no:req.body.wardno.name,
          localbody_name_id:req.body.localbody._id,
         // localbody_name:req.body.localbody_name,
          state_id:19,
          //dist_id:101,
          //localbody_type_id:req.body.localbody_id,
          //localbody_name_id:req.body.localbody_name,
         // ward_company:req.body.ward_company
        }
       );
       let localbody=await models.LocalbodyName.findOne({
        $and :[ {_id:req.body.localbody._id},{localbody_status:"0"}]
       })
      
       ward.dist_id=localbody.dist_id;
       ward.ward_company=localbody.localbody_company;
       ward.localbody_type_id=localbody.local_body_id;

      let numberOfWards = await models.Ward.countDocuments();
      ward.ward_id = numberOfWards + 1;
    
     
      ward = await ward.save()
    console.log(ward)
      resolve(ward);
    } catch (err) {
      console.log(err);
      reject({
      message: err.message,
      });
    }
  });
};

getWardsList = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let ward = await models.Ward.find({
        ward_status: 0,
      }).populate("localbody_name_id","localbody_name")
      .populate("ward_addedby","username ")
      .sort({createdAt:-1})
      
      resolve(ward);
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

getWardsListOptions = (req) => {
  console.log(req.params)
  return new Promise(async (resolve, reject) => {
    try {
      let wards = await models.Ward.find({
      $and:[  {localbody_name_id:req.params.localbodyId},{ward_status:0}]
      }).select("ward_name");
      resolve(wards);
    } catch (err) {
      console.log(err);
      reject({
        message: err.message,
      });
    }
  });
};

getWardData = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let ward= await models.Ward.findOne({
        _id: req.params.ward_id,
      });
      resolve(ward);
    } catch (err) {
      console.log(err);
      reject({
        message: err.message,
      });
    }
  });
};

updateWard = (req) => {
  console.log(req.body)
  return new Promise(async (resolve, reject) => {
    
      //console.log(req.body)
    try {
      let localbody=await models.LocalbodyName.findOne(
        {
         $and:[ {_id:req.body.localbody_name_id},{localbody_status:"0"}]
        }
      )
      if(localbody!=null){
      req.body.dist_id=localbody.dist_id;
      req.body.ward_company=localbody.localbody_company;
      req.body.localbody_type_id=localbody.local_body_id;
      }
       req.body.updatedAt=Date.now();
       req.body.ward_updatedby=req.user._id;
      let ward = await models.Ward.findByIdAndUpdate(
        req.params.ward_Id,
        req.body,
        {
          new: true,
        }
      );
     console.log(ward)
      resolve(ward);
    } catch (err) {
      console.log(err);
      reject({
        message: err.message,
      });
    }
  });
};

deleteWard = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let ward = await models.Ward.findByIdAndUpdate(
        req.params.ward_Id,
        { ward_status:1 },
        { new: true }
      );
      resolve(ward);
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
    createWard,
    getWardsList,
    getWardsListOptions,
    getWardData,
    updateWard,
    deleteWard,
    // getcustomertypeListwithnames

};
