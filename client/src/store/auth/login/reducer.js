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

const initialState = {
  error: "",
  loading: false,
  loginResponse: {},
};

const login = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      state = {
        ...state,
        loading: true,
      };
      break;
    case LOGIN_SUCCESS:
      state = {
        ...state,
        loading: false,
      };
      break;

    case CHECK_AUTH:
      state = {
        ...state,
      };
      break;
    case CHECK_AUTH_SUCCESS:
      state = {
        ...state,
      };
      break;

    case CHECK_AUTH_FAILURE:
      state = {
        ...state,
      };
      break;

    case LOGOUT_USER:
      state = { ...state };
      break;
    case LOGOUT_USER_SUCCESS:
      state = { ...state };
      break;
    case API_ERROR:
      state = {
        ...state,
        error: action.payload,
        loading: false,
        loginResponse: {
          type: "failure",
          message: "Login user failed",
        },
      };
      break;
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default login;
