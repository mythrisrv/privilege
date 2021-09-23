import { takeEvery, put, call, takeLatest } from "redux-saga/effects";

import {
  GET_THIRDCATEGORY,
  ADD_THIRDCATEGORY,
  DELETE_THIRDCATEGORY,
  UPDATE_THIRDCATEGORY,
  GET_THIRDCATEGORIES,
} from "./actionTypes";

import {
  getThirdcategoriesSuccess,
  getThirdcategoriesFail,
  getThirdcategorySuccess,
  getThirdcategoryFail,
  addThirdcategoryFail,
  addThirdcategorySuccess,
  updateThirdcategoryFail,
  updateThirdcategorySuccess,
  deleteThirdcategoryFail,
  deleteThirdcategorySuccess,
} from "./actions";

//Include Both Helper File with needed methods
import {
  getThirdcategories,
  getThirdcategory,
  addThirdcategory,
  updateThirdcategory,
  deleteThirdcategory,
} from "../../helpers/backend_helper";

function* fetchThirdcategories() {
  try {
    const response = yield call(getThirdcategories);
    yield put(getThirdcategoriesSuccess(response));
  } catch (error) {
    yield put(getThirdcategoriesFail(error));
  }
}

function* onGetThirdcategory() {
  try {
    const response = yield call(getThirdcategory);
    yield put(getThirdcategorySuccess(response));
  } catch (error) {
    yield put(getThirdcategoryFail(error.response));
  }
}

function* onAddThirdcategory({ payload: thirdcategory }) {
  try {
    const response = yield call(addThirdcategory, thirdcategory);
    yield put(addThirdcategorySuccess(response));
  } catch (error) {
    yield put(addThirdcategoryFail(error.response));
  }
}

function* onUpdateThirdcategory({ payload: thirdcategory }) {
  console.log(thirdcategory);
  try {
    const response = yield call(updateThirdcategory, thirdcategory);
    yield put(updateThirdcategorySuccess(response));
  } catch (error) {
    yield put(updateThirdcategoryFail(error.response));
  }
}

function* onDeleteThirdcategory({ payload: thirdcategoryId }) {
  try {
    const response = yield call(deleteThirdcategory, thirdcategoryId);
    yield put(deleteThirdcategorySuccess(response));
  } catch (error) {
    yield put(deleteThirdcategoryFail(error.response));
  }
}

function* thirdcategorySaga() {
  yield takeEvery(GET_THIRDCATEGORIES, fetchThirdcategories);
  yield takeEvery(GET_THIRDCATEGORY, onGetThirdcategory);
  yield takeEvery(ADD_THIRDCATEGORY, onAddThirdcategory);
  yield takeEvery(UPDATE_THIRDCATEGORY, onUpdateThirdcategory);
  yield takeEvery(DELETE_THIRDCATEGORY, onDeleteThirdcategory);
}

export default thirdcategorySaga;
