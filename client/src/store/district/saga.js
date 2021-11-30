import { takeEvery, put, call, takeLatest } from "redux-saga/effects";

import {
  GET_DISTRICT,
  ADD_DISTRICT,
  DELETE_DISTRICT,
  UPDATE_DISTRICT,
  GET_DISTRICTS,
  GET_DISTRICT_OPTIONS,
  
} from "./actionTypes";

import {
  getDistrictsSuccess,
  getDistrictsFail,
  getDistrictSuccess,
  getDistrictFail,
  addDistrictFail,
  addDistrictSuccess,
  updateDistrictFail,
  updateDistrictSuccess,
  deleteDistrictFail,
  deleteDistrictSuccess,
  getDistrictOptionsSuccess,
  getDistrictOptionsFail,
  
} from "./actions";

//Include Both Helper File with needed methods
import {
  getDistricts,
  getDistrict,
  addDistrict,
  updateDistrict,
  deleteDistrict,
  getDistrictOptions,
} from "../../helpers/backend_helper";
function* fetchDistrictOptions() {
  try {
    const response = yield call(getDistrictOptions);
    yield put(getDistrictOptionsSuccess(response));
  } catch (error) {
    yield put(getDistrictOptionsFail(error));
  }
}

function* fetchDistricts() {
  try {
    const response = yield call(getDistricts);
    yield put(getDistrictsSuccess(response));
  } catch (error) {
    yield put(getDistrictsFail(error));
  }
}

function* onGetDistrict() {
  try {
    const response = yield call(getDistrict);
    yield put(getDistrictSuccess(response));
  } catch (error) {
    yield put(getDistrictFail(error.response));
  }
}

function* onAddDistrict({ payload: user }) {
  try {
    const response = yield call(addDistrict, user);
    yield put(addDistrictSuccess(response));
  } catch (error) {
    yield put(addDistrictFail(error.response));
  }
}

function* onUpdateDistrict({ payload: user }) {
  delete user.name1;
  delete user.privilage1;
  delete user.company1;
  delete user.branch1;
  delete user.action;
  console.log(user);
  if (user.privilage) {
    user.privilage = user.privilage._id;
  }
  if (user.company) {
    user.company = user.company._id;
  }
  if (user.branch) {
    user.branch = user.branch._id;
  }

  try {
    const response = yield call(updateDistrict, user);
    yield put(updateDistrictSuccess(response));
  } catch (error) {
    yield put(updateDistrictFail(error.response));
  }
}

function* onDeleteDistrict({ payload: userId }) {
  try {
    const response = yield call(deleteDistrict, userId);
    yield put(deleteDistrictSuccess(response));
  } catch (error) {
    yield put(deleteDistrictFail(error.response));
  }
}


function* districtSaga() {
  yield takeEvery(GET_DISTRICT_OPTIONS, fetchDistrictOptions);
  yield takeEvery(GET_DISTRICTS, fetchDistricts);
  yield takeEvery(GET_DISTRICT, onGetDistrict);
  yield takeEvery(ADD_DISTRICT, onAddDistrict);
  yield takeEvery(UPDATE_DISTRICT, onUpdateDistrict);
  yield takeEvery(DELETE_DISTRICT, onDeleteDistrict);
 

}

export default districtSaga;
