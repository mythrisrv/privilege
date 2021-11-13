import{
    GET_WASTEITEMS,
    GET_WASTEITEMS_SUCCESS,
    GET_WASTEITEMS_FAIL,
    GET_WASTE_TYPES,
    GET_WASTE_TYPES_SUCCESS,
    GET_WASTE_TYPES_FAIL,
    GET_WASTE_CATEGORIES,
    GET_WASTE_CATEGORIES_FAIL,
    GET_WASTE_CATEGORIES_SUCCESS

} from "./actionTypes"

const INIT_STATE={
    wasteItems:[],
    error:{},
    wasteTypes:[],
    categories:[],
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



      case GET_WASTE_TYPES:
       return{
         ...state,
         params:action.payload,
       };
       case GET_WASTE_TYPES_SUCCESS:
        return{
          ...state,
          wasteTypes:action.payload.data,
        } ;
        case GET_WASTE_TYPES_FAIL:
          return{
            ...state,
            error:action.payload,
          } ; 


        case GET_WASTE_CATEGORIES:
          return{
            ...state,
            params:action.payload,

          };
          case GET_WASTE_CATEGORIES_SUCCESS:
            return{
              ...state,
              categories:action.payload.data,
  
            };
            case GET_WASTE_CATEGORIES_FAIL:
              return{
                ...state,
                error:action.payload,
    
              };
  

          
        default:
            return state
    }
}

export default WasteItems