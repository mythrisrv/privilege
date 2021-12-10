import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { MDBDataTable } from "mdbreact";
import toastr from "toastr";
import { Row, Col, Card, CardBody, Button, Label, Modal } from "reactstrap";
import SweetAlert from "react-bootstrap-sweetalert";
import Select from "react-select";
import LoopIcon from "@mui/icons-material/Loop";
import { CSVLink } from "react-csv";
import {
  getUsers,
  addUser,
  deleteUser,
  apiError,
  getPrivilagesOptions,
  getCompaniesOptions,
  getBranchesOptions,
  updateUser,
  getInvoice,
  getDistrictOptions,
  getLocalbodyOptions,
  getWardOptions,
  getWardsGroupOptions,
  //getPrivilagesOptions,
} from "../../../store/actions";

// Redux
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { AvForm, AvField } from "availity-reactstrap-validation";

//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb";
// import "./user.scss";

const ViewInvoice = (props) => {
  //  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedPrivilage, setSelectedPrivilage] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [userObject, setUserObject] = useState({});
  const [userIdTobeUpdated, setUserIdToBeUpdated] = useState(null);
  const [userIdToBeDeleted, setUserIdToBeDeleted] = useState(null);
  const [confirmDeleteAlert, setConfirmDeleteAlert] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [invoiceForTable, setInvoiceForTable] = useState([]);
  const [accountType, setAccountType] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState({});
  const [selectedLocalbody, setSelectedLocalbody] = useState({});
  const [selectedWard, setSelectedWard] = useState({});
  const [selectedGroup, setSelectedGroup] = useState({});

  const [filteredData, setFilteredData] = useState(null);

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

 

  const privilagesOptions = useSelector(
    (state) => state.privilages.privilagesOptions
  );
  const companiesOptions = useSelector(
    (state) => state.companies.companiesOptions
  );
  const { districtOptions } = useSelector((state) => state.districts);
  const { localbodyOptions } = useSelector((state) => state.localbodies);
  const { wardOptions } = useSelector((state) => state.wards);
  const { wardsGroupOptions } = useSelector((state) => state.groups);

  const { invoice } = useSelector((state) => state.invoice);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getInvoice());
    dispatch(getDistrictOptions());
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
      //  setSelectedDistrict(null);
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

  useEffect(() => {
    let invoiceData = [];

    invoice?.map((item, index) => {
      invoiceData.push(item);
    });
    setInvoiceForTable(invoiceData);
  }, [invoice]);

  const headers = [
    { label: "Customer ID", key: "customerId" },
    { label: "Name", key: "custName" },
    { label: "District", key: "district" },
    { label: "Group", key: "customergroup" },
    { label: "Ward", key: "customerward" },
    { label: "Localbody", key: "localbody" },
    { label: "Total Invoice Amount", key: "totalAmt" },
    { label: "Paid Amount", key: "paidAmount" },
    { label: "Total Due", key: "Due" },
  ];

  const data = {
    columns: [
      {
        label: "#",
        field: "id",
        sort: "asc",
        width: 150,
      },
      {
        label: " CustomerID",
        field: "customerId",
        sort: "asc",
        width: 400,
      },
      {
        label: "Name",
        field: "custName",
        sort: "asc",
        width: 200,
      },
      {
        label: "District",
        field: "district",
        sort: "asc",
        width: 200,
      },
      {
        label: "	Group	",
        field: "customergroup",
        sort: "asc",
        width: 200,
      },
      {
        label: "Ward	",
        field: "customerward",
        sort: "asc",
        width: 200,
      },
      {
        label: "TotalInvoiceAmount",
        field: "totalAmt",
        sort: "asc",
        width: 200,
      },
      {
        label: "PaidAmount",
        field: "paidAmount",
        sort: "asc",
        width: 200,
      },
      {
        label: "TotalDue",
        field: "Due",
        sort: "asc",
        width: 200,
      },
    ],
    rows: invoiceForTable,
  };

  useEffect(() => {
    let newInvoiceData = [];

    filteredData?.map((item, index) => {
      newInvoiceData.push(item);
    });
    setInvoiceForTable(newInvoiceData);
  }, [filteredData]);

  const fdata = {
    columns: [
      {
        label: "#",
        field: "id",
        sort: "asc",
        width: 150,
      },
      {
        label: " CustomerID",
        field: "customerId",
        sort: "asc",
        width: 400,
      },
      {
        label: "Name",
        field: "custName",
        sort: "asc",
        width: 200,
      },
      {
        label: "District",
        field: "district",
        sort: "asc",
        width: 200,
      },
      {
        label: "	Group	",
        field: "customergroup",
        sort: "asc",
        width: 200,
      },
      {
        label: "Ward	",
        field: "customerward",
        sort: "asc",
        width: 200,
      },
      {
        label: "TotalInvoiceAmount",
        field: "totalAmt",
        sort: "asc",
        width: 200,
      },
      {
        label: "PaidAmount",
        field: "paidAmount",
        sort: "asc",
        width: 200,
      },
      {
        label: "TotalDue",
        field: "Due",
        sort: "asc",
        width: 200,
      },
    ],
    rows: invoiceForTable,
  };

  function handleChangeDistrict(value) {
    setSelectedDistrict(value);
    dispatch(getLocalbodyOptions(value.value));
    let filterData = invoice?.filter((item) => item.district === value.label);
    setFilteredData(filterData);
  }

  function handleChangeLocalbody(value) {
    setSelectedLocalbody(value);
    dispatch(getWardOptions(value.value));
    let filterData = invoice?.filter((item) => item.localbody === value.label);
    setFilteredData(filterData);
  }
  function handleChangeWard(value) {
    setSelectedWard(value);
    dispatch(getWardsGroupOptions(value.value));

    let filterData = invoice?.filter(
      (item) => item.customerward === value.label
    );
    setFilteredData(filterData);
  }

  function handleChangeGroup(value) {
    setSelectedGroup(value);

    let filterData = invoice?.filter(
      (item) => item.customergroup === value.label
    );
    setFilteredData(filterData);
  }

  function handleClick() {
    setSelectedDistrict({});
    setSelectedLocalbody({});
    setFilteredData(invoice);

    setSelectedWard({});
    setSelectedGroup({});
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs title="Home" breadcrumbItem="View Invoice" />
          <Row>
            <Col xl="12">
              <Card>
                <CardBody>
                  <AvForm
                    className="needs-validation"
                    // onValidSubmit={(e, v) => {
                    //   handleValidSubmit(e, v);
                    // }}
                  >
                    <Row>
                      <Col md="3">
                        <div className="mb-3">
                          <Label>District</Label>
                          <Select
                            name="customer_community_id"
                            value={selectedDistrict}
                            //   onChange={(value) => {
                            //     handleSelectedCommunities(value);
                            //   }}
                            //   options={communitiesOptionsGroup}
                            classNamePrefix="select2-selection"
                            options={districtOptions?.map((item) => {
                              return {
                                label: item.district_name,
                                value: item._id,
                                key: item._id,
                              };
                            })}
                            onChange={handleChangeDistrict}
                          />
                        </div>
                      </Col>
                      <Col md="3">
                        <div className="mb-3">
                          <Label>Localbody</Label>
                          <Select
                            name="customer_community_id"
                            value={selectedLocalbody}
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
                            onChange={handleChangeLocalbody}
                          />
                        </div>
                      </Col>
                      <Col md="3">
                        <div className="mb-3">
                          <Label>Ward</Label>
                          <Select
                            name="customer_community_id"
                            value={selectedWard}
                            //   onChange={(value) => {
                            //     handleSelectedCommunities(value);
                            //   }}
                            //   options={communitiesOptionsGroup}
                            classNamePrefix="select2-selection"
                            options={wardOptions?.map((item) => {
                              return {
                                label: item.ward_name,
                                value: item._id,
                                key: item._id,
                              };
                            })}
                            onChange={handleChangeWard}
                          />
                        </div>
                      </Col>

                      <Col md="3">
                        <div className="mb-3">
                          <Label>Group</Label>
                          <Select
                            name="customer_community_id"
                            value={selectedGroup}
                            //   onChange={(value) => {
                            //     handleSelectedCommunities(value);
                            //   }}
                            //   options={communitiesOptionsGroup}
                            classNamePrefix="select2-selection"
                            options={wardsGroupOptions?.map((item) => {
                              return {
                                label: item.group_name,
                                value: item._id,
                                key: item._id,
                              };
                            })}
                            onChange={handleChangeGroup}
                          />
                        </div>
                      </Col>
                      <Col md="3">
                        <div className="mb-3" style={{ paddingTop: "30px" }}>
                          <LoopIcon onClick={handleClick}></LoopIcon>
                        </div>
                      </Col>

                      <Col md="1">
                        <div className="mt-4">
                          <Button color="success">
                            <CSVLink
                              // headers={fileHeaders}
                              data={invoiceForTable}
                              headers={headers}
                              fileName="invoice.csv"
                              target="_blank"
                            >
                              Export
                            </CSVLink>
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </AvForm>
                  {filteredData ? (
                    <MDBDataTable
                      responsive
                      bordered
                      data={fdata}
                      searching={true}
                      paging={true}
                      info={false}
                    />
                  ) : (
                    <MDBDataTable
                      responsive
                      bordered
                      data={data}
                      searching={true}
                      paging={true}
                      info={false}
                    />
                  )}
                </CardBody>
              </Card>
            </Col>
          </Row>
          {/* <Row>
            <Col className="col-12">
              <Card>
                <CardBody>
                 
                </CardBody>
              </Card>
            </Col>
          </Row> */}
        </div>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {};

export default withRouter(connect(mapStateToProps, { apiError })(ViewInvoice));

ViewInvoice.propTypes = {
  error: PropTypes.any,
  invoice: PropTypes.array,
};
