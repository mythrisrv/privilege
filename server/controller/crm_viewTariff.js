let models = require("../model");
let moment = require("moment");

getTariffDetailes=(req)=>{
    
        return new Promise(async (resolve, reject) => {
          try {
            let tariff = await models.TariffAssign.find(
              {
                tariff_assign_status:0
              }).populate([{path:'tariff_assign_pack_id',populate:{path:"package_billing_id",select:"waste_items_name -_id"}},{path:"tariff_assign_addedby",select:"username -_id"},
              {path:"tariff_assign_customer_id",select:"cust_name cust_type localbody_type localbody_name district cust_group_id cust_reg_no cust_phone cust_house_num cust_address cust_address1 ward",
            populate:[{path:"district",select:'district_name -_id'},{path:"localbody_type",select:"localbody_type_name -_id"},
          {path:"localbody_name",select:'localbody_name -_id'},{path:"cust_group_id",select:"group_name -_id"},{path:"ward",select:"ward_name"},
          {path:"cust_type",select:"customer_type_name -_id" }] }])
             
          
            resolve(tariff)
          } catch (err) {
            console.log(err);
            reject({
              message: err.message,
            });
          }
        });
      

}
getPackageOptions = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let packages = await models.Thariff.find({
        tariff_status: 0,
      }).select("package_name");
      resolve(packages);
    } catch (err) {
      console.log(err);
      reject({
        message: err.message,
      });
    }
  });
};

updateTariffAssign = (req) => {
  console.log(req.params)
   return new Promise(async (resolve, reject) => {
    
    try {
      let data={};
      if(req.body.tariff_assign_active_status===0){
     data={
          tariff_assign_active_status:1
        }
       }
        else  if(req.body.tariff_assign_active_status===1){
 data={
   tariff_assign_active_status:2
 }
  }
        else{
          data={
            tariff_assign_active_status:0
          }
        }
      
      let tariff = await models.TariffAssign.findByIdAndUpdate(
        req.params.tariffId,
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
module.exports={
    getTariffDetailes,
    getPackageOptions,
    updateTariffAssign

}