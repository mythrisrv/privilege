import {
  GET_WARDS,
  GET_WARDS_FAIL,
  GET_WARDS_SUCCESS,
  ADD_WARD,
  ADD_WARD_FAIL,
  ADD_WARD_SUCCESS,
  DELETE_WARD,
  DELETE_WARD_SUCCESS,
  DELETE_WARD_FAIL,
  UPDATE_WARD,
  UPDATE_WARD_SUCCESS,
  UPDATE_WARD_FAIL,
} from "./actionTypes";

const INIT_STATE = {
  wards: [],
  addingWard: false,
  deletingWard: false,
  addWardResponse: {},
  updateWardResponse: {},
  deleteWardResponse: {},
  wardIdToBeDeleted: "",
  ward: {},
  error: {},
};

const Ward = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_WARDS:
      return {
        ...state,
        params: action.payload,
      };

    case GET_WARDS_SUCCESS:
      return {
        ...state,
        wards: action.payload.data,
      };

    case GET_WARDS_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case ADD_WARD:
      return {
        ...state,
        addingWard: true,
        ward: action.payload,
      };

    case ADD_WARD_SUCCESS:
      let newWards = [...state.wards, action.payload.data];
      return {
        ...state,
        addingWard: false,
        addWardResponse: {
          type: "success",
          message: "Ward added successfully",
        },
        wards: newWards,
        error: {},
      };

    case ADD_WARD_FAIL:
      return {
        ...state,
        addingWard: false,
        addWardResponse: { type: "failure", message: "Adding ward failed" },
        error: action.payload,
      };
    case DELETE_WARD:
      return {
        ...state,
        deletingWard: true,
        wardIdToBeDeleted: action.payload,
      };

    case DELETE_WARD_SUCCESS:
       let newWardss = state.wards.filter((item) => {
        return item._id != state.wardIdToBeDeleted;
      });
      return {
        ...state,
        deletingWard: false,
        wardIdToBeDeleted: "",
        deletingWard: false,
        deleteWardResponse: {
          type: "success",
          message: "Ward deleted successfully",
        },
        wards: newWardss,
      };

    case DELETE_WARD_FAIL:
      return {
        ...state,
        deletingWard: false,
        deleteWardResponse: {
          type: "failure",
          message: "Deleting ward failed",
        },
        error: action.payload,
      };

    case UPDATE_WARD:
      return {
        ...state,
        updatingWard: true,
        ward: action.payload,
      };

    case UPDATE_WARD_SUCCESS:
      let newWardsss = state.wards.map((item) => {
        if (item._id == state.ward._id) {
          return action.payload.data;
        } else {
          return item;
        }
      });
      return {
        ...state,
        updatingWard: false,
        ward: "",
        updatingWard: false,
        updateWardResponse: {
          type: "success",
          message: "Ward updated successfully",
        },
        wards: newWardsss,
      };

    case UPDATE_WARD_FAIL:
      return {
        ...state,
        updatingWard: false,
        updateWardResponse: {
          type: "failure",
          message: "Updating ward failed",
        },
        error: action.payload,
      };

    default:
      return state;
  }
};

export default Ward;

