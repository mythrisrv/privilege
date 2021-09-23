import {
  LOGIN_USER,
  LOGIN_SUCCESS,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS,
  API_ERROR,
  CHECK_AUTH,
  CHECK_AUTH_SUCCESS,
  CHECK_AUTH_FAILURE,
} from "./actionTypes";

export const loginUser = (user, history) => {
  return {
    type: LOGIN_USER,
    payload: { user, history },
  };
};

export const loginSuccess = (user) => {
  return {
    type: LOGIN_SUCCESS,
    payload: user,
  };
};

export const checkAuth = (history) => {
  return {
    type: CHECK_AUTH,
    payload: history,
  };
};

export const checkAuthSuccess = (user) => {
  return {
    type: CHECK_AUTH_SUCCESS,
    payload: user,
  };
};

export const checkAuthFailure = (user) => {
  return {
    type: CHECK_AUTH_FAILURE,
    payload: user,
  };
};

export const logoutUser = (history) => {
  return {
    type: LOGOUT_USER,
    payload: { history },
  };
};

export const logoutUserSuccess = () => {
  return {
    type: LOGOUT_USER_SUCCESS,
    payload: {},
  };
};

export const apiError = (error) => {
  return {
    type: API_ERROR,
    payload: error,
  };
};
