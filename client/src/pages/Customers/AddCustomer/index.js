import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { MDBDataTable } from "mdbreact";
import toastr from "toastr";
import { Row, Col, Card, CardBody, Button, Label, Modal } from "reactstrap";
import { Paper, Box, Divider } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AssignmentIcon from "@mui/icons-material/Assignment";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import Stack from "@mui/material/Stack";
import SendIcon from "@mui/icons-material/Send";
import SweetAlert from "react-bootstrap-sweetalert";
import Resete from "@mui/icons-material/ResetTvRounded";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Filter from "@mui/icons-material/FilterAlt";
import InputLabel from "@mui/material/InputLabel";
import DeleteIcon from "@mui/icons-material/Delete";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import moment from "moment";

import Select from "react-select";
import {
  //getCustomerTypesOptions,
  //getDesignationsOptions,
  //getDistrictOptions,
  //getLocalbodyOptions,
  //getWardOptions,
  //getPackageOptions,
  //getBillingtypeOptions,
  getUsers,
  addUser,
  deleteUser,
  apiError,
  getPrivilagesOptions,
  getCompaniesOptions,
  getBranchesOptions,
  updateUser,
  getCustomers,
  getCustVisitLog,
  getCustReceipts,
  getCustInvoice,
  getCustStatement,
} from "../../../store/actions";

// Redux
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { AvForm, AvField } from "availity-reactstrap-validation";

//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import "./AddCustomer.scss";

import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import TextField from "@mui/material/TextField";

import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";

import LocationCityIcon from "@mui/icons-material/LocationCity";
import DescriptionIcon from "@mui/icons-material/Description";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import DetailsIcon from "@mui/icons-material/Details";

import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import { shuffle } from "lodash";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Customers = (props) => {
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const [modal, setModal] = React.useState("1");

  const handleModalChange = (event, newValue) => {
    setModal(newValue);
  };

  const [profileModal, setProfileModal] = React.useState(false);

  const handleClickOpenProfile = (item) => {
    dispatch(getCustVisitLog(item._id));
    dispatch(getCustReceipts(item._id));
    dispatch(getCustInvoice(item._id));
    dispatch(getCustStatement(item._id));
    let itemData = [];

    itemData.push(item);
    setTableData(itemData);
    setProfileModal(true);
  };

  const handleClickCloseProfile = () => {
    setProfileModal(false);
  };

  //edited

  //const [selectedCustomerType,setSelectedCustomerType]=useState(null);
  //const[selectedDesignation,setSelectedDesignation]=useState(null);
  //const[selectedDistrict,setSelectedDistrict]=useState(null);
  //const[selectedLocalbody,setSelectedLocalbody]=useState(null);
  //const[selectedWard,setSelectedWard]=useState(null);
  //const[selectedPackage,setSelectedPackage]=useState(null);
  //const[selectedBillingtype,setSelectedBillingtype]=useState(null);

  const [selectedPrivilage, setSelectedPrivilage] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [userObject, setUserObject] = useState({});
  const [userIdTobeUpdated, setUserIdToBeUpdated] = useState(null);
  const [userIdToBeDeleted, setUserIdToBeDeleted] = useState(null);
  const [confirmDeleteAlert, setConfirmDeleteAlert] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [usersForTable, setUsersForTable] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [visitDetailes, setVisitDetailes] = useState([]);
  const [receiptDetailes, setReceiptDetailes] = useState([]);
  const [invoiceDetailes, setInvoiceDetailes] = useState([]);
  const [statementDetailes, setStatementDetailes] = useState([]);
  const [statementData, setStatementData] = useState([]);
  const [balanceTotal, setBalanceTotal] = useState(0);
  const [creditTotal, setCreditTotal] = useState(0);
  const [debitTotal, setdebitTotal] = useState(0);

  const [passwordObject, setPasswordObject] = useState({
    oldPassword: "",
    password: "",
    confirmPassword: "",
  });

  const {
    users,
    addingUser,
    addUserResponse,
    deleteUserResponse,
    updateUserResponse,
    error,
  } = useSelector((state) => state.users);

  const { customers, visitLog, custReceipts, custInvoice, custStatement } =
    useSelector((state) => state.customers);
  //edited

  // const customertypeOptions = useSelector(
  //   (state)=> state.customertypes.customertypeOptions
  // );

  // const designationOptions = useSelector(
  //   (state)=> state.designations.designationOptions
  // );

  // const districtOptions = useSelector(
  //   (state)=> state.districts.districtOptions
  // );

  // const localbodyOptions = useSelector(
  //   (state)=> state.localbodies.localbodyOptions
  // );

  // const WardOptions = useSelector(
  //   (state)=> state.wards.wardsOptions
  // );

  // const PackageOptions = useSelector(
  //   (state)=> state.packages.packageOptions
  // );

  // const BillingtypeOptions = useSelector(
  //   (state)=> state.billingtypes.billingtypeOptions
  // );

  const privilagesOptions = useSelector(
    (state) => state.privilages.privilagesOptions
  );
  const companiesOptions = useSelector(
    (state) => state.companies.companiesOptions
  );
  const branchesOptions = useSelector(
    (state) => state.branches.branchesOptions
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCustomers());
  }, []);

  useEffect(() => {
    if (selectedCompany !== null) {
      dispatch(getBranchesOptions(selectedCompany.value));
    }
  }, [selectedCompany]);

  useEffect(() => {
    if (addUserResponse.type === "success") {
      toastr.success(addUserResponse.message);
      setSelectedPrivilage({});
      setSelectedCompany(null);
      setSelectedBranch(null);
    } else if (addUserResponse.type === "failure") {
      toastr.error(error.data.message, addUserResponse.message);
    }
  }, [addUserResponse]);

  useEffect(() => {
    if (deleteUserResponse.type === "success") {
      toastr.success(deleteUserResponse.message);
      setUserIdToBeDeleted(null);
    } else if (deleteUserResponse.type === "failure") {
      toastr.error(error.data.message, deleteUserResponse.message);
    }
  }, [deleteUserResponse]);

  useEffect(() => {
    if (updateUserResponse.type === "success") {
      setShowModal(false);
      setUserIdToBeUpdated(null);
      setPasswordObject({});
      toastr.success(updateUserResponse.message);
    } else if (updateUserResponse.type === "failure") {
      toastr.error(error.data.message, updateUserResponse.message);
    }
  }, [updateUserResponse]);

  let preUpdateUser = (item) => {
    //edited

    // if (item.customertype) {
    //   let customertype = {
    //     label:item.customertype.name,
    //     value: item.customertype._id,
    //   };
    //   handleSelectedCustomerType(customertype);
    // }

    // if (item.designation) {
    //   let designation = {
    //     label:item.designation.name,
    //     value: item.designation._id,
    //   };
    //   handleSelectedDesignation(designation);
    // }

    // if (item.district) {
    //   let district = {
    //     label:item.district.name,
    //     value: item.district._id,
    //   };
    //   handleSelectedDistrict(district);
    // }

    // if (item.localbody) {
    //   let localbody = {
    //     label:item.localbody.name,
    //     value: item.localbody._id,
    //   };
    //   handleSelectedLocalbody(Localbody);
    // }

    // if (item.ward) {
    //   let ward = {
    //     label:item.ward.name,
    //     value: item.ward._id,
    //   };
    //   handleSelectedWard(Ward);
    // }

    // if (item.package) {
    //   let package = {
    //     label:item.package.name,
    //     value: item.package._id,
    //   };
    //   handleSelectedPackage(package);
    // }

    // if (item.billingtype) {
    //   let Billingtype = {
    //     label:item.billingtype.name,
    //     value: item.billingtype._id,
    //   };
    //   handleSelectedBillingtype(package);
    // }function subtotal(items) {

    if (item.privilage) {
      let privilage = {
        label: item.privilage.name,
        value: item.privilage._id,
      };
      handleSelectedPrivilage(privilage);
    }
    if (item.company) {
      let company = {
        label: item.company.name,
        value: item.company._id,
      };
      handleSelectedCompany(company);
    }
    if (item.branch) {
      let branch = {
        label: item.branch.name,
        value: item.branch._id,
      };
      handleSelectedBranch(branch);
    }

    setUserIdToBeUpdated(item._id);
    setUserObject({ ...item, password: null });
  };

  let preUpdateUserPassword = (item) => {
    setUserIdToBeUpdated(item._id);
    setShowModal(true);
  };


  function handleClick(){
    setDate1(new Date());
    setDate2(new Date());
    setStatementDetailes(custStatement);
  }
  useEffect(() => {
    let visitData = [];
    visitLog?.map((item, index) => {
      item.id = index + 1;
      if (item.waste_clt_addedby != null) {
        item.addedby = item.waste_clt_addedby.username;
      } else item.addedby = "";
      if (item.waste_clt_date) {
        const format2 = "DD-MM-YYYY";
        item.date = moment(item.waste_clt_date).format(format2);
      }
      visitData.push(item);
    });
    setVisitDetailes(visitData);
  }, [visitLog]);

  useEffect(() => {
    let receiptData = [];
    custReceipts?.map((item, index) => {
      item.id = index + 1;
      if (item.receipt_addedby != null) {
        item.addedby = item.receipt_addedby.username;
      } else item.addedby = "";
      if (item.receipt_cust_id != null) {
        item.custName = item.receipt_cust_id.cust_name;
      } else item.custName = "";
      if (item.receipt_date) {
        const format2 = "DD-MM-YYYY";
        item.date = moment(item.receipt_date).format(format2);
      }
      receiptData.push(item);
    });
    setReceiptDetailes(receiptData);
  }, [custReceipts]);
  useEffect(() => {
    let invoiceData = [];
    custInvoice?.map((item, index) => {
      item.id = index + 1;

      if (item.date) {
        const format2 = "DD-MM-YYYY";
        item.date = moment(item.date).format(format2);
      }
      invoiceData.push(item);
    });
    setInvoiceDetailes(invoiceData);
  }, [custInvoice]);

  useEffect(() => {
   

    let statementDatas = [];
    custStatement?.map((item, index) => {
      // Total Calories

      item.id = index + 1;

      if (item.date) {
        const format2 = "DD-MM-YYYY";
        item.date = moment(item.date).format(format2);
      }
      if (item.rdate) {
        const format2 = "DD-MM-YYYY";
        item.date = moment(item.rdate).format(format2);
      }
      statementDatas.push(item);
    });
    setStatementDetailes(statementDatas);
  }, [custStatement]);

  useEffect(() => {
    let customerData = [];

    customers.map((item, index) => {
      item.action = (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <i
            className="uil-eye"
            style={{ fontSize: "1.3em", cursor: "pointer" }}
            onClick={() => handleClickOpenProfile(item)}
          ></i>
          <i
            className="uil-edit-alt"
            style={{
              fontSize: "1.3em",
              cursor: "pointer",
              marginLeft: "1rem",
              marginRight: "1rem",
            }}
            onClick={() => {
              preUpdateUser(item);
            }}
          ></i>
          <i
            className="uil-trash-alt"
            style={{ fontSize: "1.3em", cursor: "pointer" }}
            onClick={() => {
              setUserIdToBeDeleted(item._id);
              setConfirmDeleteAlert(true);
            }}
          ></i>
        </div>
      );
      item.id = index + 1;
      item.name1 = `${item.firstName} ${item.lastName}`;
      item.privilage1 = item.privilage && item.privilage.name;
      item.company1 = item.company && item.company.name;
      item.branch1 = item.branch && item.branch.name;
      // item.type=item.cust_type.customer_type_name;
      // item.district=item.district.district_name
      if (item.localbody_name != null) {
        item.localbody_name = item.localbody_name.localbody_name;
      }
      if (item.ward != null) {
        item.ward = item.ward.ward_name;
      } else {
        item.ward = "";
      }
      if (item.district != null) {
        item.district = item.district.district_name;
      } else {
        item.district = "";
      }

      if (item.cust_type != null) {
        item.cust_type = item.cust_type.customer_type_name;
      } else item.cust_type = "";
      if (item.cust_added_by != null) {
        item.addedby = item.cust_added_by.username;
      } else item.addedby = "";
      customerData.push(item);
    });
    setUsersForTable(customerData);
  }, [customers]);

  const data = {
    columns: [
      {
        label: "#",
        field: "id",
        sort: "asc",
        width: 150,
      },
      {
        label: "Reg No",
        field: "cust_reg_no",
        sort: "asc",
        width: 400,
      },
      {
        label: "Type",
        field: "cust_type",
        sort: "asc",
        width: 200,
      },
      {
        label: "Name",
        field: "cust_name",
        sort: "asc",
        width: 200,
      },
      {
        label: "Phone",
        field: "cust_phone",
        sort: "asc",
        width: 200,
      },

      {
        label: "District",
        field: "district",
        sort: "asc",
        width: 150,
      },
      {
        label: "Localbody",
        field: "localbody_name",
        sort: "asc",
        width: 150,
      },
      {
        label: "Ward",
        field: "ward",
        sort: "asc",
        width: 100,
      },
      {
        label: "Staff",
        field: "addedby",
        sort: "asc",
        width: 100,
      },
      {
        label: "Verification Status",
        field: "cust_verification_status",
        sort: "asc",
        width: 100,
      },
      {
        label: "Action",
        field: "action",
        width: 300,
      },
    ],
    rows: usersForTable,
  };

  useEffect(()=>{
    if(statementDetailes!=null)
    var totaldebit = 0;
    var totalcredit = 0;
    var totalbalance = 0;
    for (var i = 0; i < statementDetailes.length; i++) {
      if (statementDetailes[i].debit != null) {
        totaldebit += parseInt(statementDetailes[i].balance);
        setdebitTotal(totaldebit);
      }
      if (statementDetailes[i].credit != null) {
        totalcredit += parseInt(statementDetailes[i].credit);
        setCreditTotal(totalcredit);
      }
      if (statementDetailes[i].balance != null) {
        totalbalance += parseInt(statementDetailes[i].balance);
        setBalanceTotal(totalbalance);
      }
    }

  },[statementDetailes])

  //edited

  //  let customerTypeOptionsData =
  //     customertypeOptions &&
  //     customertypeOptions.data &&
  //     customertypeOptions.data.map((item) => {
  //       return {
  //         label: item.name,
  //         value: item._id,
  //       };
  //     });

  //  let designationData =
  //     designationOptions &&
  //     designationOptions.data &&
  //     designationOptions.data.map((item) => {
  //       return {
  //         label: item.name,
  //         value: item._id,
  //       };
  //     });

  //  let districtData =
  //     districtOptions &&
  //     districtOptions.data &&
  //     districtOptions.data.map((item) => {
  //       return {
  //         label: item.name,
  //         value: item._id,
  //       };
  //     });

  //  let localbodyData =
  //     localbodyOptions &&
  //     localbodyOptionsdata &&
  //     localbodyOptions.data.map((item) => {
  //       return {
  //         label: item.name,
  //         value: item._id,
  //       };
  //     });

  //  let wardData =
  //     wardOptions &&
  //     wardOptionsdata &&
  //     wardOptions.data.map((item) => {
  //       return {
  //         label: item.name,
  //         value: item._id,
  //       };
  //     });

  //  let packagaData =
  //     packageOptions &&
  //     packageOptionsdata &&
  //     packageOptions.data.map((item) => {
  //       return {
  //         label: item.name,
  //         value: item._id,
  //       };
  //     });

  //  let billingtypeData =
  //     billingtypeOptions &&
  //     billingtypeOptionsdata &&
  //     billingtypeOptions.data.map((item) => {
  //       return {
  //         label: item.name,
  //         value: item._id,
  //       };
  //     });

  let privilagesOptionsData =
    privilagesOptions &&
    privilagesOptions.data &&
    privilagesOptions.data.map((item) => {
      return {
        label: item.name,
        value: item._id,
      };
    });

  let companiesOptionsData =
    companiesOptions &&
    companiesOptions.data &&
    companiesOptions.data.map((item) => {
      return {
        label: item.name,
        value: item._id,
      };
    });

  let branchesOptionsData =
    branchesOptions &&
    branchesOptions.data &&
    branchesOptions.data.map((item) => {
      return {
        label: item.name,
        value: item._id,
      };
    });

  //edited

  // const customertypeOptionsGroup = [
  //   {
  //     options:customerTypeOptionsData,
  //   },
  // ];

  // const designationOptionsGroup = [
  //   {
  //     options:designationOptionsData,
  //   },
  // ];

  // const districtOptionsGroup = [
  //   {
  //     options:districtOptionsData,
  //   },
  // ];

  // const localbodyOptionsGroup = [
  //   {
  //     options:localbodyOptionsData,
  //   },
  // ];

  // const wardOptionsGroup = [
  //   {
  //     options:wardOptionsData,
  //   },
  // ];

  // const packageOptionsGroup = [
  //   {
  //     options:packageOptionsData,
  //   },
  // ];

  // const billingtypeOptionsGroup = [
  //   {
  //     options:billingtypeOptionsData,
  //   },
  // ];

  const privilagesOptionsGroup = [
    {
      options: privilagesOptionsData,
    },
  ];

  const companiesOptionsGroup = [
    {
      options: companiesOptionsData,
    },
  ];

  const branchesOptionsGroup = [
    {
      options: branchesOptionsData,
    },
  ];

  function handleChangeCustomer(e) {
    let name = e.target.name;
    let value = e.target.value;
    setUserObject({ ...userObject, [name]: value });
  }

  //edited

  // function  handleSelectedCustomerType(value) {
  //   let newValue = {
  //     name: value.label,
  //     _id: value.value,
  //   };
  //   setSelectedCustomerType(value);
  //   setUserObject({ ...userObject, customertype: newValue });
  // }

  // function  handleSelectedDesignation(value) {
  //   let newValue = {
  //     name: value.label,
  //     _id: value.value,
  //   };
  //   setSelectedDesignation(value);
  //   setUserObject({ ...userObject, designation: newValue });
  // }

  // function  handleSelectedDistrict(value) {
  //   let newValue = {
  //     name: value.label,
  //     _id: value.value,
  //   };
  //   setSelectedDistrict(value);
  //   setUserObject({ ...userObject, district: newValue });
  // }

  // function  handleSelectedLocalbody(value) {
  //   let newValue = {
  //     name: value.label,
  //     _id: value.value,
  //   };
  //   setSelectedLocalbody(value);
  //   setUserObject({ ...userObject, localbody: newValue });
  // }

  // function  handleSelectedWard(value) {
  //   let newValue = {
  //     name: value.label,
  //     _id: value.value,
  //   };
  //   setSelectedWard(value);
  //   setUserObject({ ...userObject, ward: newValue });
  // }

  // function  handleSelectedPackage(value) {
  //   let newValue = {
  //     name: value.label,
  //     _id: value.value,
  //   };
  //   setSelectedPackage(value);
  //   setUserObject({ ...userObject, package: newValue });
  // }

  // function  handleSelectedBillingtype(value) {
  //   let newValue = {
  //     name: value.label,
  //     _id: value.value,
  //   };
  //   setSelectedBillingtype(value);
  //   setUserObject({ ...userObject, billingtype: newValue });
  // }

  function handleSelectedPrivilage(value) {
    let newValue = {
      name: value.label,
      _id: value.value,
    };
    setSelectedPrivilage(value);
    setUserObject({ ...userObject, privilage: newValue });
  }

  function handleSelectedCompany(value) {
    let newValue = {
      name: value.label,
      _id: value.value,
    };
    setSelectedCompany(value);
    setUserObject({ ...userObject, company: newValue });
  }
  function handleSelectedBranch(value) {
    let newValue = {
      name: value.label,
      _id: value.value,
    };
    setSelectedBranch(value);
    setUserObject({ ...userObject, branch: newValue });
  }

  function handleChangePassword(e) {
    let name = e.target.name;
    let value = e.target.value;
    setPasswordObject({ ...passwordObject, [name]: value });
  }

  const handleValidSubmit = (event, values) => {
    userIdTobeUpdated
      ? dispatch(updateUser(userObject))
      : dispatch(addUser(userObject));
  };

  const handleValidSubmitPassword = (event, values) => {
    if (passwordObject.password == passwordObject.confirmPassword) {
      let item = {
        _id: userIdTobeUpdated,
        password: passwordObject.password,
      };
      dispatch(updateUser(item));
    } else {
      toastr.error("Passwords are not matching");
    }
  };

  let closeModal = () => {
    setShowModal(false);
    setUserIdToBeUpdated(null);
  };

  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
    createData("Eclair", 262, 16.0, 24, 6.0),
  ];

  // const [value, setValue] = React.useState('1');

  // const handleModalChange = (event, newValue) => {
  //   setValue(newValue);
  // };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [tab, setTab] = React.useState("1");

  const handleTablChange = (event, newValue) => {
    setTab(newValue);
  };

  const [tab1, setTab1] = React.useState("1");

  const handleTablChange1 = (event, newValue) => {
    setTab1(newValue);
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  function createData(si, date, time, staff) {
    return { si, date, time, staff };
  }

  const rows1 = [createData(1, 159, 6.0, 24), createData(2, 237, 9.0, 37)];

  // Receipt table
  const StyledTableCell1 = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow1 = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  function createData1(si, date, receiptno, amount, dueamount, staff) {
    return { si, date, receiptno, amount, dueamount, staff };
  }

  const rows2 = [
    createData1(1, "24 - 11 - 2021", "RE2111000004", "50/-", "50/-", "Prabija"),
    createData1(
      2,
      "24 - 11 - 2021",
      "RE2111000005",
      "400/-",
      "-350/-",
      "Prabija"
    ),
  ];

  function createData3(
    si,
    date,
    time,
    referenceNo,
    customerId,
    customerName,
    amount,
    comment,
    due,
    staff
  ) {
    return {
      si,
      date,
      time,
      referenceNo,
      customerId,
      customerName,
      amount,
      comment,
      due,
      staff,
    };
  }

  const rows3 = [
    createData3(
      1,
      "26-11-2020",
      "11:11:24",
      123,
      123,
      "admin",
      700,
      "abc",
      100,
      "srv"
    ),
  ];

  const [tab3, setTab3] = React.useState("1");

  const handleChangeTab = (event, newValue) => {
    setTab3(newValue);
  };

  const [date1, setDate1] = React.useState(new Date());
  const [date2, setDate2] = React.useState(new Date());

  const handleChangeDate1 = (newValue) => {
    var dateString = newValue;
    var dateObj = new Date(dateString);
    var momentObj = moment(dateObj);
    var momentString = momentObj.format("DD-MM-YYYY");

    const filter = custStatement?.filter((element) => {
      return element.date === momentString;
    });
    setStatementDetailes(filter);
    setDate1(momentString);
  };
  const handleChangeDate2 = (newValue) => {
    var dateString = newValue;
    var dateObj = new Date(dateString);
    var momentObj = moment(dateObj);
    var momentString = momentObj.format("DD-MM-YYYY");

    const filter = custStatement?.filter((element) => {
      return element.date === momentString;
    });
    setStatementDetailes(filter);
    if (date1) {
      let start = new Date(date1).getTime();
      let end = new Date(momentString).getTime();
      let result = custStatement?.filter((d) => {
        var time = new Date(d.date).getTime();
        return start <= time && time <= end;
      });
      setStatementDetailes(result);
    }

    setDate2(momentString);
  };

  function createData4(
    si,
    date,
    time,
    customerName,
    type,
    invoiceNo,
    debit,
    credit,
    balance
  ) {
    return {
      si,
      date,
      time,
      customerName,
      type,
      invoiceNo,
      debit,
      credit,
      balance,
    };
  }

  const rows4 = [
    createData4(
      1,
      "26-11-2020",
      "11:11:24",
      "admin",
      "Invoice",
      "SRV123",
      700,
      100,
      100
    ),
  ];

  return (
    <React.Fragment>
      {confirmDeleteAlert ? (
        <SweetAlert
          title=""
          showCancel
          confirmButtonText="Delete"
          confirmBtnBsStyle="success"
          cancelBtnBsStyle="danger"
          onConfirm={() => {
            dispatch(deleteUser(userIdToBeDeleted));
            setConfirmDeleteAlert(false);
          }}
          onCancel={() => setConfirmDeleteAlert(false)}
        >
          Are you sure you want to delete it?
        </SweetAlert>
      ) : null}
      {/* First Dialogue */}

      <div>
        <Dialog
          fullScreen
          open={profileModal}
          onClose={handleClickCloseProfile}
          TransitionComponent={Transition}
        >
          <AppBar
            sx={{ position: "relative" }}
            style={{ background: "#f6f6f6", color: "black" }}
          >
            <Toolbar>
              <Typography
                sx={{ ml: 2, flex: 1 }}
                style={{ fontFamily: "IBM Plex Sans,sans-serif" }}
                variant="h6"
                component="div"
              >
                Profile
              </Typography>

              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClickCloseProfile}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          {/* <List>
            <ListItem button>
              <ListItemText primary="Phone ringtone" secondary="Titania" />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemText
                primary="Default notification ringtone"
                secondary="Tethys"
              />
            </ListItem>
          </List> */}
          <DialogContent style={{ background: "#f6f6f6" }}>
            <div className="row">
              <div className="col-xl-4">
                <div
                  className="card"
                  style={{
                    width: "fit-content",
                    height: "max-content",
                    boxShadow: "2px 4px 7px 0px rgb(0 0 0 / 10%)",
                  }}
                >
                  {" "}
                  {tableData.map((data) => (
                    <div className="card-body">
                      <div className="float-end dropdown">
                        <a
                          aria-haspopup="true"
                          className="text-body font-size-16 ddropdown-toggle"
                          aria-expanded="false"
                        >
                          <i className="uil uil-ellipsis-h"></i>
                        </a>
                        <div
                          tabindex="-1"
                          role="menu"
                          aria-hidden="true"
                          className="dropdown-menu-end dropdown-menu"
                        >
                          <a
                            to="/"
                            tabindex="0"
                            role="menuitem"
                            className="dropdown-item"
                          >
                            Edit
                          </a>
                          <a
                            to="/"
                            tabindex="1"
                            role="menuitem"
                            className="dropdown-item"
                          >
                            Action
                          </a>
                          <a
                            to="/"
                            tabindex="2"
                            role="menuitem"
                            className="dropdown-item"
                          >
                            Remove
                          </a>
                        </div>
                        {/* <div className="clearfix"></div> */}
                        {/* <div>
                                <img
                                  alt
                                  className="avatar-lg rounded-circle img-thumbnail"
                                  src="/static/media/avatar-4.b23e41d9.jpg"
                                />
                              </div> */}
                      </div>
                      {/* Customer Details Tab start */}

                      <Stack
                        direction="row"
                        spacing={2}
                        style={{ justifyContent: "center" }}
                      >
                        <Avatar
                          alt="Remy Sharp"
                          src="/static/media/avatar-4.b23e41d9.jpg"
                          sx={{ width: 56, height: 56 }}
                          style={{
                            width: "6rem",
                            height: "6rem",
                            marginTop: "20%",
                            marginBottom: "auto",
                          }}
                        />
                      </Stack>
                      <h5
                        className="mt-3 mb-1"
                        style={{
                          textAlignLast: "center",
                          fontFamily: "IBM Plex Sans,sans-serif",
                        }}
                      >
                        {data.cust_name}
                      </h5>
                      <p
                        className="text-muted"
                        style={{
                          textAlign: "center",
                          color: "green !important",
                          fontFamily: "IBM Plex Sans,sans-serif",
                        }}
                      >
                        {data.cust_designation}
                        <img
                          src="https://api.ir.ee/static/ssb_icon.png"
                          data-regcode="12336685"
                          style={{ width: "10px", height: "10px" }}
                        />
                      </p>

                      <div
                        className="mt-4 mb-4"
                        style={{
                          textAlign: "center",
                          fontFamily: "IBM Plex Sans,sans-serif",
                        }}
                      >
                        <button type="button" className="btn btn-light btn-sm">
                          <i className="uil uil-envelope-alt me-2"></i>
                          Message
                        </button>
                      </div>
                      <Divider />
                      <br />
                      <h5 className="font-size-16">About</h5>
                      <p style={{ fontFamily: "IBM Plex Sans,sans-serif" }}>
                        Hi I'm Marcus,has been the industry's standard dummy
                        text To an English person, it will seem like simplified
                        English, as a skeptical Cambridge.
                      </p>
                      <div style={{ fontFamily: "IBM Plex Sans,sans-serif" }}>
                        <p className="mb-1">Name:</p>
                        <h5 className="font-size-16">{data.cust_name}</h5>
                      </div>
                      <div className="mt-4">
                        <p className="mb-1">Mobile:</p>
                        <h5 className="font-size-16">{data.cust_phone}</h5>
                      </div>
                      <div className="mt-4">
                        <p className="mb-1">Email:</p>
                        <h5 className="font-size-16">{data.cust_email}</h5>
                      </div>
                      <div className="mt-4">
                        <p className="mb-1">Location:</p>
                        <h5 className="font-size-16">
                          Kerala({data.district})
                        </h5>
                      </div>

                      {/* second paper */}

                      {/* Customer Details Tab end */}
                    </div>
                  ))}
                </div>
              </div>

              <div className="col-xl-8">
                <div
                  className="mb-0 card"
                  style={{ boxShadow: "2px 4px 7px 0px rgb(0 0 0 / 10%)" }}
                >
                  <Box sx={{ width: "100%", typography: "body1" }}>
                    <TabContext value={tab3}>
                      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                        <TabList
                          indicatorColor="primary"
                          textColor="primary"
                          variant="fullWidth"
                          onChange={handleChangeTab}
                          aria-label="lab API tabs example"
                        >
                          <Tab
                            icon={
                              <LocationCityIcon style={{ fontSize: "20px" }} />
                            }
                            label="Visit log"
                            value="1"
                            size="small"
                            style={{
                              textTransform: "capitalize",
                              fontFamily: "IBM Plex Sans,sans-serif",
                            }}
                          />
                          <Tab
                            icon={
                              <ReceiptLongIcon style={{ fontSize: "20px" }} />
                            }
                            label="Receipt"
                            value="2"
                            style={{
                              textTransform: "capitalize",
                              fontFamily: "IBM Plex Sans,sans-serif",
                            }}
                          />
                          <Tab
                            icon={
                              <DescriptionIcon style={{ fontSize: "20px" }} />
                            }
                            label="Invoice"
                            value="3"
                            style={{
                              textTransform: "capitalize",
                              fontFamily: "IBM Plex Sans,sans-serif",
                            }}
                          />

                          <Tab
                            icon={<DetailsIcon style={{ fontSize: "20px" }} />}
                            label="Statement"
                            value="4"
                            style={{
                              textTransform: "capitalize",
                              fontFamily: "IBM Plex Sans,sans-serif",
                            }}
                          />
                        </TabList>
                      </Box>
                      <TabPanel value="1">
                        <div className="table-responsive">
                          <div className="react-bootstrap-table">
                            <table className="table table table-nowrap table-hover mb-0">
                              <thead
                                style={{
                                  fontFamily: "IBM Plex Sans,sans-serif",
                                }}
                              >
                                <tr>
                                  <th
                                    tabindex="0"
                                    aria-label="# sortable"
                                    className="sortable"
                                  >
                                    SI
                                    <span className="order-4"></span>
                                  </th>
                                  <th
                                    tabindex="0"
                                    aria-label="# sortable"
                                    className="sortable"
                                  >
                                    Date
                                    <span className="order-4"></span>
                                  </th>
                                  <th
                                    tabindex="0"
                                    aria-label="# sortable"
                                    className="sortable"
                                  >
                                    Time
                                    <span className="order-4"></span>
                                  </th>
                                  <th
                                    tabindex="0"
                                    aria-label="# sortable"
                                    className="sortable"
                                  >
                                    Staff
                                    <span className="order-4"></span>
                                  </th>
                                </tr>
                              </thead>
                              <tbody
                                style={{
                                  fontFamily: "IBM Plex Sans,sans-serif",
                                }}
                              >
                                {visitDetailes?.map((data) => (
                                  <tr>
                                    <td>{data.id}</td>
                                    <td>{data.date}</td>
                                    <td> {data.waste_clt_time}</td>
                                    <td>{data.addedby}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </TabPanel>
                      <TabPanel value="2">
                        <div className="table-responsive">
                          <div className="react-bootstrap-table">
                            <table className="table table table-nowrap table-hover mb-0">
                              <thead
                                style={{
                                  fontFamily: "IBM Plex Sans,sans-serif",
                                }}
                              >
                                <tr>
                                  <th
                                    tabindex="0"
                                    aria-label="# sortable"
                                    className="sortable"
                                  >
                                    SI
                                    <span className="order-4"></span>
                                  </th>
                                  <th
                                    tabindex="0"
                                    aria-label="# sortable"
                                    className="sortable"
                                  >
                                    Date
                                    <span className="order-4"></span>
                                  </th>
                                  <th
                                    tabindex="0"
                                    aria-label="# sortable"
                                    className="sortable"
                                  >
                                    Receipt No
                                    <span className="order-4"></span>
                                  </th>
                                  <th
                                    tabindex="0"
                                    aria-label="# sortable"
                                    className="sortable"
                                  >
                                    Amount
                                    <span className="order-4"></span>
                                  </th>
                                  <th
                                    tabindex="0"
                                    aria-label="# sortable"
                                    className="sortable"
                                  >
                                    Due Amount
                                    <span className="order-4"></span>
                                  </th>
                                  <th
                                    tabindex="0"
                                    aria-label="# sortable"
                                    className="sortable"
                                  >
                                    Staff
                                    <span className="order-4"></span>
                                  </th>
                                </tr>
                              </thead>
                              <tbody
                                style={{
                                  fontFamily: "IBM Plex Sans,sans-serif",
                                }}
                              >
                                {receiptDetailes?.map((data) => (
                                  <tr>
                                    <td>{data.id}</td>
                                    <td>{data.date}</td>
                                    <td> {data.receipt_no}</td>
                                    <td>{data.receipt_amount}/-</td>
                                    <td>{data.receipt_due_amt}/-</td>
                                    <td>{data.addedby}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </TabPanel>
                      <TabPanel value="3">
                        <div className="table-responsive">
                          <div className="react-bootstrap-table">
                            <table className="table table table-nowrap table-hover mb-0">
                              <thead
                                style={{
                                  fontFamily: "IBM Plex Sans,sans-serif",
                                }}
                              >
                                <tr>
                                  <th
                                    tabindex="0"
                                    aria-label="# sortable"
                                    className="sortable"
                                  >
                                    SI
                                    <span className="order-4"></span>
                                  </th>
                                  <th
                                    tabindex="0"
                                    aria-label="# sortable"
                                    className="sortable"
                                  >
                                    Date
                                    <span className="order-4"></span>
                                  </th>
                                  <th
                                    tabindex="0"
                                    aria-label="# sortable"
                                    className="sortable"
                                  >
                                    Time
                                    <span className="order-4"></span>
                                  </th>
                                  <th
                                    tabindex="0"
                                    aria-label="# sortable"
                                    className="sortable"
                                  >
                                    Invoice No.
                                    <span className="order-4"></span>
                                  </th>
                                  <th
                                    tabindex="0"
                                    aria-label="# sortable"
                                    className="sortable"
                                  >
                                    Customer Name
                                    <span className="order-4"></span>
                                  </th>
                                  <th
                                    tabindex="0"
                                    aria-label="# sortable"
                                    className="sortable"
                                  >
                                    Invoice Amount
                                    <span className="order-4"></span>
                                  </th>
                                  <th
                                    tabindex="0"
                                    aria-label="# sortable"
                                    className="sortable"
                                  >
                                    Invoice Period
                                    <span className="order-4"></span>
                                  </th>
                                </tr>
                              </thead>
                              <tbody
                                style={{
                                  fontFamily: "IBM Plex Sans,sans-serif",
                                }}
                              >
                                {invoiceDetailes?.map((data) => (
                                  <tr>
                                    <td>{data.id}</td>
                                    <td>{data.date}</td>
                                    <td> {data.time}</td>
                                    <td>{data.invoiceno}</td>
                                    <td>{data.custName}</td>
                                    <td>{data.Amount}/-</td>
                                    <td>{data.period} days</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </TabPanel>
                      <TabPanel value="4">
                        <div className="mb-3">
                          <a style={{ fontFamily: "IBM Plex Sans,sans-serif" }}>
                            <i className="fa fa-filter" aria-hidden="true"></i>
                            &nbsp; Filter
                          </a>
                        </div>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <Stack spacing={3}>
                            <Row>
                              <Col md="3">
                                <div className="mb-3">
                                  <DesktopDatePicker
                                    label="Start Date"
                                    style={{
                                      fontFamily: "IBM Plex Sans,sans-serif",
                                    }}
                                    inputFormat="MM/dd/yyyy"
                                    value={date1}
                                    onChange={handleChangeDate1}
                                    renderInput={(params) => (
                                      <TextField {...params} />
                                    )}
                                  />
                                </div>
                              </Col>
                              <Col md="3">
                                <div className="mb-3">
                                  <DesktopDatePicker
                                    label="End Date"
                                    inputFormat="MM/dd/yyyy"
                                    size="small"
                                    value={date2}
                                    onChange={handleChangeDate2}
                                    renderInput={(params) => (
                                      <TextField {...params} />
                                    )}
                                  />
                                </div>
                              </Col>
                              <Col md="3">
                                <div className="mb-3">
                                  <Button color="danger" type="reset" onClick={handleClick}>
                                    <Resete></Resete>
                                    {"  "}
                                    Reset
                                  </Button>
                                </div>
                              </Col>
                            </Row>
                          </Stack>
                        </LocalizationProvider>
                        <TableContainer>
                          <Table
                            sx={{ minWidth: 700 }}
                            aria-label="spanning table"
                          >
                            <TableHead>
                              <TableRow>
                                <TableCell
                                  style={{
                                    fontWeight: "600",
                                    fontFamily: "IBM Plex Sans,sans-serif",
                                  }}
                                >
                                  SI
                                </TableCell>
                                <TableCell
                                  align="left"
                                  style={{
                                    fontWeight: "600",
                                    fontFamily: "IBM Plex Sans,sans-serif",
                                  }}
                                >
                                  Date
                                </TableCell>
                                <TableCell
                                  align="left"
                                  style={{
                                    fontWeight: "600",
                                    fontFamily: "IBM Plex Sans,sans-serif",
                                  }}
                                >
                                  Time
                                </TableCell>
                                <TableCell
                                  align="left"
                                  style={{
                                    fontWeight: "600",
                                    fontFamily: "IBM Plex Sans,sans-serif",
                                  }}
                                >
                                  Customer Name
                                </TableCell>
                                <TableCell
                                  align="left"
                                  style={{
                                    fontWeight: "600",
                                    fontFamily: "IBM Plex Sans,sans-serif",
                                  }}
                                >
                                  Type
                                </TableCell>
                                <TableCell
                                  align="left"
                                  style={{
                                    fontWeight: "600",
                                    fontFamily: "IBM Plex Sans,sans-serif",
                                  }}
                                >
                                  Invoice No/Receipt No
                                </TableCell>
                                <TableCell
                                  align="left"
                                  style={{
                                    fontWeight: "600",
                                    fontFamily: "IBM Plex Sans,sans-serif",
                                  }}
                                >
                                  Debit
                                </TableCell>
                                <TableCell
                                  align="left"
                                  style={{
                                    fontWeight: "600",
                                    fontFamily: "IBM Plex Sans,sans-serif",
                                  }}
                                >
                                  Credit
                                </TableCell>
                                <TableCell
                                  align="left"
                                  style={{
                                    fontWeight: "600",
                                    fontFamily: "IBM Plex Sans,sans-serif",
                                  }}
                                >
                                  Balance
                                </TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {statementDetailes?.map((row) => (
                                <TableRow key={row.index}>
                                  <TableCell
                                    style={{
                                      fontFamily:
                                        " IBM Plex Sans,sans-serif !important",
                                    }}
                                  >
                                    {row.id}
                                  </TableCell>
                                  <TableCell
                                    align="left"
                                    style={{
                                      fontFamily: " IBM Plex Sans,sans-serif",
                                    }}
                                  >
                                    {row.date}
                                  </TableCell>
                                  <TableCell
                                    align="left"
                                    style={{
                                      fontFamily: " IBM Plex Sans,sans-serif",
                                    }}
                                  >
                                    {row.time ? row.time : row.rtime}
                                  </TableCell>
                                  <TableCell
                                    align="left"
                                    style={{
                                      fontFamily: " IBM Plex Sans,sans-serif",
                                    }}
                                  >
                                    {row.custName
                                      ? row.custName
                                      : row.rcustName}
                                  </TableCell>
                                  <TableCell
                                    align="left"
                                    style={{
                                      fontFamily: " IBM Plex Sans,sans-serif",
                                    }}
                                  >
                                    {row.type ? row.type : row.rtype}
                                  </TableCell>
                                  <TableCell
                                    align="left"
                                    style={{
                                      fontFamily: " IBM Plex Sans,sans-serif",
                                    }}
                                  >
                                    {row.invoiceno
                                      ? row.invoiceno
                                      : row.receiptno}
                                  </TableCell>
                                  <TableCell
                                    align="left"
                                    style={{
                                      fontFamily: " IBM Plex Sans,sans-serif",
                                    }}
                                  >
                                    {row.debit}
                                  </TableCell>
                                  <TableCell
                                    align="left"
                                    style={{
                                      fontFamily: " IBM Plex Sans,sans-serif",
                                    }}
                                  >
                                    {row.credit}
                                  </TableCell>
                                  <TableCell
                                    align="left"
                                    style={{
                                      fontFamily: " IBM Plex Sans,sans-serif",
                                    }}
                                  >
                                    {row.balance}
                                  </TableCell>
                                </TableRow>
                              ))}

                              <TableRow>
                                <TableCell colSpan={6} />
                                <TableCell
                                  align="left"
                                  style={{
                                    fontWeight: "600",
                                    fontFamily: " IBM Plex Sans,sans-serif",
                                  }}
                                >
                                  {debitTotal}
                                </TableCell>
                                <TableCell
                                  align="left"
                                  style={{
                                    fontWeight: "600",
                                    fontFamily: " IBM Plex Sans,sans-serif",
                                  }}
                                >
                                  {creditTotal}
                                </TableCell>
                                <TableCell
                                  align="left"
                                  style={{
                                    fontWeight: "600",
                                    fontFamily: " IBM Plex Sans,sans-serif",
                                  }}
                                >
                                  {balanceTotal}
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </TabPanel>
                    </TabContext>
                  </Box>
                  {/* <ul className="nav-tabs-custom nav-justified nav nav-tabs">
                    <li className="nav-item">
                      <a className="active nav-link">
                        <i className="uil uil-user-circle font-size-20"></i>
                        <span className="d-none d-sm-block">About</span>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link">
                        <i className="uil uil-clipboard-notes font-size-20"></i>
                        <span className="d-none d-sm-block">Task</span>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link">
                        <i className="uil uil-envelope-alt font-size-20"></i>
                        <span className="d-none d-sm-block">Message</span>
                      </a>
                    </li>
                  </ul> */}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* End */}

      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <div className="modal-content" style={{ width: "fit-content" }}>
            <DialogTitle id="alert-dialog-title">
              <Button
                style={{ float: "right" }}
                color="red"
                onClick={handleClose}
                autoFocus
              >
                X
              </Button>
            </DialogTitle>
            <Divider />

            <DialogContent style={{ width: "fit-content" }}>
              <DialogContentText id="alert-dialog-description">
                <Box sx={{ width: "100%", typography: "body1" }}>
                  <TabContext value={tab}>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                      <TabList
                        onChange={handleTablChange}
                        aria-label="lab API tabs example"
                      >
                        <Tab label="Customer Details" value="1" />
                        <Tab label="Visit Log" value="2" />
                        <Tab label="Invoice" value="3" />
                        <Tab label="Receipt" value="4" />
                        <Tab label="Statement" value="5" />
                      </TabList>
                    </Box>
                    <TabPanel value="1">
                      <div className="row">
                        <div className="col-xl-4">
                          <div
                            className="card"
                            style={{
                              width: "fit-content",
                              height: "max-content",
                            }}
                          >
                            <div className="card-body">
                              <div className="float-end dropdown">
                                <a
                                  aria-haspopup="true"
                                  className="text-body font-size-16 ddropdown-toggle"
                                  aria-expanded="false"
                                >
                                  <i className="uil uil-ellipsis-h"></i>
                                </a>
                                <div
                                  tabindex="-1"
                                  role="menu"
                                  aria-hidden="true"
                                  className="dropdown-menu-end dropdown-menu"
                                >
                                  <a
                                    to="/"
                                    tabindex="0"
                                    role="menuitem"
                                    className="dropdown-item"
                                  >
                                    Edit
                                  </a>
                                  <a
                                    to="/"
                                    tabindex="1"
                                    role="menuitem"
                                    className="dropdown-item"
                                  >
                                    Action
                                  </a>
                                  <a
                                    to="/"
                                    tabindex="2"
                                    role="menuitem"
                                    className="dropdown-item"
                                  >
                                    Remove
                                  </a>
                                </div>
                                {/* <div className="clearfix"></div> */}
                                {/* <div>
                                <img
                                  alt
                                  className="avatar-lg rounded-circle img-thumbnail"
                                  src="/static/media/avatar-4.b23e41d9.jpg"
                                />
                              </div> */}
                              </div>
                              {/* Customer Details Tab start */}

                              <Stack
                                direction="row"
                                spacing={2}
                                style={{ justifyContent: "center" }}
                              >
                                <Avatar
                                  alt="Remy Sharp"
                                  src="/static/media/avatar-4.b23e41d9.jpg"
                                  sx={{ width: 56, height: 56 }}
                                  style={{
                                    width: "35%",
                                    height: "35%",
                                    marginTop: "20%",
                                    marginBottom: "10%",
                                  }}
                                />
                              </Stack>
                              <h5
                                className="mt-3 mb-1"
                                style={{ textAlign: "center" }}
                              >
                                Admin
                              </h5>
                              <p
                                className="text-muted"
                                style={{
                                  textAlign: "center",
                                  color: "#004A9C",
                                }}
                              >
                                UI/UX Designer
                              </p>

                              <div
                                className="mt-4 mb-4"
                                style={{ textAlign: "center" }}
                              >
                                <button
                                  type="button"
                                  className="btn btn-light btn-sm"
                                >
                                  <i className="uil uil-envelope-alt me-2"></i>
                                  Message
                                </button>
                              </div>
                              <Divider />
                              <br />
                              <h5 className="font-size-16">About</h5>
                              <p>
                                Hi I'm Marcus,has been the industry's standard
                                dummy text To an English person, it will seem
                                like simplified English, as a skeptical
                                Cambridge.
                              </p>
                              <div>
                                <p className="mb-1">Name:</p>
                                <h5 className="font-size-16">Admin</h5>
                              </div>
                              <div className="mt-4">
                                <p className="mb-1">Mobile:</p>
                                <h5 className="font-size-16">012-234-5678</h5>
                              </div>
                              <div className="mt-4">
                                <p className="mb-1">Email:</p>
                                <h5 className="font-size-16">
                                  admin@gmail.com
                                </h5>
                              </div>
                              <div className="mt-4">
                                <p className="mb-1">Location:</p>
                                <h5 className="font-size-16">Kerala(Kannur)</h5>
                              </div>

                              {/* second paper */}

                              {/* Customer Details Tab end */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabPanel>

                    <TabPanel value="2">
                      <TableContainer component={Paper}>
                        <Table
                          sx={{ minWidth: 700 }}
                          aria-label="customized table"
                        >
                          <TableHead>
                            <TableRow>
                              <StyledTableCell>SI</StyledTableCell>
                              <StyledTableCell align="right">
                                Date
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                Time
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                Staff
                              </StyledTableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {visitLog?.map((row) => (
                              <StyledTableRow key={row.si}>
                                <StyledTableCell component="th" scope="row">
                                  {row.si}
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                  {row.waste_clt_date}
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                  {row.waste_clt_time}
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                  {row.staff}
                                </StyledTableCell>
                              </StyledTableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </TabPanel>
                    <TabPanel value="3">
                      <label>Add Credit Note</label>
                      <Card sx={{ minWidth: 275 }}>
                        <CardContent>
                          <div className="mb-3">
                            <Typography>Total Due</Typography>
                          </div>
                          <div className="mb-3">
                            <TextField placeholder="-350" color="error" />
                            <br />
                          </div>
                          <div className="mb-3">
                            <TextField
                              id="outlined-basic"
                              label="Credit Note Amount"
                              type="number"
                              variant="outlined"
                            />
                            <br />
                          </div>
                          <div className="mb-3">
                            <TextField
                              id="outlined-basic"
                              label="Credit Note Comment"
                              variant="outlined"
                            />
                          </div>
                        </CardContent>
                        <CardActions>
                          <Button variant="contained" color="primary">
                            Add Credit Note
                          </Button>
                        </CardActions>
                      </Card>
                      <TableContainer
                        component={Paper}
                        style={{ width: "fit-content" }}
                      >
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                          <TableHead>
                            <TableRow>
                              <TableCell>SI</TableCell>
                              <TableCell align="right">Date</TableCell>
                              <TableCell align="right">Time</TableCell>
                              <TableCell align="right">Reference No</TableCell>
                              <TableCell align="right">Customer Id</TableCell>
                              <TableCell align="right">Customer Name</TableCell>
                              <TableCell align="right">Amount</TableCell>
                              <TableCell align="right">Comment</TableCell>
                              <TableCell align="right">Due</TableCell>
                              <TableCell align="right">Staff</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {rows3.map((row) => (
                              <TableRow
                                key={row.name}
                                sx={{
                                  "&:last-child td, &:last-child th": {
                                    border: 0,
                                  },
                                }}
                              >
                                <TableCell component="th" scope="row">
                                  {row.si}
                                </TableCell>
                                <TableCell align="right">{row.date}</TableCell>
                                <TableCell align="right">{row.time}</TableCell>
                                <TableCell align="right">
                                  {row.referenceNo}
                                </TableCell>
                                <TableCell align="right">
                                  {row.customerId}
                                </TableCell>
                                <TableCell align="right">
                                  {row.customerName}
                                </TableCell>
                                <TableCell align="right">
                                  {row.amount}
                                </TableCell>
                                <TableCell align="right">
                                  {row.comment}
                                </TableCell>
                                <TableCell align="right">{row.due}</TableCell>
                                <TableCell align="right">{row.staff}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </TabPanel>
                    <TabPanel value="4">
                      <TableContainer component={Paper}>
                        <Table
                          sx={{ minWidth: 700 }}
                          aria-label="customized table"
                        >
                          <TableHead>
                            <TableRow>
                              <StyledTableCell1>SI</StyledTableCell1>
                              <StyledTableCell1 align="right">
                                Date
                              </StyledTableCell1>
                              <StyledTableCell1 align="right">
                                Receipt No
                              </StyledTableCell1>
                              <StyledTableCell1 align="right">
                                Amount
                              </StyledTableCell1>
                              <StyledTableCell1 align="right">
                                Due Amount
                              </StyledTableCell1>
                              <StyledTableCell1 align="right">
                                Staff
                              </StyledTableCell1>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {rows2.map((row1) => (
                              <StyledTableRow1 key={row1.name}>
                                <StyledTableCell1 component="th" scope="row">
                                  {row1.si}
                                </StyledTableCell1>
                                <StyledTableCell1 align="right">
                                  {row1.date}
                                </StyledTableCell1>
                                <StyledTableCell1 align="right">
                                  {row1.receiptno}
                                </StyledTableCell1>
                                <StyledTableCell1 align="right">
                                  {row1.amount}
                                </StyledTableCell1>
                                <StyledTableCell1 align="right">
                                  {row1.dueamount}
                                </StyledTableCell1>
                                <StyledTableCell1 align="right">
                                  {row1.staff}
                                </StyledTableCell1>
                              </StyledTableRow1>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </TabPanel>
                    <TabPanel value="5">
                      <Stack component="form" noValidate spacing={3}>
                        <Label>Filter</Label>
                        <Row>
                          <Col lg={12} style={{ width: "max-content" }}>
                            <TextField
                              id="date"
                              label="Birthday"
                              type="date"
                              size="small"
                              defaultValue="2017-05-24"
                              sx={{ width: 220 }}
                              InputLabelProps={{
                                shrink: true,
                              }}
                            />
                            &nbsp;
                            <TextField
                              id="date"
                              label="Birthday"
                              type="date"
                              size="small"
                              defaultValue="2017-05-24"
                              sx={{ width: 220 }}
                              InputLabelProps={{
                                shrink: true,
                              }}
                            />
                            &nbsp;
                            <Button color="danger" type="submit">
                              <Resete></Resete>
                              {"  "}
                              Resete
                            </Button>
                          </Col>
                        </Row>
                      </Stack>
                    </TabPanel>
                  </TabContext>
                </Box>
              </DialogContentText>
            </DialogContent>

            <DialogActions>
              {/* <Button color="primary" onClick={handleClose} autoFocus>
                Close
              </Button> */}
            </DialogActions>
          </div>
        </Dialog>
      </div>

      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs title="Home" breadcrumbItem="Manage Customers" />
          <Row>
            <Col xl="12">
              <Card>
                <CardBody>
                  <AvForm
                    className="needs-validation"
                    onValidSubmit={(e, v) => {
                      handleValidSubmit(e, v);
                    }}
                  >
                    <Row>
                      <Col md="3">
                        <div className="mb-3">
                          <Label>Customer Type</Label>
                          <Select
                            name="customer type"
                            //edited
                            //value={selectedCustomerType}
                            value={selectedPrivilage}
                            onChange={(value) => {
                              //edited
                              //handleSelectedCustomerType(value);
                              handleSelectedPrivilage(value);
                            }}
                            //edited
                            //options={customertypeOptionsGroup}
                            options={privilagesOptionsGroup}
                            classNamePrefix="select2-selection"
                          />
                        </div>
                      </Col>
                      <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom02">Name</Label>
                          <AvField
                            name="Name"
                            placeholder="Name"
                            type="text"
                            errorMessage="Enter name"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom02"
                            value={userObject.Name}
                            onChange={handleChangeCustomer}
                          />
                        </div>
                      </Col>

                      <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom03">Phone</Label>
                          <AvField
                            name="phone"
                            placeholder="Phone"
                            type="text"
                            errorMessage="Enter valid phone"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom03"
                            value={userObject.phone}
                            onChange={handleChangeCustomer}
                          />
                        </div>
                      </Col>
                      <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom03">
                            Land line number
                          </Label>
                          <AvField
                            name="landnum"
                            placeholder="Land line number"
                            type="text"
                            errorMessage="Enter valid number"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom03"
                            value={userObject.landlineno}
                            onChange={handleChangeCustomer}
                          />
                        </div>
                      </Col>
                      <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom01">
                            Watsapp Number
                          </Label>
                          <AvField
                            name="watsapp number"
                            placeholder="Watsapp number"
                            type="text"
                            errorMessage="Enter Watsapp number"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom01"
                            value={userObject.watsappno}
                            onChange={handleChangeCustomer}
                          />
                        </div>
                      </Col>
                      <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom01">Email</Label>
                          <AvField
                            name="email"
                            placeholder="Email"
                            type="text"
                            errorMessage="Enter Email"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom01"
                            value={userObject.email}
                            onChange={handleChangeCustomer}
                          />
                        </div>
                      </Col>
                      <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom01">Address</Label>
                          <AvField
                            name="address"
                            placeholder="Address"
                            type="text"
                            errorMessage="Enter Address"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom01"
                            value={userObject.address}
                            onChange={handleChangeCustomer}
                          />
                        </div>
                      </Col>
                      <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom01">Address 1</Label>
                          <AvField
                            name="Address1"
                            placeholder="Address1"
                            type="text"
                            errorMessage="Enter Address1"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom01"
                            value={userObject.address1}
                            onChange={handleChangeCustomer}
                          />
                        </div>
                      </Col>
                      <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom01">House No</Label>
                          <AvField
                            name="House no"
                            placeholder="House No"
                            type="text"
                            errorMessage="Enter House no"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom01"
                            value={userObject.houseno}
                            onChange={handleChangeCustomer}
                          />
                        </div>
                      </Col>
                      <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom01">
                            Number of Members
                          </Label>
                          <AvField
                            name="Number of Members"
                            placeholder="Number of Members"
                            type="text"
                            errorMessage="Enter number of members"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom01"
                            value={userObject.noofmembers}
                            onChange={handleChangeCustomer}
                          />
                        </div>
                      </Col>
                      <Col md="3">
                        <div className="mb-3">
                          <Label>Designation</Label>
                          <Select
                            name="Designation"
                            //edited
                            //value={selectedDesignation}
                            value={selectedPrivilage}
                            onChange={(value) => {
                              //edited
                              //handleSelectedDesignation(value)
                              handleSelectedPrivilage(value);
                            }}
                            //edited
                            //options={designationOptionGroup}
                            options={privilagesOptionsGroup}
                            classNamePrefix="select2-selection"
                          />
                        </div>
                      </Col>
                      <Col md="3">
                        <div className="mb-3">
                          <Label>District</Label>
                          <Select
                            name="District"
                            //edited
                            //value={selectedDistrict}
                            value={selectedPrivilage}
                            onChange={(value) => {
                              //edited
                              //handleSelectedDistrict(value)
                              handleSelectedPrivilage(value);
                            }}
                            //edited
                            //options={districtOptionGroup}
                            options={privilagesOptionsGroup}
                            classNamePrefix="select2-selection"
                          />
                        </div>
                      </Col>
                      <Col md="3">
                        <div className="mb-3">
                          <Label>Local Body</Label>
                          <Select
                            name="Local Body"
                            //edited
                            //value={selectedLocalbody}
                            value={selectedPrivilage}
                            onChange={(value) => {
                              //edited
                              //handleSelectedLocalbody(value)
                              handleSelectedPrivilage(value);
                            }}
                            //edited
                            //options={localbodyOptionGroup}
                            options={privilagesOptionsGroup}
                            classNamePrefix="select2-selection"
                          />
                        </div>
                      </Col>
                      <Col md="3">
                        <div className="mb-3">
                          <Label>Ward</Label>
                          <Select
                            name="Ward"
                            //edited
                            //value={selectedWard}
                            value={selectedPrivilage}
                            onChange={(value) => {
                              //edited
                              //handleSelectedWard(value)
                              handleSelectedPrivilage(value);
                            }}
                            //edited
                            //options={wardOptionGroup}
                            options={privilagesOptionsGroup}
                            classNamePrefix="select2-selection"
                          />
                        </div>
                      </Col>
                      <Col md="3">
                        <div className="mb-3">
                          <Label>Packages</Label>
                          <Select
                            name="Packages"
                            //edited
                            //value={selectedPackage}
                            value={selectedCompany}
                            onChange={(value) => {
                              //edited
                              //handleSelectedPackage(value)
                              handleSelectedCompany(value);
                            }}
                            //edited
                            //options={packageOptionGroup}
                            options={companiesOptionsGroup}
                            classNamePrefix="select2-selection"
                          />
                        </div>
                      </Col>
                      <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom01">Group</Label>
                          <AvField
                            name="Group"
                            placeholder="Group"
                            type="text"
                            errorMessage="Enter Group"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom01"
                            value={userObject.group}
                            onChange={handleChangeCustomer}
                          />
                        </div>
                      </Col>
                      <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom01">Latitude</Label>
                          <AvField
                            name="Latitude"
                            placeholder="Latitude"
                            type="text"
                            errorMessage="Enter Latitude"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom01"
                            value={userObject.latitude}
                            onChange={handleChangeCustomer}
                          />
                        </div>
                      </Col>
                      <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom01">Longitude</Label>
                          <AvField
                            name="Longitude"
                            placeholder="Longitude"
                            type="text"
                            errorMessage="Enter Longitude"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom01"
                            value={userObject.longitude}
                            onChange={handleChangeCustomer}
                          />
                        </div>
                      </Col>
                      <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom02">
                            Building Image
                          </Label>
                          <AvField
                            name="mobile_icon_svg"
                            id="mobile_icon_svg"
                            type="file"
                            errorMessage="Upload  Image"
                            className="form-control"
                            //onChange={onChangeHandler}
                          />
                        </div>
                      </Col>
                      <Col md="3">
                        <div className="mb-3">
                          <Label>Billing Type</Label>
                          <Select
                            name="Billing Type"
                            //edited
                            //value={selectedBillingtype}
                            value={selectedCompany}
                            onChange={(value) => {
                              //edited
                              //handleSelectedBillingtype(value)
                              handleSelectedCompany(value);
                            }}
                            //edited
                            //options={BillingtypeOptionGroup}
                            options={companiesOptionsGroup}
                            classNamePrefix="select2-selection"
                          />
                        </div>
                      </Col>

                      {/* {userIdTobeUpdated ? null : (
                          <Col md="3">
                          <div className="mb-3">
                            <Label htmlFor="validationCustom05">Password</Label>
                            <AvField
                              name="password"
                              placeholder="Password"
                              type="password"
                              errorMessage=" Please provide a valid password"
                              className="form-control"
                              validate={{ required: { value: true } }}
                              id="validationCustom05"
                              value={userObject.password}
                              onChange={handleChangeUser}
                            />
                          </div>
                        </Col>
                        
                      )} */}
                    </Row>

                    {userIdTobeUpdated ? (
                      <Button
                        color="primary"
                        type="submit"
                        disabled={addingUser ? true : false}
                      >
                        {addingUser ? "Updating" : "Update"}
                      </Button>
                    ) : (
                      <Button
                        color="primary"
                        type="submit"
                        disabled={addingUser ? true : false}
                      >
                        {addingUser ? "Adding" : "Submit"}
                      </Button>
                    )}
                  </AvForm>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col className="col-12">
              <Card>
                <CardBody>
                  <MDBDataTable
                    responsive
                    bordered
                    data={data}
                    searching={true}
                    paging={true}
                    info={false}
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {};

export default withRouter(connect(mapStateToProps, { apiError })(Customers));

Customers.propTypes = {
  error: PropTypes.any,
  users: PropTypes.array,
};
