import {
  GET_WARDS,
  GET_WARDS_FAIL,
  GET_WARDS_SUCCESS,
  ADD_WARD,
  ADD_WARD_FAIL,
  ADD_WARD_SUCCESS,
  GET_WARD,
  GET_WARD_FAIL,
  GET_WARD_SUCCESS,
  UPDATE_WARD,
  UPDATE_WARD_FAIL,
  UPDATE_WARD_SUCCESS,
  DELETE_WARD,
  DELETE_WARD_FAIL,
  DELETE_WARD_SUCCESS,
} from "./actionTypes";

export const getWards = () => ({
  type: GET_WARDS,
});

export const getWardsSuccess = (ward) => ({
  type: GET_WARDS_SUCCESS,
  payload: ward,
});

export const getWardsFail = (error) => ({
  type: GET_WARDS_FAIL,
  payload: error,
});

export const addWard = (ward) => ({
  type: ADD_WARD,
  payload: ward,
});

export const addWardSuccess = (ward) => ({
  type: ADD_WARD_SUCCESS,
  payload: ward,
});

export const addWardFail = (error) => ({
  type: ADD_WARD_FAIL,
  payload: error,
});

export const getWard = (ward) => ({
  type: GET_WARD,
  payload: ward,
});

export const getWardSuccess = (ward) => ({
  type: GET_WARD_SUCCESS,
  payload: ward,
});

export const getWardFail = (error) => ({
  type: GET_WARD_FAIL,
  payload: error,
});

export const updateWard = (ward) => ({
  type: UPDATE_WARD,
  payload: ward,
});

export const updateWardSuccess = (ward) => ({
  type: UPDATE_WARD_SUCCESS,
  payload: ward,
});

export const updateWardFail = (error) => ({
  type: UPDATE_WARD_FAIL,
  payload: error,
});

export const deleteWard = (ward) => ({
  type: DELETE_WARD,
  payload: ward,
});

export const deleteWardSuccess = (ward) => ({
  type: DELETE_WARD_SUCCESS,
  payload: ward,
});

export const deleteWardFail = (error) => ({
  type: DELETE_WARD_FAIL,
  payload: error,
});
