import React from "react";
import { Redirect } from "react-router-dom";

// Dashboard
import Dashboard from "../pages/Dashboard/index";
import User from "../pages/User/index";


import Company from "../pages/MasterSettings/Company";
import Branch from "../pages/MasterSettings/Manage Branch";
import Privilage from "../pages/MasterSettings/Privilage";
import Rules from "../pages/MasterSettings/Rules";
import Settings from "../pages/MasterSettings/Master_Setting";


//Pages
import PagesStarter from "../pages/Utility/pages-starter";
import PagesMaintenance from "../pages/Utility/pages-maintenance";
import PagesComingsoon from "../pages/Utility/pages-comingsoon";
import PagesTimeline from "../pages/Utility/pages-timeline";
import PagesFaqs from "../pages/Utility/pages-faqs";
import PagesPricing from "../pages/Utility/pages-pricing";
import Pages404 from "../pages/Utility/pages-404";
import Pages500 from "../pages/Utility/pages-500";

//Ui
import UiAlert from "../pages/Ui/UiAlert";
import UiButtons from "../pages/Ui/UiButtons";
import UiCards from "../pages/Ui/UiCards";
import UiCarousel from "../pages/Ui/UiCarousel";
import UiColors from "../pages/Ui/UiColors";
import UiDropdown from "../pages/Ui/UiDropdown";
import UiGeneral from "../pages/Ui/UiGeneral";
import UiGrid from "../pages/Ui/UiGrid";
import UiImages from "../pages/Ui/UiImages";
import UiLightbox from "../pages/Ui/UiLightbox";
import UiModal from "../pages/Ui/UiModal";
import UiProgressbar from "../pages/Ui/UiProgressbar";
import UiSweetAlert from "../pages/Ui/UiSweetAlert";
import UiTabsAccordions from "../pages/Ui/UiTabsAccordions";
import UiTypography from "../pages/Ui/UiTypography";
import UiVideo from "../pages/Ui/UiVideo";
import UiSessionTimeout from "../pages/Ui/UiSessionTimeout";
import UiRating from "../pages/Ui/UiRating";
import UiRangeSlider from "../pages/Ui/UiRangeSlider";
import UiNotifications from "../pages/Ui/ui-notifications";
import UiImageCropper from "../pages/Ui/ui-image-cropper";

// Forms
import BasicElements from "../pages/Forms/BasicElements";
import FormLayouts from "../pages/Forms/FormLayouts";
import FormAdvanced from "../pages/Forms/FormAdvanced";
import FormEditors from "../pages/Forms/FormEditors";
import FormValidations from "../pages/Forms/FormValidations";
import FormMask from "../pages/Forms/FormMask";
import FormRepeater from "../pages/Forms/FormRepeater";
import FormUpload from "../pages/Forms/FormUpload";
import FormWizard from "../pages/Forms/FormWizard";
import FormXeditable from "../pages/Forms/FormXeditable";

//Tables
import BasicTables from "../pages/Tables/BasicTables";
import DatatableTables from "../pages/Tables/DatatableTables";
import ResponsiveTables from "../pages/Tables/ResponsiveTables";
import EditableTables from "../pages/Tables/EditableTables";

// Charts
import ChartApex from "../pages/Charts/Apexcharts";
import ChartjsChart from "../pages/Charts/ChartjsChart";
import EChart from "../pages/Charts/EChart";
import SparklineChart from "../pages/Charts/SparklineChart";
import ChartsKnob from "../pages/Charts/charts-knob";

//Icons

import IconUnicons from "../pages/Icons/IconUnicons";
import IconBoxicons from "../pages/Icons/IconBoxicons";
import IconDripicons from "../pages/Icons/IconDripicons";
import IconMaterialdesign from "../pages/Icons/IconMaterialdesign";
import IconFontawesome from "../pages/Icons/IconFontawesome";

// Maps
import MapsGoogle from "../pages/Maps/MapsGoogle";
import MapsVector from "../pages/Maps/MapsVector";
import MapsLeaflet from "../pages/Maps/MapsLeaflet";

// Authentication related pages
import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";
import ForgetPwd from "../pages/Authentication/ForgetPassword";

//  // Inner Authentication
import Login1 from "../pages/AuthenticationInner/Login";
import Register1 from "../pages/AuthenticationInner/Register";
import Recoverpw from "../pages/AuthenticationInner/Recoverpw";
import LockScreen from "../pages/AuthenticationInner/auth-lock-screen";

// Profile
import UserProfile from "../pages/Authentication/user-profile";

// DIstrict
import District from "../pages/Manage/District";

// LocalBody
import Localbody from "../pages/Manage/Localbody";
// ward
import Ward from "../pages/Manage/Ward";

//Group
import Group from "../pages/Manage/Group";

// Add Customer

import AddCustomer from "../pages/Customers/AddCustomer";

import viewTariff from "../pages/Customers/viewTariff";
import QrCode from "../pages/Customers/QrCode";


//account
import AccountType from "../pages/Accounts/Account-Type";
import AccountDetails from "../pages/Accounts/AccountDetails";
import Chart from "../pages/Accounts/Chart";
import FundTransfer from "../pages/Accounts/FundTransfer";
import CreditDebit from "../pages/Accounts/CreditDebit";
import IncomeExpenses from "../pages/Accounts/IncomeExpenses";
import TransactionLog from "../pages/Accounts/TransactionLog";

//Waste Collection
import HelperCollection from "../pages/WasteCollection/HelperCollection";
import HelperDrop from "../pages/WasteCollection/HelperDrop";
import DriverCollection from "../pages/WasteCollection/DriverCollection";
import DriverDrop from "../pages/WasteCollection/DriverDrop";
import WastePlot from "../pages/WasteCollection/WastePlot";
import GroupWasteSpot from "../pages/WasteCollection/GroupWasteSpot";


//package
import AddTariff from "../pages/Package/AddTariff";
import AddWaste from "../pages/Package/AddWaste";

//Invoice
import ViewInvoice from "../pages/Invoice/ViewInvoice";
import AutoInvoice from "../pages/Invoice/AutoInvoice";

//Receipt
import Receipt from "../pages/Receipt";

//Customer Category
import CustomerCategory from "../pages/Manage/CustomerCategory"


const userRoutes = [
  { path: "/dashboard", component: Dashboard },

  { path: "/user", component: User },

  { path: "/company", component: Company },
  {path: "/branch", component:Branch},
  { path: "/privilage", component: Privilage },
  {path: "/rules", component: Rules},
  {path: "/settings", component:Settings},

  //Utility
  { path: "/pages-starter", component: PagesStarter },
  { path: "/pages-timeline", component: PagesTimeline },
  { path: "/pages-faqs", component: PagesFaqs },
  { path: "/pages-pricing", component: PagesPricing },

  // Ui
  { path: "/ui-alerts", component: UiAlert },
  { path: "/ui-buttons", component: UiButtons },
  { path: "/ui-cards", component: UiCards },
  { path: "/ui-carousel", component: UiCarousel },
  { path: "/ui-colors", component: UiColors },
  { path: "/ui-dropdowns", component: UiDropdown },
  { path: "/ui-general", component: UiGeneral },
  { path: "/ui-grid", component: UiGrid },
  { path: "/ui-images", component: UiImages },
  { path: "/ui-lightbox", component: UiLightbox },
  { path: "/ui-modals", component: UiModal },
  { path: "/ui-progressbars", component: UiProgressbar },
  { path: "/ui-sweet-alert", component: UiSweetAlert },
  { path: "/ui-tabs-accordions", component: UiTabsAccordions },
  { path: "/ui-typography", component: UiTypography },
  { path: "/ui-video", component: UiVideo },
  { path: "/ui-session-timeout", component: UiSessionTimeout },
  { path: "/ui-rating", component: UiRating },
  { path: "/ui-rangeslider", component: UiRangeSlider },
  { path: "/ui-notifications", component: UiNotifications },
  { path: "/ui-image-cropper", component: UiImageCropper },

  // Forms
  { path: "/basic-elements", component: BasicElements },
  { path: "/form-layouts", component: FormLayouts },
  { path: "/form-advanced", component: FormAdvanced },
  { path: "/form-editors", component: FormEditors },
  { path: "/form-mask", component: FormMask },
  { path: "/form-repeater", component: FormRepeater },
  { path: "/form-uploads", component: FormUpload },
  { path: "/form-wizard", component: FormWizard },
  { path: "/form-validation", component: FormValidations },
  { path: "/form-xeditable", component: FormXeditable },

  // Tables
  { path: "/tables-basic", component: BasicTables },
  { path: "/tables-datatable", component: DatatableTables },
  { path: "/tables-responsive", component: ResponsiveTables },
  { path: "/tables-editable", component: EditableTables },

  //Charts
  { path: "/apex-charts", component: ChartApex },
  { path: "/chartjs-charts", component: ChartjsChart },
  { path: "/e-charts", component: EChart },
  { path: "/sparkline-charts", component: SparklineChart },
  { path: "/charts-knob", component: ChartsKnob },

  // Icons
  { path: "/icons-unicons", component: IconUnicons },
  { path: "/icons-boxicons", component: IconBoxicons },
  { path: "/icons-dripicons", component: IconDripicons },
  { path: "/icons-materialdesign", component: IconMaterialdesign },
  { path: "/icons-fontawesome", component: IconFontawesome },

  // Maps
  { path: "/maps-google", component: MapsGoogle },
  { path: "/maps-vector", component: MapsVector },
  { path: "/maps-leaflet", component: MapsLeaflet },

  // //profile
  { path: "/profile", component: UserProfile },

   // //manage
   { path: "/District", component: District },
   { path: "/Localbody", component: Localbody },
   { path: "/Ward", component: Ward },
   {path:"/Group",component:Group},
   {path:"/CustomerCategory",component:CustomerCategory},

   //Customers
   {path:"/Customer",component:AddCustomer},

   { path: "/view-tariff", component:viewTariff },
  { path: "/qr-code" , component:QrCode },

   //accounts
   {path:"/account-type" , component:AccountType},
   {path:"/account-details" , component:AccountDetails},
   {path:"/accounts-chart" , component:Chart},
   {path:"/fund-transfer" , component: FundTransfer},
   {path:"/credit-debit-fund" , component: CreditDebit},
   {path:"/income-expense" , component: IncomeExpenses},
   {path:"/transaction-log" , component: TransactionLog},


   //Waste Collection
{ path: "/waste-collect", component: HelperCollection },
{ path: "/waste-collect/helper", component: HelperDrop },
{ path: "/waste-collect/driver-collect", component: DriverCollection },
{ path: "/waste-collect/driver-drop", component: DriverDrop },
{ path: "/waste-collect/waste-plots", component: WastePlot },
{path: "/waste-collect/waste-spots",component:GroupWasteSpot},

//package
{path:"/add-tariff" , component:AddTariff},
{path:"/add-waste",component:AddWaste},

//Invoice
{path:"/view-invoice", component:ViewInvoice},
{path:"/auto-invoice", component:AutoInvoice},

//Receipt
{ path: "/view-receipt", component: Receipt },

  // this route should be at the end of all other routes
  { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> },
];

const authRoutes = [
  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
  { path: "/forgot-password", component: ForgetPwd },
  { path: "/register", component: Register },

  { path: "/pages-maintenance", component: PagesMaintenance },
  { path: "/pages-comingsoon", component: PagesComingsoon },
  { path: "/pages-404", component: Pages404 },
  { path: "/pages-500", component: Pages500 },

  // Authentication Inner
  { path: "/pages-login", component: Login1 },
  { path: "/pages-register", component: Register1 },
  { path: "/page-recoverpw", component: Recoverpw },
  { path: "/auth-lock-screen", component: LockScreen },
];

export { userRoutes, authRoutes };
