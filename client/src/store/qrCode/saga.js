import { takeEvery, put, call, takeLatest } from "redux-saga/effects";

import{
GET_QRCODE,
ADD_QRCODE
} from "./actionTypes"

import {
    getQrcodesSuccess,
    getQrcodeFail,
    addQrcodeSuccess,
    addQrcodeFail
}from "./actions"

import {
    getQrcode,
    addQrcode

} from "../../helpers/backend_helper";
function* fetchQrcode() {
    try {
      const response = yield call(getQrcode);
      yield put(getQrcodesSuccess(response));
    } catch (error) {
      yield put(getQrcodeFail(error));
    }
  }


  function* onAddQrcode({ payload: data }) {
    try {
      const response = yield call(addQrcode, data);
      yield put(addQrcodeSuccess(response));
    } catch (error) {
      yield put(addQrcodeFail(error.response));
    }
  }

  function* qrcodeSaga() {
    yield takeEvery(GET_QRCODE, fetchQrcode);
    yield takeEvery(ADD_QRCODE, onAddQrcode);
  }
  export default qrcodeSaga;