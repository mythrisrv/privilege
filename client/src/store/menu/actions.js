import {
  GET_Menu_OPTIONS,
  GET_Menu_OPTIONS_SUCCESS,
  GET_Menu_OPTIONS_FAIL,
} from './actionTypes';

export const getMenusOptions = (userId) => ({
  type: GET_Menu_OPTIONS,
  userId: userId,
});

export const getMenusOptionsSuccess = (menus) => ({
  type: GET_Menu_OPTIONS_SUCCESS,
  payload: menus,
});

export const getMenusOptionsFail = (error) => ({
  type: GET_Menu_OPTIONS_FAIL,
  payload: error,
});
