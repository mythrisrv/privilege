import {
  GET_UNITS,
  GET_UNITS_FAIL,
  GET_UNITS_SUCCESS,
   ADD_UNIT,
   ADD_UNIT_FAIL,
   ADD_UNIT_SUCCESS,
  DELETE_UNIT,
  DELETE_UNIT_SUCCESS,
  DELETE_UNIT_FAIL,
  UPDATE_UNIT,
  UPDATE_UNIT_SUCCESS,
  UPDATE_UNIT_FAIL,
} from "./actionTypes";

const INIT_STATE = {
  units: [],
  addingUnit: false,
  deletingUnit: false,
  addUnitResponse: {},
  updateUnitResponse: {},
  deleteUnitResponse: {},
  unitIdToBeDeleted: "",
  unit: {},
  error: {},
};

const Unit = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_UNITS:
      return {
        ...state,
        params: action.payload,
      };

    case GET_UNITS_SUCCESS:
      return {
        ...state,
        units: action.payload.data,
      };

    case GET_UNITS_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case  ADD_UNIT:
      return {
        ...state,
        addingUnit: true,
        user: action.payload,
      };

    case  ADD_UNIT_SUCCESS:
      let newUnits = [...state.units, action.payload.data];

      return {
        ...state,
        addingUnit: false,
        addUnitResponse: {
          type: "success",
          message: "Unit added successfully",
        },
      units: newUnits,
        error: {},
      };

    case  ADD_UNIT_FAIL:
      return {
        ...state,
        addingUnit: false,
        addUnitResponse: { type: "failure", message: "Adding unit failed" },
        error: action.payload,
      };
    case DELETE_UNIT:
      return {
        ...state,
        deletingUnit: true,
        unitIdToBeDeleted: action.payload,
      };

    case DELETE_UNIT_SUCCESS:
      let newUnits2 = state.units.filter((unit) => {
        return unit._id != state.unitIdToBeDeleted;
      });
      return {
        ...state,
        deletingUnit: false,
        unitIdToBeDeleted: "",
        deletingUnit: false,
        deleteUnitResponse: {
          type: "success",
          message: "Unit deleted successfully",
        },
        units: newUnits2,
      };

    case DELETE_UNIT_FAIL:
      return {
        ...state,
        deletingUnit: false,
        deleteUnitResponse: {
          type: "failure",
          message: "Deleting Unit failed",
        },
        error: action.payload,
      };

    case UPDATE_UNIT:
      return {
        ...state,
        updatingUnit: true,
        unit: action.payload,
      };

    case UPDATE_UNIT_SUCCESS:
      let newUnits1 = state.units.filter((unit) => {
        if (unit._id == state.unit._id) {
          return action.payload.data;
        } else {
          return unit;
        }
      });
      return {
        ...state,
        updatingUnit: false,
        unit: "",
        updatingUnit: false,
        updateUnitResponse: {
          type: "success",
          message: "Unit updated successfully",
        },
        units: newUnits1,
      };

    case UPDATE_UNIT_FAIL:
      return {
        ...state,
        updatingUnit: false,
        updateUnitResponse: {
          type: "failure",
          message: "Updating unit failed",
        },
        error: action.payload,
      };

    default:
      return state;
  }
};

export default Unit;
