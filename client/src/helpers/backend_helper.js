import axios from "axios";
import { post, del, get, put } from "./api_helper";
import * as url from "./url_helper";

// Gets the logged in user data from local session
const getLoggedInUser = () => {
  const user = localStorage.getItem("user");
  if (user) return JSON.parse(user);
  return null;
};

export const saveCompanyName=(data)=>{
  let company=data;
  return company;
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
export const getDistrictOptions=()=>get(url.GET_DISTRICT_OPTIONS)
// get wards
export const getWards  = () => get(url.GET_WARDS);

// add ward
export const addWard = (ward) => post(url.ADD_WARD, ward);
export const getWard = (wardId) => get(url.GET_WARD, wardId);
export const updateWard = (ward) => put(`${url.UPDATE_WARD}/${ward._id}`, ward);
export const deleteWard = (wardId) => del(url.DELETE_WARD, wardId);


// get localbodies
export const getLocalbodies  = (companyId) =>get(`${url.GET_LOCALBODIES}?id=${companyId}`);

// add localbodies
export const addLocalbody = (localbody) => post(url.ADD_LOCALBODY, localbody);
export const getLocalbody = (localbodyId) => get(`${url.GET_LOCALBODY}/${localbodyId}`,{localbodyId:localbodyId});
export const updateLocalbody = (localbody) => put(`${url.UPDATE_LOCALBODY}/${localbody._id}`, localbody);
export const deleteLocalbody= (localbodyId) => del(url.DELETE_LOCALBODY, localbodyId);

export const getLocalbodyOptions=(distId)=>get(`${url.GET_LOCALBODY_OPTIONS}?id=${distId}`);

export const getLocalbodyTypes = ()=>get(url.GET_LOCALBODY_TYPES)
export const getTypesLocalbodies = (typeId)=>get(`${url.GET_TYPES_LOCALBODIES}?id=${typeId}`)



// get privilages options
export const getPrivilagesOptions = () => get(url.GET_PRIVILAGES_OPTIONS);

// get companies options
export const getCompaniesOptions = () => get(url.GET_COMPANIES_OPTIONS);
export const getCompaniesMasterOptions = (company_id) => get(url.GET_COMPANIES_MASTER_OPTIONS+"?id="+company_id);
export const getLocalbodiesMasterOptions = (company_id) => get(url.GET_LOCALBODIES_MASTER_OPTIONS+"?id="+company_id);

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
export const getGroupOptions=(localbodyId)=>get(`${url.GET_GROUP_OPTIONS}?id=${localbodyId}`)
 

export const getWardsGroupOptions=(wardId)=>get(`${url.GET_WARDS_GROUP_OPTIONS}?wid=${wardId}`)


//get customers
export const getCustomers = () =>get(url.GET_CUSTOMERS);

export const getWardOptions = (localbodyId) =>
  get(`${url.GET_WARD_OPTIONS}/${localbodyId}`, { localbodyId: localbodyId });

//waste items
  export const getWasteItems = () => get(url.GET_WASTEITEMS);
  export const getWasteTypes = () => get(url.GET_WASTE_TYPES);
  export const getWasteCategories = () => get(url.GET_WASTE_CATEGORIES);
  export const addWasteItem = (wasteItem) => post(url.ADD_WASTE_ITEM, wasteItem);
  export const updateWasteItem = (wasteItem) => put(`${url.UPDATE_WASTE_ITEM}/${wasteItem.get('id')}`, wasteItem);
 export const deleteWasteItem= (wasteItemId) => del(url.DELETE_WASTE_ITEM, wasteItemId);
export const getWasteItemsOptions=()=>get(url.GET_WASTE_ITEMS_OPTIONS)
 //customer categories
 export const getCustomerCategoryOptions=()=>get(url.GET_CUST_CATEGORIES_OPTIONS)
 export const getCustomerCategories=()=>get(url.GET_CUST_CATEGORIES)
 export const addCategory= (category) => post(url.ADD_CUST_CATEGORY, category);
export const getCategory = (catId) => get(url.GET_CUST_CATEGORY, catId);
export const updateCategory = (category) => put(`${url.UPDATE_CUST_CATEGORY}/${category._id}`, category);
export const deleteCategory = (catId) => del(url.DELETE_CUST_CATEGORY, catId);


export const getQrcode  = () => get(url.GET_QRCODE);

export const addQrcode = (data) => post(url.ADD_QRCODE, data);

export const getTariff=()=>get(url.GET_TARIFF);
export const getTariffOptions=()=>get(url.GET_TARIFF_OPTIONS);
export const updateTariffStatus = (tariff) => put(`${url.UPDATE_TARIFF_STATUS}/${tariff._id}`,tariff)

export const getInvoice=()=>get(url.GET_INVOICE);
export const getInvoiceList=()=>get(url.GET_INVOICE_LIST);

export const getReceipts=()=>get(url.GET_RECEIPTS);

//Add Tariff
export const getPackages=()=>get(url.GET_PACKAGES)
export const addPackage = (packageData) => post(url.ADD_PACKAGE, packageData);
export const updatePackage = (packageData) => put(`${url.UPDATE_PACKAGE}/${packageData._id}`, packageData);
export const deletePackage= (packageId) => del(url.DELETE_PACKAGE, packageId);
export const updatePackageStatus=(packageData)=>put(`${url.UPDATE_PACKAGE_STATUS}/${packageData._id}`,packageData)
