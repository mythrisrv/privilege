import { combineReducers } from "redux";

// Front
import Layout from "./layout/reducer";

// Authentication
import Login from "./auth/login/reducer";
import Account from "./auth/register/reducer";
import ForgetPassword from "./auth/forgetpwd/reducer";
import Profile from "./auth/profile/reducer";
import Menus from "./menu/reducer";

import users from "./users/reducer";
import privilages from "./privilages/reducer";
import companies from "./companies/reducer";
import branches from "./branches/reducer";
import districts from "./district/reducer";
//Ward
import wards from "./ward/reducer";
//Localbody
import localbodies from "./localbody/reducer";

//group
import groups from "./group/reducer";
 
//customers

import customers  from "./customer/reducer"

//wasteitems
import wasteItems from "./wasteItem/reducer"

//customer category
import customerCategory from "./customerCategory/reducer"

import qrcodes from "./qrCode/reducer"
import tariff from "./tariff/reducer"
import invoice from "./invoice/reducer"
import receipt from "./receipt/reducer"
import packageList from "./package/reducer"

const rootReducer = combineReducers({
  // public
  Layout,
  Login,
  Account,
  ForgetPassword,
  Profile,
  users,
  privilages,
  companies,
  branches,
  districts,
  wards,
  localbodies,
  groups,
  customers,
Menus,
  wasteItems,
  customerCategory,
  qrcodes,
  tariff,
  invoice,
  receipt,
  packageList,
});

export default rootReducer;
