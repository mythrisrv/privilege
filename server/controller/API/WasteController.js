let models = require("../../model");
 /*****************************/
  /* List waste items
  /*****************************/
  WasteItemsList = (req) => {
    return new Promise(async (resolve, reject) => {
      try {
        customer_id= req.body.customer_id;
        qr_code = req.body.qr_code;
        console.log(customer_id);
        let waste = await models.WasteItem.aggregate([
           {
            $match: {'waste_items_status':0},
           },
                {
                        $lookup:
                        {
                          from: "tbl_waste_cat",
                          localField: "waste_items_type",
                          foreignField: "_id",
                          as: "type_details" 
                        }
                },
                {
                    $lookup:
                    {
                      from: "tbl_waste_category",
                      localField: "waste_item_cat",
                      foreignField: "_id",
                      as: "category_details" 
                    }
            },
            {
             $project: {
                id:'$_id',
                name: "$waste_items_name",
                weight:"$waste_items_kg",
                bags:"$waste_items_bag",
                amount:"$waste_items_amount",
                minimum_bag_count:"$waste_items_bag",
                waste_type_name:{ $arrayElemAt: ['$type_details.waste_cat_name', 0] },
                waste_category_name:{ $arrayElemAt:['$category_details.waste_category_name', 0]}
                }
            }
    ])
//if(waste.length>0){
//   let package = await models.TariffAssign.find({'tariff_assign_active_status':0,'tariff_assign_customer_id':customer_id}).populate(
//      {
//       model: 'Customer',
//       path: 'customer',
//       match: { 'cust_qr_code':qr_code},
//       select:'_id,cust_id'
//      })
//      console.log(package);
//     //   match: {'cust_qr_code': qr_code,'_id':customer_id}},
//     //  "Customer", "_id-cust_id")
//     //   console.log(package);
// }

    if(waste.length>0){
            let package = await models.TariffAssign.aggregate([
                {$match:
                       {'tariff_assign_status':0},
            
                      },
                     {
                             $lookup:
                             {
                               from: "tbl_customer",
                               localField: "tariff_assign_customer_id",
                               foreignField: "_id",
                               as: "details" 
                             }
                     },
                    
                 {
                  $project: {
                     tariff_assign_pack_id:'$tariff_assign_pack_id',
                     cust_name: { $arrayElemAt: ['$details.cust_name',0] },
                     cust_address: { $arrayElemAt: ['$details.cust_address',0] },
                     cust_address1: { $arrayElemAt: ['$details.cust_address',0] },
                     cust_house_num: { $arrayElemAt: ['$details.cust_address',0] },
                     cust_address: { $arrayElemAt: ['$details.cust_address',0] },
                     cust_address: { $arrayElemAt: ['$details.cust_address',0] },
                     cust_address: { $arrayElemAt: ['$details.cust_address',0] },
                     cust_address: { $arrayElemAt: ['$details.cust_address',0] },
                     //qr_code:{ $arrayElemAt: ['$details.cust_qr_code', 0] },
                     }
                 }
               
         ]).then((result)=>{
           console.log(result);
          // if(customer_id!=''){
          //   result.forEach()
          // }
         })
        }
       
    // if(customer_id!=''){

    // }
    
        resolve(waste);
      } catch (err) {
        console.log(err);
        reject({
          message: err.message,
        });
      }
    });
  };
  module.exports = {
    WasteItemsList,
  };