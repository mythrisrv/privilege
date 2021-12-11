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
import districtSaga from "./district/saga";
//Ward
import wardSaga from "./ward/saga";
//Localbody
import localbodySaga from "./localbody/saga";
//Group
import groupSaga from "./group/saga"

//customer
import customerSaga from "./customer/saga";

//wasteitem
import wasteItemSaga from "./wasteItem/saga";

import menusSaga from "./menu/saga";

import customerCategorySaga from "./customerCategory/saga"
import qrcodeSaga from "./qrCode/saga"
import tariffSaga from "./tariff/saga"
import invoiceSaga from "./invoice/saga";
import receiptSaga from "./receipt/saga"

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
    fork(districtSaga),
    fork(wardSaga),
    fork(localbodySaga),
    fork(groupSaga),
    fork(customerSaga),
    fork(wasteItemSaga),
    fork(menusSaga),
    fork(customerCategorySaga),
    fork(qrcodeSaga),
    fork(tariffSaga),
    fork(invoiceSaga),
    fork(receiptSaga),
  ]);
}
