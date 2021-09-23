import {
    GET_CATEGORIES,
    GET_CATEGORIES_FAIL,
    GET_CATEGORIES_SUCCESS,
    ADD_CATEGORY,
    ADD_CATEGORY_FAIL,
    ADD_CATEGORY_SUCCESS,
    GET_CATEGORY,
    GET_CATEGORY_FAIL,
    GET_CATEGORY_SUCCESS,
    UPDATE_CATEGORY,
    UPDATE_CATEGORY_FAIL,
    UPDATE_CATEGORY_SUCCESS,
    DELETE_CATEGORY,
    DELETE_CATEGORY_FAIL,
    DELETE_CATEGORY_SUCCESS,
    GET_CATEGORIES_OPTIONS,
    GET_CATEGORIES_OPTIONS_SUCCESS,
    GET_CATEGORIES_OPTIONS_FAIL,
    
    
  } from "./actionTypes";
  
  export const getCategories = () => ({
    type: GET_CATEGORIES,
  });
  
  export const getCategoriesSuccess = (categories) => ({
    type: GET_CATEGORIES_SUCCESS,
    payload: categories,
  });
  
  export const getCategoriesFail = (error) => ({
    type: GET_CATEGORIES_FAIL,
    payload: error,
  });
  
  export const addCategory = (category) => ({
    type: ADD_CATEGORY,
    payload: category,
  });
  
  export const addCategorySuccess = (category) => ({
    type: ADD_CATEGORY_SUCCESS,
    payload: category,
  });
  
  export const addCategoryFail = (error) => ({
    type: ADD_CATEGORY_FAIL,
    payload: error,
  });
  
  export const getUser = (category) => ({
    type: GET_CATEGORY,
    payload: category,
  });
  
  export const getCategorySuccess = (category) => ({
    type: GET_CATEGORY_SUCCESS,
    payload: category,
  });
  
  export const getCategoryFail = (error) => ({
    type: GET_CATEGORY_FAIL,
    payload: error,
  });
  
  export const updateCategory = (category) => ({
    type: UPDATE_CATEGORY,
    payload: category,
  });
  
  export const updateCategorySuccess = (category) => ({
    type: UPDATE_CATEGORY_SUCCESS,
    payload: category,
  });
  
  export const updateCategoryFail = (error) => ({
    type: UPDATE_CATEGORY_FAIL,
    payload: error,
  });
  
  export const deleteCategory = (category) => ({
    type: DELETE_CATEGORY,
    payload: category,
  });
  
  export const deleteCategorySuccess = (category) => ({
    type: DELETE_CATEGORY_SUCCESS,
    payload: category,
  });
  
  export const deleteCategoryFail = (error) => ({
    type: DELETE_CATEGORY_FAIL,
    payload: error,
  });

  export const getCategoriesOptions = () => ({
    type: GET_CATEGORIES_OPTIONS,
  });
  
  export const getCategoriesOptionsSuccess = (categories) => ({
    type: GET_CATEGORIES_OPTIONS_SUCCESS,
    payload: categories,
  });
  
  export const getCategoriesOptionsFail = (error) => ({
    type: GET_CATEGORIES_OPTIONS_FAIL,
    payload: error,
  });