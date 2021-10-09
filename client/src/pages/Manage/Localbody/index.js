import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { MDBDataTable } from "mdbreact";
import toastr from "toastr";
import { Row, Col, Card, CardBody, Button, Label, Modal } from "reactstrap";
import SweetAlert from "react-bootstrap-sweetalert";
import Select from "react-select";
import {
  getLocalbodies,
  addLocalbody,
  deleteLocalbody,
  apiError,
  getPrivilagesOptions,
  getCompaniesOptions,
  getBranchesOptions,
  updateLocalbody,
} from "../../../store/actions";

// Redux
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { AvForm, AvField } from "availity-reactstrap-validation";

//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb";
//import "./district.scss";

const Localbodies = (props) => {
  const [selectedPrivilage, setSelectedPrivilage] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [localbodyObject, setLocalbodyObject] = useState({});
  const [localbodyIdTobeUpdated, setLocalbodyIdToBeUpdated] = useState(null);
  const [localbodyIdToBeDeleted, setLocalbodyIdToBeDeleted] = useState(null);
  const [confirmDeleteAlert, setConfirmDeleteAlert] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [localbodysForTable, setLocalbodiesForTable] = useState([]);

  const [passwordObject, setPasswordObject] = useState({
    oldPassword: "",
    password: "",
    confirmPassword: "",
  });

  const {
    localbodies,
    addingLocalbody,
    addLocalbodyResponse,
    deleteLocalbodyResponse,
    updateLocalbodyResponse,
    error,
  } = useSelector((state) => state.localbodies);

  

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLocalbodies());
    
  }, []);

  

  useEffect(() => {
    if (addLocalbodyResponse.type === "success") {
      toastr.success(addLocalbodyResponse.message);
      setSelectedPrivilage({});
      setSelectedCompany(null);
      setSelectedBranch(null);
    } else if (addLocalbodyResponse.type === "failure") {
      toastr.error(error.data.message, addLocalbodyResponse.message);
    }
  }, [addLocalbodyResponse]);

  useEffect(() => {
    if (deleteLocalbodyResponse.type === "success") {
      toastr.success(deleteLocalbodyResponse.message);
      setLocalbodyIdToBeDeleted(null);
    } else if (deleteLocalbodyResponse.type === "failure") {
      toastr.error(error.data.message, deleteLocalbodyResponse.message);
    }
  }, [deleteLocalbodyResponse]);

  useEffect(() => {
    if (updateLocalbodyResponse.type === "success") {
      setShowModal(false);
      setLocalbodyIdToBeUpdated(null);
      setPasswordObject({});
      toastr.success(updateLocalbodyResponse.message);
    } else if (updateLocalbodyResponse.type === "failure") {
      toastr.error(error.data.message, updateLocalbodyResponse.message);
    }
  }, [updateLocalbodyResponse]);

  let preUpdateLocalbody = (item) => {
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

    setLocalbodyIdToBeUpdated(item._id);
    setLocalbodyObject({ ...item, password: null });
  };

  let preUpdateLocalbodyPassword = (item) => {
    setLocalbodyIdToBeUpdated(item._id);
    setShowModal(true);
  };

  useEffect(() => {
    let localbodyData = [];

    localbodies.map((item, index) => {
      item.action = (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
         
          <i
            className="uil-edit-alt"
            style={{
              fontSize: "1.3em",
              cursor: "pointer",
              marginLeft: "1rem",
              marginRight: "1rem",
            }}
            onClick={() => {
              preUpdateLocalbody(item);
            }}
          ></i>
          <i
            className="uil-trash-alt"
            style={{ fontSize: "1.3em", cursor: "pointer" }}
            onClick={() => {
              setLocalbodyIdToBeDeleted(item._id);
              setConfirmDeleteAlert(true);
            }}
          ></i>
        </div>
      );
      item.id = index + 1;
      localbodyData.push(item);
    });
    setLocalbodiesForTable(localbodyData);
  }, [localbodies]);

  const data = {
    columns: [
      {
        label: "#",
        field: "id",
        sort: "asc",
        width: 150,
      },
      {
        label: "Localbody Name",
        field: "localbody_name",
        sort: "asc",
        width: 400,
      },
      {
        label: "Action",
        field: "action",
        width: 300,
      },
    ],
    rows: localbodysForTable,
  };



  function handleChangeLocalbody(e) {
    let name = e.target.name;
    let value = e.target.value;
    setLocalbodyObject({ ...localbodyObject, [name]: value });
  }

  function handleSelectedPrivilage(value) {
    let newValue = {
      name: value.label,
      _id: value.value,
    };
    setSelectedPrivilage(value);
    setLocalbodyObject({ ...localbodyObject, privilage: newValue });
  }

  function handleSelectedCompany(value) {
    let newValue = {
      name: value.label,
      _id: value.value,
    };
    setSelectedCompany(value);
    setLocalbodyObject({ ...localbodyObject, company: newValue });
  }
  function handleSelectedBranch(value) {
    let newValue = {
      name: value.label,
      _id: value.value,
    };
    setSelectedBranch(value);
    setLocalbodyObject({ ...localbodyObject, branch: newValue });
  }

  function handleChangePassword(e) {
    let name = e.target.name;
    let value = e.target.value;
    setPasswordObject({ ...passwordObject, [name]: value });
  }

  const handleValidSubmit = (event, values) => {
    localbodyIdTobeUpdated
      ? dispatch(updateLocalbody(localbodyObject))
      : dispatch(addLocalbody(localbodyObject));
  };

  const handleValidSubmitPassword = (event, values) => {
    if (passwordObject.password == passwordObject.confirmPassword) {
      let item = {
        _id: localbodyIdTobeUpdated,
        password: passwordObject.password,
      };
      dispatch(updateLocalbody(item));
    } else {
      toastr.error("Passwords are not matching");
    }
  };

  let closeModal = () => {
    setShowModal(false);
    setLocalbodyIdToBeUpdated(null);
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
            dispatch(deleteLocalbody(localbodyIdToBeDeleted));
            setConfirmDeleteAlert(false);
          }}
          onCancel={() => setConfirmDeleteAlert(false)}
        >
          Are you sure you want to delete it?
        </SweetAlert>
      ) : null}

      
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs title="Home" breadcrumbItem="Manage Localbody" />
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
                          <Label htmlFor="validationCustom01">Localbody Name</Label>
                          <AvField
                            name="localbody_name"
                            placeholder="localbody name"
                            type="text"
                            errorMessage="Enter localbody Name"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom01"
                            value={localbodyObject.localbody_name}
                            onChange={handleChangeLocalbody}
                          />
                        </div>
                      </Col>
                     
                     <Col>
                     <div className="mb-3">
                     {localbodyIdTobeUpdated ? (
                      <Button
                        color="primary"
                        type="submit"
                        disabled={addingLocalbody ? true : false}
                      >
                        {addingLocalbody ? "Updating" : "Update"}
                      </Button>
                    ) : (
                      <Button
                        color="primary"
                        type="submit"
                        disabled={addingLocalbody ? true : false}
                      >
                        {addingLocalbody ? "Adding" : "Submit"}
                      </Button>
                    )}
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

export default withRouter(connect(mapStateToProps, { apiError })(Localbodies));

Localbodies.propTypes = {
  error: PropTypes.any,
  localbodys: PropTypes.array,
};
