let models = require("../model");
let moment = require("moment");

WasteItemsList = (req) => {
    return new Promise(async (resolve, reject) => {
      try {
        let wasteItems = await models.WasteItem.find({
          waste_items_status: 0,
        }).populate("waste_items_type","waste_cat_name -_id")
          .populate("waste_item_cat","waste_category_name -_id")
          .populate("waste_item_addedby","username -_id")
        resolve(wasteItems);
      } catch (err) {
        console.log(err);
        reject({
          message: err.message,
        });
      }
    });
  };
  WasteTypesList = (req) => {
    return new Promise(async (resolve, reject) => {
      try {
        let wasteTypes = await models.WasteType.find({
          waste_cat_status: 0,
        }).select("waste_cat_name ")
        resolve(wasteTypes);
      } catch (err) {
        console.log(err);
        reject({
          message: err.message,
        });
      }
    });
  };
  WasteCategoryList = (req) => {
    return new Promise(async (resolve, reject) => {
      try {
        let wasteTypes = await models.WasteCategory.find({
          waste_category_status: 0,
        }).select("waste_category_name ")
        resolve(wasteTypes);
      } catch (err) {
        console.log(err);
        reject({
          message: err.message,
        });
      }
    });
  };

  createWasteItem = (req) => {
    
    var ip = req.ip;
    const format2 = "YYYY-MM-DD"
    var date2 = new Date();
    date = moment(date2).format(format2);
    time = moment(date2).format("HH:mm A");

  return new Promise(async (resolve, reject) => {
    try {
      console.log(req.body);
      console.log(req.file);
      console.log(req.user)

      let wasteItem= new models.WasteItem( 
        { waste_items_ip:ip,
         waste_items_name:req.body.name,
       waste_items_date:date,
         waste_items_status:0,
         waste_items_time:time,
         waste_items_bag:req.body.bags,
         waste_items_amount:req.body.amount,
         waste_items_weight:req.body.weight,
         waste_item_cat:req.body.category,
         waste_items_type:req.body.Type,
         waste_item_addedby:req.user._id


         }
        
       );
       wasteItem.waste_items_image.push({
       img:req.file.filename
       })
      
      
      


      
      wasteItem.markModified('waste_items_image');
       wasteItem= await wasteItem.save();
      resolve(wasteItem);
    } catch (err) {
      console.log(err);
      reject({
      message: err.message,
      });
    }
  });
};
deleteWasteItem= (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let wasteItem = await models.WasteItem.findByIdAndUpdate(
        req.params.wasteItem_Id,
        { waste_items_status:1 },
        { new: true }
      )
     
      resolve(wasteItem);
    } catch (err) {
      console.log(err);
      reject({
        message: err.message,
      });
    }
  });
};

updateWasteItem = (req) => {
  return new Promise(async (resolve, reject) => {
      console.log(req.body)
      console.log(req.file)
  /*  try {
        let =await models.LocalbodyName.findOne({
            localbody_name:req.body.localbody_name
        })

  let data={
      ward_name:req.body.ward_name,
      ward_no:req.body.ward_no,
      localbody_name_id:localbody._id,
      ward_updatedby:req.user._id,
      updatedAt:Date.now(),

  }
       
      let ward = await models.Ward.findByIdAndUpdate(
        req.params.ward_Id,
        data,
        {
          new: true,
        }
      );
     console.log(ward)
      resolve(ward);
    } catch (err) {
      console.log(err);
      reject({
        message: err.message,
      });
    }*/
  });
};

  module.exports = {
      WasteItemsList,
      WasteTypesList,
      WasteCategoryList,
      createWasteItem,
      deleteWasteItem,

  }
