let models = require("../../model");
 /*****************************/
  /* List waste items
  /*****************************/
  WasteItemsList = (req) => {
    return new Promise(async (resolve, reject) => {
      try {
        customer_id= req.body.customer_id;
        qr_code = req.body.qr_code;
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

    if(waste.length>0){
        if(customer_id!=''){
            let package = await models.Customer.aggregate([
                {$match:
                      {
                        $or: [
                          {'cust_qr_code': qr_code},
                          {'_id':customer_id},
                           ]
                      }
                    },
                     {
                             $lookup:
                             {
                               from: "tbl_tariff_assign",
                               localField: "_id",
                               foreignField: "tariff_assign_customer_id",
                               as: "details" 
                             }
                     },
                    
                 {
                  $project: {
                     id:'$_id',
                     package_details:'$details'
                     }
                 }
         ])
         console.log(package);
        }
    
    }else{
        console.log("errrrrrrrrr");
    }
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