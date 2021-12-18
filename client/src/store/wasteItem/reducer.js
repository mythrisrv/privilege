import{
  GET_WASTEITEMS,
  GET_WASTEITEMS_SUCCESS,
  GET_WASTEITEMS_FAIL,
  GET_WASTE_TYPES,
  GET_WASTE_TYPES_SUCCESS,
  GET_WASTE_TYPES_FAIL,
  GET_WASTE_CATEGORIES,
  GET_WASTE_CATEGORIES_FAIL,
  GET_WASTE_CATEGORIES_SUCCESS,
  ADD_WASTE_ITEM,
  ADD_WASTE_ITEM_SUCCESS,
  ADD_WASTE_ITEM_FAIL,
  UPDATE_WASTE_ITEM,
  UPDATE_WASTE_ITEM_SUCCESS,
  UPDATE_WASTE_ITEM_FAIL,
  DELETE_WASTE_ITEM,
  DELETE_WASTE_ITEM_SUCCESS,
  DELETE_WASTE_ITEM_FAIL,
  GET_WASTEITEMS_OPTIONS,
  GET_WASTEITEMS_OPTIONS_SUCCESS,
  GET_WASTEITEMS_OPTIONS_FAIL


} from "./actionTypes"

const INIT_STATE={
  wasteItems:[],
  error:{},
  wasteTypes:[],
  categories:[],
  addingWasteItem: false,
deletingWasteItem: false,
addWasteItemResponse: {},
updateWasteItemResponse: {},
deleteWasteItemResponse: {},
wasteItemIdToBeDeleted: "",
wasteItem:{},
wasteItemsOptions:[],
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

            case ADD_WASTE_ITEM:
              
              return {
                ...state,
                addingWasteItem: true,
                wasteItem: action.payload,
              };
        
            case ADD_WASTE_ITEM_SUCCESS:
              let newWasteItems = [...state.wasteItems, action.payload.data];
              return {
                ...state,
                addingWasteItem: false,
                addWasteItemResponse: {
                  type: "success",
                  message: "wasteitem added successfully",
                },
                wasteItems: newWasteItems,
                error: {},
              };
        
            case ADD_WASTE_ITEM_FAIL:
              return {
                ...state,
                addingWasteItem: false,
                addWasteItemResponse: { type: "failure", message: "Adding localbody failed" },
                error: action.payload,
              };
            case DELETE_WASTE_ITEM:
              return {
                ...state,
                deletingLocalbody: true,
                wasteItemIdToBeDeleted: action.payload,
              };

              case DELETE_WASTE_ITEM_SUCCESS:
                let newWasteItemss = state.wasteItems.filter((item) => {
                 return item._id != state.wasteItemIdToBeDeleted;
               });
               return {
                 ...state,
                 deletingWasteItem: false,
                 wasteItemIdToBeDeleted: "",
                 deletingWasteItem: false,
                 deleteWasteItemResponse: {
                   type: "success",
                   message: "wasteitem deleted successfully",
                 },
                 wasteItems: newWasteItemss,
               };

               case DELETE_WASTE_ITEM_FAIL:
                return {
                  ...state,
                  deletingWasteItem: false,
                  deleteWasteItemResponse: {
                    type: "failure",
                    message: "Deleting wasteItem failed",
                  },
                  error: action.payload,
                };
          
              case UPDATE_WASTE_ITEM:
                return {
                  ...state,
                  updatingWasteItem: true,
                  wasteItem: action.payload,
                };

                case UPDATE_WASTE_ITEM_SUCCESS:
                  let newWasteItemsss = state.wasteItems.map((item) => {
                    if (item._id == state.wasteItem._id) {
                      return action.payload.data;
                    } else {
                      return item;
                    }
                  });
                  return {
                    ...state,
                    updatingWasteItem: false,
                    wasteItem: "",
                    updatingWasteItem: false,
                    updateWasteItemResponse: {
                      type: "success",
                      message: " updated successfully",
                    },
                    wasteItems: newWasteItemsss,
                  };
            
                case UPDATE_WASTE_ITEM_FAIL:
                  return {
                    ...state,
                    updatingWasteItem: false,
                    updateWasteItemResponse: {
                      type: "failure",
                      message: "Updating  failed",
                    },
                    error: action.payload,
                  };
            
                  case GET_WASTEITEMS_OPTIONS:
                    return{
                      ...state,
                      params:action.payload,
               
                    };
                   case GET_WASTEITEMS_OPTIONS_SUCCESS:
                     return {
                       ...state,
                      wasteItemsOptions: action.payload.data,
                     };
               
                   case GET_WASTEITEMS_OPTIONS_FAIL:
                     return {
                       ...state,
                       error: action.payload,
                     };


        
      default:
          return state
  }
}

export default WasteItems