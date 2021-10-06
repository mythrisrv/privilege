import { combineReducers } from "redux";

// Front
import Layout from "./layout/reducer";

// Authentication
import Login from "./auth/login/reducer";
import Account from "./auth/register/reducer";
import ForgetPassword from "./auth/forgetpwd/reducer";
import Profile from "./auth/profile/reducer";

import users from "./users/reducer";
import privilages from "./privilages/reducer";
import companies from "./companies/reducer";
import branches from "./branches/reducer";
import districts from "./district/reducer";
//Ward
import wards from "./ward/reducer";
//Localbody
import localbodies from "./localbody/reducer";


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
  localbodies
});

export default rootReducer;
