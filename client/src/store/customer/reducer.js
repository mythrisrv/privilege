import{
GET_CUSTOMERS,
GET_CUSTOMERS_SUCCESS,
GET_CUSTOMERS_FAIL
}from "./actionTypes";

const INIT_STATE={
    customers:[],
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
            default:
                return state;       
    }

};

export default Customer;