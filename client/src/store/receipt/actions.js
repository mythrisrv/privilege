import{
        
    GET_RECEIPTS,
    GET_RECEIPTS_SUCCESS,
    GET_RECEIPTS_FAIL,
    

} from "./actionTypes"

export const getReceipts = () => ({
    type: GET_RECEIPTS,
  });
  
  export const getReceiptsSuccess = (receipt) => ({
    type: GET_RECEIPTS_SUCCESS,
    payload: receipt,
  });
  
  export const getReceiptsFail = (error) => ({
    type: GET_RECEIPTS_FAIL,
    payload: error,
  });