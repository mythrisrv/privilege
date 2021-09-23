let models = require("../model");
const jwt = require("jsonwebtoken");
const env = process.env.NODE_ENV || "development";
const config = require("../config")[env];

registerUser = (req) => {
  console.log(req.body, "i");
  return new Promise(async (resolve, reject) => {
    try {
      let { email, username, mobile, password } = req.body;
      userExists = await models.User.findOne({
        $or: [{ email: email }, { mobile: mobile }, { username: username }],
      });

      if (userExists) {
        reject({
          message: "Email/Mobile/Username already exist",
        });
      } else {
        let numberOfUsers = await models.User.countDocuments();
        let user = new models.User(req.body);
        user.userId = numberOfUsers + 1;
        user.password = user.generatePasswordHash(password);
        user = await user.save();
        user.token = jwt.sign(
          {
            _id: user._id,
          },
          config.secret,
          {
            expiresIn: "30m",
          }
        );
        user = models.User.findById(user._id)
          .populate("privilage")
          .populate("company")
          .populate("branch");
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
      let { username } = req.body;

      let user = await models.User.findOne({
        $or: [{ username: username }, { mobile: username }],
        isListed: true,
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
