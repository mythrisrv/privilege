import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { MDBDataTable } from "mdbreact";
import toastr from "toastr";
import { Row, Col, Card, CardBody, Button, Label, Modal,FormGroup,Input } from "reactstrap";
import SweetAlert from "react-bootstrap-sweetalert";
import Select from "react-select";
import {
  getLocalbodies,
  addLocalbody,
  deleteLocalbody,
  apiError,
  getPrivilagesOptions,
  getCompaniesOptions,
  getCompaniesOptionsSuccess,
  getDistrictsSuccess,
  getBranchesOptions,
  getDistrictOptions,
  updateLocalbody,
  getLocalbodyTypes,
  formreset
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
const[companyOptions,setcompanyOptions]=useState([])
const[companyName,setCompanyname]=useState({});
const[districtname,setDistrictname]=useState({});
const[localbodytype,setlocalbodytype]=useState({});
const[localbodyname,setlocalbodyname]=useState("");
const[shortcode,setshortcode]=useState("");
//const [districtOptions,setdistrictOptions]=useState([])
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
    localbodyTypes,
  } = useSelector((state) => state.localbodies);

  const {companiesOptions,companyname}=useSelector((state)=>state.companies);
const {districtOptions}=useSelector((state)=>state.districts);
  const dispatch = useDispatch();
  
 

  
    useEffect(()=>{
    /* 
      if (localStorage.getItem('Company')) {
        var companydata = localStorage.getItem('Company');
        var company = JSON.parse(companydata)
        console.log(company)
        setSelectedCompany(company)
      }*/
     dispatch(getLocalbodies())

        dispatch(getCompaniesOptions());
        
        dispatch(getDistrictOptions());
        dispatch(getLocalbodyTypes())
        
       
      
    },[])
  

  useEffect(() => {
    if (addLocalbodyResponse.type === "success") {
      dispatch(getLocalbodies())
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
      dispatch(getLocalbodies())
      toastr.success(deleteLocalbodyResponse.message);
      setLocalbodyIdToBeDeleted(null);
    } else if (deleteLocalbodyResponse.type === "failure") {
      toastr.error(error.data.message, deleteLocalbodyResponse.message);
    }
  }, [deleteLocalbodyResponse]);

  useEffect(() => {
    if (updateLocalbodyResponse.type === "success") {
      dispatch(getLocalbodies())
      setShowModal(false);
      setLocalbodyIdToBeUpdated(null);
      setPasswordObject({});
      toastr.success(updateLocalbodyResponse.message);
    } else if (updateLocalbodyResponse.type === "failure") {
      toastr.error(error.data.message, updateLocalbodyResponse.message);
    }
  }, [updateLocalbodyResponse]);

  let preUpdateLocalbody = (item) => {
    console.log(item)
     if (item.localbody_company) {
            let company={
              label:item.localbody_company.company_name,
              value:item.localbody_company._id
            }
            handleChangeCompany(company)
          }
          if (item.dist_id) {
            let district = {
             label: item.dist_id.district_name,
             value: item.dist_id._id,
           };
         handleChangeDistrictName(district);
         }
    
    if(item.local_body_id){
      let type={
        label:item.local_body_id.localbody_type_name,
        value:item.local_body_id._id,
      }
      handleChangeLocalbodyType(type)
    }
   
    setlocalbodyname(item.localbody_name)
    setshortcode(item.short_code)
   

    setLocalbodyIdToBeUpdated(item._id);
    setLocalbodyObject({ ...item, password: null });
  };

  let preUpdateLocalbodyPassword = (item) => {
    setLocalbodyIdToBeUpdated(item._id);
    setShowModal(true);
  };
  //let preUpdateUser = (item) => {
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
      if(item.localbody_addedby!=null)
      {
        item.localbodyaddedby=item.localbody_addedby.username;
      }
      if(item.localbody_company!=null)
      {
        item.company_name=item.localbody_company.company_name;
      }
      if(item.dist_id!=null)
      {
        item.district_name=item.dist_id.district_name;
      }
      if(item.local_body_id)
      {
        item.localbody_type=item.local_body_id.localbody_type_name;
      }
      
      
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
        label: "Date ",
        field: "localbody_date",
        sort: "asc",
        width: 400,
      }, {
        label: "Time ",
        field: "localbody_time",
        sort: "asc",
        width: 400,
      },
      {
        label: "Company ",
        field: "company_name",
        sort: "asc",
        width: 400,
      },
      {
        label: "District ",
        field: "district_name",
        sort: "asc",
        width: 400,
      },

     
      {
        label: " Type",
        field: "localbody_type",
        sort: "asc",
        width: 400,
      },
      {
        label: " Name",
        field: "localbody_name",
        sort: "asc",
        width: 400,
      },
      {
        label: "Shortcode",
        field: "short_code",
        sort: "asc",
        width: 400,
      },
      {
        label: "Staff",
        field: "localbodyaddedby",
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



  function handleChangeLocalbodyname(e) {
    let name = e.target.name;
    let value = e.target.value;
   setlocalbodyname(value)
   setLocalbodyObject({ ...localbodyObject, [name]: value });
  }

  function handleChangeCompany(value){
    let newValue = {
      name: value.label,
       _id: value.value,
     };
   setCompanyname(value)
   setLocalbodyObject({ ...localbodyObject, company: newValue});
  }
  function handleChangeDistrictName(value){
    let newValue = {
      name: value.label,
       _id: value.value,
     };
   setDistrictname(value)
   setLocalbodyObject({ ...localbodyObject, district: newValue });
  }

  function handleChangeLocalbodyType(value){
    let newValue = {
      name: value.label,
       _id: value.value,
     };
   setlocalbodytype(value)
   setLocalbodyObject({ ...localbodyObject, localbodytype: newValue });
  }
  function handleChangeShortcode(e){
    let name = e.target.name;
    let value = e.target.value;
   setshortcode(value)
   setLocalbodyObject({ ...localbodyObject, [name]: value });
  }
  
 /* function handleSelectedPrivilage(value) {
    let newValue = {
      name: value.label,
      _id: value.value,
    };
    setSelectedPrivilage(value);
    setLocalbodyObject({ ...localbodyObject, privilage: newValue });
  

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
  }*/
  function handleChangePassword(e) {
    let name = e.target.name;
    let value = e.target.value;
    setPasswordObject({ ...passwordObject, [name]: value });
  }

  const handleValidSubmit = (event, values) => {
   
    localbodyIdTobeUpdated
      ? dispatch(updateLocalbody(localbodyObject))
      : dispatch(addLocalbody(localbodyObject));
    setCompanyname({});
    setDistrictname({});
    setlocalbodyname("");
    setlocalbodytype({});
    setshortcode("")
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
                         
                        <Label>Company</Label>
        
        <Select  name="company_name"
         id="exampleSelect"
          style={{appearance:"auto"}} 
           value={companyName}
         onChange={handleChangeCompany} 
         options={companiesOptions?.map((item)=>{
           return{
             label:item.company_name,
             value:item._id,
             key:item._id,
           }
         })}
     
      />
     
                        </div>
                      </Col>
                      <Col md="3">
                        <div className="mb-3">
                        <Label>District</Label>
        
        <Select  name="district_name"
         id="exampleSelect"
          style={{appearance:"auto"}} 
           value={districtname}
         onChange={handleChangeDistrictName} 
         options={districtOptions?.map((item)=>{
           return{
             label:item.district_name,
             value:item._id,
             key:item._id,
           }
         })}
     
      />
                        
                        </div>
                      </Col>
                     

                      <Col md="3">
                        <div className="mb-3">
                         
                        <Label>Localbody Type</Label>
        
        <Select  name="localbody_type"
         id="exampleSelect"
          style={{appearance:"auto"}} 
           value={localbodytype}
         onChange={handleChangeLocalbodyType} 
         options={localbodyTypes?.map((item)=>{
           return{
             label:item.localbody_type_name,
             value:item._id,
             key:item._id,
           }
         })}
     
      />
                        </div>
                      </Col>
                      <Col md="3">
                        <div className="mb-3">
                        <Label htmlFor="validationCustom05">Localbody Name</Label>
                          <AvField
                            name="localbody_name"
                            placeholder="Localbody Name"
                            type="text"
                            errorMessage="Enter localbody Name"
                            className="form-control"
                            //validate={{ required: { value: true } }}
                            id="validationCustom01"
                            value={localbodyname}
                            onChange={handleChangeLocalbodyname}
                          />
                        </div>
                      </Col>
                      <Col md="3">
                        <div className="mb-3">
                         
                          <AvField
                            name="short_code"
                            placeholder="ShortCode"
                            type="text"
                            errorMessage="Enter shortcode"
                            className="form-control"
                           // validate={{ required: { value: true } }}
                            id="validationCustom01"
                            value={shortcode}
                            onChange={handleChangeShortcode}
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

export default withRouter(connect(mapStateToProps, { apiError })(Localbodies));

Localbodies.propTypes = {
  error: PropTypes.any,
  localbodys: PropTypes.array,
};
