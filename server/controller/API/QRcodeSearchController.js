let models = require("../../model");

getUserData = (req) => {
  var  keyword= req.query.keyword
  console.log(keyword);
  //console.log(cust_qr_code);
    return new Promise(async (resolve, reject) => {
      try {
        // let group = await models.Customer.aggregate([
        //   {
        //     $lookup:
        //     {
        //       from: "tbl_group",
        //       localField: "cust_group_id",
        //       foreignField: "_id",
        //       as: "group_details" 
        //     }
        //   },
        //   {
        //     $project: {
        //       customerid:'$_id',
        //        group_name: "$localbody_details",
        //       //group_name: { $arrayElemAt: ['$group_details.group_name', 0] },
        //       // name: "$localbody_details"
  
        //     }
        //   }
        // ])
        // console.log('group',group);
        let user = await models.Customer.find(
          {"$or":[
             {cust_name: { $regex:new RegExp(keyword,"i")}},
             {cust_qr_code: { $regex:keyword }},
             {cust_reg_no: { $regex:new RegExp(keyword,"i")}},
             {cust_phone: { $regex:keyword }},
             {cust_house_num:  { $regex:new RegExp(keyword,"i")}},
             
            ]
       }
        
        //  [ {$match:
        //   {
        //     $or: [
        //       {'cust_qr_code': keyword},
        //       {'cust_phone':keyword}, 
        //       {'cust_reg_no':keyword},
        //       {'cust_name':keyword},
        //       {'cust_house_no':keyword},
        //       {'ward':keyword},

        //      // {'ExtraFields.fieldID': ObjectId("5535627631efa0843554b0ea")}
        //       ]
        //   }
        //  }]
      );
      
        resolve(user);
      } catch (err) {
        console.log(err);
        reject({
          message: err.message,
        });
      }
    });
  };
  module.exports = {
    getUserData,
  };