import{
    GET_TARIFF,
    GET_TARIFF_SUCCESS,
    GET_TARIFF_FAIL,

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
