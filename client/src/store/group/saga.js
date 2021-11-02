import { takeEvery, put, call, takeLatest } from "redux-saga/effects";

import{
    GET_GROUPS
} from "./actionTypes"

import{
  
    getGroupsSuccess,
    getGroupsFail
} from "./actions"

import{ getGroups} from "../../helpers/backend_helper";

function* fetchGroups() {
    try {
      const response = yield call(getGroups);
      yield put(getGroupsSuccess(response));
    } catch (error) {
      yield put(getGroupsFail(error));
    }
  }


  function* groupSaga() {
    yield takeEvery(GET_GROUPS, fetchGroups);
  }

export default groupSaga;
