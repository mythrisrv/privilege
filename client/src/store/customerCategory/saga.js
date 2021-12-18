import { takeEvery, put, call, takeLatest } from "redux-saga/effects";

import{
GET_CUST_CATEGORIES,
ADD_CUST_CATEGORY,
UPDATE_CUST_CATEGORY,
DELETE_CUST_CATEGORY,
GET_CUST_CATEGORIES_OPTIONS

} from "./actionTypes";

import{
   getCustomerCategoriesSuccess,
   getCustomerCategoriesFail,
   addCategorySuccess,
   addCategoryFail,
   updateCategorySuccess,
   updateCategoryFail,
   deleteCategorySuccess,
   deleteCategoryFail,
   getCustomerCategoriesOptionsSuccess,
   getCustomerCategoriesOptionsFail
} from "./actions";

import{
    getCustomerCategories,
    getCategory,
    addCategory,
    updateCategory,
    deleteCategory,
    getCustomerCategoryOptions
} from "../../helpers/backend_helper"

function* fetchCategories() {
    try {
      const response = yield call(getCustomerCategories);
      yield put(getCustomerCategoriesSuccess(response));
    } catch (error) {
      yield put(getCustomerCategoriesFail(error));
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
    delete category.name1;
    delete category.privilage1;
    delete category.company1;
    delete category.branch1;
    delete category.action;
    //console.log(user);
   /* if (user.privilage) {
      user.privilage = user.privilage._id;
    }
    if (user.company) {
      user.company = user.company._id;
    }
    if (user.branch) {
      user.branch = user.branch._id;
    }*/
  
    try {
      const response = yield call(updateCategory, category);
      yield put(updateCategorySuccess(response));
    } catch (error) {
      yield put(updateCategoryFail(error.response));
    }
  }
  
  function* onDeleteCategory({ payload: catId}) {
    try {
      const response = yield call(deleteCategory, catId);
      yield put(deleteCategorySuccess(response));
    } catch (error) {
      yield put(deleteCategoryFail(error.response));
    }
  }

  function* fetchCategoriesOptions() {
    try {
      const response = yield call(getCustomerCategoryOptions);
      yield put(getCustomerCategoriesOptionsSuccess(response));
    } catch (error) {
      yield put(getCustomerCategoriesOptionsFail(error));
    }
  }

  function* customerCategorySaga() {
    yield takeEvery(GET_CUST_CATEGORIES, fetchCategories);
    yield takeEvery(ADD_CUST_CATEGORY, onAddCategory);
    yield takeEvery(UPDATE_CUST_CATEGORY, onUpdateCategory);
    yield takeEvery(DELETE_CUST_CATEGORY, onDeleteCategory);
    yield takeEvery(GET_CUST_CATEGORIES_OPTIONS, fetchCategoriesOptions);

  }

  export default customerCategorySaga;