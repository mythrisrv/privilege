import {
    GET_THIRDCATEGORIES,
    GET_THIRDCATEGORIES_FAIL,
    GET_THIRDCATEGORIES_SUCCESS,
    ADD_THIRDCATEGORY,
    ADD_THIRDCATEGORY_FAIL,
    ADD_THIRDCATEGORY_SUCCESS,
    DELETE_THIRDCATEGORY,
    DELETE_THIRDCATEGORY_SUCCESS,
    DELETE_THIRDCATEGORY_FAIL,
    UPDATE_THIRDCATEGORY,
    UPDATE_THIRDCATEGORY_SUCCESS,
    UPDATE_THIRDCATEGORY_FAIL,
  } from "./actionTypes";
  
  const INIT_STATE = {
    thirdcategories: [],
    addingThirdcategory: false,
    deletingThirdcategory: false,
    addThirdcategoryResponse: {},
    updateThirdcategoryResponse: {},
    deleteThirdcategoryResponse: {},
    thirdcategoryIdToBeDeleted: "",
    thirdcategory: {},
    error: {},
  };
  
  const Thirdcategory = (state = INIT_STATE, action) => {
    switch (action.type) {
      case GET_THIRDCATEGORIES:
        return {
          ...state,
          params: action.payload,
        };
  
      case GET_THIRDCATEGORIES_SUCCESS:
        return {
          ...state,
          thirdcategories: action.payload.data,
        };
  
      case GET_THIRDCATEGORIES_FAIL:
        return {
          ...state,
          error: action.payload,
        };
      case ADD_THIRDCATEGORY:
        return {
          ...state,
          addingThirdcategory: true,
          thirdcategory: action.payload,
        };
  
      case ADD_THIRDCATEGORY_SUCCESS:
        let newThirdcategories1 = [...state.thirdcategories, action.payload.data];
  
        return {
          ...state,
          addingThirdcategory: false,
          addThirdcategoryResponse: {
            type: "success",
            message: "Thirdcategory added successfully",
          },
          thirdcategories: newThirdcategories1,
          error: {},
        };
  
      case ADD_THIRDCATEGORY_FAIL:
        return {
          ...state,
          addingThirdcategory: false,
          addThirdcategoryResponse: { type: "failure", message: "Adding category failed" },
          error: action.payload,
        };
      case DELETE_THIRDCATEGORY:
        return {
          ...state,
          deletingThirdcategory: true,
          thirdcategoryIdToBeDeleted: action.payload,
        };
  
      case DELETE_THIRDCATEGORY_SUCCESS:
        let newThirdcategories = state.thirdcategories.filter((thirdcategory) => {
          return thirdcategory._id != state.thirdcategoryIdToBeDeleted;
        });
        return {
          ...state,
          deletingThirdcategory: false,
          ThirdcategoryIdToBeDeleted: "",
          deletingThirdcategory: false,
          deleteThirdcategoryResponse: {
            type: "success",
            message: "Thirdcategory deleted successfully",
          },
          thirdcategories: newThirdcategories,
        };
  
      case DELETE_THIRDCATEGORY_FAIL:
        return {
          ...state,
          deletingThirdcategory: false,
          deleteThirdcategoryResponse: {
            type: "failure",
            message: "Deleting category failed",
          },
          error: action.payload,
        };
  
      case UPDATE_THIRDCATEGORY:
        return {
          ...state,
          updatingThirdcategory: true,
          thirdcategory: action.payload,
        };
  
      case UPDATE_THIRDCATEGORY_SUCCESS:
        let newThirdcategories2 = state.thirdcategories.filter((thirdcategory) => {
          if (thirdcategory._id == state.thirdcategory._id) {
            return action.payload.data;
          } else {
            return thirdcategory;
          }
        });
        return {
          ...state,
          updatingThirdcategory: false,
          thirdcategory: "",
          updatingThirdcategory: false,
          updateThirdcategoryResponse: {
            type: "success",
            message: "Thirdcategory updated successfully",
          },
          thirdcategories: newThirdcategories2,
        };
  
      case UPDATE_THIRDCATEGORY_FAIL:
        return {
          ...state,
          updatingThirdcategory: false,
          updateThirdcategoryResponse: {
            type: "failure",
            message: "Updating category failed",
          },
          error: action.payload,
        };
  
      default:
        return state;
    }
  };
  
  export default Thirdcategory;
  