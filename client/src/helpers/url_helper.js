//LOGIN
export const POST_LOGIN = "/login";

export const CHECK_AUTH = "/auth";

//PROFILE
export const POST_EDIT_JWT_PROFILE = "/post-jwt-profile";
export const POST_EDIT_PROFILE = "/post-fake-profile";

// Menu Options

export const GET_Menu_OPTIONS = '/menu/list';

//USERS
export const GET_USERS = "/user/list";
export const ADD_USER = "/user";
export const GET_USER = "/user";
export const UPDATE_USER = "/user";
export const DELETE_USER = "/user";

//DISTRICT
export const GET_DISTRICTS = "/district/list";
export const ADD_DISTRICT = "/district";
export const GET_DISTRICT = "/district";
export const UPDATE_DISTRICT = "/district";
export const DELETE_DISTRICT = "/district";
export const GET_DISTRICT_OPTIONS = "/district/list/options";

//WARDS
export const GET_WARDS = "/ward/list";
export const ADD_WARD = "/ward";
export const GET_WARD = "/ward";
export const UPDATE_WARD = "/ward";
export const DELETE_WARD = "/ward";


//LOCALBODY
export const GET_LOCALBODY_TYPES="/localbody/list/options/types"
export const GET_LOCALBODIES = "/localbody/list";
export const ADD_LOCALBODY = "/localbody";
export const GET_LOCALBODY = "/localbody/list";
export const UPDATE_LOCALBODY = "/localbody";
export const DELETE_LOCALBODY = "/localbody";
export const GET_WARD_OPTIONS="/ward/list/options";
export const GET_LOCALBODY_OPTIONS="/localbody/list/options"

// Privilages options
export const GET_PRIVILAGES_OPTIONS = "/privilage/list/options";

// Companies options
export const GET_COMPANIES_OPTIONS = "/company/list/options";
export const GET_COMPANIES_MASTER_OPTIONS = "/company/list/single_options";
export const GET_LOCALBODIES_MASTER_OPTIONS = "/company/list/localbodies";

// Branches options
export const GET_BRANCHES_OPTIONS = "/branch/list/options";

export const GET_USER_PROFILE = "/user";

//Groups
export const GET_GROUPS= "/group/list";
export const ADD_GROUP = "/group";
export const GET_GROUP = "/group";
export const UPDATE_GROUP = "/group";
export const DELETE_GROUP = "/group";

//get customers
export const GET_CUSTOMERS = "/customer/list_crm";

//get wasteitems
export const GET_WASTEITEMS= "/wasteItems/list";
export const GET_WASTE_TYPES= "/wasteItems/list/types";
export const GET_WASTE_CATEGORIES= "/wasteItems/list/categories";
export const ADD_WASTE_ITEM = "/wasteItems/upload";
export const UPDATE_WASTE_ITEM = "/wasteItems";
export const DELETE_WASTE_ITEM = "/wasteItems";

//get custome categories
export const GET_CUST_CATEGORIES="/customerCategory/list";
export const ADD_CUST_CATEGORY = "/customerCategory";
export const GET_CUST_CATEGORY = "/customerCategory";
export const UPDATE_CUST_CATEGORY = "/customerCategory";
export const DELETE_CUST_CATEGORY = "/customerCategory";

export const GET_QRCODE="/qrcode/list";
export const ADD_QRCODE = "/qrcode";

export const GET_TARIFF="/tariff/list";
export const GET_TARIFF_OPTIONS="/tariff/list/options";
export const UPDATE_TARIFF_STATUS = "/tariff";