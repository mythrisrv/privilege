import{
    GET_CUST_CATEGORIES,
    GET_CUST_CATEGORIES_FAIL,
    GET_CUST_CATEGORIES_SUCCESS,
    GET_CUST_CATEGORY,
    GET_CUST_CATEGORY_SUCCESS,
    GET_CUST_CATEGORY_FAIL,
    ADD_CUST_CATEGORY,
    ADD_CUST_CATEGORY_SUCCESS,
    ADD_CUST_CATEGORY_FAIL,
    UPDATE_CUST_CATEGORY,
    UPDATE_CUST_CATEGORY_SUCCESS,
    UPDATE_CUST_CATEGORY_FAIL,
    DELETE_CUST_CATEGORY,
    DELETE_CUST_CATEGORY_SUCCESS,
    DELETE_CUST_CATEGORY_FAIL,
    GET_CUST_CATEGORIES_OPTIONS,
    GET_CUST_CATEGORIES_OPTIONS_SUCCESS,
    GET_CUST_CATEGORIES_OPTIONS_FAIL

} from "./actionTypes";

const INIT_STATE={
    categories:[],
    error:{},
    category:{},
    addingCategory:false,
    deletingCategory:false,
    addCategoryResponse:{},
    updateCategoryResponse:{},
    deleteCategoryResponse:{},
    categoryIdToBeDeleted:"",
    categoryOptions:[],



};


const Cust_Category = (state = INIT_STATE, action) => {
    switch (action.type) {
      case GET_CUST_CATEGORIES:
        return {
          ...state,
          params: action.payload,
        };
  
      case GET_CUST_CATEGORIES_SUCCESS:
        return {
          ...state,
          categories: action.payload.data,
        };
  
      case GET_CUST_CATEGORIES_FAIL:
        return {
          ...state,
          error: action.payload,
        };
        case ADD_CUST_CATEGORY:
      return {
        ...state,
        addingCategory: true,
        category: action.payload,
      };

    case ADD_CUST_CATEGORY_SUCCESS:
      let newCategory= [...state.categories, action.payload.data];
      return {
        ...state,
        addingCategory: false,
        addCategoryResponse: {
          type: "success",
          message: "Category added successfully",
         
        },
      
        categories: newCategory,
        error: {},
        
      };

    case ADD_CUST_CATEGORY_FAIL:
      return {
        ...state,
        addingCategory: false,
        addCategoryResponse: { type: "failure", message: "Adding category failed" },
        error: action.payload,
      };
    case DELETE_CUST_CATEGORY:
      return {
        ...state,
        deletingCategory: true,
        categoryIdToBeDeleted: action.payload,
      };

    case DELETE_CUST_CATEGORY_SUCCESS:
      let newCategorys = state.categories.filter((item) => {
        return item._id != state.categoryIdToBeDeleted;
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
        categories: newCategorys,
      };

    case DELETE_CUST_CATEGORY_FAIL:
      return {
        ...state,
        deletingCategory: false,
        deleteCategoryResponse: {
          type: "failure",
          message: "Deleting category failed",
        },
        error: action.payload,
      };

    case UPDATE_CUST_CATEGORY:
      return {
        ...state,
        updatingCategory: true,
        category: action.payload,
      };

    case UPDATE_CUST_CATEGORY_SUCCESS:
      let newCategory1 = state.categories.map((item) => {
        if (item._id == state.category._id) {
          return action.payload.data;
        } else {
          return item;
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
        categories: newCategory1,
      };

    case UPDATE_CUST_CATEGORY_FAIL:
      return {
        ...state,
        updatingCategory: false,
        updateCategoryResponse: {
          type: "failure",
          message: "Updating category failed",
        },
        error: action.payload,
      };
      case GET_CUST_CATEGORIES_OPTIONS:
        return {
          ...state,
          params: action.payload,
        };
  
      case GET_CUST_CATEGORIES_OPTIONS_SUCCESS:
        return {
          ...state,
          categoryOptions: action.payload.data,
        };
  
      case GET_CUST_CATEGORIES_OPTIONS_FAIL:
        return {
          ...state,
          error: action.payload,
        };
     
        default:
            return state;
    }
}

export default Cust_Category;