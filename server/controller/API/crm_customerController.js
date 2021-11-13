let models = require("../../model");
let moment = require("moment");
const multer = require('multer');
createCustomer = async (req, res) => {
  var ip = req.ip;
  const format2 = "YYYY-MM-DD"
  var date2 = new Date();
  date = moment(date2).format(format2);
  time = moment(date2).format("HH:mm A");
  type= req.body.type;
  return new Promise(async (resolve, reject) => {
    try {
      let customer_data;
      let packages_id;
      let package_name;
      let package_reg_fee;
      let Customer = new models.Customer(
        {
          cust_status: 0,
          cust_ip: ip,
          cust_status: 0,
          cust_addedby: req.body.user_id,
          cust_updatedby: req.body.user_id,
          cust_date: date,
          cust_time: time,
          cust_name: req.body.cust_name,
          cust_address: req.body.cust_address,
          cust_address1: req.body.cust_address1,
          cust_house_num:req.body.cust_house_num,
          district: req.body.district,
          localbody_type: req.body.localbody_type,
          localbody_name: req.body.localbody_name,
          cust_type: req.body.cust_type,
          cust_package_id: req.body.cust_package_id,
          cust_group_id: req.body.cust_group_id,
          ward: req.body.ward,
          cust_phone: req.body.cust_phone,
          cust_image:req.body.cust_image,
          cust_landline_no: req.body.cust_landline_no,
          cust_whatspp_no: req.body.cust_whatspp_no,
          cust_email: req.body.cust_email,
          cust_no_members: req.body.cust_no_members,
          cust_qr_code: req.body.cust_qr_code,
          cust_serial_no: req.body.cust_serial_no,
          cust_designation: req.body.cust_designation,
          cust_latitude: req.body.cust_latitude,
          cust_longitude: req.body.cust_longitude,
          cust_company: req.body.cust_company,
          cust_verification_status:0,
          cust_verification_at:date2
          
        },
      );
      //resolve(Customer);
      let companyname = await models.Company.find({
        _id: req.body.cust_company,
      });
      let numberOfcustomers = await models.Customer.countDocuments();
      var customer_id = numberOfcustomers + 1;
      let localbodyname = await models.LocalbodyName.find({
        _id: req.body.localbody_name,
      });
     if(localbodyname.length>0){
      localbodyname.forEach(data => {
        var localbodyName = data["short_code"];
        if(companyname.length>0){
        companyname.forEach(data => {
          var company_shortcode = data["company_shortcode"];
          var cust_reg_number = company_shortcode + localbodyName + customer_id.toString().padStart(6, '0');
          Customer.cust_id = customer_id;
          Customer.cust_reg_no = cust_reg_number;
           Customer.save().then(async (result) => {
            customer_data = result;
            var package_id = customer_data.cust_package_id;
            var customer_id = customer_data._id;
            let packageDetails = await models.Thariff.find({
              _id: package_id,
            })
            if(packageDetails){
            packageDetails.forEach(async data => {
              var packages_id =  data["_id"];
              var package_name = data["package_name"]
              var package_reg_fee = data["package_reg_fee"];
              var gst=0;
              var gst_amount=package_reg_fee*(gst/100);
              var invoice_total=package_reg_fee+gst_amount;
              let invoice = new models.Invoice(
                {
                  invoice_ip :ip,
                  invoice_status:0,
                  invoice_addedby:req.body.cust_addedby,
                  invoice_date:date,
                  invoice_time:time,
                  invoice_customer_name:req.body.cust_name,
                  invoice_cust_phone:req.body.cust_phone,
                  invoice_package_name:package_name,
                  invoice_customer_id:customer_id,
                  invoice_company:req.body.cust_company,
                  invoice_group_id:req.body.cust_group_id,
                  invoice_district:req.body.district,
                  invoice_package_id:package_id,
                  invoice_bill_dur_from:date,
                  invoice_bill_dur_to:date,
                  invoice_gst:gst,
                  invoice_gst_amt:gst_amount,
                  invoice_total_amt:invoice_total,
                  },);
                  let numberofInvoice = await models.Invoice.countDocuments();
                  var invoice_no = numberofInvoice+1;
                  invoice.invoice_no=invoice_no;
                  invoice.save().then(async (result) => {
                    let invoiceItem = new models.InvoiceItem(
                      {
                        invoice_item_ip:ip,
                        invoice_item_status:0,
                        invoice_item_addedby:req.body.cust_addedby,
                        invoice_no:result.invoice_no,
                        inovice_item_name:"Registration Fee",
                        invoice_item_price:0,
                        invoice_id:result._id,
                        invoice_item_quanty:1,
                        invoice_item_price:result.invoice_total,
                        invoice_item_price:result.invoice_total,
                     },);
                     let numberOfInvoiceItem = await models.InvoiceItem.countDocuments();
              var InvoiceItem = numberOfInvoiceItem+1;
              invoiceItem.invoice_item_id = InvoiceItem;
              invoiceItem.save();
                    })
                 
             })
            }else{
              reject({
                message: "unable to find package",
              });
            }
             let thariff = new models.TariffAssign(
              {
                tariff_assign_ip: req.ip,
                tariff_assign_status: 0,
                tariff_assign_addedby:req.body.cust_addedby,
                tariff_assign_updatedby:req.body.cust_updatedby,
                tariff_assign_date:date,
                tariff_assign_time:time,
                tariff_assign_company:req.body.cust_company,
                tariff_assign_customer_id:customer_id,
                tariff_assign_pack_id:package_id,
                tariff_assign_active_status:0,
                },);
              let numberOfThariff = await models.TariffAssign.countDocuments();
              var thariff_id = numberOfThariff+1;
              thariff.tariff_assign_id = thariff_id;
              var tariff_regnumber = "TF"+thariff_id.toString().padStart(5,'0');
              thariff.tariff_reg_number = tariff_regnumber;
              thariff.save();
            resolve(result);
           })
        })
      }else{
        reject({
          message: "unable to find company",
        });
      }
      })
    }else{
      reject({
        message: "unable to find localbody",
      });
    }
    } catch (err) {
      reject({
        message: err.message,
      });
    }
  });
};
// imageUpload = async (id,body) => {
//   console.log('imsageeeeeeeee');
//   return new Promise(async (resolve, reject) => {
//     try {
//   dp = await models.Customer.updateOne({_id:id},{
//    $set:{
//      cust_image:'customer'+'/'+''+id+'.jpeg'
//    }
//  })
//  resolve(dp);
// } catch (err) {
//   console.log(err);
//   reject({
//     message: err.message,
//   });
// }
// });
// };



// const customerImageStorage = multer.diskStorage({
//   destination: function (req, file, cb) {
//       cb(null, './public/uploads/customer-images');
//   },
//   filename: function (req, file, cb) {
//       cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname)
//   }
// });
// const fileFilter = (req, file, cb) => {
//   // reject file
//   if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png' || file.mimetype === 'image/svg') {
//       cb(null, true)
//   } else {
//       cb(null, false)
//       // return cb(new Error('Only images are allowed'))
//   }
// }
// const uploadCustomerImage = multer({
//   storage: customerImageStorage,
//   limits: {
//       fileSize: 1024 * 1024 * 5
//   },
//   fileFilter: fileFilter
// });
// const uploadCustomerSingleImage = (req, res, next) => {
//   try {       
//       if (req.file) {
//         console.log(req.file)
//           const file = req.file;
//           return res.json({
//               message: "File Uploaded Successfully",
//               status: "success",
//               file: req.file
//           }).status(201)
//       } else {
//           return res.json({
//               message: "File Uploaded Failed",
//               status: "failed",
//               file: req.file
//           }).status(400)
//       }
//   } catch (error) {      
//       res.status(400).send(error.message);
//   }

// }


/********************
 * profile view
 * ******************/
customerProfile = (req) => {
  let customer_id= req.params.id;
  return new Promise(async (resolve, reject) => {
  
    try {
      let customerProfile = await models.Customer.find({
        cust_status: 0,_id:customer_id
      });
      resolve(customerProfile);
    } catch (err) {
      console.log(err);
      reject({
        message: err.message,
      });
    }
  });
};
customerProfileNew = (req) => {
  let customer_id= req.params.id;
  return new Promise(async (resolve, reject) => {
  
    try {
      let customerProfile = await models.Customer.findOne({
        cust_status: 0,_id:customer_id
      })
      .populate('ward','ward_name')
      .populate('cust_group_id','group_name')
      .populate('cust_type','customer_type_name')
      .populate('district','district_name')
      .populate('localbody_type','localbody_type_name')
      .populate('localbody_name','localbody_name')
      .populate('cust_package_id','package_name package_reg_fee package_basic_fee')
      .select('cust_name cust_phone cust_landline_no cust_watsapp_no cust_image cust_verification_status cust_serial_no cust_designation cust_no_members cust_house_num cust_address cust_address1 cust_billing_type');
      resolve(customerProfile);
    } catch (err) {
      console.log(err);
      reject({
        message: err.message,
      });
    }
  });
};
/********************
 * profile update
 * ******************/
 updateCustomer = (req) => {
  
  return new Promise(async (resolve, reject) => {
    try {
      let customer = await models.Customer.findByIdAndUpdate(
        req.params.cust_id,
        req.body,
        {
          new: true,
        }
      );
      resolve(customer);
    } catch (err) {
      console.log(err);
      reject({
        message: err.message,
      });
    }
  });
};
/*****************************/
  /*customer type List
  /*****************************/
  CustomerList = (req) => {
    return new Promise(async (resolve, reject) => {
      try {
        let customers = await models.Customer.aggregate([
            {
              $lookup:
              {
                from: "tbl_ward",
                localField: "ward",
                foreignField: "_id",
                as: "ward_details" 
              }
            },
            {
              $project: {
                customer_id:'$_id',
                cust_name: "$cust_name",
                cust_phone:"$cust_phone",
                cust_house_num:"$cust_house_num",
                cust_image:"$cust_image",
                ward_name: { $arrayElemAt: ['$ward_details.ward_name', 0] },
               //ward_name: "$ward_details"
                
              }
            }
            ])

        resolve(customers);
      } catch (err) {
        console.log(err);
        reject({
          message: err.message,
        });
      }
    });
  };
  /*****************************/
  /*customer verifivation
  /*****************************/
  verifyCustomer = (req) => {
  
    return new Promise(async (resolve, reject) => {
      try {
        var date = new Date();
        console.log(date);
        let customer = await models.Customer.findByIdAndUpdate(
          req.params.cust_id,
          {
            cust_verification_status:1,
            cust_verification_at: date,
          }
        );
        console.log(customer);
        resolve(customer);
      } catch (err) {
        console.log(err);
        reject({
          message: err.message,
        });
      }
    });
  };
  getCustomersList=(req)=>{
    return new Promise(async(resolve,reject)=>{
      try{
        let customer=await models.Customer.find({
          cust_status:0,
        })
        .populate("localbody_name","localbody_name -_id")
        .populate("ward","ward_name -_id")
        .populate("cust_type","customer_type_name -_id")
        .populate("district","district_name -_id")
        .populate("cust_added_by","username -_id")
        resolve(customer);
      }catch(err){
        console.log(err);
        reject({
          message: err.message,
        });
  
      }
    })
  }
module.exports = {
  createCustomer,
 // imageUpload,
  customerProfile,
  updateCustomer,
  CustomerList,
  getCustomersList,
  customerProfileNew
  //uploadCustomerImage,
  //uploadCustomerSingleImage
};
