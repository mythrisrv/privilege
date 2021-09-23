let models = require("../../model");

createSuppliers = (req) => {

    return new Promise(async (resolve, reject) => {
      try {
        let suppliers = new models.Supplier(req.body);
        let numberOfsuppliers = await models.Supplier.countDocuments();
        suppliers.supplierid = numberOfsuppliers + 1;
        suppliers.ip = req.ip,
        suppliers = await suppliers.save();
        resolve(suppliers);
      } catch (err) {
        console.log(err);
        reject({
          message: err.message,
        });
      }
    });
  };


  
getSuppliersList = (req) => {
    return new Promise(async (resolve, reject) => {
      try {
        let suppliers = await models.Supplier.find({
          isListed: true,
        });
      console.log(suppliers);
        resolve(suppliers);
      } catch (err) {
        console.log(err);
        reject({
          message: err.message,
        });
      }
    });
  };

  getSuppliersData = (req) => {
    return new Promise(async (resolve, reject) => {
      try {
        let suppliers = await models.Supplier.findOne({
             
         _id:  req.params.supplierid,
        });
        console.log(suppliers);

        resolve(suppliers);
      } catch (err) {
        console.log(err);
        reject({
          message: err.message,
        });
      }
    });
  };


  
updateSuppliers = (req) => {
    return new Promise(async (resolve, reject) => {
      try {
        console.log( req.params.supplierid,)
        let suppliers = await models.Supplier.findByIdAndUpdate(
          req.params.supplierid,
          req.body,
          {
            new: true,
          }
        );
        console.log(suppliers, "ll");
        resolve(suppliers);
      } catch (err) {
        console.log(err);
        reject({
          message: err.message,
        });
      }
    });
  };

  deleteSuppliers = (req) => {
    return new Promise(async (resolve, reject) => {
      try {
        let suppliers = await models.Supplier.findByIdAndUpdate(
          
          req.params.supplierid,
          
          { status:0, isListed: false },
          { new: true }
        );
        resolve(suppliers);
      } catch (err) {
        console.log(err);
        reject({
          message: err.message,
        });
      }
    });
  };


  
module.exports = {
    createSuppliers,
    getSuppliersList,
    getSuppliersData,
    updateSuppliers,
    deleteSuppliers

};