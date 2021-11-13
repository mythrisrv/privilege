import { takeEvery, put, call, takeLatest } from "redux-saga/effects";

import{
GET_WASTEITEMS,
GET_WASTE_TYPES,
GET_WASTE_CATEGORIES
} from "./actionTypes"

import{
getWasteItemsSuccess,
getWasteItemsFail,
getWasteTypesSuccess,
getWasteTypesFail,
getWasteCategoriesSuccess,
getWasteCategoriesFail,

} from "./actions"

import {getWasteItems,getWasteTypes,getWasteCategories} from "../../helpers/backend_helper"

function* fetchWasteItems() {
    try {
      const response = yield call(getWasteItems);
      yield put(getWasteItemsSuccess(response));
    } catch (error) {
      yield put(getWasteItemsFail(error));
    }
  }
  function* fetchWasteTypes() {
    try {
      const response = yield call(getWasteTypes);
      yield put(getWasteTypesSuccess(response));
    } catch (error) {
      yield put(getWasteTypesFail(error));
    }
  }

  function* fetchWasteCategories() {
    try {
      const response = yield call(getWasteCategories);
      yield put(getWasteCategoriesSuccess(response));
    } catch (error) {
      yield put(getWasteCategoriesFail(error));
    }
  }

  function* wasteItemSaga() {
    yield takeEvery(GET_WASTEITEMS, fetchWasteItems);
    yield takeEvery(GET_WASTE_TYPES, fetchWasteTypes);
    yield takeEvery(GET_WASTE_CATEGORIES, fetchWasteCategories);
  }

  export default wasteItemSaga;