import {
  GET_LOCALBODIES,
  GET_LOCALBODIES_FAIL,
  GET_LOCALBODIES_SUCCESS,
  ADD_LOCALBODY,
  ADD_LOCALBODY_FAIL,
  ADD_LOCALBODY_SUCCESS,
  DELETE_LOCALBODY,
  DELETE_LOCALBODY_SUCCESS,
  DELETE_LOCALBODY_FAIL,
  UPDATE_LOCALBODY,
  UPDATE_LOCALBODY_SUCCESS,
  UPDATE_LOCALBODY_FAIL,
  GET_LOCALBODY,
  GET_LOCALBODY_SUCCESS,
  GET_LOCALBODY_FAIL,
  GET_LOCALBODY_TYPES,
  GET_LOCALBODY_TYPES_FAIL,
  GET_LOCALBODY_TYPES_SUCCESS,
  GET_LOCALBODY_OPTIONS,
  GET_LOCALBODY_OPTIONS_SUCCESS,
  GET_LOCALBODY_OPTIONS_FAIL,
 
  GET_TYPES_LOCALBODY_OPTIONS_SUCCESS,
  GET_TYPES_LOCALBODY_OPTIONS,
  GET_TYPES_LOCALBODY_OPTIONS_FAIL

} from "./actionTypes";

const INIT_STATE = {
  localbodies: [],
  addingLocalbody: false,
  deletingLocalbody: false,
  addLocalbodyResponse: {},
  updateLocalbodyResponse: {},
  deleteLocalbodyResponse: {},
  localbodyIdToBeDeleted: "",
  localbody: {},
  error: {},
  localbodyTypes:[],
  localbodyOptions:[],
};

const Localbody = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_LOCALBODIES:
      return {
        ...state,
        params: action.payload,
      };

    case GET_LOCALBODIES_SUCCESS:
      return {
        ...state,
        localbodies: action.payload.data,
      };

    case GET_LOCALBODIES_FAIL:
      return {
        ...state,
        error: action.payload,
      };
     
      
      case GET_LOCALBODY:
        return {
          ...state,
          params: action.payload,
        };
        case GET_LOCALBODY_SUCCESS:
          return {
            ...state,
            localbody: action.payload.data,
          };
          case GET_LOCALBODY_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case ADD_LOCALBODY:
      return {
        ...state,
        addingLocalbody: true,
        localbody: action.payload,
      };

    case ADD_LOCALBODY_SUCCESS:
      let newLocalbodys = [...state.localbodies, action.payload.data];
      return {
        ...state,
        addingLocalbody: false,
        addLocalbodyResponse: {
          type: "success",
          message: "Localbody added successfully",
        },
        localbodies: newLocalbodys,
        error: {},
      };

    case ADD_LOCALBODY_FAIL:
      return {
        ...state,
        addingLocalbody: false,
        addLocalbodyResponse: { type: "failure", message: "Adding localbody failed" },
        error: action.payload,
      };
    case DELETE_LOCALBODY:
      return {
        ...state,
        deletingLocalbody: true,
        localbodyIdToBeDeleted: action.payload,
      };

    case DELETE_LOCALBODY_SUCCESS:
       let newLocalbodyss = state.localbodies.filter((item) => {
        return item._id != state.localbodyIdToBeDeleted;
      });
      return {
        ...state,
        deletingLocalbody: false,
        localbodyIdToBeDeleted: "",
        deletingLocalbody: false,
        deleteLocalbodyResponse: {
          type: "success",
          message: "Localbody deleted successfully",
        },
        localbodies: newLocalbodyss,
      };

    case DELETE_LOCALBODY_FAIL:
      return {
        ...state,
        deletingLocalbody: false,
        deleteLocalbodyResponse: {
          type: "failure",
          message: "Deleting localbody failed",
        },
        error: action.payload,
      };

    case UPDATE_LOCALBODY:
      return {
        ...state,
        updatingLocalbody: true,
        localbody: action.payload,
      };

    case UPDATE_LOCALBODY_SUCCESS:
      let newLocalbodysss = state.localbodies.map((item) => {
        if (item._id == state.localbody._id) {
          return action.payload.data;
        } else {
          return item;
        }
      });
      return {
        ...state,
        updatingLocalbody: false,
        localbody: "",
        updatingLocalbody: false,
        updateLocalbodyResponse: {
          type: "success",
          message: "Localbody updated successfully",
        },
        localbodies: newLocalbodysss,
      };

    case UPDATE_LOCALBODY_FAIL:
      return {
        ...state,
        updatingLocalbody: false,
        updateLocalbodyResponse: {
          type: "failure",
          message: "Updating localbody failed",
        },
        error: action.payload,
      };
      case GET_LOCALBODY_TYPES:
      return {
        ...state,
        params: action.payload,
      };

    case GET_LOCALBODY_TYPES_SUCCESS:
      return {
        ...state,
        localbodyTypes: action.payload.data,
      };

    case GET_LOCALBODY_TYPES_FAIL:
      return {
        ...state,
        error: action.payload,
      };
      case GET_LOCALBODY_OPTIONS:
        return {
          ...state,
          params: action.payload,
        };
  
      case GET_LOCALBODY_OPTIONS_SUCCESS:
        return {
          ...state,
          localbodyOptions: action.payload.data,
        };
  
      case GET_LOCALBODY_OPTIONS_FAIL:
        return {
          ...state,
          error: action.payload,
        };
        case GET_TYPES_LOCALBODY_OPTIONS:
        return {
          ...state,
          params: action.payload,
        };
  
      case GET_TYPES_LOCALBODY_OPTIONS_SUCCESS:
        return {
          ...state,
          localbodyOptions: action.payload.data,
        };
  
      case GET_TYPES_LOCALBODY_OPTIONS_FAIL:
        return {
          ...state,
          error: action.payload,
        };

    default:
      return state;
  }
};

export default Localbody;

