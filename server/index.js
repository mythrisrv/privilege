const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");

const port = process.env.PORT || 3099;
const env = process.env.NODE_ENV || "development";
const config = require("./config")[env];

const setup = require("./routes/setup");
const register = require("./routes/register");
const login = require("./routes/login");
const company = require("./routes/company");
const branch = require("./routes/branch");
const user = require("./routes/user");
const privilage = require("./routes/privilage");
const supplier = require("./routes/supplier");
const common = require("./routes/common");
const auth = require("./routes/auth");
const district = require("./routes/district");
const apiRouter = require("./routes/apiRouter");


app.use(logger("dev"));

const dbUrl = config.dbUrl;

var options = {
  keepAlive: 1,
  connectTimeoutMS: 30000,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(dbUrl, options, (err) => {
  if (err) console.log(err);
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/setup", setup);
app.use("/register", register);
app.use("/login", login);
app.use("/auth", auth);

app.use("/company", company);
app.use("/branch", branch);
app.use("/privilage", privilage);
app.use("/supplier", supplier);
app.use("/common", common);

app.use("/user", user);
app.use("/district", district);
app.use("/api", apiRouter);


app.listen(port, function () {
  console.log("Runnning on " + port);
});
module.exports = app;
