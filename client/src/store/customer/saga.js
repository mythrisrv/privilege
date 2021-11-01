import { takeEvery, put, call, takeLatest } from "redux-saga/effects";


import{
    GET_CUSTOMERS
    
} from "./actionTypes";

import{
    
    getCustomersSuccess,
    getCustomersFail,

} from "./actions";

import{
    getCustomers

}from "../../helpers/backend_helper";


function* fetchCustomers(){
    try{
        const response=yield call(getCustomers);
        yield put(getCustomersSuccess(response));
    }catch (error){
        yield put(getCustomersFail(error));
    }
}

function* customerSaga() {
    yield takeEvery(GET_CUSTOMERS, fetchCustomers);
    
  }
  
  export default customerSaga;