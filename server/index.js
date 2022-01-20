const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const fs = require("express-fileupload");
const multer = require("multer");
const path=require("path");

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
const district = require("./routes/crm_district");
const Ward=require("./routes/crm_ward");
const Localbody =require("./routes/crm_localbody");
const apiRouter = require("./routes/apiRouter");
const getUserData = require("./routes/qrcodeSearch");
const listApi = require("./routes/ListingApi");
const customer = require("./routes/crm_customer");
const group=require("./routes/crm_group")
const wasteItem = require("./routes/wasteItemApi");
const userapi = require("./routes/UserApi");
const wasteItems=require("./routes/crm_wasteItems");
const menuRouter = require("./routes/menu");
const menu=require("./routes/menu");
const qrcode=require("./routes/crm_qrCode");
const tariff=require("./routes/crm_viewTariff");
const invoice=require("./routes/crm_viewInvoice")
const customerCategory=require("./routes/crm_custCategory");
const receipt=require("./routes/crm_viewReceipt")
const addTariff=require("./routes/crm_addTariff")
const states = require("./routes/states");
const cities = require("./routes/city");
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

app.use('/', express.static(path.join(__dirname, 'public'))); 

app.use("/setup", setup);
app.use("/register", register);
app.use("/login", login);
app.use("/auth", auth);

app.use("/company", company);
app.use("/branch", branch);
app.use("/privilage", privilage);
app.use("/supplier", supplier);
app.use("/common", common);
app.use("/state", states);
app.use("/user", user);
app.use("/district", district);
app.use("/ward",Ward);
app.use("/localbody",Localbody);
app.use("/api", apiRouter);
app.use("/group",group);

app.use("/city", cities);
app.use("/district", district);
app.use("/ListData",listApi)
app.use("/searchCustomerData",getUserData);
app.use("/customer",customer);
app.use("/wasteIteam",wasteItem);
app.use("/staff",userapi);
app.use("/wasteItems",wasteItems);
app.use("/menu",menu);
app.use("/customerCategory",customerCategory);
app.use("/qrcode",qrcode)
app.use("/tariff",tariff)
app.use("/invoice",invoice)
app.use("/receipt",receipt);
app.use("/addTariff",addTariff)

app.listen(port, function () {
  console.log("Runnning on " + port);
});
module.exports = app;
