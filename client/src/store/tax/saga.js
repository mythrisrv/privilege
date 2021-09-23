import { takeEvery, put, call, takeLatest } from "redux-saga/effects";

import {
  GET_TAX,
  ADD_TAX,
  DELETE_TAX,
  UPDATE_TAX,
  GET_TAXES,
} from "./actionTypes";

import {
  getTaxesSuccess,
  getTaxesFail,
  getTaxSuccess,
  getTaxFail,
  addTaxFail,
  addTaxSuccess,
  updateTaxFail,
  updateTaxSuccess,
  deleteTaxFail,
  deleteTaxSuccess,
} from "./actions";

//Include Both Helper File with needed methods
import {
  getTaxes,
  getTax,
  addTax,
  updateTax,
  deleteTax,
} from "../../helpers/backend_helper";

function* fetchTaxes() {
  try {
    const response = yield call(getTaxes);
    yield put(getTaxesSuccess(response));
  } catch (error) {
    yield put(getTaxesFail(error));
  }
}

function* onGetTax() {
  try {
    const response = yield call(getTax);
    yield put(getTaxSuccess(response));
  } catch (error) {
    yield put(getTaxFail(error.response));
  }
}

function* onAddTax({ payload: tax }) {
  try {
    const response = yield call(addTax, tax);
    yield put(addTaxSuccess(response));
  } catch (error) {
    yield put(addTaxFail(error.response));
  }
}

function* onUpdateTax({ payload: tax }) {
  console.log(tax);
  try {
    const response = yield call(updateTax, tax);
    yield put(updateTaxSuccess(response));
  } catch (error) {
    yield put(updateTaxFail(error.response));
  }
}

function* onDeleteTax({ payload: taxId }) {
  try {
    const response = yield call(deleteTax, taxId);
    yield put(deleteTaxSuccess(response));
  } catch (error) {
    yield put(deleteTaxFail(error.response));
  }
}

function* taxSaga() {
  yield takeEvery(GET_TAXES, fetchTaxes);
  yield takeEvery(GET_TAX, onGetTax);
  yield takeEvery(ADD_TAX, onAddTax);
  yield takeEvery(UPDATE_TAX, onUpdateTax);
  yield takeEvery(DELETE_TAX, onDeleteTax);
}

export default taxSaga;
