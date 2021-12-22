let models = require("../model");
let moment = require("moment");

getReceiptList = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let receipt = await models.Receipt.aggregate([
        {
          $match: { receipt_status:0 },
        },
        {
            $lookup: {
              from: "users",
              localField: "receipt_addedby",
              foreignField: "_id",
              as: "addedby",
            },
          },

        {
          $lookup: {
            from: "tbl_customer",
            localField: "receipt_cust_id",
            foreignField: "_id",
            as: "customer",
          },
        },

     
  
      
        { $unwind: { path: "$customer"  }},
        {
          $lookup: {
            from: "tbl_local_body_name",
            localField: "customer.localbody_name",
            foreignField: "_id",
            as: "customer.localbody",
          },
        },
        {
          $lookup: {
            from: "tbl_ward",
            localField: "customer.ward",
            foreignField: "_id",
            as: "customer.ward",
          },
        },
        {
          $lookup: {
            from: "tbl_group",
            localField: "customer.cust_group_id",
            foreignField: "_id",
            as: "customer.group",
          },
        },
        {
          $lookup: {
            from: "districts",
            localField: "customer.district",
            foreignField: "_id",
            as: "customer.district",
          },
        },

        {
          $project: {
           
           receiptNo:"$receipt_no",
           Amount:"$receipt_amount",
           dueAmount:"$receipt_due_amt",
           date:"$receipt_date",
            time:"$receipt_time",
           custName: "$customer.cust_name",
           customerId: "$customer.cust_reg_no",
           staff: {
            $arrayElemAt: ["$addedby.username", 0],
          },
           
            localbody: {
              $arrayElemAt: ["$customer.localbody.localbody_name", 0],
            },
            customerward: { $arrayElemAt: ["$customer.ward.ward_name", 0] },
            customergroup: { $arrayElemAt: ["$customer.group.group_name", 0] },
            district: { $arrayElemAt: ["$customer.district.district_name", 0] },
            
          },
        },
      ]);
      resolve(receipt);
    } catch (err) {
      console.log(err);
      reject({
        message: err.message,
      });
    }
  });
};

module.exports = {
  getReceiptList,
};
