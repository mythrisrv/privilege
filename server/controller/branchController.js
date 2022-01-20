let models = require("../model");

createBranch = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      req.body.name=req.body.name.trim();
      let branchType_info=await models.Branch.findOne({
        // $and:[ { name:{'$regex':req.body.name,'$options':'i'},company:req.body.company, branch_status:0}] 
        name:{'$regex':req.body.name,'$options':'i'},
       company:req.body.company,
        branch_status:0
      }).select("name");
      if(branchType_info)
      {
        return reject({
          message: "This Branch is already exists",
        });
      }
      // let branch = new models.Branch(req.body);
      let branch = new models.Branch({
        company:req.body.company,
        name:req.body.name,
        shortCode:req.body.shortCode,
        contactPerson:req.body.contactPerson,
        designation:req.body.designation,        
        state:req.body.state,
        city:req.body.city,
        address:req.body.address,
        landLineNumber:req.body.landLineNumber,
        mobile:req.body.mobile,
        pincode:req.body.pincode,
        email:req.body.email,
        website:req.body.website,
        branchLogo:req.body.branchLogo,
        gstin:req.body.gstin,
        panNumber:req.body.panNumber,
        cinNumber:req.body.cinNumber,
        tdsNumber:req.body.tdsNumber,
        deliveryArea:req.body.deliveryArea,
        deliverytype:req.body.deliverytype,
        deliveryslot:req.body.deliveryslot,
        branch_latitude:req.body.branch_latitude,
        branch_longitude:req.body. branch_longitude,
        // branch_addedby:req.user._id,
        branch_addedby:req.body.usersid,
      });
      let numberOfBranches = await models.Branch.countDocuments();
      numberOfBranches++;
      branch.branchId = "BH"+numberOfBranches.toString().padStart(5, '0');
      branch = await branch.save();
      if(branch)
      {
        
        //########## user activity log ###########
          await models.userActivity({
          activity_ip : req.ip,
          activity_action : "New Branch Added",
          activity_user : req.body.firstname,
          activity_user_id : req.body._id,
          activity_desc:'New Branch"' + branch.branchId +'" has been added by ' +req.body.username
         }).save();
         
        let branches = await models.Branch.find({
          _id:  branch._id,
        }).populate("branch_addedby","username -_id")
        .sort({_id:-1})
      resolve(branches );
      }
      else
      {
        reject({
          message: "Something went wrong",
        });
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

getBranchesList = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let branch = await models.Branch.find({
        branch_status:0,
      });
      resolve(branch);
    } catch (err) {
      console.log(err);
      reject({
        message: err.message,
      });
    }
  });
};

getBranchesListOptions = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let branch = await models.Branch.find({
        company: req.body._id,
        // company: req.params.companyId,
        branch_status:0,
      }).select("_id name");
      resolve(branch);
    } catch (err) {
      console.log(err);
      reject({
        message: err.message,
      });
    }
  });
};
getBranchData = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let branch = await models.Branch.findOne({
        _id: req.params.branchId,
      });
      resolve(branch);
    } catch (err) {
      console.log(err);
      reject({
        message: err.message,
      });
    }
  });
};

updateBranch = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      req.body.name = req.body.name.trim();
      let branchType_info = await models.Branch.findOne({
        name: {'$regex': req.body.name, '$options': 'i' },
        company:req.body.company,
        // company:{'$regex':req.body.company,'$options':'i'},
        _id:{$ne:req.body._id},
        branch_status: 0
      }).select("name");
      if(branchType_info)
      {
        return reject({
          message: "This Branch is already exists",
        });
      } 
      let data={
        company:req.body.company,
        name:req.body.name,
        shortCode:req.body.shortCode,
        contactPerson:req.body.contactPerson,
        designation:req.body.designation,        
        state:req.body.state,
        city:req.body.city,
        address:req.body.address,
        landLineNumber:req.body.landLineNumber,
        mobile:req.body.mobile,
        pincode:req.body.pincode,
        email:req.body.email,
        website:req.body.website,
        branchLogo:req.body.branchLogo,
        gstin:req.body.gstin,
        panNumber:req.body.panNumber,
        cinNumber:req.body.cinNumber,
        tdsNumber:req.body.tdsNumber,
        deliveryArea:req.body.deliveryArea,
        deliverytype:req.body.deliverytype,
        deliveryslot:req.body.deliveryslot,
        branch_latitude:req.body.branch_latitude,
        branch_longitude:req.body. branch_longitude,
        branch_latitude:req.body.branch_latitude,
        branch_updatedby:req.body.userid,
      }
      let branch = await models.Branch.findByIdAndUpdate(
        req.body._id,
        // req.params.branchId,
        data,
        {
          new: true,
        }
      );
      if(branch)
      {
        //########## user activity log ###########
        await models.userActivity({
           activity_ip : req.ip,
           activity_action : "Branch Edited",
           activity_user : req.body.firstname,
           activity_user_id : req.body._id,
           activity_desc:'Branch "' + branch.branchId +'" has been edited by ' +req.body.username
        }).save();
        
       let branches = await models.Company.find({
         _id: req.body._id,
       }).populate(" branch_addedby","username -_id")
       .sort({_id:-1})
      resolve(branches);
      }
    } catch (err) {
      console.log(err);
      reject({
        message: err.message,
      });
    }
  });
};

deleteBranch = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let branch = await models.Branch.findByIdAndUpdate(
        // req.body._id,
        req.params._id,
      
        { branch_status:1 },
        { new: true }
      );
      await models.userActivity({
        activity_ip : req.ip,
        activity_action : "Delete Branch",
        activity_user : req.body.firstname,
        activity_user_id : req.body._id,
        activity_desc:'Branch "' + branch.branchId+'" has been deleted by ' +req.body.username
       }).save(); 
      resolve(branch);
    } catch (err) {
      console.log(err);
      reject({
        message: err.message,
      });
    }
  });
};

module.exports = {
  createBranch,
  getBranchesList,
  getBranchesListOptions,
  getBranchData,
  updateBranch,
  deleteBranch,
};
