import {
    GET_CATEGORIES,
    GET_CATEGORIES_FAIL,
    GET_CATEGORIES_SUCCESS,
    ADD_CATEGORY,
    ADD_CATEGORY_FAIL,
    ADD_CATEGORY_SUCCESS,
    DELETE_CATEGORY,
    DELETE_CATEGORY_SUCCESS,
    DELETE_CATEGORY_FAIL,
    UPDATE_CATEGORY,
    UPDATE_CATEGORY_SUCCESS,
    UPDATE_CATEGORY_FAIL,
    GET_CATEGORIES_OPTIONS_SUCCESS,
  GET_CATEGORIES_OPTIONS_FAIL
  } from "./actionTypes";
  
  const INIT_STATE = {
    categories: [],
    addingCategory: false,
    deletingCategory: false,
    addCategoryResponse: {},
    updateCategoryResponse: {},
    deleteCategoryResponse: {},
    categoryIdToBeDeleted: "",
    category: {},
    error: {},
    categoriesOptions: [],
  };
  
  const Category = (state = INIT_STATE, action) => {
    switch (action.type) {
      case GET_CATEGORIES:
        return {
          ...state,
          params: action.payload,
        };
  
      case GET_CATEGORIES_SUCCESS:
        return {
          ...state,
          categories: action.payload.data,
        };
  
      case GET_CATEGORIES_FAIL:
        return {
          ...state,
          error: action.payload,
        };
      case ADD_CATEGORY:
        return {
          ...state,
          addingCategory: true,
          category: action.payload,
        };
  
      case ADD_CATEGORY_SUCCESS:
        let newCategories1 = [...state.categories, action.payload.data];
  
        return {
          ...state,
          addingCategory: false,
          addCategoryResponse: {
            type: "success",
            message: "Category added successfully",
          },
          categories: newCategories1,
          error: {},
        };
  
      case ADD_CATEGORY_FAIL:
        return {
          ...state,
          addingCategory: false,
          addCategoryResponse: { type: "failure", message: "Adding category failed" },
          error: action.payload,
        };
      case DELETE_CATEGORY:
        return {
          ...state,
          deletingCategory: true,
          categoryIdToBeDeleted: action.payload,
        };
  
      case DELETE_CATEGORY_SUCCESS:
        let newCategories = state.categories.filter((category) => {
          return category._id != state.categoryIdToBeDeleted;
        });
        return {
          ...state,
          deletingCategory: false,
          categoryIdToBeDeleted: "",
          deletingCategory: false,
          deleteCategoryResponse: {
            type: "success",
            message: "Category deleted successfully",
          },
          categories: newCategories,
        };
  
      case DELETE_CATEGORY_FAIL:
        return {
          ...state,
          deletingCategory: false,
          deleteCategoryResponse: {
            type: "failure",
            message: "Deleting category failed",
          },
          error: action.payload,
        };
  
      case UPDATE_CATEGORY:
        return {
          ...state,
          updatingCategory: true,
          category: action.payload,
        };
  
      case UPDATE_CATEGORY_SUCCESS:
        let newCategories2 = state.categories.filter((category) => {
          if (category._id == state.category._id) {
            return action.payload.data;
          } else {
            return category;
          }
        });
        return {
          ...state,
          updatingCategory: false,
          category: "",
          updatingCategory: false,
          updateCategoryResponse: {
            type: "success",
            message: "Category updated successfully",
          },
          categories: newCategories2,
        };
  
      case UPDATE_CATEGORY_FAIL:
        return {
          ...state,
          updatingCategory: false,
          updateCategoryResponse: {
            type: "failure",
            message: "Updating category failed",
          },
          error: action.payload,
        };
        case GET_CATEGORIES_OPTIONS_SUCCESS:
          return {
            ...state,
            categoriesOptions: action.payload,
          };
    
        case GET_CATEGORIES_OPTIONS_FAIL:
          return {
            ...state,
            error: action.payload,
          };
  
      default:
        return state;
    }
  };
  
  export default Category;
  