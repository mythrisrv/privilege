import axios from "axios";
import { post, del, get, put } from "./api_helper";
import * as url from "./url_helper";

// Gets the logged in user data from local session
const getLoggedInUser = () => {
  const user = localStorage.getItem("user");
  if (user) return JSON.parse(user);
  return null;
};

//is user is logged in
const isUserAuthenticated = () => {
  return getLoggedInUser() !== null;
};

// Login Method
const login = (data) => post(url.POST_LOGIN, data);

export const checkAuth = (data) => post(url.CHECK_AUTH, data);

// postForgetPwd
// const postJwtForgetPwd = (data) =>
//   post(url.POST_FAKE_JWT_PASSWORD_FORGET, data);

// get Product detail
// export const getProductDetail = (id) =>
//   get(`${url.GET_PRODUCTS_DETAIL}/${id}`, { params: { id } });

export const getUserProfile = () => get(url.GET_USER_PROFILE);

// get users
export const getUsers = () => get(url.GET_USERS);

// add user
export const addUser = (user) => post(url.ADD_USER, user);
export const getUser = (userId) => get(url.GET_USER, userId);
export const updateUser = (user) => put(`${url.UPDATE_USER}/${user._id}`, user);
export const deleteUser = (userId) => del(url.DELETE_USER, userId);

// get privilages options
export const getPrivilagesOptions = () => get(url.GET_PRIVILAGES_OPTIONS);

// get companies options
export const getCompaniesOptions = () => get(url.GET_COMPANIES_OPTIONS);

// get Branches options
export const getBranchesOptions = (companyId) =>
  get(`${url.GET_BRANCHES_OPTIONS}/${companyId}`, { companyId: companyId });

export { getLoggedInUser, isUserAuthenticated, login };
