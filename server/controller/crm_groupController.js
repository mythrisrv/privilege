let models = require("../model");
let moment = require("moment");

createGroup = (req) => {
    var ip = req.ip;
    const format2 = "YYYY-MM-DD"
    var date2 = new Date();
    date = moment(date2).format(format2);
    time = moment(date2).format("hh:mm A");
 console.log(req.body);
  return new Promise(async (resolve, reject) => {
    try {
      //let  = new models.Customer(req.body);
      let group = new models.Group( 
        { 
          group_status:0,
         group_ward:req.body.ward_name,
         group_localbody_name:req.body.localbody_name,
         group_name:req.body.team_name,
         group_incentive:req.body.incentive
           
         }
       );
      let numberOfGroups = await models.Group.countDocuments();
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
        }).populate("group-localbody_name_id","localbody_name -_id")
        .populate("group_district","district_name -_id")
      
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
    
    // getcustomertypeListwithnames

};