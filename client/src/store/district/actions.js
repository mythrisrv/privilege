import {
  GET_DISTRICTS,
  GET_DISTRICTS_FAIL,
  GET_DISTRICTS_SUCCESS,
  ADD_DISTRICT,
  ADD_DISTRICT_FAIL,
  ADD_DISTRICT_SUCCESS,
  GET_DISTRICT,
  GET_DISTRICT_FAIL,
  GET_DISTRICT_SUCCESS,
  UPDATE_DISTRICT,
  UPDATE_DISTRICT_FAIL,
  UPDATE_DISTRICT_SUCCESS,
  DELETE_DISTRICT,
  DELETE_DISTRICT_FAIL,
  DELETE_DISTRICT_SUCCESS,
} from "./actionTypes";

export const getDistricts = () => ({
  type: GET_DISTRICTS,
});

export const getDistrictsSuccess = (users) => ({
  type: GET_DISTRICTS_SUCCESS,
  payload: users,
});

export const getDistrictsFail = (error) => ({
  type: GET_DISTRICTS_FAIL,
  payload: error,
});

export const addDistrict = (user) => ({
  type: ADD_DISTRICT,
  payload: user,
});

export const addDistrictSuccess = (user) => ({
  type: ADD_DISTRICT_SUCCESS,
  payload: user,
});

export const addDistrictFail = (error) => ({
  type: ADD_DISTRICT_FAIL,
  payload: error,
});

export const getDistrict = (user) => ({
  type: GET_DISTRICT,
  payload: user,
});

export const getDistrictSuccess = (user) => ({
  type: GET_DISTRICT_SUCCESS,
  payload: user,
});

export const getDistrictFail = (error) => ({
  type: GET_DISTRICT_FAIL,
  payload: error,
});

export const updateDistrict = (user) => ({
  type: UPDATE_DISTRICT,
  payload: user,
});

export const updateDistrictSuccess = (user) => ({
  type: UPDATE_DISTRICT_SUCCESS,
  payload: user,
});

export const updateDistrictFail = (error) => ({
  type: UPDATE_DISTRICT_FAIL,
  payload: error,
});

export const deleteDistrict = (user) => ({
  type: DELETE_DISTRICT,
  payload: user,
});

export const deleteDistrictSuccess = (user) => ({
  type: DELETE_DISTRICT_SUCCESS,
  payload: user,
});

export const deleteDistrictFail = (error) => ({
  type: DELETE_DISTRICT_FAIL,
  payload: error,
});
