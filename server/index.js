const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");

const port = process.env.PORT || 3099;
const env = process.env.NODE_ENV || "development";
const config = require("../config")[env];
const brand = require("./routes/brandroute");
const unit = require("./routes/unitroute");
const register = require("./routes/register");
const login = require("./routes/login");
const profile = require("./routes/profile");
const tax = require("./routes/taxroute");
const banner = require("./routes/bannerroute");
const subcategory = require("./routes/subcategoryroute");
const thirdcategory = require("./routes/thirdcategoryroute");
const slider = require("./routes/sliderroute");
const category = require("./routes/categoryroute");
const timeslot = require("./routes/timeslotroute");
const product = require("./routes/productroute");

const suppliers = require("./routes/suppliersroute");
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
app.use("/register", register);
app.use("/login", login);
app.use("/profile", profile);

//slider
app.use("/slider", slider);
app.use("/category", category);
app.use("/subcategory", subcategory);
app.use("/thirdcategory", thirdcategory);
app.use("/timeslot", timeslot);
app.use("/product", product);
app.use("/brand", brand);
app.use("/banner", banner);
app.use("/tax", tax);
app.use("/suppliers", suppliers);
app.use("/unit", unit);
app.listen(port, function () {
  console.log("Runnning on " + port);
});
module.exports = app;
