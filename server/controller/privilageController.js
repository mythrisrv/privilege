let models = require("../model");

createPrivilage = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      req.body.privilege_name=req.body.privilege_name.trim();
      let privilegeType_info=await models.Privilage.findOne({
        privilege_name:{'$regex':req.body.privilege_name,'$options':'i'},
        status:0
      }).select("privilege_name");
      if(privilegeType_info)
      {
        return reject({
          message: "This Privilege is already exists",
        });
      }

      let privilage = new models.Privilage(
        {
         privilege_name:req.body.privilege_name,
         privilege_code:req.body.privilege_code,
         alloted_companies:req.body.alloted_companies,
         alloted_localbodies:req.body.alloted_localbodies,
         alloted_submenus:req.body.alloted_submenus,
         alloted_mainmenus:req.body.alloted_mainmenus,
         privilege_addedby:req.body.usersid,
        }
        
      );

      let numberOfPrivilages = await models.Privilage.countDocuments({});
      privilage.privilageId = numberOfPrivilages + 1;
      privilage = await privilage.save();
      if( privilage)
      { 
        //########## user activity log ###########
          await models.userActivity({
          activity_ip : req.ip,
          activity_action : "New Privilege Added",
          activity_user : req.body.firstname,
          activity_user_id : req.body._id,
          activity_desc:'New Privilege "' +req.body.privilege_name +'" has been added by ' +req.body.username
         }).save();

         let privilages = await models.Privilage.find({
          _id: privilage._id,
        })
        // .populate("company_addedby","username -_id")
        .sort({_id:-1})
          resolve(privilages);
      }
          else
          {
            reject({
              message: "Something went wrong",
            });
          }
       
    } catch (err) {
      console.log(err);
      reject({
        message: err.message,
      });
    }
  });
};

getPrivilagesListOptions = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let privilages = await models.Privilage.find({
        status:0,
      }).select("_id name");
      resolve(privilages);
    } catch (err) {
      console.log(err);
      reject({
        message: err.message,
      });
    }
  });
};

getPrivilagesList = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let privilage = await models.Privilage.find({
        status:0,
      }).populate("alloted_companies","company_name")
      .populate("alloted_localbodies","localbody_name")
      //console.log(privilage, "ooo");
      resolve(privilage);
    } catch (err) {
      console.log(err);
      reject({
        message: err.message,
      });
    }
  });
};

getPrivilageData = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let privilage = await models.Privilage.findOne({
        _id: req.params.privilageId,
      });
      resolve(privilage);
    } catch (err) {
      console.log(err);
      reject({
        message: err.message,
      });
    }
  });
};

updatePrivilage = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      req.body.privilege_name=req.body.privilege_name.trim();
      let privilegeType_info=await models.Privilage.findOne({
        privilege_name:{'$regex':req.body.privilege_name,'$options':'i'},
        _id:{$ne:req.body._id},
        status: 0
      }).select("privilege_name");
      if(privilegeType_info)
      {
        return reject({
          message: "This Privilege is already exists",
        });
      }
      let data={
        privilege_name:req.body.privilege_name,
        privilege_code:req.body.privilege_code,
        alloted_companies:req.body.alloted_companies,
        alloted_localbodies:req.body.alloted_localbodies,
        alloted_submenus:req.body.alloted_submenus,
        alloted_mainmenus:req.body.alloted_mainmenus,
        privilege_updatedby:req.body.usersid,
      }
      let privilage = await models.Privilage.findByIdAndUpdate(
        req.body._id,
        // req.params.privilageId,
        data,
        {
          new: true,
        }
      );
      if(privilage)
      {
        //########## user activity log ###########
        await models.userActivity({
           activity_ip : req.ip,
           activity_action : "Privilege Edited",
           activity_user : req.body.firstname,
           activity_user_id : req.body.users_id,
           activity_desc:'Privilege "' +req.body.privilege_name +'" has been edited by ' +req.body.username
        }).save();
        
       let privilages = await models.Privilage.find({
         _id: req.body._id,
       })
   
       .sort({_id:-1})



      resolve(privilages);
    }
    
  }
    catch (err) {
      console.log(err);
      reject({
        message: err.message,
      });
    }
  });
};

deletePrivilage = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let privilage = await models.Privilage.findByIdAndUpdate(
        req.params._id,
        //req.params.privilageId,
        {   status:1 },
        { new: true }
      );
      await models.userActivity({
        activity_ip : req.ip,
        activity_action : "Privilege Deleted",
        activity_user : req.body.firstname,
        activity_user_id : req.body._id,
        activity_desc:'Privilege "' +privilage.privilege_name +'" has been deleted by ' +req.body.username
       }).save();
      resolve(privilage);
    } catch (err) {
      console.log(err);
      reject({
        message: err.message,
      });
    }
  });
};

module.exports = {
  createPrivilage,
  getPrivilagesListOptions,
  getPrivilagesList,
  getPrivilageData,
  updatePrivilage,
  deletePrivilage,
};
