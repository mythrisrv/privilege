let models = require("../model");
let moment = require("moment");

getInvoiceList = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let invoice = await models.Invoice.aggregate([
        {
          $match: { invoice_status: "0" },
        },
        {
          $group:{
            _id:"$invoice_customer_id",
            total:{$sum:"$invoice_total_amt"},
           
          }
        },

        {
          $lookup: {
            from: "tbl_receipts",
            localField: "_id",
            foreignField: "receipt_cust_id",
            as: "receipts",
          },
        },

     
  
       {
          $lookup: {
            from: "tbl_customer",
            localField: "_id",
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
            totalAmt: "$total",
           
           custName: "$customer.cust_name",
           customerId: "$customer.cust_reg_no",
            paidAmount: { $sum: "$receipts.receipt_amount" },
            localbody: {
              $arrayElemAt: ["$customer.localbody.localbody_name", 0],
            },
            customerward: { $arrayElemAt: ["$customer.ward.ward_name", 0] },
            customergroup: { $arrayElemAt: ["$customer.group.group_name", 0] },
            district: { $arrayElemAt: ["$customer.district.district_name", 0] },
            Due: {
              $subtract: ["$total", {$sum:"$receipts.receipt_amount"}],
            },
          },
        },
      ]);
      resolve(invoice);
    } catch (err) {
      console.log(err);
      reject({
        message: err.message,
      });
    }
  });
};

getInvoice=(req)=>{
  return new Promise (async(resolve,reject)=>{
    try{
      let invoice=await models.Invoice.aggregate([
        {
          $match: { invoice_status: "0" },
        },
        {
          $lookup: {
            from: "tbl_receipts",
            localField: "invoice_customer_id",
            foreignField: "receipt_cust_id",
            pipeline: [
              { $match: {
                $expr: { $eq: ["$schemaBId", "$$schemaBId"] },
                
              }}
            ],
            as: "receipts",
          },
        },

      ])
      resolve(invoice)

    }catch(err){
     
    }

  })
}

module.exports = {
  getInvoiceList,
  getInvoice
};
