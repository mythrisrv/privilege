import{
  GET_WASTEITEMS,
  GET_WASTEITEMS_SUCCESS,
  GET_WASTEITEMS_FAIL,
  GET_WASTE_TYPES,
  GET_WASTE_TYPES_SUCCESS,
  GET_WASTE_TYPES_FAIL,
  GET_WASTE_CATEGORIES,
  GET_WASTE_CATEGORIES_SUCCESS,
  GET_WASTE_CATEGORIES_FAIL,
  ADD_WASTE_ITEM,
  ADD_WASTE_ITEM_FAIL,
  ADD_WASTE_ITEM_SUCCESS,
  UPDATE_WASTE_ITEM,
  UPDATE_WASTE_ITEM_SUCCESS,
  UPDATE_WASTE_ITEM_FAIL,
  DELETE_WASTE_ITEM,
  DELETE_WASTE_ITEM_SUCCESS,
  DELETE_WASTE_ITEM_FAIL,
  GET_WASTEITEMS_OPTIONS,
  GET_WASTEITEMS_OPTIONS_SUCCESS,
  GET_WASTEITEMS_OPTIONS_FAIL 

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


export const addWasteItem = (wasteItem) => ({
  
  type: ADD_WASTE_ITEM,
  payload: wasteItem,
});

export const addWasteItemSuccess = (wasteItem) => ({
  type: ADD_WASTE_ITEM_SUCCESS,
  payload: wasteItem,
});

export const addWasteItemFail = (error) => ({
  type: ADD_WASTE_ITEM_FAIL,
  payload: error,
});

export const updateWasteItem = (wasteItem) => ({
  type: UPDATE_WASTE_ITEM,
  payload: wasteItem,
});

export const updateWasteItemSuccess = (wasteItem) => ({
  type: UPDATE_WASTE_ITEM_SUCCESS,
  payload: wasteItem,
});

export const updateWasteItemFail = (error) => ({
  type: UPDATE_WASTE_ITEM_FAIL,
  payload: error,
});

export const deleteWasteItem = (wasteItem) => ({
  type: DELETE_WASTE_ITEM,
  payload: wasteItem,
});

export const deleteWasteItemSuccess = (wasteItem) => ({
  type: DELETE_WASTE_ITEM_SUCCESS,
  payload: wasteItem,
});

export const deleteWasteItemFail = (error) => ({
  type: DELETE_WASTE_ITEM_FAIL,
  payload: error,
});

export const getWasteItemsOptions = () => ({
  type: GET_WASTEITEMS_OPTIONS,
});

export const getWasteItemsOptionsSuccess = (wasteItemsOptions) => ({
  type: GET_WASTEITEMS_OPTIONS_SUCCESS,
  payload: wasteItemsOptions,
});

export const getWasteItemsOptionsFail = (error) => ({
  type: GET_WASTEITEMS_OPTIONS_FAIL,
  payload: error,
});