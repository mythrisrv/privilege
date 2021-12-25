import{
GET_CUSTOMERS,
GET_CUSTOMERS_SUCCESS,
GET_CUSTOMERS_FAIL,
GET_CUST_VISITLOG,
GET_CUST_VISITLOG_SUCCESS,
GET_CUST_VISITLOG_FAIL,
GET_CUST_RECEIPTS,
GET_CUST_RECEIPTS_SUCCESS,
GET_CUST_RECEIPTS_FAIL,
GET_CUST_INVOICE,
GET_CUST_INVOICE_SUCCESS,
GET_CUST_INVOICE_FAIL
}from "./actionTypes";

const INIT_STATE={
    customers:[],
    visitLog:[],
    custReceipts:[],
    custInvoice:[],
    error:{},
}

const Customer=(state=INIT_STATE,action)=>{

    switch(action.type){
        case GET_CUSTOMERS:
            return{
                ...state,
                params:action.payload,
            };
        case GET_CUSTOMERS_SUCCESS:
            return{
                ...state,
                customers:action.payload.data,
            };
          case GET_CUSTOMERS_FAIL:
              return{
                  ...state,
                  error:action.payload,
              };

              case GET_CUST_VISITLOG:
                return{
                    ...state,
                    params:action.payload,
                };
            case GET_CUST_VISITLOG_SUCCESS:
                return{
                    ...state,
                    visitLog:action.payload.data,
                };
              case GET_CUST_VISITLOG_FAIL:
                  return{
                      ...state,
                      error:action.payload,
                  };
                  case GET_CUST_RECEIPTS:
                    return{
                        ...state,
                        params:action.payload,
                    };
                case GET_CUST_RECEIPTS_SUCCESS:
                    return{
                        ...state,
                        custReceipts:action.payload.data,
                    };
                  case GET_CUST_RECEIPTS_FAIL:
                      return{
                          ...state,
                          error:action.payload,
                      };
                      case GET_CUST_INVOICE:
                        return{
                            ...state,
                            params:action.payload,
                        };
                    case GET_CUST_INVOICE_SUCCESS:
                        return{
                            ...state,
                            custInvoice:action.payload.data,
                        };
                      case GET_CUST_INVOICE_FAIL:
                          return{
                              ...state,
                              error:action.payload,
                          };
            default:
                return state;       
    }

};

export default Customer;