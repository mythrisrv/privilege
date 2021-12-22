import{
    GET_INVOICE,
    GET_INVOICE_SUCCESS,
    GET_INVOICE_FAIL,
    GET_INVOICE_LIST,
    GET_INVOICE_LIST_SUCCESS,
    GET_INVOICE_LIST_FAIL

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

  export const getInvoiceList = () => ({
    type: GET_INVOICE_LIST,
  });
  
  export const getInvoiceListSuccess = (invoiceList) => ({
    type: GET_INVOICE_LIST_SUCCESS,
    payload: invoiceList,
  });
  
  export const getInvoiceListFail = (error) => ({
    type: GET_INVOICE_LIST_FAIL,
    payload: error,
  });