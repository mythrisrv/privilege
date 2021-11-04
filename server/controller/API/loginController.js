let models = require("../../model");
let moment = require("moment");
const axios = require('axios');

exports.customerLogin = async (req, res) => {
  try {
    var mob = req.body.mobile;
    const user = await models.User.findOne({ mobile: mob }).then(info=>{
     // if(info)
      //{
        if (!info) {
          res.send({"success":false,"message":"User not exist"});       
        } 
        else{ 
          if(mob.length==10)
          {
              mob = '+91'+mob;
          }
          var otp = Math.floor(1000 + Math.random() * 9000);
          console.log(otp);
          var message = 'Hi,'+otp+ ' is your myKit OTP. Do not share this code with anyone else. Regards, myKit Ecommerce';
          var axios = require('axios');
      
          var config = {
            method: 'get',
            url: 'http://otp.srvinfotech.com/api/sendhttp.php?authkey=333685AT8MtCI05f1c01b4P1&mobiles='+mob+'&message='+message+'&sender=myKitE&route=4&country=0&DLT_TE_ID=1207161640460323490',
            headers: { 
              'Cookie': 'PHPSESSID=41u037ttuej94itvaa38dlb2q5'
            }
          }; 
          axios(config)
          .then(response=>{
           // console.log(response);
          });
          const proceed = async () => {
            
            let Otpmessage = new models.Otpmessage( 
              { mobile:mob,
                otp:otp,
                ip:req.ip,
                status:0
              },
              );
            let numberOfOtp = await models.Otpmessage.countDocuments();
            Otpmessage.Id = numberOfOtp + 1;
            Otpmessage = await Otpmessage.save();
      var m= new Date();
var datetime= m.getFullYear() +"-"+ (m.getMonth()+1) +"-"+ m.getDate() + " " + m.getHours() + ":" + m.getMinutes() + ":" + m.getSeconds();

            let message_log = new models.Message( 
              { 
                ip:req.ip,
                message_type:0,
                message_datetime:datetime,
                msg_mob:mob,
                msg_head:"Hazel Green OTP",
                msg_content:message,
                msg_from:0
              },
              );
              
              let numberOfmessage = await models.Message.countDocuments();
              message_log.Id = numberOfmessage + 1;
              message_log = await message_log.save();

          
          res.send({response:true,message:'Otp Send Successfully'});
        };
        proceed();
        }
      //}
    });
    // console.log(user);
    
  } catch (err) {
    
    res.send({"success":false,"message":"Something went wrong"});
  }

  };
  


