let models = require("../model");
let moment = require("moment");

(getTariffList = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let tariffList = await models.Thariff.find({
        tariff_status: 0,
      })
        .populate("package_billing_id", "waste_items_name")
        .populate("localbody_name", "localbody_name")
        .populate("localbody_type", "localbody_type_name")
        .populate("cust_type", "customer_type_name")
        .populate("tariff_addedby", "username");

      resolve(tariffList);
    } catch (err) {
      console.log(err);
      reject({
        message: err.message,
      });
    }
  });
}),
  (createTariff = (req) => {
    var ip = req.ip;
    const format2 = "DD-MM-YYYY";
    var date2 = new Date();
    date = moment(date2).format(format2);
    time = moment(date2).format("HH:mm ");
    return new Promise(async (resolve, reject) => {
      try {
        let package = new models.Thariff({
          tariff_ip: ip,
          tariff_status: 0,
          tariff_date: date,
          tariff_time: time,

          localbody_name: req.body.localbodyname._id,
          localbody_type: req.body.localbody._id,
          package_name: req.body.package_name,
          cust_type: req.body.categoryname._id,
          package_reg_fee: req.body.package_reg_fee,
          package_basic_fee: req.body.package_basic_fee,
          package_validity: req.body.package_validity,
          package_visit_month: req.body.package_visit_month,
          package_billing_id: req.body.wasteItems,
          package_bags: req.body.freeBag,
          tariff_addedby:req.user._id,
        });
        let numberOfpackages = await models.Thariff.countDocuments();
        package.tariff_id = numberOfpackages + 1;
        package = await package.save();
        resolve(package);
      } catch (err) {
        console.log(err);
        reject({
          message: err.message,
        });
      }
    });
  });

updatePackage = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(req.body);
      let tariff = await models.Thariff.findByIdAndUpdate(
        req.params.tariff_Id,
        req.body,
        {
          new: true,
        }
      );
      resolve(tariff);
    } catch (err) {
      console.log(err);
      reject({
        message: err.message,
      });
    }
  });
};

deletePackage = (req) => {
    return new Promise(async (resolve, reject) => {
      
      try {
        let tariff = await models.Thariff.findByIdAndUpdate(
          req.params.tariff_Id,
          { tariff_status:1 },
          { new: true }
        )
       
        resolve(tariff);
      } catch (err) {
        console.log(err);
        reject({
          message: err.message,
        });
      }
    });
  };

  updateStatus= (req) => {
    console.log(req.params)
     return new Promise(async (resolve, reject) => {
      
      try {
        let data={};
        if(req.body.package_active_status===0){
       data={
            package_active_status:1
          }
         }
         
          else{
            data={
              package_active_status:0
            }
          }
        
        let tariff= await models.Thariff.findByIdAndUpdate(
          req.params.package_id,
          data,
          {new:true}
        
        
        )
        resolve(tariff)
  
      }catch (err) {
        console.log(err);
        reject({
          message: err.message,
        });
      }
    
  })
  }


module.exports = {
  getTariffList,
  createTariff,
  updatePackage,
  deletePackage,
  updateStatus
};
