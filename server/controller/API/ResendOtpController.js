let models = require("../../model");
let moment = require("moment");
const axios = require('axios');

exports.resendOtp = async (req, res) => {
  try {
    var mob = req.body.mobile;
    if (mob.length==10)
    {
        contact = '+91'+mob;
    }
    const user = await models.User.findOne({ mobile: mob }).then(async(info)=>{
     
        if (!info) {
          res.send({"success":false,"message":"User not exist"});       
        } 
        else{ 
          let otpmessage =await models.Otpmessage.findOne({mobile:contact}).sort({createdAt:-1}).limit(1)
          var otp =otpmessage.otp; 
          var message = 'Hi,'+otp+ ' is your myKit OTP. Do not share this code with anyone else. Regards, myKit Ecommerce';
          var axios = require('axios');
      
          var config = {
            method: 'get',
            url: 'http://otp.srvinfotech.com/api/sendhttp.php?authkey=333685AT8MtCI05f1c01b4P1&mobiles='+contact+'&message='+message+'&sender=myKitE&route=4&country=0&DLT_TE_ID=1207161640460323490',
            headers: { 
              'Cookie': 'PHPSESSID=41u037ttuej94itvaa38dlb2q5'
            }
          }; 
          axios(config)
          .then(response=>{
            res.send({response:true,message:'Otp Send Successfully'});
          });
        
        }
    });
   
    
  } catch (err) {
    
    res.send({"success":false,"message":"Something went wrong"+err});
  }

  };
  


