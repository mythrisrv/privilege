import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { MDBDataTable } from "mdbreact";
import toastr, { options } from "toastr";
import { Row, Col, Card, CardBody, Button, Label, Modal,FormGroup,Input, FormText } from "reactstrap";
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
  getLocalbodies,
  getLocalbodiesSuccess,
  updateWard,
  getLocalbody,
  getDistrict,
  getLocalbodySuccess,
  getLocalbodyOptions,
  
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
  //const [localbodyOptions,setlocalbodyOptions]=useState([])
  const [wardname,setWardname]=useState("")
  const[localbodyname,setLocalbodyname]=useState({})
  const[wardshortcode,setwardShortcode]=useState("")
  const[wardno,setwardno]=useState({})
  const [values, setValues] = useState({})
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

  const {localbodyOptions,localbody}=useSelector((state)=>state.localbodies)
  const wardnumbers=()=>{
    
    const options=[]
   
    for(let i=1;i<=100;i++){
     options.push({label:i,value:i})
    }
  return options
  }
  

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWards());
    dispatch(getLocalbodyOptions())
    
  }, []);

  

  useEffect(() => {
    if (addWardResponse.type === "success") {
      dispatch(getWards())
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
      dispatch(getWards())
      toastr.success(deleteWardResponse.message);
      setWardIdToBeDeleted(null);
    } else if (deleteWardResponse.type === "failure") {
      toastr.error(error.data.message, deleteWardResponse.message);
    }
  }, [deleteWardResponse]);

  useEffect(() => {
    if (updateWardResponse.type === "success") {
      dispatch(getWards())
      setShowModal(false);
      setWardIdToBeUpdated(null);
      setPasswordObject({});
      toastr.success(updateWardResponse.message);
    } else if (updateWardResponse.type === "failure") {
      toastr.error(error.data.message, updateWardResponse.message);
    }
  }, [updateWardResponse]);

  let preUpdateWard = (item) => {
   
     console.log(item)
     if(item.localbody_name_id){
       let localbody={
         label:item.localbody_name_id.localbody_name,
         value:item.localbody_name_id._id
       }
       handelChangeLocalbody(localbody)

     }
     if(item.ward_no){
       let wardno={
         label:item.ward_no,
         value:item.ward_no
       }
       handleChangeWardno(wardno)
     }
     if(item.ward_name){
       let ward=item.ward_name.split("/")
       setWardname(ward[1])
     }

setwardShortcode(item.ward_name)
    
     // handleSelectedlocalbodyname(localbodyname);
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
            className="uil-edit-alt"
            style={{
              fontSize: "1.3em",
              cursor: "pointer",
              marginLeft: "1rem",
              marginRight: "1rem",
            }}
            onClick={() => {
             console.log(item)
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
      if(item.localbody_name_id!=null)
      item.localbody_name=item.localbody_name_id.localbody_name;
      if(item.ward_addedby)
      item.wardaddedby=item.ward_addedby.username;
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
        label: "Date",
        field: "ward_date",
        sort: "asc",
        width: 150,
      },
      {
        label: "Time",
        field: "ward_time",
        sort: "asc",
        width: 150,
      },
      {
        label: "Localbody ",
        field: "localbody_name",
        sort: "asc",
        width: 400,
      },
      {
        label: "ward Number",
        field: "ward_no",
        sort: "asc",
        width: 400,
      },
      {
        label: "ward Name",
        field: "ward_name",
        sort: "asc",
        width: 400,
      },
      {
        label: "Staff",
        field: "wardaddedby",
        sort: "asc",
        width: 150,
      },
      {
        label: "Action",
        field: "action",
        width: 300,
      },
    ],
    rows: wardsForTable,
  };

function createwardname(){
  setwardShortcode("hai")
  return wardshortcode
}

  function handleChangeWard(e) {
    let name = e.target.name;
    let value = e.target.value;
    setWardname(value)
  
 let shortname=`${localbody.short_code}${wardno.value}/${value}`

   setwardShortcode(shortname)
  
    setWardObject({ ...wardObject, ward_name:shortname});
    
   
    
  }
  
  function handleChangeWardname(e){
    console.log(e.target.value)

  }
  function handleChangeWardno(value) {
    let newValue = {
      name: value.label,
       _id: value.value,
     };
    setwardno(value)
 
   
    setWardObject({ ...wardObject, wardno: newValue });
   // setValues({ ...values, [name]: value })
   // console.log(values)
  }
  function handelChangeLocalbody(values){
   dispatch(getLocalbody(values.value))
   
    let newValue = {
      name: values.label,
       _id: values.value,
     };
    
    setLocalbodyname(values)

    
 // console.log(localbody.localbody)
    setWardObject({ ...wardObject, localbody: newValue });
   
    }
    
  

  function handleSelectedlocalbodyname(value) {
    let newValue = {
      name: value.label,
      _id: value.value,
    };
    setLocalbodyname(value);
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
      name: value.value,
     
    };
    setSelectedBranch(value);
    setWardObject({ ...wardObject, localbody_name: newValue });
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
      setLocalbodyname({});
      setwardno({});
      setWardname("");
      setwardShortcode("")
      
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
                        <Label>Localbody</Label>
                          <Select
                            name="localbody_name"
                           value={localbodyname}
                            options={localbodyOptions?.map((localbodies)=>{
                                return{
                                label:localbodies.localbody_name,
                                value:localbodies._id,
                                key:localbodies._id,
                                }
                              })
                              }
                            classNamePrefix="select2-selection"
                            onChange={handelChangeLocalbody}
                              
                            
                          />
                        </div>
                      </Col>
                    
                       
                       
                      <Col md="3">
                        <div className="mb-3">
                         
                        <Label>Ward Number</Label>
                          <Select
                            name="localbody_name"
                           value={wardno}
                            options={wardnumbers()}
                            classNamePrefix="select2-selection"
                            onChange={
                              handleChangeWardno
                              
                            }
                              
                            
                          />
                        </div>
                      </Col>
                     

                      <Col md="3">
                        <div className="mb-3">
                         <Label>Ward Name</Label>
                          <AvField
                            name="wardname"
                            placeholder=" Ward name"
                            type="text"
                            errorMessage="Enter ward Name"
                            className="form-control"
                            //validate={{ required: { value: true } }}
                            id="validationCustom01"
                            value={wardname}
                            onChange={handleChangeWard}
                                                     
                          />
                              </div>

                      </Col>
                      <Col md="3">
                        <div className="mb-3" style={{paddingTop:"30px"}} >
                        <div className="col-md-10">
                          <AvField
                            name="ward_name"
                            placeholder=" Ward name"
                            type="text"
                            errorMessage="Enter ward Name"
                            className="form-control"
                            //validate={{ required: { value: true } }}
                            id="validationCustom01"
                            value={wardshortcode}
                            onChange={handleChangeWardname}
                            
                          />
                          </div>
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

export default withRouter(connect(mapStateToProps, { apiError })(Wards));

Wards.propTypes = {
  error: PropTypes.any,
  wards: PropTypes.array,
};
