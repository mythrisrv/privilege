import{

    GET_RECEIPTS,
    GET_RECEIPTS_SUCCESS,
    GET_RECEIPTS_FAIL

}from "./actionTypes";

const INIT_STATE={
    receipts:[],
    error:{}
}

const Receipt = (state = INIT_STATE, action) => {
    switch (action.type) {
      case GET_RECEIPTS:
        return {
          ...state,
          params: action.payload,
        };
  
      case GET_RECEIPTS_SUCCESS:
        return {
          ...state,
          receipts: action.payload.data,
        };
  
      case GET_RECEIPTS_FAIL:
        return {
          ...state,
          error: action.payload,
        };
    default:
        return state;
    }
}

export default Receipt;