import {
  GET_BRANDS,
  GET_BRANDS_FAIL,
  GET_BRANDS_SUCCESS,
  ADD_BRAND,
  ADD_BRAND_FAIL,
  ADD_BRAND_SUCCESS,
  GET_BRAND,
  GET_BRAND_FAIL,
  GET_BRAND_SUCCESS,
  UPDATE_BRAND,
  UPDATE_BRAND_FAIL,
  UPDATE_BRAND_SUCCESS,
  DELETE_BRAND,
  DELETE_BRAND_FAIL,
  DELETE_BRAND_SUCCESS,
} from "./actionTypes";

export const getBrands = () => ({
  type: GET_BRANDS,
});

export const getBrandsSuccess = (brand) => ({
  type: GET_BRANDS_SUCCESS,
  payload: brand,
});

export const getBrandsFail = (error) => ({
  type: GET_BRANDS_FAIL,
  payload: error,
});

export const addBrand = (brand) => ({
  type: ADD_BRAND,
  payload: brand,
});

export const addBrandSuccess = (brand) => ({
  type: ADD_BRAND_SUCCESS,
  payload: brand,
});

export const addBrandFail = (error) => ({
  type: ADD_BRAND_FAIL,
  payload: error,
});

export const getBrand = (brand) => ({
  type: GET_BRAND,
  payload: brand,
});

export const getBrandSuccess = (brand) => ({
  type: GET_BRAND_SUCCESS,
  payload: brand,
});

export const getBrandFail = (error) => ({
  type: GET_BRAND_FAIL,
  payload: error,
});

export const updateBrand = (brand) => ({
  type: UPDATE_BRAND,
  payload: brand,
});

export const updateBrandSuccess = (brand) => ({
  type: UPDATE_BRAND_SUCCESS,
  payload: brand,
});

export const updateBrandFail = (error) => ({
  type: UPDATE_BRAND_FAIL,
  payload: error,
});

export const deleteBrand = (brand) => ({
  type: DELETE_BRAND,
  payload: brand,
});

export const deleteBrandSuccess = (brand) => ({
  type: DELETE_BRAND_SUCCESS,
  payload: brand,
});

export const deleteBrandFail = (error) => ({
  type: DELETE_BRAND_FAIL,
  payload: error,
});