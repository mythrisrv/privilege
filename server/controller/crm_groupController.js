let models = require("../model");
let moment = require("moment");

createGroup = (req) => {
    var ip = req.ip;
    const format2 = "YYYY-MM-DD"
    var date2 = new Date();
    date = moment(date2).format(format2);
    time = moment(date2).format("hh:mm A");
 var groupward=req.body.wards.join(',')
 console.log(groupward)
  return new Promise(async (resolve, reject) => {
    try {
      //let  = new models.Customer(req.body);
      let group = new models.group( 
        { group_ip:ip,
          group_status:0,
          group_date:date,
          group_time:time,
         group_ward:groupward,
         group_localbody_name_id:req.body.localbody._id,
         group_name:req.body.group_name,
         group_incentive:req.body.incentive,
           group_addedby:req.user._id,
         }
       );
      let numberOfGroups = await models.group.countDocuments();
      group.group_id = numberOfGroups + 1;
      group = await group.save();
      resolve(group);
    } catch (err) {
      console.log(err);
      reject({
      message: err.message,
      });
    }
  });
};


getGroupsList = (req) => {
    return new Promise(async (resolve, reject) => {
      try {
        let group = await models.group.find({
          group_status: 0,
        })
        .populate("group_localbody_name_id","localbody_name -_id")
         .populate("group_addedby","username -_id")
         .sort({created_At :-1})
        resolve(group);
      } catch (err) {
        console.log(err);
        reject({
          message: err.message,
        });
      }
    });
  };

  getGroupsListOptions = (req) => {
    return new Promise(async (resolve, reject) => {
      try {
        let groups = await models.group.find({
          group_status:0,
        }).select("group_name");
        console.log(localbodies);
        resolve(groups);
      } catch (err) {
        console.log(err);
        reject({
          message: err.message,
        });
      }
    });
  };

  getGroupData = (req) => {
    return new Promise(async (resolve, reject) => {
      console.log(req.params)
      try {
        let group= await models.group.findOne({
          group_name:req.params.group_name
        });
        resolve(group);
      } catch (err) {
        console.log(err);
        reject({
          message: err.message,
        });
      }
    });
  };

  updateGroup = (req) => {
    
    
    return new Promise(async (resolve, reject) => {
      try {
       

      
      // req.body.localbody_company=company._id;
      
      
      let data={
       group_localbody_name_id:req.body.localbody._id,
       group_name:req.body.group_name,
       
       updated_at:Date.now()
  
      }
      // console.log(req.body);
  
        let group = await models.group.findByIdAndUpdate(
           req.params.group_Id,
          data,
          {
            new: true,
           
          }
        )
        resolve(group);
      } catch (err) {
        console.log(err);
        reject({
          message: err.message,
        });
      }
    });
  };
  
  deleteGroup = (req) => {
    return new Promise(async (resolve, reject) => {
      
      try {
        let group = await models.group.findByIdAndUpdate(
          req.params.group_Id,
          { group_status:1 },
          { new: true }
        )
       
        resolve(group);
      } catch (err) {
        console.log(err);
        reject({
          message: err.message,
        });
      }
    });
  };


module.exports = {
    createGroup,
    getGroupsList,
    deleteGroup,
    updateGroup,
    getGroupData,
    getGroupsListOptions
    // getcustomertypeListwithnames

};