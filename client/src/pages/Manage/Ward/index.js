import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { MDBDataTable } from "mdbreact";
import toastr from "toastr";
import { Row, Col, Card, CardBody, Button, Label, Modal } from "reactstrap";
import SweetAlert from "react-bootstrap-sweetalert";
import Select from "react-select";
import {
  getWards,
  addWard,
  deleteWard,
  apiError,
  getPrivilagesOptions,
  getCompaniesOptions,
  getBranchesOptions,
  updateWard,
} from "../../../store/actions";

// Redux
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { AvForm, AvField } from "availity-reactstrap-validation";

//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb";
//import "./district.scss";

const Wards = (props) => {
  const [selectedPrivilage, setSelectedPrivilage] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [wardObject, setWardObject] = useState({});
  const [wardIdTobeUpdated, setWardIdToBeUpdated] = useState(null);
  const [wardIdToBeDeleted, setWardIdToBeDeleted] = useState(null);
  const [confirmDeleteAlert, setConfirmDeleteAlert] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [wardsForTable, setWardsForTable] = useState([]);

  const [passwordObject, setPasswordObject] = useState({
    oldPassword: "",
    password: "",
    confirmPassword: "",
  });

  const {
    wards,
    addingWard,
    addWardResponse,
    deleteWardResponse,
    updateWardResponse,
    error,
  } = useSelector((state) => state.wards);

  

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWards());
    
  }, []);

  

  useEffect(() => {
    if (addWardResponse.type === "success") {
      toastr.success(addWardResponse.message);
      setSelectedPrivilage({});
      setSelectedCompany(null);
      setSelectedBranch(null);
    } else if (addWardResponse.type === "failure") {
      toastr.error(error.data.message, addWardResponse.message);
    }
  }, [addWardResponse]);

  useEffect(() => {
    if (deleteWardResponse.type === "success") {
      toastr.success(deleteWardResponse.message);
      setWardIdToBeDeleted(null);
    } else if (deleteWardResponse.type === "failure") {
      toastr.error(error.data.message, deleteWardResponse.message);
    }
  }, [deleteWardResponse]);

  useEffect(() => {
    if (updateWardResponse.type === "success") {
      setShowModal(false);
      setWardIdToBeUpdated(null);
      setPasswordObject({});
      toastr.success(updateWardResponse.message);
    } else if (updateWardResponse.type === "failure") {
      toastr.error(error.data.message, updateWardResponse.message);
    }
  }, [updateWardResponse]);

  let preUpdateWard = (item) => {
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

    setWardIdToBeUpdated(item._id);
    setWardObject({ ...item, password: null });
  };

  let preUpdateWardPassword = (item) => {
    setWardIdToBeUpdated(item._id);
    setShowModal(true);
  };

  useEffect(() => {
    let wardData = [];

    wards.map((item, index) => {
      item.action = (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <i
            className="uil-key-skeleton"
            style={{ fontSize: "1.3em", cursor: "pointer" }}
            onClick={() => {
              preUpdateWardPassword(item);
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
              preUpdateWard(item);
            }}
          ></i>
          <i
            className="uil-trash-alt"
            style={{ fontSize: "1.3em", cursor: "pointer" }}
            onClick={() => {
              setWardIdToBeDeleted(item._id);
              setConfirmDeleteAlert(true);
            }}
          ></i>
        </div>
      );
      item.id = index + 1;
      wardData.push(item);
    });
    setWardsForTable(wardData);
  }, [wards]);

  const data = {
    columns: [
      {
        label: "#",
        field: "id",
        sort: "asc",
        width: 150,
      },
      {
        label: "ward Name",
        field: "ward_name",
        sort: "asc",
        width: 400,
      },
      {
        label: "Action",
        field: "action",
        width: 300,
      },
    ],
    rows: wardsForTable,
  };



  function handleChangeWard(e) {
    let name = e.target.name;
    let value = e.target.value;
    setWardObject({ ...wardObject, [name]: value });
  }

  function handleSelectedPrivilage(value) {
    let newValue = {
      name: value.label,
      _id: value.value,
    };
    setSelectedPrivilage(value);
    setWardObject({ ...wardObject, privilage: newValue });
  }

  function handleSelectedCompany(value) {
    let newValue = {
      name: value.label,
      _id: value.value,
    };
    setSelectedCompany(value);
    setWardObject({ ...wardObject, company: newValue });
  }
  function handleSelectedBranch(value) {
    let newValue = {
      name: value.label,
      _id: value.value,
    };
    setSelectedBranch(value);
    setWardObject({ ...wardObject, branch: newValue });
  }

  function handleChangePassword(e) {
    let name = e.target.name;
    let value = e.target.value;
    setPasswordObject({ ...passwordObject, [name]: value });
  }

  const handleValidSubmit = (event, values) => {
    wardIdTobeUpdated
      ? dispatch(updateWard(wardObject))
      : dispatch(addWard(wardObject));
  };

  const handleValidSubmitPassword = (event, values) => {
    if (passwordObject.password == passwordObject.confirmPassword) {
      let item = {
        _id: wardIdTobeUpdated,
        password: passwordObject.password,
      };
      dispatch(updateWard(item));
    } else {
      toastr.error("Passwords are not matching");
    }
  };

  let closeModal = () => {
    setShowModal(false);
    setWardIdToBeUpdated(null);
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
            dispatch(deleteWard(wardIdToBeDeleted));
            setConfirmDeleteAlert(false);
          }}
          onCancel={() => setConfirmDeleteAlert(false)}
        >
          Are you sure you want to delete it?
        </SweetAlert>
      ) : null}

      
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs title="Home" breadcrumbItem="Manage Ward" />
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
                          <Label htmlFor="validationCustom01">Ward Name</Label>
                          <AvField
                            name="ward_name"
                            placeholder="Ward name"
                            type="text"
                            errorMessage="Enter ward Name"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom01"
                            value={wardObject.ward_name}
                            onChange={handleChangeWard}
                          />
                        </div>
                      </Col>
                     
                     <Col>
                     <div className="mb-3">
                     {wardIdTobeUpdated ? (
                      <Button
                        color="primary"
                        type="submit"
                        disabled={addingWard ? true : false}
                      >
                        {addingWard ? "Updating" : "Update"}
                      </Button>
                    ) : (
                      <Button
                        color="primary"
                        type="submit"
                        disabled={addingWard ? true : false}
                      >
                        {addingWard ? "Adding" : "Submit"}
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

export default withRouter(connect(mapStateToProps, { apiError })(Wards));

Wards.propTypes = {
  error: PropTypes.any,
  wards: PropTypes.array,
};