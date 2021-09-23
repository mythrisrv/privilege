let models = require("../../model");

createTax = (req) => {

    return new Promise(async (resolve, reject) => {
      try {
        let tax = new models.Tax(req.body);
        let numberOftax = await models.Tax.countDocuments();
        tax.taxId = numberOftax + 1;
        tax.ip = req.ip,
        tax = await tax.save();
        resolve(tax);
      } catch (err) {
        console.log(err);
        reject({
          message: err.message,
        });
      }
    });
  };


  
getTaxList = (req) => {
    return new Promise(async (resolve, reject) => {
      try {
        let tax = await models.Tax.find({
          isListed: true,
        });
    //   console.log(tax);
        resolve(tax);
      } catch (err) {
        console.log(err);
        reject({
          message: err.message,
        });
      }
    });
  };

  getTaxData = (req) => {
    return new Promise(async (resolve, reject) => {
      try {
        let tax = await models.Tax.findOne({
             
         _id:  req.params.taxId,
        });
        // console.log(tax);

        resolve(tax);
      } catch (err) {
        console.log(err);
        reject({
          message: err.message,
        });
      }
    });
  };


  
updateTax = (req) => {
    return new Promise(async (resolve, reject) => {
      try {
        console.log( req.params.taxId,)
        let tax = await models.Tax.findByIdAndUpdate(
          req.params.taxId,
          req.body,
          {
            new: true,
          }
        );
        
        resolve(tax);
      } catch (err) {
        console.log(err);
        reject({
          message: err.message,
        });
      }
    });
  };

  deleteTax = (req) => {
    return new Promise(async (resolve, reject) => {
      try {
        let tax = await models.Tax.findByIdAndUpdate(
          
          req.params.taxId,
          
          { status:0, isListed: false },
          { new: true }
        );
        resolve(tax);
      } catch (err) {
        console.log(err);
        reject({
          message: err.message,
        });
      }
    });
  };


  
module.exports = {
    createTax,
    getTaxList,
    getTaxData,
    updateTax,
    deleteTax

};
