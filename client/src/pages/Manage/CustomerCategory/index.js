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
  getCustomerCategories,
  addCategory,updateCategory,
  deleteCategory
} from "../../../store/actions";

// Redux
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { AvForm, AvField } from "availity-reactstrap-validation";

//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb";
//import "./district.scss";

const CustomerCategory = (props) => {
  const [selectedPrivilage, setSelectedPrivilage] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [categoryObject, setCategoryObject] = useState({});
  const [categoryIdTobeUpdated, setCategoryIdToBeUpdated] = useState(null);
  const [categoryIdToBeDeleted, setCategoryIdToBeDeleted] = useState(null);
  const [confirmDeleteAlert, setConfirmDeleteAlert] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [categoriesForTable, setCategoriesForTable] = useState([]);
const[categoryValue,setcategoryValue]=useState("")
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
    
  } = useSelector((state) => state.districts);
  const{
      categories,
      
      addCategoryResponse,
      updateCategoryResponse,
      deleteCategoryResponse,
      addingCategory,
      error,
    }=useSelector((state)=>state.customerCategory)

  

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCustomerCategories());
    
  }, []);

  

 useEffect(()=>{
    if (addCategoryResponse.type === "success") {
      dispatch(getCustomerCategories())
      toastr.success(addCategoryResponse.message);
     
    
 
     
    } else if (addCategoryResponse.type === "failure") {
      toastr.error(error.data.message, addCategoryResponse.message);
    }
  },[addCategoryResponse])
  

  useEffect(() => {
    if (deleteCategoryResponse.type === "success") {
      dispatch(getCustomerCategories())
      toastr.success(deleteCategoryResponse.message);
      setCategoryIdToBeDeleted(null);
    } else if (deleteCategoryResponse.type === "failure") {
      toastr.error(error.data.message, deleteCategoryResponse.message,{timeOut:2000,preventDuplicates:true});
    }
  }, [deleteCategoryResponse]);

  useEffect(() => {
    if (updateCategoryResponse.type === "success") {
      dispatch(getCustomerCategories())
      setShowModal(false);
      setCategoryIdToBeUpdated(null);
      setPasswordObject({});
      toastr.success(updateCategoryResponse.message);
    } else if (updateCategoryResponse.type === "failure") {
      toastr.error(error.data.message, updateCategoryResponse.message);
    }
  }, [updateCategoryResponse]);

  let preUpdateCategory = (item) => {
    console.log(item)
    if (item.customer_type_name) {
     setcategoryValue(item.customer_type_name)
     
    }
    setCategoryIdToBeUpdated(item._id);
    setCategoryObject({ ...item, password: null });
  };

  let preUpdateCategoryPassword = (item) => {
    setCategoryIdToBeUpdated(item._id);
    setShowModal(true);
  };

  useEffect(() => {
    let categoryData = [];

    categories?.map((item, index) => {
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
              preUpdateCategory(item);
            }}
          ></i>
          <i
            className="uil-trash-alt"
            style={{ fontSize: "1.3em", cursor: "pointer" }}
            onClick={() => {
              setCategoryIdToBeDeleted(item._id);
              setConfirmDeleteAlert(true);
            }}
          ></i>
        </div>
      );
      item.id = index + 1;
     
    if(item.customer_type_addedby!=null){
        item.staff=item.customer_type_addedby.username
    }
      categoryData.push(item);
    });
    setCategoriesForTable(categoryData);
    
  }, [categories]);

 
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
        field: "customer_type_date",
        //sort: "desc",
        width: 150,
      },
      {
        label: "Time",
        field: "customer_type_time",
        //sort: "desc",
        width: 150,
      },
     
      {
        label: "Category",
        field: "customer_type_name",
        sort: "desc",
        width: 400,
      },
      {
        label: "Staff",
        field: "staff",
        sort: "desc",
        width: 400,
      },
   
      {
        label: "Action",
        field: "action",
        width: 50,
      },
    ],
    rows: categoriesForTable,
  };
 


  function handleChangeCategory(e) {
    let name = e.target.name;
    let value = e.target.value;
    setcategoryValue(value)
    setCategoryObject({ ...categoryObject, [name]: value });
    
  }

  function handleSelectedPrivilage(value) {
    let newValue = {
      name: value.label,
      _id: value.value,
    };
    setSelectedPrivilage(value);
    setCategoryObject({ ...categoryObject, privilage: newValue });
  }

  function handleSelectedCompany(value) {
    let newValue = {
      name: value.label,
      _id: value.value,
    };
    setSelectedCompany(value);
    //setDistrictObject({ ...districtObject, company: newValue });
  }
  function handleSelectedBranch(value) {
    let newValue = {
      name: value.label,
      _id: value.value,
    };
    setSelectedBranch(value);
   // setDistrictObject({ ...districtObject, branch: newValue });
    
  }

  function handleChangePassword(e) {
    let name = e.target.name;
    let value = e.target.value;
    setPasswordObject({ ...passwordObject, [name]: value });
  }

  const handleValidSubmit = (event, values) => {
    categoryIdTobeUpdated
      ? dispatch(updateCategory(categoryObject))
      : dispatch(addCategory(categoryObject));
      setcategoryValue("")
     
  };

  const handleValidSubmitPassword = (event, values) => {
    if (passwordObject.password == passwordObject.confirmPassword) {
      let item = {
       // _id: districtIdTobeUpdated,
        password: passwordObject.password,
      };
      dispatch(updateDistrict(item));
    } else {
      toastr.error("Passwords are not matching");
    }
  };

  let closeModal = () => {
    setShowModal(false);
    setCategoryIdToBeUpdated(null);
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
            dispatch(deleteCategory(categoryIdToBeDeleted));
            setConfirmDeleteAlert(false);
          }}
          onCancel={() => setConfirmDeleteAlert(false)}
        >
          Are you sure you want to delete it?
        </SweetAlert>
      ) : null}

      
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs title="Home" breadcrumbItem="Customer Category" />
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
                          <Label htmlFor="validationCustom01">Add Category</Label>
                          <AvField
                            name="category_name"
                            placeholder="Category name"
                            type="text"
                            errorMessage="Enter District Name"
                            className="form-control"
                           
                            id="validationCustom01"
                            value={categoryValue}
                            onChange={handleChangeCategory}
                            
                          />
                       </div>
                      </Col>
                    
                     <Col>
                     <div className="mb-3" style={{paddingTop:"30px"}}>
                     {categoryIdTobeUpdated ? (
                      <Button
                        color="primary"
                        type="submit"
                        disabled={addingCategory ? true : false}
                       
                      >
                        {addingCategory ? "Updating" : "Update"}
                      </Button>
                    ) : (
                      <Button
                        color="primary"
                        type="submit"
                        disabled={addingCategory ? true : false}
                       >
                        {addingCategory ? "Adding" : "Submit"}
                        
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

export default withRouter(connect(mapStateToProps, { apiError })(CustomerCategory));

CustomerCategory.propTypes = {
  error: PropTypes.any,
  categories: PropTypes.array,
};
