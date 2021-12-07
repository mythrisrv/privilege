import{
    GET_TARIFF,
    GET_TARIFF_SUCCESS,
    GET_TARIFF_FAIL,
    GET_TARIFF_OPTIONS,
    GET_TARIFF_OPTIONS_SUCCESS,
    GET_TARIFF_OPTIONS_FAIL,
    UPDATE_TARIFF_STATUS,
    UPDATE_TARIFF_STATUS_SUCCESS,
    UPDATE_TARIFF_STATUS_FAIL,

} from "./actionTypes"

export const getTariff = () => ({
    type: GET_TARIFF,
  });
  
  export const getTariffSuccess = (tariff) => ({
    type: GET_TARIFF_SUCCESS,
    payload: tariff,
  });
  
  export const getTariffFail = (error) => ({
    type: GET_TARIFF_FAIL,
    payload: error,
  });
  export const getTariffOptions = () => ({
    type: GET_TARIFF_OPTIONS,
  });
  
  export const getTariffOptionsSuccess = (tariffOptions) => ({
    type: GET_TARIFF_OPTIONS_SUCCESS,
    payload: tariffOptions,
  });
  export const getTariffOptionsFail = (error) => ({
    type: GET_TARIFF_OPTIONS_FAIL,
    payload: error,
  });

  export const updateTariffStatus = (tariff) => ({
    type: UPDATE_TARIFF_STATUS,
    payload: tariff,
  });
  
  export const updateTariffSuccess = (tariff) => ({
    type: UPDATE_TARIFF_STATUS_SUCCESS,
    payload: tariff,
  });
  
  export const updateTariffFail = (error) => ({
    type: UPDATE_TARIFF_STATUS_FAIL,
    payload: error,
  });
  
