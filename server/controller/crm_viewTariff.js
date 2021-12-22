let models = require("../model");
let moment = require("moment");

/*getTariffDetailes=(req)=>{
    
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
      

}*/

getTariffDetailes=(req)=>{
    
  return new Promise(async (resolve, reject) => {
    try {
      let tariff = await models.TariffAssign.aggregate([
        {
              $match:{'tariff_assign_status':0},
          },
          {
              $lookup:
              {
                from:  "tbl_customer",
                localField:"tariff_assign_customer_id",
                foreignField:"_id",
                as:"cust_detailes"

              }
          },
          {
              $lookup:
              {
                  from:"tbl_tariff",
                  localField:"tariff_assign_pack_id",
                  foreignField:"_id",
                  as:"package_detailes"
              }
          },
          {$unwind:{path:"$package_detailes"}},
          {
            $lookup:
            {
                from:"tbl_local_body_name",
                localField:"package_detailes.localbody_name",
                foreignField:"_id",
                as:"package_detailes.localbody"
            }
        },
        {
          $lookup:
          {
              from:"tbl_customer_type",
              localField:"package_detailes.cust_type",
              foreignField:"_id",
              as:"package_detailes.custType"
          }
      },
      {
        $lookup:
        {
            from:"tbl_local_body",
            localField:"package_detailes.localbody_type",
            foreignField:"_id",
            as:"package_detailes.localType"
        }
    },
    {
      $lookup:
      {
          from:"tbl_waste_items",
          localField:"package_detailes.package_billing_id",
          foreignField:"_id",
          as:"package_detailes.Item"
      }
  },
        {
          $lookup:
          {
              from:"users",
              localField:"tariff_assign_addedby",
              foreignField:"_id",
              as:"staff"
          }
      },
          {
              $project:
              {
                  date:"$tariff_assign_date",
                  time:"$tariff_assign_time",
                  customerId:{ $arrayElemAt: ['$cust_detailes.cust_reg_no', 0] },
                  cust_name:{ $arrayElemAt: ['$cust_detailes.cust_name', 0] },
                  package:'$package_detailes.package_name',
                  validity:'$package_detailes.package_validity', 
                 basicfee: '$package_detailes.package_basic_fee',
                  status:"$tariff_assign_active_status",
                  staff:{ $arrayElemAt: ['$staff.username', 0] },
                 
                  visitperMonth:'$package_detailes.package_visit_month',
                  regFee:'$package_detailes.package_reg_fee',
                  freebags:'$package_detailes.package_bags',
                  custType:{ $arrayElemAt: ['$package_detailes.custType.customer_type_name',0]},
                  localbodyName:{ $arrayElemAt: ['$package_detailes.localbody.localbody_name', 0] },
                  localbodyType:{ $arrayElemAt: ['$package_detailes.localType.localbody_type_name', 0] },
                  itemName:'$package_detailes.Item.waste_items_name',

              }
          }


      ])
    
    
    
      resolve(tariff)
    }catch (err) {
      console.log(err);
      reject({
        message: err.message,
      });
    }
  })
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
  console.log(req.body)
   return new Promise(async (resolve, reject) => {
    
    try {
      let data={};
      if(req.body.status===0){
     data={
          tariff_assign_active_status:1
        }
       }
        else  if(req.body.status===1){
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