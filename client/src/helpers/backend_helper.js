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

// get menu options
export const getMenusOptions = (userId) => get(`${url.GET_Menu_OPTIONS}?id=${userId}`);
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


// get users
export const getDistricts = () => get(url.GET_DISTRICTS);

// add user
export const addDistrict = (district) => post(url.ADD_DISTRICT, district);
export const getDistrict = (userId) => get(url.GET_DISTRICT, userId);
export const updateDistrict = (district) => put(`${url.UPDATE_DISTRICT}/${district._id}`, district);
export const deleteDistrict = (userId) => del(url.DELETE_DISTRICT, userId);

// get wards
export const getWards  = () => get(url.GET_WARDS);

// add ward
export const addWard = (ward) => post(url.ADD_WARD, ward);
export const getWard = (wardId) => get(url.GET_WARD, wardId);
export const updateWard = (ward) => put(`${url.UPDATE_WARD}/${ward._id}`, ward);
export const deleteWard = (wardId) => del(url.DELETE_WARD, wardId);


// get localbodies
export const getLocalbodies  = () => get(url.GET_LOCALBODIES);

// add localbodies
export const addLocalbody = (localbody) => post(url.ADD_LOCALBODY, localbody);
export const getLocalbody = (localbodyname) => get(url.GET_LOCALBODY, localbodyname);
export const updateLocalbody = (localbody) => put(`${url.UPDATE_LOCALBODY}/${localbody._id}`, localbody);
export const deleteLocalbody= (localbodyId) => del(url.DELETE_LOCALBODY, localbodyId);






// get privilages options
export const getPrivilagesOptions = () => get(url.GET_PRIVILAGES_OPTIONS);

// get companies options
export const getCompaniesOptions = () => get(url.GET_COMPANIES_OPTIONS);

// get Branches options
export const getBranchesOptions = (companyId) =>
  get(`${url.GET_BRANCHES_OPTIONS}/${companyId}`, { companyId: companyId });

export { getLoggedInUser, isUserAuthenticated, login };


// get Groups
export const getGroups  = () => get(url.GET_GROUPS);

export const addGroup = (group) => post(url.ADD_GROUP, group);
export const getGroup = (groupname) => get(url.GET_GROUP, groupname);
export const updateGroup = (group) => put(`${url.UPDATE_GROUP}/${group._id}`, group);
export const deleteGroup= (groupId) => del(url.DELETE_GROUP, groupId);


//get customers
export const getCustomers = () =>get(url.GET_CUSTOMERS);

export const getWardOptions = (localbodyId) =>
  get(`${url.GET_WARD_OPTIONS}/${localbodyId}`, { localbodyId: localbodyId });
