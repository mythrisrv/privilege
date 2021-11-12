import { takeEvery, put, call, takeLatest } from "redux-saga/effects";

import{
GET_WASTEITEMS
} from "./actionTypes"

import{
getWasteItemsSuccess,
getWasteItemsFail

} from "./actions"

import {getWasteItems} from "../../helpers/backend_helper"

function* fetchWasteItems() {
    try {
      const response = yield call(getWasteItems);
      yield put(getWasteItemsSuccess(response));
    } catch (error) {
      yield put(getWasteItemsFail(error));
    }
  }

  function* wasteItemSaga() {
    yield takeEvery(GET_WASTEITEMS, fetchWasteItems);
  }

  export default wasteItemSaga;