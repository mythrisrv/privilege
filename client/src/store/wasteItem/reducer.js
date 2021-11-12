import{
    GET_WASTEITEMS,
    GET_WASTEITEMS_SUCCESS,
    GET_WASTEITEMS_FAIL

} from "./actionTypes"

const INIT_STATE={
    wasteItems:[],
    error:{}
}

const WasteItems = (state=INIT_STATE, action) => {
    switch (action.type) {
     case GET_WASTEITEMS:
       return{
         ...state,
         params:action.payload,

       };
      case GET_WASTEITEMS_SUCCESS:
        return {
          ...state,
         wasteItems: action.payload.data,
        };
  
      case GET_WASTEITEMS_FAIL:
        return {
          ...state,
          error: action.payload,
        };
        default:
            return state
    }
}

export default WasteItems