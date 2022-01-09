import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { MDBDataTable } from "mdbreact";
import toastr from "toastr";
import {
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Label,
  Modal,
  Table as table,
  Input,
} from "reactstrap";
import SweetAlert from "react-bootstrap-sweetalert";
import Select from "react-select";
import {
  getUsers,
  addUser,
  deleteUser,
  apiError,
  getPrivilagesOptions,
  getCompaniesOptions,
  getBranchesOptions,
  updateUser,
  getPackages,
  getLocalbodyTypes,
  getTypesLocalbodies,
  getCustomerCategoryOptions,
  getWasteItemsOptions,
  addPackage,
  updatePackage,
  deletePackage,
  updatePackageStatus
  //getPrivilagesOptions,
} from "../../../store/actions";

// Redux
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { AvForm, AvField } from "availity-reactstrap-validation";

//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb";
// import "./user.scss";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";

const AddTariff = (props) => {
  //  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedPrivilage, setSelectedPrivilage] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [tariffObject, setTariffObject] = useState({});
  const [tariffIdTobeUpdated, setTariffIdToBeUpdated] = useState(null);
  const [tariffIdToBeDeleted, setTariffIdToBeDeleted] = useState(null);
  const [confirmDeleteAlert, setConfirmDeleteAlert] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [packagesForTable, setpackagesForTable] = useState([]);
  const [accountType, setAccountType] = useState("");
  const [localbodyType, setLocalbodyType] = useState({});
  const [localbodyName, setLocalbodyName] = useState({});
  const [packagename, setPackagename] = useState("");
  const [categoryName, setCategoryName] = useState({});
  const [regfee, setRegfee] = useState("");
  const [basicfee, setBasicfee] = useState("");
  const [validity, setValidity] = useState("");
  const [visit, setVisit] = useState("");
  const [wasteItem, setWasteItem] = useState({});
  const [tableData, setTableData] = useState([]);
  const [form, setForm] = React.useState(false);
  // const [freebag, setFreebag] = useState("");
  //const [inputList, setInputList] = useState([]);

  const [passwordObject, setPasswordObject] = useState({
    oldPassword: "",
    password: "",
    confirmPassword: "",
  });

 

 
  
  const {
    packageList,
    addPackageResponse,
    updatePackageResponse,
    addingPackage,
    packagesData,
    packageData,
    deletePackageResponse,
    deletingPackage,
    error
  } = useSelector((state) => state.packageList);
  const { localbodyTypes, localbodyOptions } = useSelector(
    (state) => state.localbodies
  );
  const { categoryOptions } = useSelector((state) => state.customerCategory);
  const { wasteItemsOptions } = useSelector((state) => state.wasteItems);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getPrivilagesOptions());
    dispatch(getCompaniesOptions());
    dispatch(getPackages());
    dispatch(getLocalbodyTypes());
    dispatch(getCustomerCategoryOptions());
    dispatch(getWasteItemsOptions());
  }, []);

  
  useEffect(() => {
    if (addPackageResponse.type === "success") {
      dispatch(getPackages())
      toastr.success(addPackageResponse.message);
     
      
    } else if (addPackageResponse.type === "failure") {
      toastr.error(error.data.message, addPackageResponse.message);
    }
  }, [addPackageResponse]);

  useEffect(() => {
    if (deletePackageResponse.type === "success") {
      dispatch(getPackages())
      toastr.success(deletePackageResponse.message);
      setTariffIdToBeDeleted(null);
    } else if (deletePackageResponse.type === "failure") {
      toastr.error(error.data.message, deletePackageResponse.message);
    }
  }, [deletePackageResponse]);

  useEffect(() => {
    if (updatePackageResponse.type === "success") {
      dispatch(getPackages())
      setShowModal(false);
      setTariffIdToBeUpdated(null);
      setPasswordObject({});
      toastr.success(updatePackageResponse.message);
    } else if (updatePackageResponse.type === "failure") {
      toastr.error(error.data.message, updatePackageResponse.message);
    }
  }, [updatePackageResponse]);

  const [values, setValues] = useState([{ wasteName: "", freeBag: 0 }]);

  const addMore = () => {
    setValues([...values, { wasteName: "", freeBag: 0 }]);
  };

  const handleRemove = (index) => {
    const list = [...values];
   
    list.splice(index, 1);
    

    setValues(list);
  };

  let preUpdateTariff = (item) => {
    console.log(item);
    if (item.localbody_name) {
      let localbodyname = {
        label: item.localbody_name.localbody_name,
        value: item.localbody_name._id,
      };
      handleChangeLocalbodyName(localbodyname);
    }
    if (item.localbody_type) {
      let localbody = {
        label: item.localbody_type.localbody_type_name,
        value: item.localbody_type._id,
      };
      handleLocalbodyType(localbody);
    }

    if (item.cust_type) {
      let custtype = {
        label: item.cust_type.customer_type_name,
        value: item.cust_type._id,
      };
      handleChangeCategory(custtype);
    }

   if (item.tariffItems) {
      var res = item.tariffItems.map((itm) => ({
        wasteNames: itm.itemName,
        freeBag: itm.number,
      }));

      setValues(res);
    }
   
    setPackagename(item.package_name);
    setRegfee(item.package_reg_fee);
    setBasicfee(item.package_basic_fee);
    setValidity(item.package_validity);
    setVisit(item.package_visit_month);

    setTariffIdToBeUpdated(item._id);
    setTariffObject({ ...item, password: null });
  };

  //     setUserIdToBeUpdated(item._id);
  //     setUserObject({ ...item, password: null });
  //   };

  //   let preUpdateUserPassword = (item) => {
  //     setUserIdToBeUpdated(item._id);
  //     setShowModal(true);
  //   };

  const handleClickOpenForm = (item) => {
    let itemData = [];

    itemData.push(item);
    setTableData(itemData);

    setForm(true);
  };
  const handleCloseForm = () => {
    setForm(false);
  };
  useEffect(() => {
    let packageData = [];

    packageList?.map((item, index) => {
      item.action = (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {/* <i
            className="uil-key-skeleton"
            style={{ fontSize: "1.3em", cursor: "pointer" }}
            onClick={() => {
              preUpdateTariff(item);
            }}
          ></i>*/}
          <i
            className="uil-edit-alt"
            style={{
              fontSize: "1.3em",
              cursor: "pointer",
              marginLeft: "1rem",
              marginRight: "1rem",
            }}
            onClick={() => {
              preUpdateTariff(item);
            }}
          ></i>
          <i
            className="uil-eye"
            style={{
              fontSize: "1.3em",
              cursor: "pointer",
              marginLeft: "1rem",
              marginRight: "1rem",
            }}
            onClick={() => {
              handleClickOpenForm(item);
            }}
          ></i>
          <i
            className="uil-trash-alt"
            style={{ fontSize: "1.3em", cursor: "pointer" }}
            onClick={() => {
                setTariffIdToBeDeleted(item._id);
                setConfirmDeleteAlert(true);
            }}
          ></i>
        </div>
      );
      if (item.package_active_status === 0) {
        item.status = (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button color="success" size="sm" onClick={() => {dispatch(updatePackageStatus(item))}}>
              Active
            </Button>
          </div>
        );
      } else {
        item.status = (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button color="danger" size="sm" onClick={() => {dispatch(updatePackageStatus(item))}}>
              Inactive
            </Button>
          </div>
        );
      }
      item.id = index + 1;
      if(item.tariff_addedby)
      item.Staff=item.tariff_addedby.username
      if (item.localbody_name)
        item.localbody = item.localbody_name.localbody_name;
      if (item.localbody_type)
    item.localbodyType = item.localbody_type.localbody_type_name;
      if (item.cust_type) item.category = item.cust_type.customer_type_name;
     

      if (item.package_billing_id && item.package_bags) {
        item.tariffItems = item.package_billing_id?.map((itm, index) => {
          return {
            itemName: itm.waste_items_name,
            number: item.package_bags[index],
          };
        });
      }

      if (item.package_bags) {
        const sum = item.package_bags.reduce(
          (partial_sum, a) => partial_sum + a,
          0
        );
        item.freebags = sum;
      }
      packageData.push(item);
    });
    setpackagesForTable(packageData);
  }, [packageList]);

  const data = {
    columns: [
      {
        label: "#",
        field: "id",
        sort: "asc",
        width: 150,
      },
      {
        label: "LocalbodyType ",
        field: "localbodyType",
        sort: "asc",
        width: 400,
      },

      {
        label: "LocalbodyName",
        field: "localbody",
        width: 300,
      },

      {
        label: "Package	",
        field: "package_name",
        width: 300,
      },
      {
        label: "Category",
        field: "category",
        width: 300,
      },
      {
        label: "Reg.Fee	",
        field: "package_reg_fee",
        width: 300,
      },
      {
        label: "BasicFee",
        field: "package_basic_fee",
        width: 300,
      },
      {
        label: "PackageValidityInDays",
        field: "package_validity",
        width: 300,
      },
      {
        label: "Visit/Month",
        field: "package_visit_month",
        width: 300,
      },
      {
        label: "FreeBags	",
        field: "freebags",
        width: 300,
      },
      {
        label: "Staff",
        field: "Staff",
        width: 300,
      },
      {
        label: "Status",
        field: "status",
        width: 300,
      },
      {
        label: "Action",
        field: "action",
        width: 300,
      },
    ],
    rows: packagesForTable,
  };

 
  function handleLocalbodyType(value) {
    setLocalbodyType(value);
    let newValue = {
      name: value.label,
      _id: value.value,
    };
    setTariffObject({ ...tariffObject, localbody: newValue });
    dispatch(getTypesLocalbodies(value.value));
  }

  const handleValidSubmit = (event, values) => {
    console.log(tariffObject);
    tariffIdTobeUpdated
      ? dispatch(updatePackage(tariffObject))
      : dispatch(addPackage(tariffObject));
      setLocalbodyName({});
      setLocalbodyType({})
      setPackagename("")
      setCategoryName({})
      setRegfee("")
      setBasicfee("")
      setVisit("")
      setValidity("")
     // setValues({})
  };

  function handleChangeLocalbodyType(value) {
    setLocalbodyName({});
    setLocalbodyType(value);
    let newValue = {
      name: value.label,
      _id: value.value,
    };
    setTariffObject({ ...tariffObject, localbody: newValue });
    dispatch(getTypesLocalbodies(value.value));
  }
  function handleChangeLocalbodyName(val) {
    setLocalbodyName(val);
    let newValue = {
      name: val.label,
      _id: val.value,
    };
    setTariffObject({ ...tariffObject, localbodyname: newValue });
  }
  function handleChangePackage(e) {
    let name = e.target.name;
    let value = e.target.value;
    setPackagename(value);
    setTariffObject({ ...tariffObject, [name]: value });
  }

  function handleChangeCategory(value) {
    setCategoryName(value);
    let newValue = {
      name: value.label,
      _id: value.value,
    };
    setTariffObject({ ...tariffObject, categoryname: newValue });
  }
  function handleChangeRegFee(e) {
    let name = e.target.name;
    let value = e.target.value;
    setRegfee(value);
    setTariffObject({ ...tariffObject, [name]: value });
  }
  function handleChangeBasicFee(e) {
    let name = e.target.name;
    let value = e.target.value;
    setBasicfee(value);
    setTariffObject({ ...tariffObject, [name]: value });
  }
  function handleChangeValidity(e) {
    let name = e.target.name;
    let value = e.target.value;
    setValidity(value);
    setTariffObject({ ...tariffObject, [name]: value });
  }
  function handleChangeVisit(e) {
    let name = e.target.name;
    let value = e.target.value;
    setVisit(value);
    setTariffObject({ ...tariffObject, [name]: value });
  }

  function handleChangeWasteItem(e, index) {
    const { name, value } = e.target;

    const list = [...values];
 
    list[index][name] = value;

    setValues(list);

    let waste = [];
    list?.map((v) => waste.push(v.wasteName));
   
    let freebag = [];
    list?.map((v) => freebag.push(v.freeBag));

    setTariffObject({ ...tariffObject, wasteItems: waste, freeBag: freebag });
  }

 

  return (
    <>
      <React.Fragment>
     
      {confirmDeleteAlert ? (
        <SweetAlert
          title=""
          showCancel
          confirmButtonText="Delete"
          confirmBtnBsStyle="success"
          cancelBtnBsStyle="danger"
          onConfirm={() => {
            dispatch(deletePackage(tariffIdToBeDeleted));
            setConfirmDeleteAlert(false);
          }}
          onCancel={() => setConfirmDeleteAlert(false)}
        >
          Are you sure you want to delete it?
        </SweetAlert>
      ) : null}
        <div className="page-content">
          <div className="container-fluid">
            <Breadcrumbs title="Home" breadcrumbItem="Add tariff" />
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
                            <Label>Localbody</Label>
                            <Select
                              name="customer_community_id"
                              value={localbodyType}
                              //   onChange={(value) => {
                              //     handleSelectedCommunities(value);
                              //   }}
                              //   options={communitiesOptionsGroup}
                              classNamePrefix="select2-selection"
                              options={localbodyTypes?.map((item) => {
                                return {
                                  label: item.localbody_type_name,
                                  value: item._id,
                                  key: item._id,
                                };
                              })}
                              onChange={handleChangeLocalbodyType}
                            />
                          </div>
                        </Col>
                        <Col md="3">
                          <div className="mb-3">
                            <Label>Localbody</Label>
                            <Select
                              name="customer_community_id"
                              value={localbodyName}
                              //   onChange={(value) => {
                              //     handleSelectedCommunities(value);
                              //   }}
                              //   options={communitiesOptionsGroup}
                              classNamePrefix="select2-selection"
                              options={localbodyOptions?.map((item) => {
                                return {
                                  label: item.localbody_name,
                                  value: item._id,
                                  key: item._id,
                                };
                              })}
                              onChange={(e) => {
                                handleChangeLocalbodyName(e);
                              }}
                            />
                          </div>
                        </Col>
                        <Col md="3">
                          <div className="mb-3">
                            <Label htmlFor="validationCustom05">
                              Package Name
                            </Label>
                            <AvField
                              name="package_name"
                              placeholder=""
                              type="text"
                              value={packagename}
                              errorMessage="Enter Start"
                              className="form-control"
                              validate={{ required: { value: true } }}
                              id="validationCustom05"
                              onChange={handleChangePackage}
                            />
                          </div>
                        </Col>
                        <Col md="3">
                          <div className="mb-3">
                            <Label>Category</Label>
                            <Select
                              name="customerCategory"
                              value={categoryName}
                              //   onChange={(value) => {
                              //     handleSelectedCommunities(value);
                              //   }}
                              //   options={communitiesOptionsGroup}
                              classNamePrefix="select2-selection"
                              options={categoryOptions?.map((item) => {
                                return {
                                  label: item.customer_type_name,
                                  value: item._id,
                                  key: item._id,
                                };
                              })}
                              onChange={handleChangeCategory}
                            />
                          </div>
                        </Col>
                        <Col md="3">
                          <div className="mb-3">
                            <Label htmlFor="validationCustom05">
                              Registration Fee
                            </Label>
                            <AvField
                              name="package_reg_fee"
                              placeholder="Registration Fee"
                              type="number"
                              min="0"
                              value={regfee}
                              errorMessage="Enter Registration Fee"
                              className="form-control"
                              validate={{ required: { value: true } }}
                              id="validationCustom05"
                              onChange={handleChangeRegFee}
                            />
                          </div>
                        </Col>
                        <Col md="3">
                          <div className="mb-3">
                            <Label htmlFor="validationCustom05">
                              Basic Fee
                            </Label>
                            <AvField
                              name="package_basic_fee"
                              placeholder="Basic Fee"
                              type="number"
                              min="0"
                              value={basicfee}
                              errorMessage="Enter Basic Fee"
                              className="form-control"
                              validate={{ required: { value: true } }}
                              id="validationCustom05"
                              onChange={handleChangeBasicFee}
                            />
                          </div>
                        </Col>
                        <Col md="3">
                          <div className="mb-3">
                            <Label htmlFor="validationCustom05">
                              Package Validity in Days
                            </Label>
                            <AvField
                              name="package_validity"
                              placeholder="Package Validity in Days"
                              type="number"
                              min="0"
                              value={validity}
                              errorMessage="Enter Package Validity in Days"
                              className="form-control"
                              validate={{ required: { value: true } }}
                              id="validationCustom05"
                              onChange={handleChangeValidity}
                            />
                          </div>
                        </Col>
                        <Col md="3">
                          <div className="mb-3">
                            <Label htmlFor="validationCustom05">
                              Visit/Month
                            </Label>
                            <AvField
                              name="package_visit_month"
                              placeholder="package_visit_month"
                              type="number"
                              min="0"
                              value={visit}
                              errorMessage="Enter Visit/Month"
                              className="form-control"
                              validate={{ required: { value: true } }}
                              id="validationCustom05"
                              onChange={handleChangeVisit}
                            />
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <div className="container">
                            <table className="table table-bordered mb-0">
                              <thead>
                                <tr>
                                  <th>#</th>
                                  <th>Waste Item</th>
                                  <th>Free Bags</th>

                                  {values.length !== 1 ? <th>Action</th> : null}
                                </tr>
                              </thead>
                              <tbody>
                                {values.map((item, index) => {
                                 
                                  return (
                                    <tr>
                                      <td>{index + 1}</td>

                                      <td>
                                        {" "}
                                        <div className="mb-3">
                                          <Input
                                            name="wasteName"
                                            type="select"
                                            value={item.wasteName}
                                            style={{ appearance: "auto" }}
                                            //   onChange={(value) => {
                                            //     handleSelectedCommunities(value);
                                            //   }}
                                            //   options={communitiesOptionsGroup}
                                            classNamePrefix="select2-selection"
                                            onChange={(e) =>
                                              handleChangeWasteItem(e, index)
                                            }
                                          >
                                            <option>{item.wasteNames}</option>
                                            {wasteItemsOptions.map(
                                              (options) => (
                                                <option value={options._id}>
                                                  {options.waste_items_name}
                                                </option>
                                              )
                                            )}
                                          </Input>
                                        </div>
                                      </td>
                                      <td>
                                        {" "}
                                        <AvField
                                          name="freeBag"
                                          placeholder=""
                                          value={item.freeBag}
                                          type="number"
                                          min="0"
                                          errorMessage=""
                                          className="form-control"
                                          validate={{
                                            required: { value: true },
                                          }}
                                          id="validationCustom05"
                                          onChange={(e) =>
                                            handleChangeWasteItem(e, index)
                                          }
                                        />
                                      </td>

                                      <td>
                                        {values.length !== 1 && (
                                          <i
                                            className="uil uil-times"
                                            style={{
                                              fontSize: "20px",
                                              cursor: "pointer",
                                              paddingLeft: "5px",
                                            }}
                                            onClick={() => handleRemove(index)}
                                          ></i>
                                        )}
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                        </Col>
                      </Row>
                      <br />
                      <Button
                        onClick={() => addMore()}
                        color="success"
                        className="mt-1"
                      >
                        Add New Item
                      </Button>
                      <br /> <br /> <br /> <br />
                      <Row>
                        <Col md="1">
                          <div className="mt-4">
                            {tariffIdTobeUpdated ? (
                              <Button
                                color="primary"
                                type="submit"
                                disabled={addingPackage ? true : false}
                              >
                                {addingPackage ? "Updating" : "Update"}
                              </Button>
                            ) : (
                              <Button
                                color="primary"
                                type="submit"
                                disabled={addingPackage ? true : false}
                              >
                                {addingPackage ? "Adding" : "Save"}
                              </Button>
                            )}
                          </div>
                        </Col>
                        <Col md="1">
                          <div className="mt-4">
                            <Button
                              color="danger"
                              type="reset"
                              onClick={() => setAccountType("")}
                            >
                              Reset
                            </Button>
                          </div>
                        </Col>
                      </Row>
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
                      paging={false}
                      info={false}
                    />
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </div>
      </React.Fragment>
      <div>
        <Dialog open={form} onClose={handleCloseForm}>
          <DialogTitle style={{ textAlign: "center" }}>
            <CloseIcon
              onClick={handleCloseForm}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            />
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="caption table">
                  <TableBody>
                    {tableData.map((row) => (
                      <TableRow>
                        <TableCell component="th" scope="row">
                          LocalbodyType:
                        </TableCell>
                        <TableCell align="left">{row.localbodyType}</TableCell>
                        <TableCell align="left">LocalbodyName:</TableCell>
                        <TableCell align="left">{row.localbody}</TableCell>
                      </TableRow>
                    ))}
                    {tableData.map((row) => (
                      <TableRow>
                        <TableCell component="th" scope="row">
                          Package Name:
                        </TableCell>
                        <TableCell align="left">{row.package_name}</TableCell>
                        <TableCell align="left">Category:</TableCell>
                        <TableCell align="left">{row.category}</TableCell>
                      </TableRow>
                    ))}
                    {tableData.map((row) => (
                      <TableRow>
                        <TableCell component="th" scope="row">
                          Registration Fee:
                        </TableCell>
                        <TableCell align="left">
                          {row.package_reg_fee}/-
                        </TableCell>
                        <TableCell align="left">Basic Fee:</TableCell>
                        <TableCell align="left">
                          {row.package_basic_fee}/-
                        </TableCell>
                      </TableRow>
                    ))}
                    {tableData.map((row) => (
                      <TableRow>
                        <TableCell component="th" scope="row">
                          Package Validity In Days:
                        </TableCell>
                        <TableCell align="left">
                          {row.package_validity} days
                        </TableCell>
                        <TableCell align="left">Visit/Month:</TableCell>
                        <TableCell align="left">
                          {row.package_visit_month}
                        </TableCell>
                      </TableRow>
                    ))}
                    {tableData.map((row) => (
                      <TableRow>
                        <TableCell component="th" scope="row">
                          Free Bags:
                        </TableCell>
                        <TableCell align="left">{row.freebags} </TableCell>
                        <TableCell align="left">Staff:</TableCell>
                        <TableCell align="left">{row.Staff}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <DialogTitle style={{ textAlign: "center" }}>
                  Tariff Item Detailes
                </DialogTitle>
                <Table>
                  <TableHead>
                    {tableData.map((row) => (
                      // console.log(row)
                      <TableRow>
                        <TableCell style={{ fontWeight: "bold" }}>
                          Item Name
                        </TableCell>

                        <TableCell align="left" style={{ fontWeight: "bold" }}>
                          Free Bags
                        </TableCell>

                        {/* <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
                      </TableRow>
                    ))}

                    {tableData.map((row) => (
                      <TableRow>
                        {row.tariffItems?.map((data) => {
                          return (
                            <TableRow>
                              <TableCell align="left">
                                {data.itemName}
                              </TableCell>

                              <TableCell align="left">{data.number}</TableCell>
                            </TableRow>
                          );
                        })}
                      </TableRow>
                    ))}
                  </TableHead>
                  <TableBody>
                    {tableData.map((row) => (
                      <TableRow key={row.name}>
                        <TableCell align="left"></TableCell>

                        <TableCell align="left">{}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </DialogContentText>
          </DialogContent>
          <DialogActions></DialogActions>
        </Dialog>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {};

export default withRouter(connect(mapStateToProps, { apiError })(AddTariff));

//AddTari.propTypes = {
//   error: PropTypes.any,
//   users: PropTypes.array,
// };
