let models = require("../model");
let moment = require("moment");


getInvoiceList = (req) => {
    return new Promise(async (resolve, reject) => {
      try {
        let invoice = await models.Invoice.find({
          invoice_status: 0,
        }).select("invoice_customer_name invoice_customer_id invoice_company invoice_district invoice_total_amt invoice_group_id")
        .populate({
            path:"invoice_group_id",
            populate:{
                path:"group_localbody_type_id"
            }
        });
        
        

  
         resolve(invoice);
      } catch (err) {
        console.log(err);
        reject({
          message: err.message,
        });
      }
    });
  };

  module.exports={
      getInvoiceList
  }