import{
    GET_WASTEITEMS,
    GET_WASTEITEMS_SUCCESS,
    GET_WASTEITEMS_FAIL

} from"./actionTypes"


export const getWasteItems = () => ({
    type: GET_WASTEITEMS,
  });
  
  export const getWasteItemsSuccess = (wasteItems) => ({
    type: GET_WASTEITEMS_SUCCESS,
    payload: wasteItems,
  });
  
  export const getWasteItemsFail = (error) => ({
    type: GET_WASTEITEMS_FAIL,
    payload: error,
  });