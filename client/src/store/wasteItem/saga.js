import { takeEvery, put, call, takeLatest } from "redux-saga/effects";

import{
GET_WASTEITEMS,
GET_WASTE_TYPES,
GET_WASTE_CATEGORIES,
ADD_WASTE_ITEM,
UPDATE_WASTE_ITEM,
DELETE_WASTE_ITEM,
GET_WASTEITEMS_OPTIONS
} from "./actionTypes"

import{
getWasteItemsSuccess,
getWasteItemsFail,
getWasteTypesSuccess,
getWasteTypesFail,
getWasteCategoriesSuccess,
getWasteCategoriesFail,
addWasteItemFail,
addWasteItemSuccess,
updateWasteItemFail,
updateWasteItemSuccess,
deleteWasteItemFail,
deleteWasteItemSuccess,
getWasteItemsOptionsSuccess,
getWasteItemsOptionsFail

} from "./actions"

import {getWasteItems,
  getWasteTypes,
  getWasteCategories,
  addWasteItem,
  updateWasteItem,
deleteWasteItem,getWasteItemsOptions} from "../../helpers/backend_helper"

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

 

  function* onAddWasteItem({ payload: wasteItem }) {
    
    try {
      const response = yield call(addWasteItem, wasteItem);
      yield put(addWasteItemSuccess(response));
    } catch (error) {
      yield put(addWasteItemFail(error.response));
    }
  }
  function* onUpdateWasteItem({ payload: wasteItem }) {
    delete wasteItem.name1;
    delete wasteItem.privilage1;
    delete wasteItem.company1;
    delete wasteItem.branch1;
    delete wasteItem.action;
    console.log(wasteItem);
    if (wasteItem.privilage) {
      wasteItem.privilage = wasteItem.privilage._id;
    }
    if (wasteItem.company) {
      wasteItem.company = wasteItem.company._id;
    }
    if (wasteItem.branch) {
      wasteItem.branch = wasteItem.branch._id;
    }
  
    try {
      const response = yield call(updateWasteItem, wasteItem);
      yield put(updateWasteItemSuccess(response));
    } catch (error) {
      yield put(updateWasteItemFail(error.response));
    }
  }
  
  function* onDeleteWasteItem({ payload: wasteItemId }) {
    try {
      const response = yield call(deleteWasteItem, wasteItemId);
      yield put(deleteWasteItemSuccess(response));
    } catch (error) {
      yield put(deleteWasteItemFail(error.response));
    }
  }

  function* fetchWasteItemsOptions() {
    try {
      const response = yield call(getWasteItemsOptions);
      yield put(getWasteItemsOptionsSuccess(response));
    } catch (error) {
      yield put(getWasteItemsOptionsFail(error));
    }
  }
  function* wasteItemSaga() {
    yield takeEvery(GET_WASTEITEMS, fetchWasteItems);
    yield takeEvery(GET_WASTE_TYPES, fetchWasteTypes);
    yield takeEvery(GET_WASTE_CATEGORIES, fetchWasteCategories);
    yield takeEvery(ADD_WASTE_ITEM,onAddWasteItem);
    yield takeEvery(UPDATE_WASTE_ITEM,onUpdateWasteItem);
    yield takeEvery(DELETE_WASTE_ITEM,onDeleteWasteItem);
    yield takeEvery(GET_WASTEITEMS_OPTIONS, fetchWasteItemsOptions);

  }
  




  export default wasteItemSaga;