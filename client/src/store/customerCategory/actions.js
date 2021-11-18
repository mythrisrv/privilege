import{
    GET_CUST_CATEGORIES,
    GET_CUST_CATEGORIES_SUCCESS,
    GET_CUST_CATEGORIES_FAIL,
    GET_CUST_CATEGORY,
    GET_CUST_CATEGORY_FAIL,
    GET_CUST_CATEGORY_SUCCESS,
    ADD_CUST_CATEGORY,
    ADD_CUST_CATEGORY_FAIL,
    ADD_CUST_CATEGORY_SUCCESS,
    UPDATE_CUST_CATEGORY,
    UPDATE_CUST_CATEGORY_SUCCESS,
    UPDATE_CUST_CATEGORY_FAIL,
    DELETE_CUST_CATEGORY,
    DELETE_CUST_CATEGORY_FAIL,
    DELETE_CUST_CATEGORY_SUCCESS

} from "./actionTypes"

export const getCustomerCategories = () => ({
    type: GET_CUST_CATEGORIES,
  });
  
  export const getCustomerCategoriesSuccess = (customer) => ({
    type: GET_CUST_CATEGORIES_SUCCESS,
    payload: customer,
  });
  
  export const getCustomerCategoriesFail = (error) => ({
    type: GET_CUST_CATEGORIES_FAIL,
    payload: error,
  });
  export const getCustomerCategory = (customer) => ({
    type: GET_CUST_CATEGORY,
    payload:customer
  });
  export const getCustomerCategorySuccess = (category) => ({
    type: GET_CUST_CATEGORY_SUCCESS,
    payload: category,
  });
  
  export const getCustomerCategoryFail = (error) => ({
    type: GET_CUST_CATEGORY_FAIL,
    payload: error,
  });

  export const addCategory = (catagory) => ({
    type: ADD_CUST_CATEGORY,
    payload: catagory,
  });
  
  export const addCategorySuccess = (category) => ({
    type: ADD_CUST_CATEGORY_SUCCESS,
    payload: category,
  });
  
  export const addCategoryFail = (error) => ({
    type: ADD_CUST_CATEGORY_FAIL,
    payload: error,
  });
  export const updateCategory = (category) => ({
    type: UPDATE_CUST_CATEGORY,
    payload: category,
  });
  
  export const updateCategorySuccess = (category) => ({
    type: UPDATE_CUST_CATEGORY_SUCCESS,
    payload: category,
  });
  
  export const updateCategoryFail = (error) => ({
    type: UPDATE_CUST_CATEGORY_FAIL,
    payload: error,
  });
  
  export const deleteCategory = (category) => ({
    type: DELETE_CUST_CATEGORY,
    payload: category,
  });
  
  export const deleteCategorySuccess = (category) => ({
    type: DELETE_CUST_CATEGORY_SUCCESS,
    payload: category,
  });
  
  export const deleteCategoryFail = (error) => ({
    type: DELETE_CUST_CATEGORY_FAIL,
    payload: error,
  });
  