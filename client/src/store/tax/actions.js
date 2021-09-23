import {
  GET_TAXES,
  GET_TAXES_FAIL,
  GET_TAXES_SUCCESS,
  ADD_TAX,
  ADD_TAX_FAIL,
  ADD_TAX_SUCCESS,
  GET_TAX,
  GET_TAX_FAIL,
  GET_TAX_SUCCESS,
  UPDATE_TAX,
  UPDATE_TAX_FAIL,
  UPDATE_TAX_SUCCESS,
  DELETE_TAX,
  DELETE_TAX_FAIL,
  DELETE_TAX_SUCCESS,
} from "./actionTypes";

export const getTaxes = () => ({
  type: GET_TAXES,
});

export const getTaxesSuccess = (tax) => ({
  type: GET_TAXES_SUCCESS,
  payload: tax,
});

export const getTaxesFail = (error) => ({
  type: GET_TAXES_FAIL,
  payload: error,
});

export const addTax = (tax) => ({
  type: ADD_TAX,
  payload: tax,
});

export const addTaxSuccess = (tax) => ({
  type: ADD_TAX_SUCCESS,
  payload: tax,
});

export const addTaxFail = (error) => ({
  type: ADD_TAX_FAIL,
  payload: error,
});

export const getTax = (tax) => ({
  type: GET_TAX,
  payload: tax,
});

export const getTaxSuccess = (tax) => ({
  type: GET_TAX_SUCCESS,
  payload: tax,
});

export const getTaxFail = (error) => ({
  type: GET_TAX_FAIL,
  payload: error,
});

export const updateTax = (tax) => ({
  type: UPDATE_TAX,
  payload: tax,
});

export const updateTaxSuccess = (tax) => ({
  type: UPDATE_TAX_SUCCESS,
  payload: tax,
});

export const updateTaxFail = (error) => ({
  type: UPDATE_TAX_FAIL,
  payload: error,
});

export const deleteTax = (tax) => ({
  type: DELETE_TAX,
  payload: tax,
});

export const deleteTaxSuccess = (tax) => ({
  type: DELETE_TAX_SUCCESS,
  payload: tax,
});

export const deleteTaxFail = (error) => ({
  type: DELETE_TAX_FAIL,
  payload: error,
});
