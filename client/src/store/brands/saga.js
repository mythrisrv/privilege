import { takeEvery, put, call, takeLatest } from "redux-saga/effects";

import {
  GET_BRAND,
  ADD_BRAND,
  DELETE_BRAND,
  UPDATE_BRAND,
  GET_BRANDS,
} from "./actionTypes";

import {
  getBrandsSuccess,
  getBrandsFail,
  getBrandSuccess,
  getBrandFail,
  addBrandFail,
  addBrandSuccess,
  updateBrandFail,
  updateBrandSuccess,
  deleteBrandFail,
  deleteBrandSuccess,
} from "./actions";

//Include Both Helper File with needed methods
import {
  getBrands,
  getBrand,
  addBrand,
  updateBrand,
  deleteBrand,
} from "../../helpers/backend_helper";

function* fetchBrands() {
  try {
    const response = yield call(getBrands);
    yield put(getBrandsSuccess(response));
  } catch (error) {
    yield put(getBrandsFail(error));
  }
}

function* onGetBrand() {
  try {
    const response = yield call(getBrand);
    yield put(getBrandSuccess(response));
  } catch (error) {
    yield put(getBrandFail(error.response));
  }
}

function* onAddBrand({ payload: brand }) {
  try {
    const response = yield call(addBrand, brand);
    yield put(addBrandSuccess(response));
  } catch (error) {
    yield put(addBrandFail(error.response));
  }
}

function* onUpdateBrand({ payload: brand }) {
  console.log(brand);
  try {
    const response = yield call(updateBrand, brand);
    yield put(updateBrandSuccess(response));
  } catch (error) {
    yield put(updateBrandFail(error.response));
  }
}

function* onDeleteBrand({ payload: brandId }) {
  try {
    const response = yield call(deleteBrand, brandId);
    yield put(deleteBrandSuccess(response));
  } catch (error) {
    yield put(deleteBrandFail(error.response));
  }
}

function* brandSaga() {
  yield takeEvery(GET_BRANDS, fetchBrands);
  yield takeEvery(GET_BRAND, onGetBrand);
  yield takeEvery(ADD_BRAND, onAddBrand);
  yield takeEvery(UPDATE_BRAND, onUpdateBrand);
  yield takeEvery(DELETE_BRAND, onDeleteBrand);
}

export default brandSaga;