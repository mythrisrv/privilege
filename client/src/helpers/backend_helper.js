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
export const updateUser = (user) => put(`${url.UPDATE_USER}/${user._id}`);
export const deleteUser = (userId) => del(url.DELETE_USER, userId);


// Brands

export const getBrands = () => get(url.GET_BRANDS);

// add brand
export const addBrand = (brand) => post(url.ADD_BRAND, brand);
export const getBrand = (brandId)=> get(url.GET_BRAND, brandId);
export const updateBrand = (brand) => put(`${url.UPDATE_BRAND}/${brand._id}`);
export const deleteBrand = (brandId) => del(url.DELETE_BRAND, brandId);


// Unit

export const getUnits = () => get(url.GET_UNITS);

export const addUnit = (unit) => post(url.ADD_UNIT, unit);
export const getUnit = (unitId)=> get(url.GET_UNIT, unitId);
export const updateUnit = (unit) => put(`${url.UPDATE_UNIT}/${unit._id}`);
export const deleteUnit = (unitId) => del(url.DELETE_UNIT, unitId);

// Tax

export const getTaxes = () => get(url.GET_TAXES);

export const addTax = (tax) => post(url.ADD_TAX, tax);
export const getTax = (taxId)=> get(url.GET_TAX, taxId);
export const updateTax = (tax) => put(`${url.UPDATE_TAX}/${tax._id}`);
export const deleteTax = (taxId) => del(url.DELETE_TAX, taxId);




// get privilages options
export const getPrivilagesOptions = () => get(url.GET_PRIVILAGES_OPTIONS);

// get companies options
export const getCompaniesOptions = () => get(url.GET_COMPANIES_OPTIONS);

// get Branches options
export const getBranchesOptions = (companyId) =>
  get(`${url.GET_BRANCHES_OPTIONS}/${companyId}`, { companyId: companyId });



export { getLoggedInUser, isUserAuthenticated, login };
//CATEGORY
export const addCategory = (category) => post(url.ADD_CATEGORY, category);
export const getCategory = (categoryId) => get(url.GET_CATEGORY, categoryId);
export const updateCategory = (category) => put(`${url.UPDATE_CATEGORY}/${category._id}`);
export const deleteCategory = (categoryId) => del(url.DELETE_CATEGORY, categoryId);
export const getCategories = () => get(url.GET_CATEGORIES);
export const getCategoriesOptions = () => get(url.GET_CATEGORIES_OPTIONS);
//SUBCATEGORY
export const addSubcategory = (subcategory) => post(url.ADD_SUBCATEGORY, subcategory);
export const getSubcategory = (subcategoryId) => get(url.GET_SUBCATEGORY, subcategoryId);
export const updateSubcategory = (subcategory) => put(`${url.UPDATE_SUBCATEGORY}/${subcategory._id}`);
export const deleteSubcategory = (subcategoryId) => del(url.DELETE_SUBCATEGORY, subcategoryId);
export const getSubcategories = () => get(url.GET_SUBCATEGORIES);
//THIRDCATEGORY
export const addThirdcategory = (thirdcategory) => post(url.ADD_THIRDCATEGORY, thirdcategory);
export const getThirdcategory = (thirdcategoryId) => get(url.GET_THIRDCATEGORY, thirdcategoryId);
export const updateThirdcategory = (thirdcategory) => put(`${url.UPDATE_THIRDCATEGORY}/${thirdcategory._id}`);
export const deleteThirdcategory = (thirdcategoryId) => del(url.DELETE_THIRDCATEGORY, thirdcategoryId);
export const getThirdcategories = () => get(url.GET_THIRDCATEGORIES);
//SLIDER
export const addSlider = (slider) => post(url.ADD_SLIDER, slider);
export const getSlider = (sliderId) => get(url.GET_SLIDER, sliderId);
export const updateSlider = (slider) => put(`${url.UPDATE_SLIDER}/${slider._id}`);
export const deleteSlider = (sliderId) => del(url.DELETE_SLIDER, sliderId);
export const getSliders = () => get(url.GET_SLIDERS);