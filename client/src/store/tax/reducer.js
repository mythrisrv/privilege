import {
  GET_TAXES,
  GET_TAXES_FAIL,
  GET_TAXES_SUCCESS,
   ADD_TAX,
   ADD_TAX_FAIL,
   ADD_TAX_SUCCESS,
  DELETE_TAX,
  DELETE_TAX_SUCCESS,
  DELETE_TAX_FAIL,
  UPDATE_TAX,
  UPDATE_TAX_SUCCESS,
  UPDATE_TAX_FAIL,
} from "./actionTypes";

const INIT_STATE = {
  taxes: [],
  addingTax: false,
  deletingTax: false,
  addTaxResponse: {},
  updateTaxResponse: {},
  deleteTaxResponse: {},
  taxIdToBeDeleted: "",
  tax: {},
  error: {},
};

const Tax = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_TAXES:
      return {
        ...state,
        params: action.payload,
      };

    case GET_TAXES_SUCCESS:
      return {
        ...state,
        taxes: action.payload.data,
      };

    case GET_TAXES_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case  ADD_TAX:
      return {
        ...state,
        addingTax: true,
        user: action.payload,
      };

    case  ADD_TAX_SUCCESS:
      let newTaxes = [...state.taxes, action.payload.data];

      return {
        ...state,
        addingTax: false,
        addTaxResponse: {
          type: "success",
          message: "Tax added successfully",
        },
      taxes: newTaxes,
        error: {},
      };

    case  ADD_TAX_FAIL:
      return {
        ...state,
        addingTax: false,
        addTaxResponse: { type: "failure", message: "Adding tax failed" },
        error: action.payload,
      };
    case DELETE_TAX:
      return {
        ...state,
        deletingTax: true,
        taxIdToBeDeleted: action.payload,
      };

    case DELETE_TAX_SUCCESS:
      let newTaxes2 = state.taxes.filter((tax) => {
        return tax._id != state.taxIdToBeDeleted;
      });
      return {
        ...state,
        deletingTax: false,
        taxIdToBeDeleted: "",
        deletingTax: false,
        deleteTaxResponse: {
          type: "success",
          message: "Tax deleted successfully",
        },
        taxes: newTaxes2,
      };

    case DELETE_TAX_FAIL:
      return {
        ...state,
        deletingTax: false,
        deleteTaxResponse: {
          type: "failure",
          message: "Deleting Tax failed",
        },
        error: action.payload,
      };

    case UPDATE_TAX:
      return {
        ...state,
        updatingTax: true,
        tax: action.payload,
      };

    case UPDATE_TAX_SUCCESS:
      let newTaxes1 = state.taxes.filter((tax) => {
        if (tax._id == state.tax._id) {
          return action.payload.data;
        } else {
          return tax;
        }
      });
      return {
        ...state,
        updatingTax: false,
        tax: "",
        updatingTax: false,
        updateTaxResponse: {
          type: "success",
          message: "Tax updated successfully",
        },
        taxes: newTaxes1,
      };

    case UPDATE_TAX_FAIL:
      return {
        ...state,
        updatingTax: false,
        updateTaxResponse: {
          type: "failure",
          message: "Updating tax failed",
        },
        error: action.payload,
      };

    default:
      return state;
  }
};

export default Tax;
