const mongoose = require("mongoose");
let Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

let userSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    status: {
      type: Number,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
    },
    dob: {
      type: String,
    },
    privilage: {
      type: Schema.Types.ObjectId,
      ref: "privilege",
    },
    devision: {
      type: Number,
    },
    local_body: {
      type: Schema.Types.ObjectId,
      ref: "tbl_local_body",
    },
    company: {
      type: Schema.Types.ObjectId,
      ref: "tbl_company",
    },
    local_body: {
      type:String,
    },
    branch: {
      type: Schema.Types.ObjectId,
      ref: "branch",
    },
    ward: {
      type: Schema.Types.ObjectId,
      ref: "tbl_ward",
    },
    user_group: {
      type: Schema.Types.ObjectId,
      ref: "tbl_group",
    },
    address: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    browserToken: {
      type: String,
    },
    appToken: {
      type: String,
    },
    superAdmin: {
      type: Boolean,
      default: false,
    },
    isListed: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true,collection:'users' }
);

userSchema.methods.generatePasswordHash = (password) => {
  const saltRounds = 10;
  var salt = bcrypt.genSaltSync(saltRounds);
  var hash = bcrypt.hashSync(password, salt);
  return hash;
};

userSchema.methods.validatePassword = (password, hashedPassword) => {
  let res = bcrypt.compareSync(password, hashedPassword);
  return res;
};

let User = mongoose.model("users", userSchema);

module.exports = User;
