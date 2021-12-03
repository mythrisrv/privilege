import {
  GET_COMPANIES_OPTIONS_SUCCESS,
  GET_COMPANIES_OPTIONS_FAIL,
  GET_COMPANIES_MASTER_OPTIONS_SUCCESS,
  GET_COMPANIES_MASTER_OPTIONS_FAIL,
  
  SAVE_SELECTED_COMPANY_SUCCESS,
  SAVE_SELECTED_COMPANY_FAIL
} from "./actionTypes";

const INIT_STATE = {
  companiesOptions: [],
  companiesMasterOptions: [],
  companyname:{},
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
     

    case SAVE_SELECTED_COMPANY_SUCCESS:
      return {...state,
       companyname:action.payload
      };

    case SAVE_SELECTED_COMPANY_FAIL:
      return{ ...state,
        error:"cant save company"
      };
    default:
      return state;
  }
};

export default companies;
