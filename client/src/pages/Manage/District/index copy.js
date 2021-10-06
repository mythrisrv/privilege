import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { MDBDataTable } from "mdbreact";
import toastr from "toastr";
import { Row, Col, Card, CardBody, Button, Label, Modal } from "reactstrap";
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
} from "../../../store/actions";

// Redux
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { AvForm, AvField } from "availity-reactstrap-validation";

//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb";
// import "./user.scss";

const Users = (props) => {
  const [selectedPrivilage, setSelectedPrivilage] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [userObject, setUserObject] = useState({});
  const [userIdTobeUpdated, setUserIdToBeUpdated] = useState(null);
  const [userIdToBeDeleted, setUserIdToBeDeleted] = useState(null);
  const [confirmDeleteAlert, setConfirmDeleteAlert] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [usersForTable, setUsersForTable] = useState([]);

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
  const branchesOptions = useSelector(
    (state) => state.branches.branchesOptions
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getPrivilagesOptions());
    dispatch(getCompaniesOptions());
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

  useEffect(() => {
    let userData = [];

    users.map((item, index) => {
      item.action = (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <i
            className="uil-key-skeleton"
            style={{ fontSize: "1.3em", cursor: "pointer" }}
            onClick={() => {
              preUpdateUserPassword(item);
            }}
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
      userData.push(item);
    });
    setUsersForTable(userData);
  }, [users]);

  const data = {
    columns: [
        {
            label: "#",
            field: "id",
            sort: "asc",
            width: 150,
          },
          {
            label: "District",
            field: "districtname",
            sort: "asc",
            width: 400,
          },
          {
            label: "State",
            field: "statename",
            sort: "asc",
            width: 200,
          },
          {
            label: "Country",
            field: "countryname",
            sort: "asc",
            width: 200,
        },
          
       
      {
        label: "Action",
        field: "action",
        width: 300,
      },
    ],
    // rows: usersForTable,

    rows: ["id"],
  };

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

  function handleChangeUser(e) {
    let name = e.target.name;
    let value = e.target.value;
    setUserObject({ ...userObject, [name]: value });
  }

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

      <Modal
        isOpen={showModal}
        toggle={() => {
          closeModal();
        }}
        centered={true}
      >
        <div className="modal-header">
          <h5 className="modal-title mt-0">Confirmation</h5>
          <button
            type="button"
            onClick={() => {
              closeModal();
            }}
            className="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <AvForm
          className="needs-validation"
          onValidSubmit={(e, v) => {
            handleValidSubmitPassword(e, v);
          }}
        >
          <div className="modal-body">
            <Row>
              {/* <Col md="12">
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
                    value={passwordObject.password}
                    onChange={handleChangePassword}
                  />
                </div>
              </Col> */}
              {/* <Col md="12">
                <div className="mb-3">
                  <Label htmlFor="validationCustom05">Confirm Password</Label>
                  <AvField
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    type="password"
                    errorMessage=" Please confirm the password"
                    className="form-control"
                    validate={{ required: { value: true } }}
                    id="validationCustom05"
                    value={passwordObject.confirmPassword}
                    onChange={handleChangePassword}
                  />
                </div>
              </Col> */}
            </Row>
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-dark"
              style={{ marginRight: "1rem" }}
              onClick={closeModal}
            >
              Close
            </button>
            <button className="btn btn-primary" type="submit">
              Confirm
            </button>
          </div>
        </AvForm>
      </Modal>

      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs title="Home" breadcrumbItem="District" />
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
                      {/* <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom01">First name</Label>
                          <AvField
                            name="firstName"
                            placeholder="First name"
                            type="text"
                            errorMessage="Enter First Name"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom01"
                            value={userObject.firstName}
                            onChange={handleChangeUser}
                          />
                        </div>
                      </Col>
                      <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom02">Last name</Label>
                          <AvField
                            name="lastName"
                            placeholder="Last name"
                            type="text"
                            errorMessage="Enter Last name"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom02"
                            value={userObject.lastName}
                            onChange={handleChangeUser}
                          />
                        </div>
                      </Col>

                      <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom03">Email</Label>
                          <AvField
                            name="email"
                            placeholder="Email"
                            type="email"
                            errorMessage="Enter valid Email"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom03"
                            value={userObject.email}
                            onChange={handleChangeUser}
                          />
                        </div>
                      </Col>
                      <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom03">Username</Label>
                          <AvField
                            name="username"
                            placeholder="Username"
                            type="text"
                            errorMessage="Enter valid Username"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom03"
                            value={userObject.username}
                            onChange={handleChangeUser}
                          />
                        </div>
                      </Col>
                      <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom04">Mobile</Label>
                          <AvField
                            name="mobile"
                            placeholder="Mobile"
                            type="text"
                            errorMessage="Please provide a valid mobile."
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom04"
                            value={userObject.mobile}
                            onChange={handleChangeUser}
                          />
                        </div>
                      </Col>
                      <Col md={4}>
                        <div className="mb-3">
                          <Label>Prililage</Label>
                          <Select
                            name="privilage"
                            value={selectedPrivilage}
                            onChange={(value) => {
                              handleSelectedPrivilage(value);
                            }}
                            options={privilagesOptionsGroup}
                            classNamePrefix="select2-selection"
                          />
                        </div>
                      </Col>
                      <Col md={4}>
                        <div className="mb-3">
                          <Label>Company</Label>
                          <Select
                            name="company"
                            value={selectedCompany}
                            onChange={(value) => {
                              handleSelectedCompany(value);
                            }}
                            options={companiesOptionsGroup}
                            classNamePrefix="select2-selection"
                          />
                        </div>
                      </Col>
                      <Col md={4}>
                        <div className="mb-3">
                          <Label>Branch</Label>
                          <Select
                            name="branch"
                            value={selectedBranch}
                            onChange={(value) => {
                              handleSelectedBranch(value);
                            }}
                            options={branchesOptionsGroup}
                            classNamePrefix="select2-selection"
                          />
                        </div>
                      </Col> */}
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
                      <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom02">District Name</Label>
                          <AvField
                            name="districtName"
                            placeholder="District Name"
                            type="text"
                            errorMessage="Enter district name"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom02"
                            value={userObject.lastName}
                            onChange={handleChangeUser}
                          />
                        </div>
                      </Col>
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
  );
};

const mapStateToProps = (state) => {};

export default withRouter(connect(mapStateToProps, { apiError })(Users));

Users.propTypes = {
  error: PropTypes.any,
  users: PropTypes.array,
};
