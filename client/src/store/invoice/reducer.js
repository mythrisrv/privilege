import{
    GET_INVOICE,
    GET_INVOICE_SUCCESS,
    GET_INVOICE_FAIL,
    GET_INVOICE_LIST,
    GET_INVOICE_LIST_SUCCESS,
    GET_INVOICE_LIST_FAIL

} from "./actionTypes"

const INIT_STATE={
    invoice:[],
    error:{},
    invoiceList:[]
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
        case GET_INVOICE_LIST:
          return {
            ...state,
            params: action.payload,
          };
    
        case GET_INVOICE_LIST_SUCCESS:
          return {
            ...state,
            invoiceList: action.payload.data,
          };
    
        case GET_INVOICE_LIST_FAIL:
          return {
            ...state,
            error: action.payload,
          };
    default:
        return state;
    }
}

export default Invoice;
