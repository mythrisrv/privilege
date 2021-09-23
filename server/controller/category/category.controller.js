let models = require("../../model/");
const multer = require('multer');
var randomize = require('randomatic');
const path = require('path');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "categoryuploads");
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


var uploadMultiple = upload.fields([{ name: 'category_icon_svg', maxCount: 1 }, { name: 'web_banner_image', maxCount: 1 },{ name: 'app_banner_image', maxCount: 1 },])
  
createCategory = async(req,res) => {
   console.log(req.files, "svg")
    try {
        await uploadMultiple(req, res);
        console.log(req.files);
      }catch (error) {
        console.log(error);
      }
  return new Promise(async (resolve, reject) => {
    try {
      let category = new models.Category(req.body);
      let numberOfCategories = await models.Category.countDocuments();
      category.categoryId = numberOfCategories + 1;
      category.ip = req.ip,
    //category.category_icon_svg = req.files.category_icon_svg[0].filename,
      // category.web_banner_image = req.files.web_banner_image[0].filename,
      // category.app_banner_image = req.files.app_banner_image[0].filename,
      category = await category.save();
      resolve(category);
    } catch (err) {
      console.log(err);
      reject({
        message: err.message,
      });
    }
  });
};
getCategoriesListOptions = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let category = await models.Category.find({
        isListed: true,
      }).select("_id categoryname_en");
      resolve(category);
    } catch (err) {
      console.log(err);
      reject({
        message: err.message,
      });
    }
  });
};

getCategoriesList = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let category = await models.Category.find({
        isListed: true,

      });
      console.log(category);
      resolve(category);
    } catch (err) {
      console.log(err);
      reject({
        message: err.message,
      });
    }
  });
};

getCategoryData = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let category = await models.Category.findOne({
        _id:req.params.categoryId,
      });
      resolve(category);
    } catch (err) {
      console.log(err);
      reject({
        message: err.message,
      });
    }
  });
};

updateCategory = async(req,res) => {
    try {
        await uploadMultiple(req, res);
        console.log(req.files);
      }catch (error) {
        console.log(error);
      }
  return new Promise(async (resolve, reject) => {
    try {
      let category = await models.Category.findByIdAndUpdate(
        req.params.categoryId,
        req.body,
      
        {
          new: true,
          
        },
        
      );
      resolve(category);
      console.log(category)
    } catch (err) {
      console.log(err);
      reject({
        message: err.message,
      });
    }
  });
};

deleteCategory = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let category = await models.Category.findByIdAndUpdate(
        req.params.categoryId,
    
        {isListed:false , status:0},
        { new: true },
        
        
      );
      resolve(category);
    } catch (err) {
      console.log(err);
      reject({
        message: err.message,
      });
    }
  });
};






module.exports = {
  createCategory,
  getCategoriesList,
  getCategoryData,
  updateCategory,
  deleteCategory,
  getCategoriesListOptions,
  
};