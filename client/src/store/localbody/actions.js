import {
  GET_LOCALBODIES,
  GET_LOCALBODIES_FAIL,
  GET_LOCALBODIES_SUCCESS,
  ADD_LOCALBODY,
  ADD_LOCALBODY_FAIL,
  ADD_LOCALBODY_SUCCESS,
  GET_LOCALBODY,
  GET_LOCALBODY_FAIL,
  GET_LOCALBODY_SUCCESS,
  UPDATE_LOCALBODY,
  UPDATE_LOCALBODY_FAIL,
  UPDATE_LOCALBODY_SUCCESS,
  DELETE_LOCALBODY,
  DELETE_LOCALBODY_FAIL,
  DELETE_LOCALBODY_SUCCESS,
} from "./actionTypes";

export const getLocalbodies = () => ({
  type: GET_LOCALBODIES,
});

export const getLocalbodiesSuccess = (localbody) => ({
  type: GET_LOCALBODIES_SUCCESS,
  payload: localbody,
});

export const getLocalbodiesFail = (error) => ({
  type: GET_LOCALBODIES_FAIL,
  payload: error,
});

export const addLocalbody = (localbody) => ({
  type: ADD_LOCALBODY,
  payload: localbody,
});

export const addLocalbodySuccess = (localbody) => ({
  type: ADD_LOCALBODY_SUCCESS,
  payload: localbody,
});

export const addLocalbodyFail = (error) => ({
  type: ADD_LOCALBODY_FAIL,
  payload: error,
});

export const getLocalbody = (localbody) => ({
  type: GET_LOCALBODY,
  payload: localbody,
});

export const getLocalbodySuccess = (localbody) => ({
  type: GET_LOCALBODY_SUCCESS,
  payload: localbody,
});

export const getLocalbodyFail = (error) => ({
  type: GET_LOCALBODY_FAIL,
  payload: error,
});

export const updateLocalbody = (localbody) => ({
  type: UPDATE_LOCALBODY,
  payload: localbody,
});

export const updateLocalbodySuccess = (localbody) => ({
  type: UPDATE_LOCALBODY_SUCCESS,
  payload: localbody,
});

export const updateLocalbodyFail = (error) => ({
  type: UPDATE_LOCALBODY_FAIL,
  payload: error,
});

export const deleteLocalbody = (localbody) => ({
  type: DELETE_LOCALBODY,
  payload: localbody,
});

export const deleteLocalbodySuccess = (localbody) => ({
  type: DELETE_LOCALBODY_SUCCESS,
  payload: localbody,
});

export const deleteLocalbodyFail = (error) => ({
  type: DELETE_LOCALBODY_FAIL,
  payload: error,
});
