import{
    GET_CUSTOMERS,
    GET_CUSTOMERS_SUCCESS,
    GET_CUSTOMERS_FAIL,
    GET_CUST_VISITLOG,
    GET_CUST_VISITLOG_SUCCESS,
    GET_CUST_VISITLOG_FAIL,
    GET_CUST_RECEIPTS,
    GET_CUST_RECEIPTS_FAIL,
    GET_CUST_RECEIPTS_SUCCESS,
    GET_CUST_INVOICE,
    GET_CUST_INVOICE_SUCCESS,
    GET_CUST_INVOICE_FAIL,
    GET_CUST_STATEMENT,
    GET_CUST_STATEMENT_SUCCESS,
    GET_CUST_STATEMENT_FAIL,
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

  export const getCustVisitLog = (custId) => ({
    type: GET_CUST_VISITLOG,
    custId:custId
  });
  
  export const getCustVisitLogSuccess = (visitlog) => ({
    type: GET_CUST_VISITLOG_SUCCESS,
    payload:visitlog,
  });
  
  export const getCustVisitLogFail = (error) => ({
    type: GET_CUST_VISITLOG_FAIL,
    payload: error,
  });

  export const getCustReceipts = (custId) => ({
    type: GET_CUST_RECEIPTS,
    custId:custId
  });
  
  export const getCustReceiptsSuccess = (receipts) => ({
    type: GET_CUST_RECEIPTS_SUCCESS,
    payload:receipts,
  });
  
  export const getCustReceiptsFail = (error) => ({
    type: GET_CUST_RECEIPTS_FAIL,
    payload: error,
  });
  export const getCustInvoice = (custId) => ({
    type: GET_CUST_INVOICE,
    custId:custId
  });
  
  export const getCustInvoiceSuccess = (invoice) => ({
    type: GET_CUST_INVOICE_SUCCESS,
    payload:invoice,
  });
  
  export const getCustInvoiceFail = (error) => ({
    type: GET_CUST_INVOICE_FAIL,
    payload: error,
  });

  export const getCustStatement = (custId) => ({
    type: GET_CUST_STATEMENT,
    custId:custId
  });
  
  export const getCustStatementSuccess = (statement) => ({
    type: GET_CUST_STATEMENT_SUCCESS,
    payload:statement,
  });
  
  export const getCustStatementFail = (error) => ({
    type: GET_CUST_STATEMENT_FAIL,
    payload: error,
  });