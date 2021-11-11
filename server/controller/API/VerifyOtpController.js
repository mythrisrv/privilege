let models = require("../../model");
const jwt = require('jsonwebtoken');
const env = process.env.NODE_ENV || "development";
const config = require("../../config")[env];

exports.verifyOtp = async(req,res)=>{
    try{
        var mob = req.body.mobile;
        var contact = "+91"+mob;
        var otp = req.body.otp;
        const result = await models.Otpmessage.findOne({ mobile:contact}).sort({createdAt:-1}).limit(1) 
        if(result){
            if(result.otp==otp){
                 let user = await models.User.findOne({mobile:mob}).select("firstName lastName mobile user_email user_group privilage user_company").populate("privilage","privilege_name")
                if(user){
                  user = user
                    user.token = jwt.sign(
                        {
                          _id: user._id,
                        },
                        config.secret,
                        {
                          expiresIn: "30d",
                        }
                      )
                    res.send({"success":true,"message":"Otp verified Successfully",data:user,token:user.token
                });
                }else{
                    res.send({"success":true,"message":"Otp verified Successfully"}); 
                }
            }
            else{
                res.send({"success":false,"message":"Incorrecte OTP"});
              }
        }
        else{
            res.send({"success":false,"message":"Please check your mobile number"});
          }
    }catch (err) {
    
    res.send({"success":false,"message":"Something went wrong"+err});
  }
}