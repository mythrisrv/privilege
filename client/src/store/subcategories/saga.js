import { takeEvery, put, call, takeLatest } from "redux-saga/effects";

import {
  GET_SUBCATEGORY,
  ADD_SUBCATEGORY,
  DELETE_SUBCATEGORY,
  UPDATE_SUBCATEGORY,
  GET_SUBCATEGORIES,
} from "./actionTypes";

import {
  getSubcategoriesSuccess,
  getSubcategoriesFail,
  getSubcategorySuccess,
  getSubcategoryFail,
  addSubcategoryFail,
  addSubcategorySuccess,
  updateSubcategoryFail,
  updateSubcategorySuccess,
  deleteSubcategoryFail,
  deleteSubcategorySuccess,
} from "./actions";

//Include Both Helper File with needed methods
import {
  getSubcategories,
  getSubcategory,
  addSubcategory,
  updateSubcategory,
  deleteSubcategory,
} from "../../helpers/backend_helper";

function* fetchSubcategories() {
  try {
    const response = yield call(getSubcategories);
    yield put(getSubcategoriesSuccess(response));
  } catch (error) {
    yield put(getSubcategoriesFail(error));
  }
}

function* onGetSubcategory() {
  try {
    const response = yield call(getSubcategory);
    yield put(getSubcategorySuccess(response));
  } catch (error) {
    yield put(getSubcategoryFail(error.response));
  }
}

function* onAddSubcategory({ payload: subcategory }) {
  try {
    const response = yield call(addSubcategory, subcategory);
    yield put(addSubcategorySuccess(response));
  } catch (error) {
    yield put(addSubcategoryFail(error.response));
  }
}

function* onUpdateSubcategory({ payload: subcategory }) {
  console.log(subcategory);
  try {
    const response = yield call(updateSubcategory, subcategory);
    yield put(updateSubcategorySuccess(response));
  } catch (error) {
    yield put(updateSubcategoryFail(error.response));
  }
}

function* onDeleteSubcategory({ payload: subcategoryId }) {
  try {
    const response = yield call(deleteSubcategory, subcategoryId);
    yield put(deleteSubcategorySuccess(response));
  } catch (error) {
    yield put(deleteSubcategoryFail(error.response));
  }
}

function* subcategorySaga() {
  yield takeEvery(GET_SUBCATEGORIES, fetchSubcategories);
  yield takeEvery(GET_SUBCATEGORY, onGetSubcategory);
  yield takeEvery(ADD_SUBCATEGORY, onAddSubcategory);
  yield takeEvery(UPDATE_SUBCATEGORY, onUpdateSubcategory);
  yield takeEvery(DELETE_SUBCATEGORY, onDeleteSubcategory);
}

export default subcategorySaga;
