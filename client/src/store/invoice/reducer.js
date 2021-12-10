import{
    GET_INVOICE,
    GET_INVOICE_SUCCESS,
    GET_INVOICE_FAIL

} from "./actionTypes"

const INIT_STATE={
    invoice:[],
    error:{}
}

const Invoice = (state = INIT_STATE, action) => {
    switch (action.type) {
      case GET_INVOICE:
        return {
          ...state,
          params: action.payload,
        };
  
      case GET_INVOICE_SUCCESS:
        return {
          ...state,
          invoice: action.payload.data,
        };
  
      case GET_INVOICE_FAIL:
        return {
          ...state,
          error: action.payload,
        };
    default:
        return state;
    }
}

export default Invoice;
