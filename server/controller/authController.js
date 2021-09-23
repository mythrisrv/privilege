let models = require("../model");
const jwt = require("jsonwebtoken");
const env = process.env.NODE_ENV || "development";
const config = require("../../config")[env];

registerUser = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let { firstName, lastName, email, username, mobile, password } = req.body;
      userExists = await models.User.findOne({
        $or: [{ email: email }, { mobile: mobile }, { username: username }],
      });
      if (userExists) {
        reject({
          message: "Email/Password already exist",
        });
      } else {
        let user = new models.User();
        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        user.username = username;
        user.mobile = mobile;
        user.password = user.generatePasswordHash(password);
        user = await user.save();
        user = user;
        user.token = jwt.sign(
          {
            _id: user._id,
          },
          config.secret,
          {
            expiresIn: "10d",
          }
        );
        resolve(user);
      }
    } catch (err) {
      console.log(err);
      reject({
        message: err.message,
      });
    }
  });
};

loginUser = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let { username, mobile } = req.body;

      let user = await models.User.findOne({
        $or: [{ username: username }, { mobile: mobile }],
      });
      // .select(["-password"]);
      if (user) {
        let isUserAuthenticated = user.validatePassword(
          req.body.password,
          user.password
        );
        if (isUserAuthenticated) {
          user = user.toObject();
          user.token = jwt.sign(
            {
              _id: user._id,
            },
            config.secret,
            {
              expiresIn: "10d",
            }
          );
          resolve(user);
        } else {
          reject({
            message: "Password is incorrect",
          });
        }
      } else {
        reject({
          message: "No account exit",
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

module.exports = {
  registerUser,
  loginUser,
};
