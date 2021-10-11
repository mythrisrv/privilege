let models = require("../../model");
let moment = require("moment");

createCustomer = (req) => {
    var ip = req.ip;
    const format2 = "YYYY-MM-DD"
    var date2 = new Date();
   date = moment(date2).format(format2);
   time = moment(date2).format("hh:mm A");
     return new Promise(async (resolve, reject) => {
       try {
      
        let Customer = new models.Customer( 
          { cust_status:0,
            cust_ip:ip,
            cust_status:0,
            cust_addedby:req.body.cust_addedby,
            cust_updatedby:req.body.cust_updatedby,
            cust_date:date,
            cust_time:time,
            cust_name:req.body.cust_name,
            cust_address:req.body.cust_address,
            cust_address1:req.body.cust_address1,
            district:req.body.district,
            localbody_type:req.body.localbody_type,
            localbody_name:req.body.localbody_name,
            cust_type:req.body.cust_type,
            cust_package_id:req.body.cust_package_id,
            cust_group_id:req.body.cust_group_id,
            ward:req.body.ward,
            cust_phone:req.body.cust_phone,
            cust_landline_no:req.body.cust_landline_no,
            cust_whatspp_no:req.body.cust_whatspp_no,
            cust_email:req.body.cust_email,
            cust_no_members:req.body.cust_no_members,
            cust_qr_code:req.body.cust_qr_code,
            cust_serial_no:req.body.cust_serial_no,
            cust_designation:req.body.cust_designation,
            cust_latitude:req.body.cust_latitude,
            cust_longitude:req.body.cust_longitude,
            cust_company:req.body.cust_company,
          },
          );
        let numberOfcustomers = await models.Customer.countDocuments();
        let localbodyname = await models.LocalbodyName.find({
            _id:req.body.localbody_name,
          });
          let companyname = await models.Company.find({
            _id:req.body.cust_company,
             });
             console.log(req.body.cust_company);
          console.log('companyname',companyname);
          localbodyname.forEach(data => {
            var localbodyName = data["short_code"];
            console.log("localbodyName",localbodyName);
            Customer.customer_id = numberOfcustomers + 1;
            Customer =  Customer.save();
            console.log(Customer)
            resolve(Customer);
      })
         } catch (err) {
        console.log(err);
        reject({
          message: err.message,
        });
       }
     });
  };

module.exports = {
    createCustomer
  };
  