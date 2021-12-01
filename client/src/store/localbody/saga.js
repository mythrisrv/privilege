import { takeEvery, put, call, takeLatest } from "redux-saga/effects";

import {
  GET_LOCALBODY,
  ADD_LOCALBODY,
  DELETE_LOCALBODY,
  UPDATE_LOCALBODY,
  GET_LOCALBODIES,
  GET_LOCALBODY_TYPES,
  GET_LOCALBODY_OPTIONS,
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
  getLocalbodyTypesSuccess,
  getLocalbodyTypesFail,
  getLocalbodyOptionsSuccess,
  getLocalbodyOptionsFail,
} from "./actions";

//Include Both Helper File with needed methods
import {
  getLocalbodies,
  getLocalbody,
  addLocalbody,
  updateLocalbody,
  deleteLocalbody,
  getLocalbodyTypes,
  getLocalbodyOptions,
  
} from "../../helpers/backend_helper";

function* fetchLocalbodies() {
  try {
    const response = yield call(getLocalbodies);
    yield put(getLocalbodiesSuccess(response));
  } catch (error) {
    yield put(getLocalbodiesFail(error));
  }
}
function* fetchLocalbodyOptions() {
  try {
    const response = yield call(getLocalbodyOptions);
    yield put(getLocalbodyOptionsSuccess(response));
  } catch (error) {
    yield put(getLocalbodyOptionsFail(error));
  }
}
function* fetchLocalbodyTypes() {
  try {
    const response = yield call(getLocalbodyTypes);
    yield put(getLocalbodyTypesSuccess(response));
  } catch (error) {
    yield put(getLocalbodyTypesFail(error));
  }
}

function* onGetLocalbody({payload:localbodyId}) {
  try {
    const response = yield call(getLocalbody,localbodyId);
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
  delete localbody.company_name;
  delete localbody.district_name;
  delete localbody.localbody_type;
  delete localbody.branch1;
  delete localbody.action;
  console.log(localbody);
  if (localbody.district) {
    localbody.dist_id = localbody.district._id;
  }
  if (localbody.company) {
    localbody.localbody_company = localbody.company._id;
  }
  if (localbody.localbodytype) {
    localbody.local_body_id = localbody.localbodytype._id;
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
  yield takeEvery(GET_LOCALBODY_TYPES, fetchLocalbodyTypes);
  yield takeEvery(GET_LOCALBODY_OPTIONS, fetchLocalbodyOptions);
}

export default localbodySaga;
