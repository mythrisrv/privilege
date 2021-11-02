import{
    GET_GROUPS,
    GET_GROUPS_SUCCESS,
    GET_GROUPS_FAIL
} from "./actionTypes"


export const getGroups = () => ({
    type: GET_GROUPS,
  });
  
  export const getGroupsSuccess = (groups) => ({
    type: GET_GROUPS_SUCCESS,
    payload: groups,
  });
  
  export const getGroupsFail = (error) => ({
    type: GET_GROUPS_FAIL,
    payload: error,
  });