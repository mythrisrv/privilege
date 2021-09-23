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
import categories from "./categories/reducer";
import subcategories from "./subcategories/reducer";
import thirdcategories from "./thirdcategories/reducer";
import sliders from "./sliders/reducer";
import brands from "./brands/reducer";
import units from "./unit/reducer";
import taxes from "./tax/reducer";


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
  categories,
  subcategories,
  thirdcategories,
  sliders,
  brands,
  units,
  taxes
});

export default rootReducer;
