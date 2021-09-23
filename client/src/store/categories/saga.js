import { takeEvery, put, call, takeLatest } from "redux-saga/effects";

import {
  GET_CATEGORY,
  ADD_CATEGORY,
  DELETE_CATEGORY,
  UPDATE_CATEGORY,
  GET_CATEGORIES,
  GET_CATEGORIES_OPTIONS
} from "./actionTypes";

import {
  getCategoriesSuccess,
  getCategoriesFail,
  getCategorySuccess,
  getCategoryFail,
  addCategoryFail,
  addCategorySuccess,
  updateCategoryFail,
  updateCategorySuccess,
  deleteCategoryFail,
  deleteCategorySuccess,
  getCategoriesOptionsSuccess,
  getCategoriesOptionsFail,
} from "./actions";

//Include Both Helper File with needed methods
import {
  getCategories,
  getCategory,
  addCategory,
  updateCategory,
  deleteCategory,
  getCategoriesOptions
} from "../../helpers/backend_helper";

function* fetchCategories() {
  try {
    const response = yield call(getCategories);
    yield put(getCategoriesSuccess(response));
  } catch (error) {
    yield put(getCategoriesFail(error));
  }
}

function* onGetCategory() {
  try {
    const response = yield call(getCategory);
    yield put(getCategorySuccess(response));
  } catch (error) {
    yield put(getCategoryFail(error.response));
  }
}

function* onAddCategory({ payload: category }) {
  try {
    const response = yield call(addCategory, category);
    yield put(addCategorySuccess(response));
  } catch (error) {
    yield put(addCategoryFail(error.response));
  }
}

function* onUpdateCategory({ payload: category }) {
  console.log(category);
  try {
    const response = yield call(updateCategory, category);
    yield put(updateCategorySuccess(response));
  } catch (error) {
    yield put(updateCategoryFail(error.response));
  }
}

function* onDeleteCategpory({ payload: categoryId }) {
  try {
    const response = yield call(deleteCategory, categoryId);
    yield put(deleteCategorySuccess(response));
  } catch (error) {
    yield put(deleteCategoryFail(error.response));
  }
}
function* fetchCategories2() {
  try {
    const response = yield call(getCategoriesOptions);
    yield put(getCategoriesOptionsSuccess(response));
  } catch (error) {
    yield put(getCategoriesOptionsFail(error));
  }
}
function* categorySaga() {
  yield takeEvery(GET_CATEGORIES, fetchCategories);
  yield takeEvery(GET_CATEGORY, onGetCategory);
  yield takeEvery(ADD_CATEGORY, onAddCategory);
  yield takeEvery(UPDATE_CATEGORY, onUpdateCategory);
  yield takeEvery(DELETE_CATEGORY, onDeleteCategpory);
  yield takeEvery(GET_CATEGORIES_OPTIONS, fetchCategories2);
}


export default categorySaga;
