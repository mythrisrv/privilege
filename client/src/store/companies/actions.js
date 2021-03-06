import {
  GET_COMPANIES_OPTIONS,
  GET_COMPANIES_OPTIONS_SUCCESS,
  GET_COMPANIES_OPTIONS_FAIL,
  GET_COMPANIES_MASTER_OPTIONS,
  GET_COMPANIES_MASTER_OPTIONS_SUCCESS,
  GET_COMPANIES_MASTER_OPTIONS_FAIL,
  SAVE_SELECTED_COMPANY,
  SAVE_SELECTED_COMPANY_SUCCESS,
  SAVE_SELECTED_COMPANY_FAIL
} from "./actionTypes";

export const getCompaniesOptions = () => ({
  type: GET_COMPANIES_OPTIONS,
});

export const getCompaniesOptionsSuccess = (companies) => ({
  type: GET_COMPANIES_OPTIONS_SUCCESS,
  payload: companies,
});

export const getCompaniesOptionsFail = (error) => ({
  type: GET_COMPANIES_OPTIONS_FAIL,
  payload: error,
});

export const getCompaniesMasterOptions = (company_id) => ({
  type: GET_COMPANIES_MASTER_OPTIONS,
  company_id:company_id
});

export const getCompaniesMasterOptionsSuccess = (companies) => ({
  type: GET_COMPANIES_MASTER_OPTIONS_SUCCESS,
  payload: companies,
});

export const getCompaniesMasterOptionsFail = (error) => ({
  type: GET_COMPANIES_MASTER_OPTIONS_FAIL,
  payload: error,
});

export const saveCompanyName=(data)=> ({
  
    type: SAVE_SELECTED_COMPANY,
    payload:data,
  
});

export const saveCompanyNameSuccess=(company)=>( {
 
    type: SAVE_SELECTED_COMPANY_SUCCESS,
    payload:company

  
});

export const saveCompanyNameFail=(error)=> ({
  
    type: SAVE_SELECTED_COMPANY_FAIL,
    payload:error
 
})
