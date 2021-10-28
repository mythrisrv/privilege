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
      let localbody = new models.Localbody( 
        { 
          group_status:0,
         group_ward:req.body.ward_name,
         group_localbody_name:req.body.localbody_name,
           
         }
       );
      let numberOflocalbodies = await models.Localbody.countDocuments();
      localbody.localbody_id = numberOflocalbodies + 1;
      localbody = await localbody.save();
      resolve(localbody);
    } catch (err) {
      console.log(err);
      reject({
      message: err.message,
      });
    }
  });
};







module.exports = {
    createGroup
    
    // getcustomertypeListwithnames

};