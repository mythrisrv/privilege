import { takeEvery, put, call, takeLatest } from "redux-saga/effects";

import{
    GET_INVOICE

}from "./actionTypes";

import{
    getInvoiceSuccess,
    getInvoiceFail

}from "./actions";

import {getInvoice}from "../../helpers/backend_helper";

function* fetchInvoice() {
    try {
      const response = yield call(getInvoice);
      yield put(getInvoiceSuccess(response));
    } catch (error) {
      yield put(getInvoiceFail(error));
    }
  }

  function* invoiceSaga() {
    yield takeEvery(GET_INVOICE, fetchInvoice);
  }  


export default invoiceSaga;