import { takeEvery, put, call, takeLatest } from "redux-saga/effects";

import{
    GET_GROUPS,
    GET_GROUP,
    ADD_GROUP,
    UPDATE_GROUP,
    DELETE_GROUP,
    GET_GROUP_OPTIONS
} from "./actionTypes"

import{
  
    getGroupsSuccess,
    getGroupsFail,
    getGroupSuccess,
    getGroupFail,
    addGroupFail,
    addGroupSuccess,
    deleteGroupSuccess,
    deleteGroupFail,
    updateGroupSuccess,
    updateGroupFail,
    getGroupOptionsSuccess,
    getGroupOptionsFail
} from "./actions"

import{ getGroups,getGroup,
addGroup,updateGroup,deleteGroup,getGroupOptions} from "../../helpers/backend_helper";

function* fetchGroups() {
    try {
      const response = yield call(getGroups);
      yield put(getGroupsSuccess(response));
    } catch (error) {
      yield put(getGroupsFail(error));
    }
  }

  function* onGetGroup() {
    try {
      const response = yield call(getGroup);
      yield put(getGroupSuccess(response));
    } catch (error) {
      yield put(getGroupFail(error.response));
    }
  }
  
  function* onAddGroup({ payload: group }) {
    try {
      const response = yield call(addGroup, group);
      yield put(addGroupSuccess(response));
    } catch (error) {
      yield put(addGroupFail(error.response));
    }
  }
  
  function* onUpdateGroup({ payload: group }) {
    delete group.name1;
    delete group.privilage1;
    delete group.company1;
    delete group.branch1;
    delete group.action;
    console.log(group);
    if (group.wards) {
      group.group_ward = group.wards;
    }
    if (group.localbody) {
      group.group_localbody_name_id = group.localbody._id;
      
    }
    if (group.district) {
      group.group_district = group.district._id;
    }
  
    try {
      const response = yield call(updateGroup, group);
      yield put(updateGroupSuccess(response));
    } catch (error) {
      yield put(updateGroupFail(error.response));
    }
  }
  
  function* onDeleteGroup({ payload: groupId }) {
    try {
      const response = yield call(deleteGroup, groupId);
      yield put(deleteGroupSuccess(response));
    } catch (error) {
      yield put(deleteGroupFail(error.response));
    }
  }

  function* fetchGroupOptions({localbodyId:localbodyId}) {
    try {
      const response = yield call(getGroupOptions,localbodyId)
      yield put(getGroupOptionsSuccess(response));
    } catch (error) {
      yield put(getGroupOptionsFail(error));
    }
  }
  

  function* groupSaga() {
    yield takeEvery(GET_GROUPS, fetchGroups);
    yield takeEvery(GET_GROUP, onGetGroup);
    yield takeEvery(ADD_GROUP, onAddGroup);
    yield takeEvery(UPDATE_GROUP, onUpdateGroup);
    yield takeEvery(DELETE_GROUP, onDeleteGroup);
    yield takeEvery(GET_GROUP_OPTIONS, fetchGroupOptions);

  }

export default groupSaga;
