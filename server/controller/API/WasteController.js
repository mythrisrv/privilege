let models = require("../../model");
let moment = require("moment");
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
let packages=[];
let customers_id;
let package_id;
let visit;
let bags;
let free_bags=[];
let items ="";
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
                     cust_address1: { $arrayElemAt: ['$details.cust_address1',0] },
                     cust_house_num: { $arrayElemAt: ['$details.cust_house_num',0] },
                     cust_package_id: { $arrayElemAt: ['$details.cust_package_id',0] },
                     cust_company: { $arrayElemAt: ['$details.cust_company',0] },
                     cust_designation: { $arrayElemAt: ['$details.cust_designation',0] },
                     cust_phone: { $arrayElemAt: ['$details.cust_phone',0] },
                     qr_code:{ $arrayElemAt: ['$details.cust_qr_code', 0] },
                     }
                 }
               
         ])
       
           package.forEach(data => {
            var cust_id=data._id;
            var qrcode = data.qr_code;
           if(customer_id!=''){
             if(customer_id==cust_id){
                packages = data; 
               }
            }
            if(qr_code!=''){
              if(qr_code==qrcode){
                packages = data; 
               }
            }
           })  
        }
        
     if(packages!=''){
       customers_id=packages._id;
       package_id = packages.cust_package_id
     }
     console.log("customers_id",customers_id);
     let thariffDetails = await models.Thariff.findOne({"package_active_status":0,"tariff_status":0,"_id":package_id})
    if(thariffDetails!=''){
      visit = thariffDetails.package_visit_month;
      bags = thariffDetails.package_bags;
      free_bags =thariffDetails.package_bags;
     items = thariffDetails.package_billing_id
    }
let date = new Date();
    let currentMonth = date.getMonth()+1;
    let cureentyear = date.getFullYear();
   let wasteCollect = await models.WasteCollect.aggregate([
    {
      $project: {
        waste_clt_cust_id:'$waste_clt_cust_id',
        month:{ "$month": "$waste_clt_date" },
        year:{ "$year": "$waste_clt_date" },
     }
     
    },
    {$match:{'month':currentMonth,"year":cureentyear}}
   ])
   let numberOfVisit = wasteCollect.length;
   let total_bags_count=0;
     let extra_amount=0;
     let total_weight_count=0;



     waste.forEach(data => {
      wasteId = data._id;
    })
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