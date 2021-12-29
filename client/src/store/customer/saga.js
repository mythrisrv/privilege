import { takeEvery, put, call, takeLatest } from "redux-saga/effects";


import{
    GET_CUSTOMERS,
    GET_CUST_VISITLOG,
    GET_CUST_RECEIPTS,
    GET_CUST_INVOICE,
    GET_CUST_STATEMENT
    
} from "./actionTypes";

import{
    
    getCustomersSuccess,
    getCustomersFail,
    getCustVisitLogSuccess,
    getCustVisitLogFail,
    getCustReceiptsSuccess,
    getCustReceiptsFail,
    
    getCustInvoiceSuccess,
    getCustInvoiceFail,
    getCustStatementSuccess,
    getCustStatementFail
   

} from "./actions";

import{
    getCustomers,
    getCustVisitLog,
    getCustReceipts,
    getCustInvoice,
    getCustStatement

}from "../../helpers/backend_helper";


function* fetchCustomers(){
    try{
        const response=yield call(getCustomers);
        yield put(getCustomersSuccess(response));
    }catch (error){
        yield put(getCustomersFail(error));
    }
}

function* fetchVisitLog({custId:custId}) {
    try {
      const response = yield call(getCustVisitLog,custId)
      yield put(getCustVisitLogSuccess(response));
    } catch (error) {
      yield put(getCustVisitLogFail(error));
    }
  }

  function* fetchCustReceipts({custId:custId}) {
    try {
      const response = yield call(getCustReceipts,custId)
      yield put(getCustReceiptsSuccess(response));
    } catch (error) {
      yield put(getCustReceiptsFail(error));
    }
  }
  function* fetchCustInvoice({custId:custId}) {
    try {
      const response = yield call(getCustInvoice,custId)
      yield put(getCustInvoiceSuccess(response));
    } catch (error) {
      yield put(getCustInvoiceFail(error));
    }
  }
  function* fetchCustStatement({custId:custId}) {
    try {
      const response = yield call(getCustStatement,custId)
      yield put(getCustStatementSuccess(response));
    } catch (error) {
      yield put(getCustStatementFail(error));
    }
  }

function* customerSaga() {
    yield takeEvery(GET_CUSTOMERS, fetchCustomers);
    yield takeEvery(GET_CUST_VISITLOG, fetchVisitLog);
    yield takeEvery(GET_CUST_RECEIPTS, fetchCustReceipts);
    yield takeEvery(GET_CUST_INVOICE, fetchCustInvoice);
    yield takeEvery(GET_CUST_STATEMENT, fetchCustStatement);
    

    
  }
  
  export default customerSaga;