import { all, fork } from "redux-saga/effects";

//public
import AccountSaga from "./auth/register/saga";
import AuthSaga from "./auth/login/saga";
import ForgetSaga from "./auth/forgetpwd/saga";
import ProfileSaga from "./auth/profile/saga";
import LayoutSaga from "./layout/saga";
import userSaga from "./users/saga";
import privilagesSaga from "./privilages/saga";
import companiesSaga from "./companies/saga";
import branchesSaga from "./branches/saga";
import categoriesSaga from "./categories/saga";
import subcategoriesSaga from "./subcategories/saga";
import thirdcategoriesSaga from "./thirdcategories/saga";
import slidersSaga from "./sliders/saga";


import brandsSaga from "./brands/saga";
import unitsSaga from "./unit/saga";
import taxSaga from "./tax/saga";
export default function* rootSaga() {
  yield all([
    //public
    AccountSaga(),
    fork(AuthSaga),
    ProfileSaga(),
    ForgetSaga(),
    fork(LayoutSaga),
    fork(userSaga),
    fork(privilagesSaga),
    fork(companiesSaga),
    fork(branchesSaga),
    fork(categoriesSaga),
    fork(subcategoriesSaga),
    fork(thirdcategoriesSaga),
    fork(slidersSaga),
    fork(brandsSaga),
    fork(unitsSaga),
    fork(taxSaga),
  ]);
}
