import {
  GET_SUBCATEGORIES,
  GET_SUBCATEGORIES_FAIL,
  GET_SUBCATEGORIES_SUCCESS,
  ADD_SUBCATEGORY,
  ADD_SUBCATEGORY_FAIL,
  ADD_SUBCATEGORY_SUCCESS,
  DELETE_SUBCATEGORY,
  DELETE_SUBCATEGORY_SUCCESS,
  DELETE_SUBCATEGORY_FAIL,
  UPDATE_SUBCATEGORY,
  UPDATE_SUBCATEGORY_SUCCESS,
  UPDATE_SUBCATEGORY_FAIL,
} from "./actionTypes";

const INIT_STATE = {
  subcategories: [],
  addingSubcategory: false,
  deletingSubcategory: false,
  addSubcategoryResponse: {},
  updateSubcategoryResponse: {},
  deleteSubcategoryResponse: {},
  SubcategoryIdToBeDeleted: "",
  Subcategory: {},
  error: {},
};

const Subcategory = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_SUBCATEGORIES:
      return {
        ...state,
        params: action.payload,
      };

    case GET_SUBCATEGORIES_SUCCESS:
      return {
        ...state,
        subcategories: action.payload.data,
      };

    case GET_SUBCATEGORIES_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case ADD_SUBCATEGORY:
      return {
        ...state,
        addingSubcategory: true,
        subcategory: action.payload,
      };

    case ADD_SUBCATEGORY_SUCCESS:
      let newSubcategories1 = [...state.subcategories, action.payload.data];

      return {
        ...state,
        addingSubcategory: false,
        addSubcategoryResponse: {
          type: "success",
          message: "Subcategory added successfully",
        },
        subcategories: newSubcategories1,
        error: {},
      };

    case ADD_SUBCATEGORY_FAIL:
      return {
        ...state,
        addingSubcategory: false,
        addSubcategoryResponse: { type: "failure", message: "Adding Subcategory failed" },
        error: action.payload,
      };
    case DELETE_SUBCATEGORY:
      return {
        ...state,
        deletingSubcategory: true,
        subcategoryIdToBeDeleted: action.payload,
      };

    case DELETE_SUBCATEGORY_SUCCESS:
      let newSubcategories = state.subcategories.filter((subcategory) => {
        return subcategory._id != state.subcategoryIdToBeDeleted;
      });
      return {
        ...state,
        deletingSubcategory: false,
        SubcategoryIdToBeDeleted: "",
        deletingSubcategory: false,
        deleteSubcategoryResponse: {
          type: "success",
          message: "Subcategory deleted successfully",
        },
        subcategories: newSubcategories,
      };

    case DELETE_SUBCATEGORY_FAIL:
      return {
        ...state,
        deletingSubcategory: false,
        deleteSubcategoryResponse: {
          type: "failure",
          message: "Deleting subcategory failed",
        },
        error: action.payload,
      };

    case UPDATE_SUBCATEGORY:
      return {
        ...state,
        updatingSubcategory: true,
        subcategory: action.payload,
      };

    case UPDATE_SUBCATEGORY_SUCCESS:
      let newSubcategories2 = state.subcategories.filter((subcategory) => {
        if (subcategory._id == state.subcategory._id) {
          return action.payload.data;
        } else {
          return subcategory;
        }
      });
      return {
        ...state,
        updatingSubcategory: false,
        subcategory: "",
        updatingSubcategory: false,
        updateSubcategoryResponse: {
          type: "success",
          message: "Subcategory updated successfully",
        },
        subcategories: newSubcategories2,
      };

    case UPDATE_SUBCATEGORY_FAIL:
      return {
        ...state,
        updatingSubcategory: false,
        updateSubcategoryResponse: {
          type: "failure",
          message: "Updating subcategory failed",
        },
        error: action.payload,
      };

    default:
      return state;
  }
};

export default Subcategory;
