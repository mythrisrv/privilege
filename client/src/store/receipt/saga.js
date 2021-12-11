import { takeEvery, put, call, takeLatest } from "redux-saga/effects";

import{
    GET_RECEIPTS

}from "./actionTypes";

import{
    getReceiptsSuccess,
    getReceiptsFail
   

}from "./actions";

import {getReceipts}from "../../helpers/backend_helper";

function* fetchReceipts() {
    try {
      const response = yield call(getReceipts);
      yield put(getReceiptsSuccess(response));
    } catch (error) {
      yield put(getReceiptsFail(error));
    }
  }

  function* receiptSaga() {
    yield takeEvery(GET_RECEIPTS, fetchReceipts);
  }  


export default receiptSaga;