import{
    GET_WASTEITEMS,
    GET_WASTEITEMS_SUCCESS,
    GET_WASTEITEMS_FAIL,
    GET_WASTE_TYPES,
    GET_WASTE_TYPES_SUCCESS,
    GET_WASTE_TYPES_FAIL,
    GET_WASTE_CATEGORIES,
    GET_WASTE_CATEGORIES_SUCCESS,
    GET_WASTE_CATEGORIES_FAIL

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

  export const getWasteTypes = () => ({
    type: GET_WASTE_TYPES,
  });

  export const getWasteTypesSuccess = (wasteType) => ({
    type: GET_WASTE_TYPES_SUCCESS,
    payload:wasteType,
  });

  export const getWasteTypesFail = (error) => ({
    type: GET_WASTE_TYPES_FAIL,
    payload:error,
  });

  export const getWasteCategories = () => ({
    type: GET_WASTE_CATEGORIES,
  });

  export const getWasteCategoriesSuccess = (category) => ({
    type: GET_WASTE_CATEGORIES_SUCCESS,
    payload:category,
  });

  export const getWasteCategoriesFail = (error) => ({
    type: GET_WASTE_CATEGORIES_FAIL,
    payload:error,
  });