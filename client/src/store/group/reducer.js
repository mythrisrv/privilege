import{
    GET_GROUPS,
    GET_GROUPS_SUCCESS,
    GET_GROUPS_FAIL,
} from "./actionTypes";

const INIT_STATE={
  groups:[]
}



const Group = (state=INIT_STATE, action) => {
    switch (action.type) {
     case GET_GROUPS:
       return{
         ...state,
         params:action.payload,

       };
      case GET_GROUPS_SUCCESS:
        return {
          ...state,
         groups: action.payload.data,
        };
  
      case GET_GROUPS_FAIL:
        return {
          ...state,
          error: action.payload,
        };
        default:
           return state
    }
}

    export default Group;