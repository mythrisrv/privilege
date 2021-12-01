import {
  GET_COMPANIES_OPTIONS_SUCCESS,
  GET_COMPANIES_OPTIONS_FAIL,
  GET_COMPANIES_MASTER_OPTIONS_SUCCESS,
  GET_COMPANIES_MASTER_OPTIONS_FAIL
} from "./actionTypes";

const INIT_STATE = {
  companiesOptions: [],
  companiesMasterOptions: [],
};

const companies = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_COMPANIES_OPTIONS_SUCCESS:
      return {
        ...state,
        companiesOptions: action.payload.data,
      };

    case GET_COMPANIES_OPTIONS_FAIL:
      return {
        ...state,
        error: action.payload,
      };

      case GET_COMPANIES_MASTER_OPTIONS_SUCCESS:
      return {
        ...state,
        companiesMasterOptions: action.payload,
      };

    case GET_COMPANIES_MASTER_OPTIONS_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default companies;
