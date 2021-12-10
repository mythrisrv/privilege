import{
    GET_GROUPS,
    GET_GROUPS_SUCCESS,
    GET_GROUPS_FAIL,
    GET_GROUP,
    GET_GROUP_SUCCESS,
    GET_GROUP_FAIL,
    ADD_GROUP,
    ADD_GROUP_SUCCESS,
    ADD_GROUP_FAIL,
    UPDATE_GROUP,
    UPDATE_GROUP_SUCCESS,
    UPDATE_GROUP_FAIL,
    DELETE_GROUP,
    DELETE_GROUP_SUCCESS,
    DELETE_GROUP_FAIL,
    GET_GROUP_OPTIONS,
    GET_GROUP_OPTIONS_SUCCESS,
    GET_GROUP_OPTIONS_FAIL,
    GET_WARDS_GROUP_OPTIONS,
    GET_WARDS_GROUP_OPTIONS_SUCCESS,
    GET_WARDS_GROUP_OPTIONS_FAIL

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

  export const addGroup = (group) => ({
    type: ADD_GROUP,
    payload: group,
  });
  
  export const addGroupSuccess = (group) => ({
    type: ADD_GROUP_SUCCESS,
    payload: group,
  });
  
  export const addGroupFail = (error) => ({
    type: ADD_GROUP_FAIL,
    payload: error,
  });
  
  export const getGroup = (group) => ({
    type: GET_GROUP,
    payload: group,
  });
  
  export const getGroupSuccess = (group) => ({
    type: GET_GROUP_SUCCESS,
    payload: group,
  });
  
  export const getGroupFail = (error) => ({
    type: GET_GROUP_FAIL,
    payload: error,
  });
  
  export const updateGroup = (group) => ({
    type: UPDATE_GROUP,
    payload: group,
  });
  
  export const updateGroupSuccess = (group) => ({
    type: UPDATE_GROUP_SUCCESS,
    payload: group,
  });
  
  export const updateGroupFail = (error) => ({
    type: UPDATE_GROUP_FAIL,
    payload: error,
  });
  
  export const deleteGroup= (group) => ({
    type: DELETE_GROUP,
    payload:group,
  });
  
  export const deleteGroupSuccess = (group) => ({
    type: DELETE_GROUP_SUCCESS,
    payload: group,
  });
  
  export const deleteGroupFail = (error) => ({
    type: DELETE_GROUP_FAIL,
    payload: error,
  });

  export const getGroupOptions = (localbodyId) => ({
    type: GET_GROUP_OPTIONS,
    localbodyId:localbodyId,
  });
  
  export const getGroupOptionsSuccess = (groupOptions) => ({
    type: GET_GROUP_OPTIONS_SUCCESS,
    payload: groupOptions,
  });
  
  export const getGroupOptionsFail = (error) => ({
    type: GET_GROUP_OPTIONS_FAIL,
    payload: error,
  });
  export const getWardsGroupOptions = (wardId) => ({
    type: GET_WARDS_GROUP_OPTIONS,
    wardId:wardId,
  });
  
  export const getWardsGroupOptionsSuccess = (groupOptions) => ({
    type: GET_WARDS_GROUP_OPTIONS_SUCCESS,
    payload: groupOptions,
  });
  
  export const getWardsGroupOptionsFail = (error) => ({
    type: GET_WARDS_GROUP_OPTIONS_FAIL,
    payload: error,
  });