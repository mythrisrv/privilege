let models = require("../model");
let moment = require("moment");

createCategory = (req) => {
    console.log(req.ip)
    var ip = req.ip;
    const format2 = "DD-MM-YYYY"
     var date2 = new Date();
     
  date = moment(date2).format(format2);
  time = moment(date2).format("HH:mm ");
  
    return new Promise(async (resolve, reject) => {
      try {
      
        let category = new models.Customer_type( 
          { customer_type_status: 0,
            customer_type_ip: ip,
            customer_type_name: req.body.category_name,
            state_id: 19,
            country_id: 101,
            customer_type_date: date,
            customer_type_time: time,
           customer_type_addedby:req.user._id,
  
          },
          );
         
        let numberOfCategory = await models.Customer_type.countDocuments();
        console.log(numberOfCategory)
     category.customer_type_id = numberOfCategory + 1;
        
        category = await category.save()
       // district.populate("district_addedby","username -_id").execPopulate();
        resolve(category);
       
         } catch (err) {
        console.log(err);
        reject({
          message: err.message,
        });
      }
    });
  };
  
  


getCategoryList = (req) => {
    return new Promise(async (resolve, reject) => {
      try {
        let category = await models.Customer_type.find({
          customer_type_status: 0,
        }).populate("customer_type_addedby","username -_id")
        .sort({createdAt:-1})
          
  
         resolve(category);
      } catch (err) {
        console.log(err);
        reject({
          message: err.message,
        });
      }
    });
  }

  deleteCategory = (req) => {
    return new Promise(async (resolve, reject) => {
      try {
        let category = await models.Customer_type.findByIdAndUpdate(
          req.params.catId,
          { customer_type_status:1 },
          { new: true }
        );
        resolve(category);
      } catch (err) {
        console.log(err);
        reject({
          message: err.message,
        });
      }
    });
  };

  updateCategory = (req) => {
    console.log(req.body)
     return new Promise(async (resolve, reject) => {
      try {
       let data={
         customer_type_name:req.body.category_name,
         customer_type_updatedby:req.user._id,
         
  
       }
  
        let category = await models.Customer_type.findByIdAndUpdate(
          req.params.catId,
          data,
          //req.body,
          { new: true }
        )
        resolve(category);
      //console.log(district)
    } catch (err) {
      console.log(err);
      reject({
        message: err.message,
      });
    }
  });
};

getCategoryOptions = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let category = await models.Customer_type.find({
        customer_type_status: 0,
      }).select("customer_type_name")
      
        

       resolve(category);
    } catch (err) {
      console.log(err);
      reject({
        message: err.message,
      });
    }
  });
}

  module.exports={
      getCategoryList,
      createCategory,
      deleteCategory,
      updateCategory,
      getCategoryOptions
  }

