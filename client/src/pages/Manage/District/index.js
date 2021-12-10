import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { MDBDataTable, } from "mdbreact";
import toastr from "toastr";
import { Row, Col, Card, CardBody, Button, Label, Modal } from "reactstrap";
import SweetAlert from "react-bootstrap-sweetalert";
import Select from "react-select";
import {
  getDistricts,
  addDistrict,
  deleteDistrict,
  apiError,
  getPrivilagesOptions,
  getCompaniesOptions,
  getBranchesOptions,
  updateDistrict,
} from "../../../store/actions";

// Redux
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { AvForm, AvField } from "availity-reactstrap-validation";

//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb";
//import "./district.scss";

const Districts = (props) => {
  const [selectedPrivilage, setSelectedPrivilage] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [districtObject, setDistrictObject] = useState({});
  const [districtIdTobeUpdated, setDistrictIdToBeUpdated] = useState(null);
  const [districtIdToBeDeleted, setDistrictIdToBeDeleted] = useState(null);
  const [confirmDeleteAlert, setConfirmDeleteAlert] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [districtsForTable, setDistrictsForTable] = useState([]);
const[districtValue,setdistrictValue]=useState("")
  const [passwordObject, setPasswordObject] = useState({
    oldPassword: "",
    password: "",
    confirmPassword: "",
  });

  const {
    districts,
    addingDistrict,
    addDistrictResponse,
    deleteDistrictResponse,
    updateDistrictResponse,
    error,
  } = useSelector((state) => state.districts);

  

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDistricts());
    
  }, []);

  

 useEffect(()=>{
    if (addDistrictResponse.type === "success") {
      dispatch(getDistricts())
      toastr.success(addDistrictResponse.message);
      setSelectedPrivilage({});
      setSelectedCompany(null);
      setSelectedBranch(null);
    
 
     
    } else if (addDistrictResponse.type === "failure") {
      toastr.error(error.data.message, addDistrictResponse.message);
    }
  },[addDistrictResponse])
  

  useEffect(() => {
    if (deleteDistrictResponse.type === "success") {
      dispatch(getDistricts())
      setDistrictIdToBeDeleted(null);
      toastr.success(deleteDistrictResponse.message);
      
    } else if (deleteDistrictResponse.type === "failure") {
      toastr.error(error.data.message, deleteDistrictResponse.message,{timeOut:2000,preventDuplicates:true});
    }
  }, [deleteDistrictResponse]);

  useEffect(() => {
    if (updateDistrictResponse.type === "success") {
      dispatch(getDistricts())
      setShowModal(false);
      setDistrictIdToBeUpdated(null);
      setPasswordObject({});
      toastr.success(updateDistrictResponse.message);
    } else if (updateDistrictResponse.type === "failure") {
      toastr.error(error.data.message, updateDistrictResponse.message);
    }
  }, [updateDistrictResponse]);

  let preUpdateDistrict = (item) => {
    console.log(item)
    if (item.district_name) {
     setdistrictValue(item.district_name)
     console.log(districtValue)
    }
    setDistrictIdToBeUpdated(item._id);
    setDistrictObject({ ...item, password: null });
  };

  let preUpdateDistrictPassword = (item) => {
    setDistrictIdToBeUpdated(item._id);
    setShowModal(true);
  };

  useEffect(() => {
    let districtData = [];

    districts?.map((item, index) => {
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
              preUpdateDistrict(item);
            }}
          ></i>
          <i
            className="uil-trash-alt"
            style={{ fontSize: "1.3em", cursor: "pointer" }}
            onClick={() => {
              setDistrictIdToBeDeleted(item._id);
              setConfirmDeleteAlert(true);
            }}
          ></i>
        </div>
      );
      item.id = index + 1;
      item.state_name="Kerala";
      if(item.district_addedby!=null)
      item.district_addedby=item.district_addedby.username;
      districtData.push(item);
    });
    
   /* districtData.sort(function(a, b) {
      var keyA =new Date(a.createdAt),
        keyB = new Date(b.createdAt);
      // Compare the 2 dates
      if (keyB < keyA) return -1;
      if (keyB > keyA) return 1;
      return 0;
    })*/
    
    setDistrictsForTable(districtData);
    
  }, [districts]);

 
  const data = {
    columns: [
      {
        label: "#",
        field: "id",
        //sort: "desc",
        width: 150,
      },
      {
        label: "Date",
        field: "district_date",
        //sort: "desc",
        width: 150,
      },
      {
        label: "Time",
        field: "district_time",
        //sort: "desc",
        width: 150,
      },
      {
        label: "State",
        field: "state_name",
        //sort: "desc",
        width: 150,
      },
      {
        label: "Name",
        field: "district_name",
        sort: "desc",
        width: 400,
      },
      {
        label: "Staff",
        field: "district_addedby",
        sort: "desc",
        width: 400,
      },
      {
        label: "Action",
        field: "action",
        width: 300,
      },
    ],
    rows: districtsForTable,
  };
 


  function handleChangeDistrict(e) {
    let name = e.target.name;
    let value = e.target.value;
    setdistrictValue(value)
    setDistrictObject({ ...districtObject, [name]: value });
    
  }

  function handleSelectedPrivilage(value) {
    let newValue = {
      name: value.label,
      _id: value.value,
    };
    setSelectedPrivilage(value);
    setDistrictObject({ ...districtObject, privilage: newValue });
  }

  function handleSelectedCompany(value) {
    let newValue = {
      name: value.label,
      _id: value.value,
    };
    setSelectedCompany(value);
    setDistrictObject({ ...districtObject, company: newValue });
  }
  function handleSelectedBranch(value) {
    let newValue = {
      name: value.label,
      _id: value.value,
    };
    setSelectedBranch(value);
    setDistrictObject({ ...districtObject, branch: newValue });
    
  }

  function handleChangePassword(e) {
    let name = e.target.name;
    let value = e.target.value;
    setPasswordObject({ ...passwordObject, [name]: value });
  }

  const handleValidSubmit = (event, values) => {
    districtIdTobeUpdated
      ? dispatch(updateDistrict(districtObject))
      : dispatch(addDistrict(districtObject));
      setdistrictValue("")
     
  };

  const handleValidSubmitPassword = (event, values) => {
    if (passwordObject.password == passwordObject.confirmPassword) {
      let item = {
        _id: districtIdTobeUpdated,
        password: passwordObject.password,
      };
      dispatch(updateDistrict(item));
    } else {
      toastr.error("Passwords are not matching");
    }
  };

  let closeModal = () => {
    setShowModal(false);
    setDistrictIdToBeUpdated(null);
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
            dispatch(deleteDistrict(districtIdToBeDeleted));
            setConfirmDeleteAlert(false);
          }}
          onCancel={() => setConfirmDeleteAlert(false)}
        >
          Are you sure you want to delete it?
        </SweetAlert>
      ) : null}

      
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs title="Home" breadcrumbItem="Manage District" />
          <Row>
            <Col xl="12">
              <Card>
                <CardBody>
                  <AvForm
                    className="needs-validation"
                    onValidSubmit={(e, v) => {
                     
                      handleValidSubmit(e, v)
                   
                    }}
                  >
                    <Row>
                      <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom01">District</Label>
                          <AvField
                            name="district_name"
                            placeholder="District name"
                            type="text"
                            errorMessage="Enter District Name"
                            className="form-control"
                           
                            id="validationCustom01"
                            value={districtValue}
                            onChange={handleChangeDistrict}
                            
                          />
                       </div>
                      </Col>
                    
                     <Col>
                     <div className="mb-3" style={{paddingTop:"30px"}}>
                     {districtIdTobeUpdated ? (
                      <Button
                        color="primary"
                        type="submit"
                        disabled={addingDistrict ? true : false}
                       
                      >
                        {addingDistrict ? "Updating" : "Update"}
                      </Button>
                    ) : (
                      <Button
                        color="primary"
                        type="submit"
                        disabled={addingDistrict ? true : false}
                       >
                        {addingDistrict ? "Adding" : "Submit"}
                        
                      </Button>
                      
                    )
                    }
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

export default withRouter(connect(mapStateToProps, { apiError })(Districts));

Districts.propTypes = {
  error: PropTypes.any,
  districts: PropTypes.array,
};
