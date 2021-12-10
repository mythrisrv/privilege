import{
    GET_INVOICE,
    GET_INVOICE_SUCCESS,
    GET_INVOICE_FAIL

} from "./actionTypes"

export const getInvoice = () => ({
    type: GET_INVOICE,
  });
  
  export const getInvoiceSuccess = (invoice) => ({
    type: GET_INVOICE_SUCCESS,
    payload: invoice,
  });
  
  export const getInvoiceFail = (error) => ({
    type: GET_INVOICE_FAIL,
    payload: error,
  });