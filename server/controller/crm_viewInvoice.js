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
          $group: {
            _id: "$invoice_customer_id",
            total: { $sum: "$invoice_total_amt" },
          },
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
        { $unwind: { path: "$customer" } },
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
              $subtract: ["$total", { $sum: "$receipts.receipt_amount" }],
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

getInvoice = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let invoice = await models.Invoice.aggregate([
        {
          $match: { invoice_status: "0" },
        },

       {
          $lookup: {
            from: "tbl_receipts",
            let: {customer:"$invoice_customer_id",
            start:"$invoice_bill_dur_from",
            end:"$invoice_bill_dur_to"

            },
            pipeline:[
              {
                $match:{
                 
                  $expr:{
                    $and:[
                      {
                        $eq:["$receipt_cust_id","$$customer"]
                      },
                      {
                      $gte:["$receipt_date",new Date("$$start")]
                  }, 
                  {
                    $lt:["$receipt_date",new Date("$$end")]
                }, 
               
                      
                    ]
                  }
                }
              }
            ],as:"receipts"
          }
        },


       /* {
          $match: {
            rec: {
              $gte: [
                "receipts.receipt_date",
                new Date("$invoice_date"),
              ],
              $lte: [
                "$receipts.receipt_date",
                new Date("$invoice_bill_dur_to"),
              ],
            },
          },
        },*/
      /* {
          $lookup: {
            from: "tbl_receipts",
            localField: "invoice_customer_id",
            foreignField: "receipt_cust_id",
            as: "receipts",
          },
        },
        { $unwind: { path: "$receipts" } },*/
        

        {
          $lookup: {
            from: "tbl_customer",
            localField: "invoice_customer_id",
            foreignField: "_id",
            as: "customer",
          },
        },
       
       
        {
          $lookup: {
            from: "tbl_ward",
            localField: "invoice_ward_id",
            foreignField: "_id",
            as: "ward",
          },
        },
        {
          $lookup: {
            from: "tbl_group",
            localField: "invoice_group_id",
            foreignField: "_id",
            as: "group",
          },
        },
        {
          $lookup: {
            from: "districts",
            localField: "invoice_district",
            foreignField: "_id",

            as: "district",
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "invoice_addedby",
            foreignField: "_id",
            as: "addedby",
          },
        },

        {
          $project: {
            custName:{ $arrayElemAt:[ "$customer.cust_name",0]},
           customerId:{ $arrayElemAt:[ "$customer.cust_reg_no",0]},
           receiptDate: "$receipts.receipt_date",
          
            DueAmount:"$receipts.receipt_due_amt",
            start:"$invoice_bill_dur_from",
            end:"$invoice_bill_dur_to",
            invoiceNo:"$invoice_no",
            amount:"$invoice_total_amt",
            invoiceDate:"$invoice_date",

          
            ward: { $arrayElemAt: ["$ward.ward_name", 0] },
            group: { $arrayElemAt: ["$group.group_name", 0] },
            district: { $arrayElemAt: ["$district.district_name", 0] },
            staff: {
              $arrayElemAt: ["$addedby.username", 0],
            },
          },
        },
      ]);
/* let result=invoice.filter((item)=>{
   return (item.receiptDate>=item.start && item.receiptDate<=item.end)
 })*/

      resolve(invoice);
    } catch (err) {
      console.log(err);
      reject({
        message: err.message,
      });
    }
  });
};
module.exports = {
  getInvoiceList,
  getInvoice,
};
