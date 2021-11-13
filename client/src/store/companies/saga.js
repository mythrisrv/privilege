import { takeEvery, put, call } from "redux-saga/effects";

import { GET_COMPANIES_OPTIONS,GET_COMPANIES_MASTER_OPTIONS } from "./actionTypes";

import { getCompaniesOptionsSuccess, getCompaniesOptionsFail, getCompaniesMasterOptionsSuccess, getCompaniesMasterOptionsFail } from "./actions";

//Include Both Helper File with needed methods
import { getCompaniesOptions, getCompaniesMasterOptions } from "../../helpers/backend_helper";

function* fetchCompanies() {
  try {
    const response = yield call(getCompaniesOptions);
    yield put(getCompaniesOptionsSuccess(response));
  } catch (error) {
    yield put(getCompaniesOptionsFail(error));
  }
}

function* fetchMasterCompanies({company_id:company_id}) {
  try {
    const response = yield call(getCompaniesMasterOptions,company_id);
    yield put(getCompaniesMasterOptionsSuccess(response));
  } catch (error) {
    yield put(getCompaniesMasterOptionsFail(error));
  }
}
function* companiesSaga() {
  yield takeEvery(GET_COMPANIES_OPTIONS, fetchCompanies);
  yield takeEvery(GET_COMPANIES_MASTER_OPTIONS, fetchMasterCompanies);
}

export default companiesSaga;
