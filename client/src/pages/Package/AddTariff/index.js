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
  Table,
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
  //getPrivilagesOptions,
} from "../../../store/actions";

// Redux
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { AvForm, AvField } from "availity-reactstrap-validation";

//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb";
// import "./user.scss";

const AddTariff = (props) => {
  //  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedPrivilage, setSelectedPrivilage] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [userObject, setUserObject] = useState({});
  const [userIdTobeUpdated, setUserIdToBeUpdated] = useState(null);
  const [userIdToBeDeleted, setUserIdToBeDeleted] = useState(null);
  const [confirmDeleteAlert, setConfirmDeleteAlert] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [usersForTable, setUsersForTable] = useState([]);
  const [accountType, setAccountType] = useState("");

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

  // const districtsOptions = useSelector(
  //   (state) => state.districts.districtsOptions
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
    dispatch(getUsers());
    dispatch(getPrivilagesOptions());
    dispatch(getCompaniesOptions());
    //  dispatch(getDistrictsOptions());
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

  const [values, setValues] = useState([{}]);

  const addMore = () => {
    setValues([...values, {}]);
  };

  const handleRemove = (index) => {
    const list = [...values];
    list.splice(index, 1);
    setValues(list);
  };
  //   let preUpdateUser = (item) => {
  //     if (item.privilage) {
  //       let privilage = {
  //         label: item.privilage.name,
  //         value: item.privilage._id,
  //       };
  //       handleSelectedPrivilage(privilage);
  //     }
  //     if (item.company) {
  //       let company = {
  //         label: item.company.name,
  //         value: item.company._id,
  //       };
  //       handleSelectedCompany(company);
  //     }
  //     if (item.branch) {
  //       let branch = {
  //         label: item.branch.name,
  //         value: item.branch._id,
  //       };
  //       handleSelectedBranch(branch);
  //     }

  //     setUserIdToBeUpdated(item._id);
  //     setUserObject({ ...item, password: null });
  //   };

  //   let preUpdateUserPassword = (item) => {
  //     setUserIdToBeUpdated(item._id);
  //     setShowModal(true);
  //   };

  useEffect(() => {
    let userData = [];

    users.map((item, index) => {
      item.action = (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {/* <i
            className="uil-key-skeleton"
            style={{ fontSize: "1.3em", cursor: "pointer" }}
            onClick={() => {
              preUpdateUserPassword(item);
            }}
          ></i> */}
          <i
            className="uil-edit-alt"
            style={{
              fontSize: "1.3em",
              cursor: "pointer",
              marginLeft: "1rem",
              marginRight: "1rem",
            }}
            onClick={() => {
              //   preUpdateUser(item);
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
              //   preUpdateUser(item);
            }}
          ></i>
          <i
            className="uil-trash-alt"
            style={{ fontSize: "1.3em", cursor: "pointer" }}
            onClick={() => {
              //   setUserIdToBeDeleted(item._id);
              //   setConfirmDeleteAlert(true);
            }}
          ></i>
        </div>
      );
      //   item.id = index + 1;
      //   item.name1 = `${item.firstName} ${item.lastName}`;

      //   item.privilage1 = item.privilage && item.privilage.name;
      //   item.company1 = item.company && item.company.name;
      //   item.branch1 = item.branch && item.branch.name;
      //   userData.push(item);
    });
    // setUsersForTable(userData);
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
        label: "Localbody Type ",
        field: "district",
        sort: "asc",
        width: 400,
      },

      {
        label: "Localbody Name",
        field: "action",
        width: 300,
      },

      {
        label: "Package	",
        field: "action",
        width: 300,
      },
      {
        label: "Category",
        field: "action",
        width: 300,
      },
      {
        label: "Reg.Fee	",
        field: "action",
        width: 300,
      },
      {
        label: "Basic Fee",
        field: "action",
        width: 300,
      },
      {
        label: "Package Validity in Days",
        field: "action",
        width: 300,
      },
      {
        label: "Visit/Month",
        field: "action",
        width: 300,
      },
      {
        label: "Free Bags	",
        field: "action",
        width: 300,
      },
      {
        label: "Staff",
        field: "action",
        width: 300,
      },
      {
        label: "Status",
        field: "action",
        width: 300,
      },
      {
        label: "Action",
        field: "action",
        width: 300,
      },
    ],
    rows: usersForTable,
  };

  //   let privilagesOptionsData =
  //     privilagesOptions &&
  //     privilagesOptions.data &&
  //     privilagesOptions.data.map((item) => {
  //       return {
  //         label: item.name,
  //         value: item._id,
  //       };
  //     });

  //   let companiesOptionsData =
  //     companiesOptions &&
  //     companiesOptions.data &&
  //     companiesOptions.data.map((item) => {
  //       return {
  //         label: item.name,
  //         value: item._id,
  //       };
  //     });

  //   let branchesOptionsData =
  //     branchesOptions &&
  //     branchesOptions.data &&
  //     branchesOptions.data.map((item) => {
  //       return {
  //         label: item.name,
  //         value: item._id,
  //       };
  //     });

  //   const privilagesOptionsGroup = [
  //     {
  //       options: privilagesOptionsData,
  //     },
  //   ];

  //   const companiesOptionsGroup = [
  //     {
  //       options: companiesOptionsData,
  //     },
  //   ];

  //   const branchesOptionsGroup = [
  //     {
  //       options: branchesOptionsData,
  //     },
  //   ];

  //   function handleChangeUser(e) {
  //     let name = e.target.name;
  //     let value = e.target.value;
  //     setUserObject({ ...userObject, [name]: value });
  //   }

  //   function handleSelectedPrivilage(value) {
  //     let newValue = {
  //       name: value.label,
  //       _id: value.value,
  //     };
  //     setSelectedPrivilage(value);
  //     setUserObject({ ...userObject, privilage: newValue });
  //   }

  //   function handleSelectedCompany(value) {
  //     let newValue = {
  //       name: value.label,
  //       _id: value.value,
  //     };
  //     setSelectedCompany(value);
  //     setUserObject({ ...userObject, company: newValue });
  //   }
  //   function handleSelectedBranch(value) {
  //     let newValue = {
  //       name: value.label,
  //       _id: value.value,
  //     };
  //     setSelectedBranch(value);
  //     setUserObject({ ...userObject, branch: newValue });
  //   }

  //   function handleChangePassword(e) {
  //     let name = e.target.name;
  //     let value = e.target.value;
  //     setPasswordObject({ ...passwordObject, [name]: value });
  //   }

  //   const handleValidSubmit = (event, values) => {
  //     userIdTobeUpdated
  //       ? dispatch(updateUser(userObject))
  //       : dispatch(addUser(userObject));
  //   };

  //   const handleValidSubmitPassword = (event, values) => {
  //     if (passwordObject.password == passwordObject.confirmPassword) {
  //       let item = {
  //         _id: userIdTobeUpdated,
  //         password: passwordObject.password,
  //       };
  //       dispatch(updateUser(item));
  //     } else {
  //       toastr.error("Passwords are not matching");
  //     }
  //   };

  //   let closeModal = () => {
  //     setShowModal(false);
  //     setUserIdToBeUpdated(null);
  //   };

  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs title="Home" breadcrumbItem="Add tariff" />
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
                          <Label>Localbody</Label>
                          <Select
                            name="customer_community_id"
                            //   value={selectCommunity}
                            //   onChange={(value) => {
                            //     handleSelectedCommunities(value);
                            //   }}
                            //   options={communitiesOptionsGroup}
                            classNamePrefix="select2-selection"
                          />
                        </div>
                      </Col>
                      <Col md="3">
                        <div className="mb-3">
                          <Label>Localbody</Label>
                          <Select
                            name="customer_community_id"
                            //   value={selectCommunity}
                            //   onChange={(value) => {
                            //     handleSelectedCommunities(value);
                            //   }}
                            //   options={communitiesOptionsGroup}
                            classNamePrefix="select2-selection"
                          />
                        </div>
                      </Col>
                      <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom05">
                            Package Name
                          </Label>
                          <AvField
                            name="Start"
                            placeholder="Start"
                            type="text"
                            errorMessage="Enter Start"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom05"
                          />
                        </div>
                      </Col>
                      <Col md="3">
                        <div className="mb-3">
                          <Label>Category</Label>
                          <Select
                            name="customer_community_id"
                            //   value={selectCommunity}
                            //   onChange={(value) => {
                            //     handleSelectedCommunities(value);
                            //   }}
                            //   options={communitiesOptionsGroup}
                            classNamePrefix="select2-selection"
                          />
                        </div>
                      </Col>
                      <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom05">
                            Registration Fee
                          </Label>
                          <AvField
                            name="RegistrationFee"
                            placeholder="Registration Fee"
                            type="number"
                            errorMessage="Enter Registration Fee"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom05"
                          />
                        </div>
                      </Col>
                      <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom05">Basic Fee</Label>
                          <AvField
                            name="BasicFee"
                            placeholder="Basic Fee"
                            type="number"
                            errorMessage="Enter Basic Fee"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom05"
                          />
                        </div>
                      </Col>
                      <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom05">
                            Package Validity in Days
                          </Label>
                          <AvField
                            name="package validity"
                            placeholder="Package Validity in Days"
                            type="number"
                            errorMessage="Enter Package Validity in Days"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom05"
                          />
                        </div>
                      </Col>
                      <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom05">
                            Visit/Month
                          </Label>
                          <AvField
                            name="visit"
                            placeholder="Visit/Monthnd"
                            type="number"
                            errorMessage="Enter Visit/Month"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom05"
                          />
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <div className="container">
                          <Table className="table table-bordered mb-0">
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
                                        <Select
                                          name="customer_community_id"
                                          //   value={selectCommunity}
                                          //   onChange={(value) => {
                                          //     handleSelectedCommunities(value);
                                          //   }}
                                          //   options={communitiesOptionsGroup}
                                          classNamePrefix="select2-selection"
                                        />
                                      </div>
                                    </td>
                                    <td>{item.default_unit}</td>
                                    <td>
                                      {values.length !== 1 && (
                                        <i
                                          className="uil-trash-alt"
                                          style={{
                                            fontSize: "23px",
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
                          </Table>
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
                          <Button color="primary" type="submit">
                            Save
                          </Button>
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
  );
};

const mapStateToProps = (state) => {};

export default withRouter(connect(mapStateToProps, { apiError })(AddTariff));

// Users.propTypes = {
//   error: PropTypes.any,
//   users: PropTypes.array,
// };
