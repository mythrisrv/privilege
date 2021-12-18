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
  GET_LOCALBODY_TYPES,
  GET_LOCALBODY_TYPES_SUCCESS,
  GET_LOCALBODY_TYPES_FAIL,
  GET_LOCALBODY_OPTIONS,
  GET_LOCALBODY_OPTIONS_SUCCESS,
  GET_LOCALBODY_OPTIONS_FAIL,
  GET_TYPES_LOCALBODY_OPTIONS,
  GET_TYPES_LOCALBODY_OPTIONS_SUCCESS,
  GET_TYPES_LOCALBODY_OPTIONS_FAIL
} from "./actionTypes";

export const getLocalbodies = (companyId) => ({
  type: GET_LOCALBODIES,
  payload:companyId,
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

export const getLocalbody = (localbodyId) => ({
  type: GET_LOCALBODY,
  payload: localbodyId,
});

export const getLocalbodySuccess = (localbodyId) => ({
  type: GET_LOCALBODY_SUCCESS,
  payload: localbodyId,
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
export const getLocalbodyTypes = () => ({
  type: GET_LOCALBODY_TYPES,
});

export const getLocalbodyTypesSuccess = (localbodyType) => ({
  type: GET_LOCALBODY_TYPES_SUCCESS,
  payload: localbodyType,
});

export const getLocalbodyTypesFail = (error) => ({
  type: GET_LOCALBODY_TYPES_FAIL,
  payload: error,
});
export const getLocalbodyOptions = (distId) => ({
  type: GET_LOCALBODY_OPTIONS,
  distId:distId,
});

export const getLocalbodyOptionsSuccess = (localbodyOptions) => ({
  type: GET_LOCALBODY_OPTIONS_SUCCESS,
  payload: localbodyOptions,
});

export const getLocalbodyOptionsFail = (error) => ({
  type: GET_LOCALBODY_OPTIONS_FAIL,
  payload: error,
});
export const getTypesLocalbodies = (typeId) => ({
  type: GET_TYPES_LOCALBODY_OPTIONS,
  typeId:typeId,
});

export const getTypesLocalbodiesSuccess = (localbodyOptions) => ({
  type: GET_TYPES_LOCALBODY_OPTIONS_SUCCESS,
  payload: localbodyOptions,
});

export const getTypesLocalbodiesFail = (error) => ({
  type: GET_TYPES_LOCALBODY_OPTIONS_FAIL,
  payload: error,
});
