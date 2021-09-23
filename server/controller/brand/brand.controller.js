let models = require("../../model");

const multer = require('multer');
var randomize = require('randomatic');
const bodyParser = require('body-parser');
const path = require('path');

var storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, "branduploads");
      },
      
    filename: function (req, file, cb) {
            cb(null, randomize('a0', 12) + path.extname(file.originalname));
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

      
  var uploadMultiple = upload.fields([{ name: 'brandlogo', maxCount: 1 }, { name: 'webbannerimage', maxCount: 1 },{ name: 'appbannerimage', maxCount: 1 }])

    
createBrand = async (req, res) => {
  try {
    await uploadMultiple(req, res,);
    console.log(req.files);
  }catch (error) {
    console.log(error);
  }
  
    return new Promise(async (resolve, reject) => {
      try {
        let brand = new models.Brand(req.body);
        let numberOfbrand = await models.Brand.countDocuments();
        brand.brandId = numberOfbrand + 1;
        brand.ip = req.ip,
      
        // brand.brandlogo = req.files.brandlogo[0].filename,
        // brand.webbannerimage = req.files.webbannerimage[0].filename,
        // brand.appbannerimage = req.files.appbannerimage[0].filename,

        brand = await brand.save();
        resolve(brand);
        console.log(brand);
      } catch (err) {
        console.log(err);
        reject({
          message: err.message,
        });
      }
    });
    
  };



  
getBrandList = (req) => {
    return new Promise(async (resolve, reject) => {
      try {
        let brand = await models.Brand.find({
          isListed: true,
        });
    
        resolve(brand);
      } catch (err) {
        console.log(err);
        reject({
          message: err.message,
        });
      }
    });
  };

  getBrandData = (req) => {
    return new Promise(async (resolve, reject) => {
      try {
        let brand = await models.Brand.findOne({
             
         _id:  req.params.brandId,
        });
        

        resolve(brand);
      } catch (err) {
        console.log(err);
        reject({
          message: err.message,
        });
      }
    });
  };


  
updateBrand = async (req,res) => {
  try {
    await uploadMultiple(req, res,);
    console.log(req.files);
  }catch (error) {
    console.log(error);
  }
    return new Promise(async (resolve, reject) => {
      try {
        
        let brand = await models.Brand.findByIdAndUpdate(
          req.params.brandId,
          req.body,
          {
            new: true,
          }
        );
        
        resolve(brand);
      } catch (err) {
        console.log(err);
        reject({
          message: err.message,
        });
      }
    });
  };

  deleteBrand = (req) => {
    return new Promise(async (resolve, reject) => {
      try {
        let brand = await models.Brand.findByIdAndUpdate(
          
          req.params.brandId,
          
          { status:0, isListed: false },
          { new: true }
        );
        resolve(brand);
      } catch (err) {
        console.log(err);
        reject({
          message: err.message,
        });
      }
    });
  };


  
module.exports = {
    createBrand,
    getBrandList,
    getBrandData,
    updateBrand,
    deleteBrand,

};