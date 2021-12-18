import { takeEvery, put, call, takeLatest } from "redux-saga/effects";

import{
    GET_PACKAGES,
    ADD_PACKAGE,UPDATE_PACKAGE,
    DELETE_PACKAGE,
    UPDATE_PACKAGE_STATUS

} from "./actionTypes"

import {
    getPackagesSuccess,
    getPackagesFail,
    addPackageSuccess,
    addPackageFail,
    updatePackageSuccess,
    updatePackageFail,
    deletePackageSuccess,
    deletePackageFail,
    updatePackageStatusSuccess,
    updatePackageStatusFail

} from "./actions"

import {getPackages,addPackage,updatePackage,deletePackage,updatePackageStatus} from "../../helpers/backend_helper";

function* fetchPackages() {
    try {
      const response = yield call(getPackages);
      yield put(getPackagesSuccess(response));
    } catch (error) {
      yield put(getPackagesFail(error));
    }
  }

  function* onAddPackage({ payload: packageData }) {
    try {
      const response = yield call(addPackage, packageData);
      yield put(addPackageSuccess(response));
    } catch (error) {
      yield put(addPackageFail(error.response));
    }
  }

  function* onUpdatePackage({ payload: packageData}) {
    //delete group.name1;
   // delete group.privilage1;
   // delete group.company1;
   // delete group.branch1;
    delete packageData.action;
   // console.log(packageData);
    if (packageData.freeBag) {
      packageData.package_bags = packageData.freeBag;
    }
  
    if (packageData.localbodyname) {
      packageData.localbody_name = packageData.localbodyname._id;
      
    }
    if (packageData.localbody) {
      packageData.localbody_type = packageData.localbody._id;
   }
   if(packageData.categoryname){
     packageData.cust_type=packageData.categoryname._id
   }
   if(packageData.wasteItems){
   
    for(var index=0;index<packageData.wasteItems.length;index++){
      if(packageData.wasteItems[index]!=null)
        packageData.package_billing_id[index]=packageData.wasteItems[index]
       
   }
    
     }
   
  
    try {
      const response = yield call(updatePackage, packageData);
      yield put(updatePackageSuccess(response));
    } catch (error) {
      yield put(updatePackageFail(error.response));
    }
  }

  function* onDeletePackage({ payload: packageId }) {
    try {
      const response = yield call(deletePackage, packageId);
      yield put(deletePackageSuccess(response));
    } catch (error) {
      yield put(deletePackageFail(error.response));
    }
  }

  function* onUpdatePackageStatus({ payload: packageData}) {
    
  
    try {
      const response = yield call(updatePackageStatus, packageData);
      yield put(updatePackageStatusSuccess(response));
    } catch (error) {
      yield put(updatePackageStatusFail(error.response));
    }
  }
  
  

  function* packageSaga() {
    yield takeEvery(GET_PACKAGES, fetchPackages);
    yield takeEvery(ADD_PACKAGE, onAddPackage);
    yield takeEvery(UPDATE_PACKAGE, onUpdatePackage);
    yield takeEvery(DELETE_PACKAGE, onDeletePackage);
    yield takeEvery(UPDATE_PACKAGE_STATUS, onUpdatePackageStatus);
  }  


export default packageSaga;

