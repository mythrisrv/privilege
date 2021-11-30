import {
  GET_DISTRICTS,
  GET_DISTRICTS_FAIL,
  GET_DISTRICTS_SUCCESS,
  ADD_DISTRICT,
  ADD_DISTRICT_FAIL,
  ADD_DISTRICT_SUCCESS,
  DELETE_DISTRICT,
  DELETE_DISTRICT_SUCCESS,
  DELETE_DISTRICT_FAIL,
  UPDATE_DISTRICT,
  UPDATE_DISTRICT_SUCCESS,
  UPDATE_DISTRICT_FAIL,
  GET_DISTRICT_OPTIONS,
  GET_DISTRICT_OPTIONS_FAIL,
  GET_DISTRICT_OPTIONS_SUCCESS,
  
} from "./actionTypes";

const INIT_STATE = {
  districts: [],
  districtOptions:[],
  addingDistrict: false,
  deletingDistrict: false,
  addDistrictResponse: {},
  updateDistrictResponse: {},
  deleteDistrictResponse: {},
  districtIdToBeDeleted: "",
  district: {},
  error: {},
};

const District = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_DISTRICT_OPTIONS:
      return {
        ...state,
        params: action.payload,
      };

    case GET_DISTRICT_OPTIONS_SUCCESS:
      return {
        ...state,
        districtOptions: action.payload.data,
      };

    case GET_DISTRICT_OPTIONS_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case GET_DISTRICTS:
      return {
        ...state,
        params: action.payload,
      };

    case GET_DISTRICTS_SUCCESS:
      return {
        ...state,
        districts: action.payload.data,
      };

    case GET_DISTRICTS_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case ADD_DISTRICT:
      return {
        ...state,
        addingDistrict: true,
        district: action.payload,
      };

    case ADD_DISTRICT_SUCCESS:
      let newUers = [...state.districts, action.payload.data];
      return {
        ...state,
        addingDistrict: false,
        addDistrictResponse: {
          type: "success",
          message: "District added successfully",
         
        },
      
        districts: newUers,
        error: {},
        
      };

    case ADD_DISTRICT_FAIL:
      return {
        ...state,
        addingDistrict: false,
        addDistrictResponse: { type: "failure", message: "Adding district failed" },
        error: action.payload,
      };
    case DELETE_DISTRICT:
      return {
        ...state,
        deletingDistrict: true,
        districtIdToBeDeleted: action.payload,
      };

    case DELETE_DISTRICT_SUCCESS:
      let newDistricts = state.districts.filter((item) => {
        return item._id != state.districtIdToBeDeleted;
      });
      return {
        ...state,
        deletingDistrict: false,
        districtIdToBeDeleted: "",
        deletingDistrict: false,
        deleteDistrictResponse: {
          type: "success",
          message: "District deleted successfully",
        },
        districts: newDistricts,
      };

    case DELETE_DISTRICT_FAIL:
      return {
        ...state,
        deletingDistrict: false,
        deleteDistrictResponse: {
          type: "failure",
          message: "Deleting district failed",
        },
        error: action.payload,
      };

    case UPDATE_DISTRICT:
      return {
        ...state,
        updatingDistrict: true,
        district: action.payload,
      };

    case UPDATE_DISTRICT_SUCCESS:
      let newDistricts1 = state.districts.map((item) => {
        if (item._id == state.district._id) {
          return action.payload.data;
        } else {
          return item;
        }
      });
      return {
        ...state,
        updatingDistrict: false,
        district: "",
        updatingDistrict: false,
        updateDistrictResponse: {
          type: "success",
          message: "District updated successfully",
        },
        districts: newDistricts1,
      };

    case UPDATE_DISTRICT_FAIL:
      return {
        ...state,
        updatingDistrict: false,
        updateDistrictResponse: {
          type: "failure",
          message: "Updating district failed",
        },
        error: action.payload,
      };
     
    default:
      return state;
  }
};

export default District;
