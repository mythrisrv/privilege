let models = require("../model");

getUsersList = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = await models.User.find({
        isListed: true,
      })
        .lean()
        .populate("privilage", "_id name")
        .populate("company", "_id name")
        .populate("branch", "_id name");

      // users = users.map((user) => {
      //   if (user.privilage) {
      //     user.privilage = user.privilage.name;
      //   }
      //   if (user.company) {
      //     user.company = user.company.name;
      //   }
      //   if (user.branch) {
      //     user.branch = user.branch.name;
      //   }
      //   return user;
      // });

      resolve(users);
    } catch (err) {
      console.log(err);
      reject({
        message: err.message,
      });
    }
  });
};

getUserData = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await models.User.findOne({
        _id: req.params.userId,
      });
      resolve(user);
    } catch (err) {
      console.log(err);
      reject({
        message: err.message,
      });
    }
  });
};

updateUser = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user;
      console.log(req.body.password, "Outside");
      if (req.body.password) {
        console.log(req.body.password, "Inside");
        if (req.body.password.length >= 3) {
          let user = await models.User.findOne({
            _id: req.params.userId,
            isListed: true,
          })
            .populate("privilage")
            .populate("company")
            .populate("branch");
          user.password = user.generatePasswordHash(req.body.password);
          user = await user.save();
          resolve(user);
        } else {
          reject({
            message: "Password should be more than 3 characters",
          });
        }
      } else {
        delete req.body.password;
        user = await models.User.findByIdAndUpdate(
          req.params.userId,
          req.body,
          {
            new: true,
          }
        )
          .populate("privilage")
          .populate("company")
          .populate("branch")
          .then((user) => resolve(user))
          .catch((err) => console.error(err));
      }
    } catch (err) {
      console.log(err);
      reject({
        message: err.message,
      });
    }
  });
};

deleteUser = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await models.User.findByIdAndUpdate(
        req.params.userId,
        { isListed: false },
        { new: true }
      );
      resolve(user);
    } catch (err) {
      console.log(err);
      reject({
        message: err.message,
      });
    }
  });
};

module.exports = {
  getUsersList,
  getUserData,
  updateUser,
  deleteUser,
};
