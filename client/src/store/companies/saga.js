import { takeEvery, put, call } from "redux-saga/effects";

import { GET_COMPANIES_OPTIONS,GET_COMPANIES_MASTER_OPTIONS ,SAVE_SELECTED_COMPANY} from "./actionTypes";

import { getCompaniesOptionsSuccess, getCompaniesOptionsFail, 
  getCompaniesMasterOptionsSuccess, getCompaniesMasterOptionsFail,
saveCompanyNameSuccess,saveCompanyNameFail } from "./actions";

//Include Both Helper File with needed methods
import { getCompaniesOptions, getCompaniesMasterOptions,saveCompanyName } from "../../helpers/backend_helper";

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
function* onSavecompany({payload:data}) {
  try {
    const response = yield call(saveCompanyName,data);
    yield put(saveCompanyNameSuccess(response));
  } catch (error) {
    yield put(saveCompanyNameFail(error));
  }
}
function* companiesSaga() {
  yield takeEvery(GET_COMPANIES_OPTIONS, fetchCompanies);
  yield takeEvery(GET_COMPANIES_MASTER_OPTIONS, fetchMasterCompanies);
  yield takeEvery(SAVE_SELECTED_COMPANY,onSavecompany)
}

export default companiesSaga;
