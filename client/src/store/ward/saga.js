import { takeEvery, put, call, takeLatest } from "redux-saga/effects";

import {
  GET_WARD,
  ADD_WARD,
  DELETE_WARD,
  UPDATE_WARD,
  GET_WARDS,
} from "./actionTypes";

import {
  getWardsSuccess,
  getWardsFail,
  getWardSuccess,
  getWardFail,
  addWardFail,
  addWardSuccess,
  updateWardFail,
  updateWardSuccess,
  deleteWardFail,
  deleteWardSuccess,
} from "./actions";

//Include Both Helper File with needed methods
import {
  getWards,
  getWard,
  addWard,
  updateWard,
  deleteWard,
} from "../../helpers/backend_helper";

function* fetchWards() {
  try {
    const response = yield call(getWards);
    yield put(getWardsSuccess(response));
  } catch (error) {
    yield put(getWardsFail(error));
  }
}

function* onGetWard() {
  try {
    const response = yield call(getWard);
    yield put(getWardSuccess(response));
  } catch (error) {
    yield put(getWardFail(error.response));
  }
}

function* onAddWard({ payload: ward }) {
  try {
    const response = yield call(addWard, ward);
    yield put(addWardSuccess(response));
  } catch (error) {
    yield put(addWardFail(error.response));
  }
}

function* onUpdateWard({ payload: ward }) {
  delete ward.name1;
  delete ward.privilage1;
  delete ward.company1;
  delete ward.branch1;
  delete ward.action;
  console.log(ward);
  if (ward.privilage) {
    ward.privilage = ward.privilage._id;
  }
  if (ward.company) {
    ward.company = ward.company._id;
  }
  if (ward.branch) {
    ward.branch = ward.branch._id;
  }

  try {
    const response = yield call(updateWard, ward);
    yield put(updateWardSuccess(response));
  } catch (error) {
    yield put(updateWardFail(error.response));
  }
}

function* onDeleteWard({ payload: wardId }) {
  try {
    const response = yield call(deleteWard, wardId);
    yield put(deleteWardSuccess(response));
  } catch (error) {
    yield put(deleteWardFail(error.response));
  }
}

function* wardSaga() {
  yield takeEvery(GET_WARDS, fetchWards);
  yield takeEvery(GET_WARD, onGetWard);
  yield takeEvery(ADD_WARD, onAddWard);
  yield takeEvery(UPDATE_WARD, onUpdateWard);
  yield takeEvery(DELETE_WARD, onDeleteWard);
}

export default wardSaga;
