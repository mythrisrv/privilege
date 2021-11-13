const validationMiddleware = require('../middleware/validation-middleware');
const express = require("express");
const router = express.Router();
const models = require("../model");
const { jwtauth } = require("../lib/jwtlib");
const {
    createCustomer,customerProfile,updateCustomer,customerProfileNew
} = require('../controller/API/crm_customerController');
let item;
router.post('/create',[validationMiddleware.createCustomervalidator,jwtauth], async (req, res) => {
    try {
       item = await createCustomer(req);
      console.log(item);
       res.status(200).json({
        status: 200,
        data: item,
        message: "customer created successfully",
 });
    } catch (err) {
      console.log(err);
      res.status(400).json({
        message: err.message,
      });
    }
  //   let data = item._id;
  //   if(data){
  //     console.log('1');
  //     if(req.files&&req.files.image!=null){
  //      console.log('2');
  //     const image = re.files.image;
  //     var publicFolder = 'public';
  //     var customer='customer';
  //     if(dirExists(publicFolder)){
  //      console.log('3');
  //       console.log('public exists');
  //       if(dirExists(publicFolder+'/'+customer)){
  //        console.log('4');
  //         let path= image.mv(publicFolder+'/'+customer+'/'+'_cust'+data+'.jpeg',async(err)=>{
  //           if(!err){
  //            console.log('5');
  //            let image = await imageUpload(data,req.body);
  //          }else{
  //              res.status(200).json({
  //                isCreated:false,
  //                message:'internal server error',
  //              });
  //            }
  //           });
  //         }
  //       }
  //     }else{
  //      res.status(200).json({
  //        isCreated:false,
  //        message:'customer image not found',
  //      })
  //     }
  //   }else{
  //    res.status(200).json({
  //      isCreated:false,
  //      message:'internal server error',
  //    });
  //   }
  });
  /********************
 * list all customers
 * ******************/
   router.get("/list", [jwtauth], async (req, res) => {
    try {
      let item = await CustomerList(req);
      res.status(200).json({
        status: 200,
        data: item,
      });
    } catch (err) {
      console.log(err);
      res.status(400).json({
        message: err.message,
      });
    }
  });
  /* customers */
  router.get("/list_crm",[jwtauth] , async (req, res) => {
    try {
     
      let item = await getCustomersList(req)
      console.log(item);
      res.status(200).json({
        status: 200,
        data: item,
      });
    } catch (err) {
      console.log(err);
      res.status(400).json({
        message: err.message,
      });
    }
  });
  /********************
 * profile
 * ******************/

  router.get("/profile/:id", [jwtauth], async (req, res) => {
    try {
      let item = await customerProfile(req);
      res.status(200).json({
        status: 200,
        data: item,
      });
    } catch (err) {
      console.log(err);
      res.status(400).json({
        message: err.message,
      });
    }
  });
  router.get("/profile_new/:id", [jwtauth], async (req, res) => {
    try {
      let item = await customerProfileNew(req);
      res.status(200).json({
        status:200,
        data:item

      });
    } catch (err) {
      console.log(err);
      res.status(400).json({
        response:"failed",
        message: err.message,
      });
    }
  });
  /********************
 * profile Edit
 * ******************/
  router.put("/update/:cust_id", [jwtauth], async (req, res) => {
    try {
      let item = await updateCustomer(req);
      res.status(200).json({
        status: 200,
        data: item,
      });
    } catch (err) {
      console.log(err);
      res.status(400).json({
        message: err.message,
      });
    }
  });
/********************
 * customer verification
 * ******************/
 router.put("/custVerify/:cust_id",[jwtauth],async (req, res) => {
  try {
    let item = await verifyCustomer(req);
    res.status(200).json({
      status: 200,
      data: item,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: err.message,
    });
  }
});
module.exports = router;