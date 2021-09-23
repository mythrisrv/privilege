let models = require("../../model/");
const multer = require('multer');
var randomize = require('randomatic');
const path = require('path');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "thirdcategoryuploads");
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


var uploadMultiple = upload.fields([{ name: 'third_cat_image', maxCount: 1 }])
  
createthirdCategory = async(req,res) => {
   
    try {
        await uploadMultiple(req, res);
        console.log(req.files);
      }catch (error) {
        console.log(error);
      }
  return new Promise(async (resolve, reject) => {
    try {
      let thirdcategory = new models.thirdCategory(req.body);
      let numberOfthirdCategories = await models.thirdCategory.countDocuments();
      thirdcategory.thirdcategoryId = numberOfthirdCategories + 1;
      thirdcategory.ip = req.ip,
      //thirdcategory.third_cat_image = req.files.third_cat_image[0].filename,
     
      thirdcategory = await thirdcategory.save();
      resolve(thirdcategory);
    } catch (err) {
      console.log(err);
      reject({
        message: err.message,
      });
    }
  });
};

getthirdCategoriesList = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let thirdcategory = await models.thirdCategory.find({
        isListed: true,
      });
     

      console.log(thirdcategory);
      resolve(thirdcategory);
    } catch (err) {
      console.log(err);
      reject({
        message: err.message,
      });
    }
  });
};

getthirdCategoryData = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let thirdcategory = await models.thirdCategory.findOne({
        _id:req.params.thirdcategoryId,
      });
      resolve(thirdcategory);
    } catch (err) {
      console.log(err);
      reject({
        message: err.message,
      });
    }
  });
};

updatethirdCategory = async(req,res) => {
    try {
        await uploadMultiple(req, res);
        console.log(req.files);
      }catch (error) {
        console.log(error);
      }
  return new Promise(async (resolve, reject) => {
    try {
      let thirdcategory = await models.thirdCategory.findByIdAndUpdate(
        req.params.thirdcategoryId,
        req.body,
        {
          new: true,
          
        },
        
      );
      resolve(thirdcategory);
    } catch (err) {
      console.log(err);
      reject({
        message: err.message,
      });
    }
  });
};

deletethirdCategory = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let thirdcategory = await models.thirdCategory.findByIdAndUpdate(
        req.params.thirdcategoryId,
    
        {isListed:false , status:0},
        { new: true },
        
        
      );
      resolve(thirdcategory);
    } catch (err) {
      console.log(err);
      reject({
        message: err.message,
      });
    }
  });
};

module.exports = {
  createthirdCategory,
  getthirdCategoriesList,
  getthirdCategoryData,
  updatethirdCategory,
  deletethirdCategory,

  
};