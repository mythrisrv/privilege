import{
GET_TARIFF,
GET_TARIFF_FAIL,
GET_TARIFF_SUCCESS,
GET_TARIFF_OPTIONS,
GET_TARIFF_OPTIONS_SUCCESS,
GET_TARIFF_OPTIONS_FAIL,
UPDATE_TARIFF_STATUS,
UPDATE_TARIFF_STATUS_FAIL,
UPDATE_TARIFF_STATUS_SUCCESS,
}from "./actionTypes"

const INIT_STATE={
    tariff:[],
    error:{},
    packages:[],
    tariffData:{},
    updateTariffResponse:{},

};
const Tariff = (state=INIT_STATE, action) => {
    switch (action.type) {
     case GET_TARIFF:
       return{
         ...state,
         params:action.payload,

       };
      case GET_TARIFF_SUCCESS:
        return {
          ...state,
         tariff: action.payload.data,
        };
  
      case GET_TARIFF_FAIL:
        return {
          ...state,
          error: action.payload,
        };
        case GET_TARIFF_OPTIONS_SUCCESS:
          return {
            ...state,
            packages: action.payload.data,
          };
    
        case GET_TARIFF_OPTIONS_FAIL:
          return {
            ...state,
            error: action.payload,
          };
          case UPDATE_TARIFF_STATUS:
            return {
              ...state,
              updatingTariff: true,
              tariffData: action.payload,
            };
      
          case UPDATE_TARIFF_STATUS_SUCCESS:
            let newTariff1 = state.tariff.map((item) => {
              if (item._id == state.tariffData._id) {
                return action.payload.data;
              } else {
                return item;
              }
            });
            return {
              ...state,
              updatingTariff: false,
              tariffData: "",
              updatingTariff: false,
              updateTariffResponse: {
                type: "success",
                message: "active status updated successfully",
              },
              tariff: newTariff1,
            };
      
          case UPDATE_TARIFF_STATUS_FAIL:
            return {
              ...state,
              updatingTariff: false,
              updateTariffResponse: {
                type: "failure",
                message: "Updating statuds failed",
              },
              error: action.payload,
            };
default:
    return state
    }
}

export default Tariff;