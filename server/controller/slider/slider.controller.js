let models = require("../../model/");
const multer = require('multer');
var randomize = require('randomatic');
const path = require('path');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,"slideruploads");
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
  
  
var uploadMultiple = upload.fields([{ name: 'android_banner', maxCount: 1 }, { name: 'ios_banner', maxCount: 1 },{ name: 'web_banner', maxCount: 1 },{ name: 'web_banner_webp', maxCount: 1 },{ name: 'app_banner_webp', maxCount: 1 }])
    
createSlider =  async(req,res) => {
  try {
    await uploadMultiple(req, res);
    console.log(req.files);
  }catch (error) {
    console.log(error);
  }
  return new Promise(async(resolve, reject) => {
  try {
      
      let slider = new models.Slider(req.body);
      let numberOfSliders = await models.Slider.countDocuments();
      slider.slider_id = numberOfSliders + 1;
      slider.ip = req.ip,
      // slider.android_banner = req.files.android_banner[0].filename,
      // slider.ios_banner = req.files.ios_banner[0].filename,
      // slider.web_banner = req.files.web_banner[0].filename,
      // slider.web_banner_webp = req.files.web_banner_webp[0].filename,
      // slider.app_banner_webp = req.files.app_banner_webp[0].filename
      slider = await slider.save();
      resolve(slider);
    } catch (err) {
      console.log(err);
      reject({
        message: err.message,
      });
    }
  });
  
};

   


getSlidersList = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let slider = await models.Slider.find({
        isListed: true,
      });
     

      console.log(slider); 
      resolve(slider);
    } catch (err) {
      console.log(err);
      reject({
        message: err.message,
      });
    }
  });
};

getSliderData = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let slider = await models.Slider.findOne({
        _id:req.params.slider_id,
      });
      resolve(slider);
    } catch (err) {
      console.log(err);
      reject({
        message: err.message,
      });
    }
  });
};

updateSlider = async(req,res) => {
  try {
    await uploadMultiple(req, res);
    console.log(req.files);
  }catch (error) {
    console.log(error);
  }
  return new Promise(async (resolve, reject) => {
    try {
      let slider = await models.Slider.findByIdAndUpdate(
        req.params.slider_id,
        req.body,
        {
          new: true,
          
        },
        
      );
      resolve(slider);
    } catch (err) {
      console.log(err);
      reject({
        message: err.message,
      });
    }
  });
};

deleteSlider = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let slider = await models.Slider.findByIdAndUpdate(
        req.params.slider_id,
    
        {isListed:false , status:0},
        { new: true },
        
        
      );
      resolve(slider);
    } catch (err) {
      console.log(err);
      reject({
        message: err.message,
      });
    }
  });
};

module.exports = {
  createSlider,
  getSlidersList,
  getSliderData,
  updateSlider,
  deleteSlider,
  
  
  

  
};