import { takeEvery, put, call, takeLatest } from "redux-saga/effects";

import{
    GET_INVOICE,
    GET_INVOICE_LIST,

}from "./actionTypes";

import{
    getInvoiceSuccess,
    getInvoiceFail,
    getInvoiceListSuccess,
    getInvoiceListFail

}from "./actions";

import {getInvoice,getInvoiceList}from "../../helpers/backend_helper";

function* fetchInvoice() {
    try {
      const response = yield call(getInvoice);
      yield put(getInvoiceSuccess(response));
    } catch (error) {
      yield put(getInvoiceFail(error));
    }
  }
  function* fetchInvoiceList() {
    try {
      const response = yield call(getInvoiceList);
      yield put(getInvoiceListSuccess(response));
    } catch (error) {
      yield put(getInvoiceListFail(error));
    }
  }

  function* invoiceSaga() {
    yield takeEvery(GET_INVOICE, fetchInvoice)
    yield takeEvery(GET_INVOICE_LIST, fetchInvoiceList);
  }  


export default invoiceSaga;