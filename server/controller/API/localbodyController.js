let models = require("../../model");
listUserLocalbodies = (req) => {
    let user_id= req.params.id;
    return new Promise(async (resolve, reject) => {
    
      try {
        let userProfile = await models.User.findOne({
          _id:user_id
        })
        .select('local_body');
        if(userProfile)
        {
          var localbody = userProfile.local_body;
          if(localbody)
          {
          var id_arr = localbody.split(',');
          var localbodies = await models.LocalbodyName.find({localbody_status:0,_id:{$in:id_arr}})
          .select('localbody_type localbody_name short_code');
          if(localbodies.length>0)
          {
              resolve(localbodies);
          }
          else
          {
            reject({message: "Empty Localbody list"})
          }
        }
        else
        {
            reject({message: "Empty Localbody list"})
        }

        }
        else
        {
          reject({message: "User not exist"})
        }
        
      } catch (err) {
        console.log(err);
        reject({
          message: err.message,
        });
      }
    });
  };
  module.exports = {
    listUserLocalbodies,
  };