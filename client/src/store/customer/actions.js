import{
    GET_CUSTOMERS,
    GET_CUSTOMERS_SUCCESS,
    GET_CUSTOMERS_FAIL
} from "./actionTypes"

export const getCustomers = () => ({
    type: GET_CUSTOMERS,
  });
  
  export const getCustomersSuccess = (customer) => ({
    type: GET_CUSTOMERS_SUCCESS,
    payload: customer,
  });
  
  export const getCustomersFail = (error) => ({
    type: GET_CUSTOMERS_FAIL,
    payload: error,
  });