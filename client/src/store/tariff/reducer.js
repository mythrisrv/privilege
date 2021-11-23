import{
GET_TARIFF,
GET_TARIFF_FAIL,
GET_TARIFF_SUCCESS
}from "./actionTypes"

const INIT_STATE={
    tariff:[],
    error:{}
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
default:
    return state
    }
}

export default Tariff;