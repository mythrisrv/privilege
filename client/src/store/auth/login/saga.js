import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

// Login Redux States
import { CHECK_AUTH, LOGIN_USER, LOGOUT_USER } from "./actionTypes";
import { apiError, loginSuccess } from "./actions";
import { login, checkAuth } from "../../../helpers/backend_helper";
import Cookies from "universal-cookie";
const cookies = new Cookies();

//Include Both Helper File with needed methods

function* loginUser({ payload: { user, history } }) {
  try {
    const response = yield call(login, {
      username: user.username,
      password: user.password,
    });
    yield put(loginSuccess());
    localStorage.setItem("authUser", JSON.stringify(response.data));
    cookies.set("rememberMe", "true", { path: "/" });
    history.push("/dashboard");
    window.location.reload();
  } catch (error) {
    yield put(apiError(error.response));
  }
}

function* checkAuthentication({ payload: history }) {
  try {
    let adminData = JSON.parse(localStorage.getItem("authUser"));
    const response = yield call(checkAuth, {
      token: adminData.token,
    });
    history.push("/dashboard");
  } catch (error) {
    localStorage.removeItem("authUser");
    history.push("/login");
  }
}

function* logoutUser({ payload: { history } }) {
  try {
    localStorage.removeItem("authUser");
    history.push("/login");
  } catch (error) {
    yield put(apiError(error));
  }
}

function* authSaga() {
  yield takeEvery(LOGIN_USER, loginUser);
  yield takeEvery(LOGOUT_USER, logoutUser);
  yield takeEvery(CHECK_AUTH, checkAuthentication);
}

export default authSaga;
