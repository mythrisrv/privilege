let models = require("../../model/");
const multer = require('multer');
var randomize = require('randomatic');
const path = require('path');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "productuploads");
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


var uploadMultiple = upload.fields([{ name: 'product_image_name', maxCount: 1 }, { name: 'product_image_subone', maxCount: 1 },{ name: 'product_image_subtwo', maxCount: 1 },{ name: 'product_image_subthree', maxCount: 1 },{ name: 'product_image_subfour', maxCount: 1 }])
  
createProduct = async(req,res) => {
   
    try {
        await uploadMultiple(req, res);
        console.log(req.files);
      }catch (error) {
        console.log(error);
      }
  return new Promise(async (resolve, reject) => {
    try {
      let product = new models.Product(req.body);
      let numberOfProducts = await models.Product.countDocuments();
      product.product_id = numberOfProducts + 1;
      product.ip = req.ip,
      product.product_image_name = req.files.product_image_name[0].filename,
      product.product_image_subone = req.files.product_image_subone[0].filename,
      product.product_image_subtwo = req.files.product_image_subtwo[0].filename,
      product.product_image_subthree = req.files.product_image_subthree[0].filename,
      product.product_image_subfour = req.files.product_image_subfour[0].filename,
      product = await product.save();
      resolve(product);
    } catch (err) {
      console.log(err);
      reject({
        message: err.message,
      });
    }
  });
};

getProductsList = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let product = await models.Product.find({
        isListed: true,
      });
     

      console.log(product);
      resolve(product);
    } catch (err) {
      console.log(err);
      reject({
        message: err.message,
      });
    }
  });
};

getProductData = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let product = await models.Product.findOne({
        _id:req.params.product_id,
      });
      resolve(product);
    } catch (err) {
      console.log(err);
      reject({
        message: err.message,
      });
    }
  });
};

updateProduct = async(req,res) => {
    try {
        await uploadMultiple(req, res);
        console.log(req.files);
      }catch (error) {
        console.log(error);
      }
  return new Promise(async (resolve, reject) => {
    try {
      let product = await models.Product.findByIdAndUpdate(
        req.params.product_id,
        req.body,
        {
          new: true,
          
        },
        
      );
      resolve(product);
    } catch (err) {
      console.log(err);
      reject({
        message: err.message,
      });
    }
  });
};

deleteProduct = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let product = await models.Product.findByIdAndUpdate(
        req.params.product_id,
    
        {isListed:false , status:0},
        { new: true },
        
        
      );
      resolve(product);
    } catch (err) {
      console.log(err);
      reject({
        message: err.message,
      });
    }
  });
};

module.exports = {
  createProduct,
  getProductsList,
  getProductData,
  updateProduct,
  deleteProduct,

  
};