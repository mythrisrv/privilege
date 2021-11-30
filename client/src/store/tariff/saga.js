import { takeEvery, put, call, takeLatest } from "redux-saga/effects";

import {
  GET_TARIFF,
  GET_TARIFF_OPTIONS,
  UPDATE_TARIFF_STATUS

}from "./actionTypes"

import {
    getTariffFail,
    getTariffSuccess,
    getTariffOptionsSuccess,
    getTariffOptionsFail,
    updateTariffSuccess,
    updateTariffFail,
    

} from "./actions"

import {getTariff,getTariffOptions,updateTariffStatus} from "../../helpers/backend_helper"

function* fetchTariff() {
    try {
      const response = yield call(getTariff);
      yield put(getTariffSuccess(response));
    } catch (error) {
      yield put(getTariffFail(error));
    }
  }

  function* fetchPackageOptions() {
    try {
      const response = yield call(getTariffOptions);
      yield put(getTariffOptionsSuccess(response));
    } catch (error) {
      yield put(getTariffOptionsFail(error));
    }
  }

  function* onUpdateTariff({ payload: tariffId}) {
    
  
    try {
      const response = yield call(updateTariffStatus, tariffId);
      yield put(updateTariffSuccess(response));
    } catch (error) {
      yield put(updateTariffFail(error.response));
    }
  }
  
  function* tariffSaga() {
    yield takeEvery(GET_TARIFF, fetchTariff);
    yield takeEvery(GET_TARIFF_OPTIONS, fetchPackageOptions);
    yield takeEvery(UPDATE_TARIFF_STATUS, onUpdateTariff);
  }

  export default tariffSaga;