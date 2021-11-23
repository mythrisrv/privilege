let models = require("../model");
let moment = require("moment");

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
                {
                    $project:
                    {
                        date:"$tariff_assign_date",
                        time:"$tariff_assign_time",
                        customerId:{ $arrayElemAt: ['$cust_detailes.cust_reg_no', 0] },
                        cust_name:{ $arrayElemAt: ['$cust_detailes.cust_name', 0] },
                        package:{ $arrayElemAt: ['$package_detailes.package_name', 0] },
                        validity:{ $arrayElemAt: ['$package_detailes.package_validity', 0] },
                       basicfee:{ $arrayElemAt: ['$package_detailes.package_basic_fee', 0] },
                        status:"$tariff_assign_active_status",
                        staff:"$tariff_assign_addedby",
                       
                        visitperMonth:{ $arrayElemAt: ['$package_detailes.package_visit_month', 0] },
                        regFee:{ $arrayElemAt: ['$package_detailes.package_reg_fee', 0] },
                        freebags:{ $arrayElemAt: ['$package_detailes.package_bags', 0] },


                    }
                }


            ])
           
            resolve(tariff)
          } catch (err) {
            console.log(err);
            reject({
              message: err.message,
            });
          }
        });
      

}

module.exports={
    getTariffDetailes

}