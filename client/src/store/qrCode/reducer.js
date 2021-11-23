import{
    GET_QRCODE,GET_QRCODE_FAIL,
    GET_QRCODE_SUCCESS,
    ADD_QRCODE,
    ADD_QRCODE_SUCCESS,
    ADD_QRCODE_FAIL,

} from "./actionTypes";

const INIT_STATE={
  qrcodes:[],
  error:{},
  adding:false,
  addResponse:{},
  qrcode:{}

};
const Qrcode = (state = INIT_STATE, action) => {
    switch (action.type) {
      case GET_QRCODE:
        return {
          ...state,
          params: action.payload,
        };
  
      case GET_QRCODE_SUCCESS:
        return {
          ...state,
          qrcodes: action.payload.data,
        };
  

case GET_QRCODE_FAIL:
    return {
      ...state,
      error: action.payload,
    };
  case ADD_QRCODE:
    return {
      ...state,
      adding: true,
      qrcode: action.payload,
    };

  case ADD_QRCODE_SUCCESS:
    let newqr = [...state.qrcodes, action.payload.data];
    return {
      ...state,
      adding: false,
      addResponse: {
        type: "success",
        message: "qrcode added successfully",
       
      },
    
      qrcodes: newqr,
      error: {},
      
    };

  case ADD_QRCODE_FAIL:
    return {
      ...state,
      adding: false,
      addResponse: { type: "failure", message: "Adding failed" },
      error: action.payload,
    };
    default:
        return state;
 }
}

export default Qrcode;