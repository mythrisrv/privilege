import{
    GET_PACKAGES,
    GET_PACKAGES_SUCCESS,
    GET_PACKAGES_FAIL,
    ADD_PACKAGE,
    ADD_PACKAGE_SUCCESS,
    ADD_PACKAGE_FAIL,
    UPDATE_PACKAGE,
    UPDATE_PACKAGE_SUCCESS,
    UPDATE_PACKAGE_FAIL,
    DELETE_PACKAGE,
    DELETE_PACKAGE_SUCCESS,
    DELETE_PACKAGE_FAIL,
    UPDATE_PACKAGE_STATUS,
    UPDATE_PACKAGE_STATUS_SUCCESS,
    UPDATE_PACKAGE_STATUS_FAIL

} from "./actionTypes"

export const getPackages = () => ({
    type: GET_PACKAGES,
  });
  
  export const getPackagesSuccess = (packageList) => ({
    type: GET_PACKAGES_SUCCESS,
    payload: packageList,
  });
  
  export const getPackagesFail = (error) => ({
    type: GET_PACKAGES_FAIL,
    payload: error,
  });

  export const addPackage = (packageData) => ({
    type: ADD_PACKAGE,
    payload: packageData,
  });
  
  export const addPackageSuccess = (packageData) => ({
    type: ADD_PACKAGE_SUCCESS,
    payload: packageData,
  });
  
  export const addPackageFail = (error) => ({
    type: ADD_PACKAGE_FAIL,
    payload: error,
  });

  export const updatePackage = (packageData) => ({
    type: UPDATE_PACKAGE,
    payload: packageData,
  });
  
  export const updatePackageSuccess = (packageData) => ({
    type: UPDATE_PACKAGE_SUCCESS,
    payload: packageData,
  });
  
  export const updatePackageFail = (error) => ({
    type: UPDATE_PACKAGE_FAIL,
    payload: error,
  });

  export const deletePackage= (packageData) => ({
    type: DELETE_PACKAGE,
    payload:packageData,
  });
  
  export const deletePackageSuccess = (packageData) => ({
    type: DELETE_PACKAGE_SUCCESS,
    payload: packageData,
  });
  
  export const deletePackageFail = (error) => ({
    type: DELETE_PACKAGE_FAIL,
    payload: error,
  });

  export const updatePackageStatus = (packageData) => ({
    type: UPDATE_PACKAGE_STATUS,
    payload: packageData,
  });
  
  export const updatePackageStatusSuccess = (packageData) => ({
    type: UPDATE_PACKAGE_STATUS_SUCCESS,
    payload: packageData,
  });
  
  export const updatePackageStatusFail = (error) => ({
    type: UPDATE_PACKAGE_STATUS_FAIL,
    payload: error,
  });

