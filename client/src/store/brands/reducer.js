
import {
  GET_BRANDS,
  GET_BRANDS_FAIL,
  GET_BRANDS_SUCCESS,
  ADD_BRAND,
  ADD_BRAND_FAIL,
  ADD_BRAND_SUCCESS,
  DELETE_BRAND,
  DELETE_BRAND_SUCCESS,
  DELETE_BRAND_FAIL,
  UPDATE_BRAND,
  UPDATE_BRAND_SUCCESS,
  UPDATE_BRAND_FAIL,
} from "./actionTypes";

const INIT_STATE = {
  brands: [],
  addingBrand: false,
  deletingBrand: false,
  addBrandResponse: {},
  updateBrandResponse: {},
  deleteBrandResponse: {},
  brandIdToBeDeleted: "",
  brand: {},
  error: {},
};

const Brand = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_BRANDS:
      return {
        ...state,
        params: action.payload,
      };

    case GET_BRANDS_SUCCESS:
      return {
        ...state,
        brands: action.payload.data,
      };

    case GET_BRANDS_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case ADD_BRAND:
      return {
        ...state,
        addingBrand: true,
        user: action.payload,
      };

    case ADD_BRAND_SUCCESS:
      let newBrands = [...state.brands, action.payload.data];

      return {
        ...state,
        addingBrand: false,
        addBrandResponse: {
          type: "success",
          message: "Brand added successfully",
        },
      brands: newBrands,
        error: {},
      };

    case ADD_BRAND_FAIL:
      return {
        ...state,
        addingBrand: false,
        addBrandResponse: { type: "failure", message: "Adding brand failed" },
        error: action.payload,
      };
    case DELETE_BRAND:
      return {
        ...state,
        deletingBrand: true,
        brandIdToBeDeleted: action.payload,
      };

    case DELETE_BRAND_SUCCESS:
      let newBrands2 = state.brands.filter((brand) => {
        return brand._id != state.brandIdToBeDeleted;
      });
      return {
        ...state,
        deletingBrand: false,
        brandIdToBeDeleted: "",
        deletingBrand: false,
        deleteBrandResponse: {
          type: "success",
          message: "Brand deleted successfully",
        },
        brands: newBrands2,
      };

    case DELETE_BRAND_FAIL:
      return {
        ...state,
        deletingBrand: false,
        deleteBrandResponse: {
          type: "failure",
          message: "Deleting Brand failed",
        },
        error: action.payload,
      };

    case UPDATE_BRAND:
      return {
        ...state,
        updatingBrand: true,
        brand: action.payload,
      };

    case UPDATE_BRAND_SUCCESS:
      let newBrands1 = state.brands.filter((brand) => {
        if (brand._id == state.brand._id) {
          return action.payload.data;
        } else {
          return brand;
        }
      });
      return {
        ...state,
        updatingBrand: false,
        brand: "",
        updatingBrand: false,
        updateBrandResponse: {
          type: "success",
          message: "Brand updated successfully",
        },
        brands: newBrands1,
      };

    case UPDATE_BRAND_FAIL:
      return {
        ...state,
        updatingBrand: false,
        updateBrandResponse: {
          type: "failure",
          message: "Updating brand failed",
        },
        error: action.payload,
      };

    default:
      return state;
  }
};

export default Brand;