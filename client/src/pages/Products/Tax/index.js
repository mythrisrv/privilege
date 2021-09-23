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
  getTaxes,
  addTax,
  deleteTax,
  apiError,
  updateTax,
} from "../../../store/actions";

// Redux
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { AvForm, AvField } from "availity-reactstrap-validation";

//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import "./tax.scss";




const Taxes = (props) => {
//   const [selectedtaxpremium, setSelectedTaxPremium] = useState(null);
  
  const [taxObject, setTaxObject] = useState({});
  const [taxesTemp, setTaxesTemp] = useState([]);

  const [taxIdTobeUpdated, setTaxIdToBeUpdated] = useState(null);
  const [taxIdToBeDeleted, setTaxIdToBeDeleted] = useState(null);
  const [confirmDeleteAlert, setConfirmDeleteAlert] = useState(null);
  const [showModal, setShowModal] = useState(false);
 



  
  const {
    taxes,
    addingTax,
    addTaxResponse,
    deleteTaxResponse,
    updateTaxResponse,
    error,
  } = useSelector((state) => state.taxes);


  const dispatch = useDispatch();

  
  
  useEffect(() => {
    dispatch(getTaxes()); 
    
    // dispatch(getPrivilagesOptions());
    // dispatch(getCompaniesOptions());
  }, []);
  // useEffect(() => {
  //   if (selectedtaxpremium !== null) {
  //     dispatch(selectedtaxpremium.value);
  //   }
  // }, [selectedtaxpremium]);

  useEffect(() => {
    if (addTaxResponse.type === "success") {
      toastr.success(addTaxResponse.message);
    } else if (addTaxResponse.type === "failure") {
      toastr.error(error.data.message, addTaxResponse.message);
    }
  }, [addTaxResponse]);

  useEffect(() => {
    if (deleteTaxResponse.type === "success") {
      toastr.success(deleteTaxResponse.message);
    } else if (deleteTaxResponse.type === "failure") {
      toastr.error(error.data.message, deleteTaxResponse.message);
    }
  }, [deleteTaxResponse]);

  useEffect(() => {
    if (updateTaxResponse.type === "success") {
      setShowModal(false);
      setTaxIdToBeUpdated(null);
      // setPasswordObject({});
      setTaxIdToBeUpdated(null);
      toastr.success(updateTaxResponse.message);
    } else if (updateTaxResponse.type === "failure") {
      toastr.error(error.data.message, updateTaxResponse.message);
    }
  }, [updateTaxResponse]);

  let preUpdateTax = (item) => {

     
  
    setTaxIdToBeUpdated(item._id);
    setTaxObject(item);
  };


  useEffect(() => {
    let taxesDuplicate = JSON.parse(JSON.stringify(taxes));
    let taxData = [];
    taxesDuplicate.map((item, index) => {
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
              preUpdateTax(item);
            }}
          ></i>
          <i
            className="uil-trash-alt"
            style={{ fontSize: "1.3em", cursor: "pointer" }}
            onClick={() => {
              setTaxIdToBeDeleted(item._id);
              setConfirmDeleteAlert(true);
            }}
          ></i>
        </div>
      );
      item.id = index + 1;
      
      taxData.push(item);
    }); 
    setTaxesTemp(taxData);
     
 
  }, [taxes]);




  const data = {
    columns: [
      {
        label: "#",
        field: "id",
        sort: "asc",
        width: 10,
      },
     
      {
        label: "Tax Type",
        field: "tax_slab_type",
        sort: "asc",
        width: 70,
      },
      {
        label: "Tax Name",
        field: "tax_slab_name",
        sort: "asc",
        width: 70,
      },
      {
        label: "Tax Percentage",
        field: "tax_slab_percentage",
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
    rows: taxesTemp,
      
     
    
  };

  let handleChangeInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setTaxObject({
      ...taxObject, 
      [name]:value
    })
  }
  const handleValidSubmitTax = (event, values) => { 
    console.log(taxObject, "BO")
    taxIdTobeUpdated
      ? dispatch(updateTax(taxObject))
      : dispatch(addTax(taxObject));

  };

//   let handleChangeImageUpload =(event) => {
// setTaxObject({...taxObject, taxlogo:event.target.files[0]})
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
            dispatch(deleteTax(taxIdToBeDeleted));
            setConfirmDeleteAlert(false);
          }}
          onCancel={() => setConfirmDeleteAlert(false)}
        >
          Are you sure you want to delete it?
        </SweetAlert>
      ) : null}
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs title="Home" breadcrumbItem="Taxes" />
          <Row>
            <Col xl="12">
              <Card>
                <CardBody>
                  <AvForm className="needs-validation" 
                       onValidSubmit={(e, v) => {
                        handleValidSubmitTax(e, v);
                      }}
                  >
                    <Row>
                      <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom01">Tax Type</Label>
                          <AvField
                            name="tax_slab_type"
                            value ={taxObject.tax_slab_type}
                            placeholder="Tax type"
                            type="text"
                            errorMessage="Enter Tax TYPE"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom01"
                            onChange ={handleChangeInput}
                          />
                        </div>
                      </Col>
                       
                      <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom02">Tax Name</Label>
                          <AvField
                            name="tax_slab_name"
                            value ={taxObject.tax_slab_name }
                            placeholder="Tax Name"
                            type="text"
                            errorMessage="Enter Tax Name"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom02"
                            onChange ={handleChangeInput}
                          />
                        </div>
                      </Col>

                      
                      <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom03">Tax Percentage</Label>
                          <AvField
                            name="tax_slab_percentage"
                            value ={taxObject.tax_slab_percentage }

                            placeholder="Tax Percentage"
                            type="text"
                            errorMessage="Enter Tax percentage"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom03"
                            onChange ={handleChangeInput}

                          />
                        </div>
                      </Col>
                    
                   
                      </Row>
                     
                   
                   {taxIdTobeUpdated ? (
                      <Button
                        color="primary"
                        type="submit"
                        disabled={addingTax ? true : false}
                      >
                        {addingTax ? "Updating" : "Update"}
                      </Button>
                    ) : (
                      <Button
                        color="primary"
                        type="submit"
                        disabled={addingTax ? true : false}
                      >
                        {addingTax ? "Adding" : "Submit"}
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

export default withRouter(connect(mapStateToProps, { apiError })(Taxes));

Taxes.propTypes = {
  error: PropTypes.any,
  taxes: PropTypes.array,
};

