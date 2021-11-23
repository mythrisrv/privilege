import { takeEvery, put, call, takeLatest } from "redux-saga/effects";

import {
  GET_TARIFF  

}from "./actionTypes"

import {
    getTariffFail,
    getTariffSuccess

} from "./actions"

import {getTariff} from "../../helpers/backend_helper"

function* fetchTariff() {
    try {
      const response = yield call(getTariff);
      yield put(getTariffSuccess(response));
    } catch (error) {
      yield put(getTariffFail(error));
    }
  }

  function* tariffSaga() {
    yield takeEvery(GET_TARIFF, fetchTariff);
  }

  export default tariffSaga;