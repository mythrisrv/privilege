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


  module.exports = {
      WasteItemsList,
      WasteTypesList,
      WasteCategoryList,

  }
