import{
GET_QRCODE,
GET_QRCODE_SUCCESS,
GET_QRCODE_FAIL,
ADD_QRCODE,
ADD_QRCODE_FAIL,
ADD_QRCODE_SUCCESS
} from "./actionTypes"


export const getQrcode = () => ({
    type: GET_QRCODE,
  });
  
  export const getQrcodesSuccess = (qrcode) => ({
    type: GET_QRCODE_SUCCESS,
    payload: qrcode,
  });
  
  export const getQrcodeFail = (error) => ({
    type: GET_QRCODE_FAIL,
    payload: error,
  });

  export const addQrcode = (qrcode) => ({
    type: ADD_QRCODE,
    payload: qrcode,
  });
  
  export const addQrcodeSuccess = (qrcode) => ({
    type: ADD_QRCODE_SUCCESS,
    payload: qrcode,
  });
  
  export const addQrcodeFail = (error) => ({
    type: ADD_QRCODE_FAIL,
    payload: error,
  });
