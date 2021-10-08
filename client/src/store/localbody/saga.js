import { takeEvery, put, call, takeLatest } from "redux-saga/effects";

import {
  GET_LOCALBODY,
  ADD_LOCALBODY,
  DELETE_LOCALBODY,
  UPDATE_LOCALBODY,
  GET_LOCALBODIES,
} from "./actionTypes";

import {
  getLocalbodiesSuccess,
  getLocalbodiesFail,
  getLocalbodySuccess,
  getLocalbodyFail,
  addLocalbodyFail,
  addLocalbodySuccess,
  updateLocalbodyFail,
  updateLocalbodySuccess,
  deleteLocalbodyFail,
  deleteLocalbodySuccess,
} from "./actions";

//Include Both Helper File with needed methods
import {
  getLocalbodies,
  getLocalbody,
  addLocalbody,
  updateLocalbody,
  deleteLocalbody
  
} from "../../helpers/backend_helper";

function* fetchLocalbodies() {
  try {
    const response = yield call(getLocalbodies);
    yield put(getLocalbodiesSuccess(response));
  } catch (error) {
    yield put(getLocalbodiesFail(error));
  }
}

function* onGetLocalbody() {
  try {
    const response = yield call(getLocalbody);
    yield put(getLocalbodySuccess(response));
  } catch (error) {
    yield put(getLocalbodyFail(error.response));
  }
}

function* onAddLocalbody({ payload: localbody }) {
  try {
    const response = yield call(addLocalbody, localbody);
    yield put(addLocalbodySuccess(response));
  } catch (error) {
    yield put(addLocalbodyFail(error.response));
  }
}

function* onUpdateLocalbody({ payload: localbody }) {
  delete localbody.name1;
  delete localbody.privilage1;
  delete localbody.company1;
  delete localbody.branch1;
  delete localbody.action;
  console.log(localbody);
  if (localbody.privilage) {
    localbody.privilage = localbody.privilage._id;
  }
  if (localbody.company) {
    localbody.company = localbody.company._id;
  }
  if (localbody.branch) {
    localbody.branch = localbody.branch._id;
  }

  try {
    const response = yield call(updateLocalbody, localbody);
    yield put(updateLocalbodySuccess(response));
  } catch (error) {
    yield put(updateLocalbodyFail(error.response));
  }
}

function* onDeleteLocalbody({ payload: localbodyId }) {
  try {
    const response = yield call(deleteLocalbody, localbodyId);
    yield put(deleteLocalbodySuccess(response));
  } catch (error) {
    yield put(deleteLocalbodyFail(error.response));
  }
}

function* localbodySaga() {
  yield takeEvery(GET_LOCALBODIES, fetchLocalbodies);
  yield takeEvery(GET_LOCALBODY, onGetLocalbody);
  yield takeEvery(ADD_LOCALBODY, onAddLocalbody);
  yield takeEvery(UPDATE_LOCALBODY, onUpdateLocalbody);
  yield takeEvery(DELETE_LOCALBODY, onDeleteLocalbody);
}

export default localbodySaga;
