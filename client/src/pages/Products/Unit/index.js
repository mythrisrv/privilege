import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import toastr from "toastr";
 
import SweetAlert from "react-bootstrap-sweetalert";
import { MDBDataTable } from "mdbreact";
import {
  Row,
  Col, 
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Label,
  Modal,
} from "reactstrap";

import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";

import {
  getUnits,
  addUnit,
  deleteUnit,
  apiError,
  updateUnit,
} from "../../../store/actions";

// Redux
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { AvForm, AvField } from "availity-reactstrap-validation";

//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import "./unit.scss";




const Units = (props) => {
//   const [selectedunitpremium, setSelectedUnitPremium] = useState(null);
  
  const [unitObject, setUnitObject] = useState({});
  const [unitsTemp, setUnitsTemp] = useState([]);

  const [unitIdTobeUpdated, setUnitIdToBeUpdated] = useState(null);
  const [unitIdToBeDeleted, setUnitIdToBeDeleted] = useState(null);
  const [confirmDeleteAlert, setConfirmDeleteAlert] = useState(null);
  const [showModal, setShowModal] = useState(false);
 



  
  const {
    units,
    addingUnit,
    addUnitResponse,
    deleteUnitResponse,
    updateUnitResponse,
    error,
  } = useSelector((state) => state.units);


  const dispatch = useDispatch();

  
  
  useEffect(() => {
    dispatch(getUnits());
    // dispatch(getPrivilagesOptions());
    // dispatch(getCompaniesOptions());
  }, []);
  // useEffect(() => {
  //   if (selectedunitpremium !== null) {
  //     dispatch(selectedunitpremium.value);
  //   }
  // }, [selectedunitpremium]);

  useEffect(() => {
    if (addUnitResponse.type === "success") {
      toastr.success(addUnitResponse.message);
    } else if (addUnitResponse.type === "failure") {
      toastr.error(error.data.message, addUnitResponse.message);
    }
  }, [addUnitResponse]);

  useEffect(() => {
    if (deleteUnitResponse.type === "success") {
      toastr.success(deleteUnitResponse.message);
    } else if (deleteUnitResponse.type === "failure") {
      toastr.error(error.data.message, deleteUnitResponse.message);
    }
  }, [deleteUnitResponse]);

  useEffect(() => {
    if (updateUnitResponse.type === "success") {
      setShowModal(false);
      setUnitIdToBeUpdated(null);
      // setPasswordObject({});
      setUnitIdToBeUpdated(null);
      toastr.success(updateUnitResponse.message);
    } else if (updateUnitResponse.type === "failure") {
      toastr.error(error.data.message, updateUnitResponse.message);
    }
  }, [updateUnitResponse]);

  let preUpdateUnit = (item) => {

     
  
    setUnitIdToBeUpdated(item._id);
    setUnitObject(item);
  };


  useEffect(() => {
    let unitsDuplicate = JSON.parse(JSON.stringify(units));
    let unitData = [];
    unitsDuplicate.map((item, index) => {
      item.action = (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
        {/* //   <i
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
              preUpdateUnit(item);
            }}
          ></i>
          <i
            className="uil-trash-alt"
            style={{ fontSize: "1.3em", cursor: "pointer" }}
            onClick={() => {
              setUnitIdToBeDeleted(item._id);
              setConfirmDeleteAlert(true);
            }}
          ></i>
        </div>
      );
      item.id = index + 1;
      
      unitData.push(item);
    }); 
    setUnitsTemp(unitData);
     
 
  }, [units]);




  const data = {
    columns: [
      {
        label: "#",
        field: "id",
        sort: "asc",
        width: 10,
      },
     
      {
        label: "Default Unit",
        field: "default_unit",
        sort: "asc",
        width: 70,
      },
      {
        label: "Sub Unit",
        field: "product_sub_unit",
        sort: "asc",
        width: 70,
      },
      {
        label: "Sub Unit value",
        field: "sub_unit_value",
        sort: "asc",
        width: 70,
      },
      
     
      {
        label: "Added by",
        field: "added_by",
        sort: "asc",
        width: 100,
      },
      {
        label: "Status",
        field: "status",
        sort: "asc",
        width: 100,
      },
      
      {
        label: "Action",
        field: "action",
        sort: "asc",
        width: 100,
      },
    ],
    rows: unitsTemp,
      
     
    
  };

  let handleChangeInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUnitObject({
      ...unitObject, 
      [name]:value
    })
  }
  const handleValidSubmitUnit = (event, values) => { 
    console.log(unitObject, "BO")
    unitIdTobeUpdated
      ? dispatch(updateUnit(unitObject))
      : dispatch(addUnit(unitObject));

  };

//   let handleChangeImageUpload =(event) => {
// setUnitObject({...unitObject, unitlogo:event.target.files[0]})
//   } 

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
            dispatch(deleteUnit(unitIdToBeDeleted));
            setConfirmDeleteAlert(false);
          }}
          onCancel={() => setConfirmDeleteAlert(false)}
        >
          Are you sure you want to delete it?
        </SweetAlert>
      ) : null}
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs title="Home" breadcrumbItem="Units" />
          <Row>
            <Col xl="12">
              <Card>
                <CardBody>
                  <AvForm className="needs-validation" 
                       onValidSubmit={(e, v) => {
                        handleValidSubmitUnit(e, v);
                      }}
                  >
                    <Row>
                      <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom01">Defaul Unit</Label>
                          <AvField
                            name="default_unit"
                            value ={unitObject.default_unit}
                            placeholder="Default unit"
                            type="text"
                            errorMessage="Enter Default unit"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom01"
                            onChange ={handleChangeInput}
                          />
                        </div>
                      </Col>
                       
                      <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom02">Sub Unit</Label>
                          <AvField
                            name="product_sub_unit"
                            value ={unitObject.product_sub_unit }
                            placeholder="Sub unit"
                            type="text"
                            errorMessage="Enter Sub Unit"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom02"
                            onChange ={handleChangeInput}
                          />
                        </div>
                      </Col>

                      
                      <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom03">Sub Unit value</Label>
                          <AvField
                            name="sub_unit_value"
                            value ={unitObject.sub_unit_value }

                            placeholder="Sub unit value"
                            type="text"
                            errorMessage="Enter sub unit value"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom03"
                            onChange ={handleChangeInput}

                          />
                        </div>
                      </Col>
                    
                   
                      </Row>
                     
                   
                   {unitIdTobeUpdated ? (
                      <Button
                        color="primary"
                        type="submit"
                        disabled={addingUnit ? true : false}
                      >
                        {addingUnit ? "Updating" : "Update"}
                      </Button>
                    ) : (
                      <Button
                        color="primary"
                        type="submit"
                        disabled={addingUnit ? true : false}
                      >
                        {addingUnit ? "Adding" : "Submit"}
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
                  <MDBDataTable responsive bordered data={data} />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </React.Fragment>
  );
};


const mapStateToProps = (state) => {
  // const { error } = state.Users;
  // return { error };
};

export default withRouter(connect(mapStateToProps, { apiError })(Units));

Units.propTypes = {
  error: PropTypes.any,
  units: PropTypes.array,
};

