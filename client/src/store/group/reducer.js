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
} from "./actionTypes";

const INIT_STATE={
  groups:[],
  addingGroup: false,
  deletingGroup: false,
  addGroupResponse: {},
  updateGroupResponse: {},
  deleteGroupResponse: {},
  groupIdToBeDeleted: "",
  group: {},
  error: {},
}



const Group = (state=INIT_STATE, action) => {
    switch (action.type) {
     case GET_GROUPS:
       return{
         ...state,
         params:action.payload,

       };
      case GET_GROUPS_SUCCESS:
        return {
          ...state,
         groups: action.payload.data,
        };
  
      case GET_GROUPS_FAIL:
        return {
          ...state,
          error: action.payload,
        };
        case GET_GROUP:
          return {
            ...state,
            params: action.payload,
          };
          case GET_GROUP_SUCCESS:
            return {
              ...state,
              group: action.payload.data,
            };
            case GET_GROUP_FAIL:
        return {
          ...state,
          error: action.payload,
        };
      case ADD_GROUP:
        return {
          ...state,
          addingGroup: true,
          group: action.payload,
        };
  
      case ADD_GROUP_SUCCESS:
        let newGroups = [...state.groups, action.payload.data];
        return {
          ...state,
          addingGroup: false,
          addGroupResponse: {
            type: "success",
            message: "Group added successfully",
          },
          groups: newGroups,
          error: {},
        };
  
      case ADD_GROUP_FAIL:
        return {
          ...state,
          addingGroup: false,
          addGroupResponse: { type: "failure", message: "Adding GROUP failed" },
          error: action.payload,
        };
      case DELETE_GROUP:
        return {
          ...state,
          deletingGroup: true,
          groupIdToBeDeleted: action.payload,
        };
  
      case DELETE_GROUP_SUCCESS:
         let newGroupss = state.groups.filter((item) => {
          return item._id != state.groupIdToBeDeleted;
        });
        return {
          ...state,
          deletingGroup: false,
          groupIdToBeDeleted: "",
          deletingGroup: false,
          deleteGroupResponse: {
            type: "success",
            message: "Group deleted successfully",
          },
          groups: newGroupss,
        };
  
      case DELETE_GROUP_FAIL:
        return {
          ...state,
          deletingGroup: false,
          deleteGroupResponse: {
            type: "failure",
            message: "Deleting group failed",
          },
          error: action.payload,
        };
  
      case UPDATE_GROUP:
        return {
          ...state,
          updatingGroup: true,
          group: action.payload,
        };
  
      case UPDATE_GROUP_SUCCESS:
        let newGroupsss = state.groups.map((item) => {
          if (item._id == state.group._id) {
            return action.payload.data;
          } else {
            return item;
          }
        });
        return {
          ...state,
          updatingGroup: false,
          group: "",
          updatingGroup: false,
          updateGroupResponse: {
            type: "success",
            message: " Group updated successfully",
          },
          groups: newGroupsss,
        };
  
      case UPDATE_GROUP_FAIL:
        return {
          ...state,
          updatingGroup: false,
          updateGroupResponse: {
            type: "failure",
            message: "Updating group failed",
          },
          error: action.payload,
        };
        default:
           return state
    }
}

    export default Group;