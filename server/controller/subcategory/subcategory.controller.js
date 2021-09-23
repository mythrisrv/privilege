let models = require("../../model/");
const multer = require('multer');
var randomize = require('randomatic');
const path = require('path');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "subcategoryuploads");
  },

filename: function (req, file, cb) {
        cb(null, randomize('a0', 9) + path.extname(file.originalname));
      },
});


var upload = multer({storage : storage, limits: {
  fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
  if (!file.originalname.match(/\.(png|jpg|jpeg|svg)$/)){
  cb(new Error('Please upload an image.'))
  }
  cb(undefined, true)
  }
});


var uploadMultiple = upload.fields([{ name: 'sub_image_name', maxCount: 1 }])
  
createsubCategory = async(req,res) => {
   
    try {
        await uploadMultiple(req, res);
        console.log(req.files);
      }catch (error) {
        console.log(error);
      }
  return new Promise(async (resolve, reject) => {
    try {
      let subcategory = new models.subCategory(req.body);
      let numberOfsubCategories = await models.subCategory.countDocuments();
      subcategory.subcategoryId = numberOfsubCategories + 1;
      subcategory.ip = req.ip,
      // subcategory.sub_image_name = req.files.sub_image_name[0].filename,
     
      subcategory = await subcategory.save();
      resolve(subcategory);
    } catch (err) {
      console.log(err);
      reject({
        message: err.message,
      });
    }
  });
};
getsubCategoriesListOptions = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let subcategory = await models.subCategory.find({
        isListed: true,
      }).select("_id subcategory_name_english");
      resolve(subcategory);
    } catch (err) {
      console.log(err);
      reject({
        message: err.message,
      });
    }
  });
};

getsubCategoriesList = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let subcategory = await models.subCategory.find({
        isListed: true,
      });

      

      
      resolve(subcategory);
    } catch (err) {
      console.log(err);
      reject({
        message: err.message,
      });
    }
  });
};

getsubCategoryData = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let subcategory = await models.subCategory.findOne({
        _id:req.params.subcategoryId,
      });
      resolve(subcategory);
    } catch (err) {
      console.log(err);
      reject({
        message: err.message,
      });
    }
  });
};

updatesubCategory = async(req,res) => {
    try {
        await uploadMultiple(req, res);
        console.log(req.files);
      }catch (error) {
        console.log(error);
      }
  return new Promise(async (resolve, reject) => {
    try {
      let subcategory = await models.subCategory.findByIdAndUpdate(
        req.params.subcategoryId,
        req.body,
        {
          new: true,
          
        },
        
      );
      resolve(subcategory);
    } catch (err) {
      console.log(err);
      reject({
        message: err.message,
      });
    }
  });
};

deletesubCategory = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let subcategory = await models.subCategory.findByIdAndUpdate(
        req.params.subcategoryId,
    
        {isListed:false , status:0},
        { new: true },
        
        
      );
      resolve(subcategory);
    } catch (err) {
      console.log(err);
      reject({
        message: err.message,
      });
    }
  });
};

module.exports = {
  createsubCategory,
  getsubCategoriesList,
  getsubCategoryData,
  updatesubCategory,
  deletesubCategory,
  getsubCategoriesListOptions,
  
};