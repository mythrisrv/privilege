

let models = require("../../model");

const multer = require('multer');
var randomize = require('randomatic');
const bodyParser = require('body-parser');
const path = require('path');

var storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, "banneruploads");
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

  var uploadMultiple = upload.fields([{ name: 'banner_image', maxCount: 1 }, { name: 'banner_image_app', maxCount: 1 },])

    
createBanner = async (req, res) => {
  try {
    await uploadMultiple(req, res,);
    console.log(req.files);
  }catch (error) {
    console.log(error);
  }
  
    return new Promise(async (resolve, reject) => {
      try {
        let banner = new models.Banner(req.body);
        let numberOfbanner = await models.Banner.countDocuments();
        banner.banner_id = numberOfbanner + 1;
        banner.ip = req.ip,
        banner.banner_image = req.files.banner_image[0].filename,
        banner.banner_image_app = req.files.banner_image_app[0].filename,
        banner = await banner.save();
        resolve(banner);
      } catch (err) {
        console.log(err);
        reject({
          message: err.message,
        });
      }
    });
    
  };



  
getBannerList = (req) => {
    return new Promise(async (resolve, reject) => {
      try {
        let banner = await models.Banner.find({
          isListed: true,
        });
    //   console.log(tax);
        resolve(banner);
      } catch (err) {
        console.log(err);
        reject({
          message: err.message,
        });
      }
    });
  };

  getBannerData = (req) => {
    return new Promise(async (resolve, reject) => {
      try {
        let banner = await models.Banner.findOne({
             
         _id:  req.params.banner_id,
        });
        

        resolve(banner);
      } catch (err) {
        console.log(err);
        reject({
          message: err.message,
        });
      }
    });
  };


  
updateBanner = async (req,res) => {
  try {
    await uploadMultiple(req, res,);
    console.log(req.files);
  }catch (error) {
    console.log(error);
  }
    return new Promise(async (resolve, reject) => {
      try {
        
        let banner = await models.Banner.findByIdAndUpdate(
          req.params.banner_id,
          req.body,
          {
            new: true,
          }
        );
        
        resolve(banner);
      } catch (err) {
        console.log(err);
        reject({
          message: err.message,
        });
      }
    });
  };

  deleteBanner = (req) => {
    return new Promise(async (resolve, reject) => {
      try {
        let banner = await models.Banner.findByIdAndUpdate(
          
          req.params.banner_id,
          
          { status:0, isListed: false },
          { new: true }
        );
        resolve(banner);
      } catch (err) {
        console.log(err);
        reject({
          message: err.message,
        });
      }
    });
  };


  
module.exports = {
    createBanner,
    getBannerList,
    getBannerData,
    updateBanner,
    deleteBanner,

};
