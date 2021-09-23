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
  getBrands,
  addBrand,
  deleteBrand,
  apiError,
  updateBrand,
} from "../../../store/actions";

// Redux
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { AvForm, AvField } from "availity-reactstrap-validation";

//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import "./brands.scss";
// import Brand from "../../../store/brands/reducer";



const Brands = (props) => {
  const [selectedbrandpremium, setSelectedBrandPremium] = useState(null);
  
  const [brandObject, setBrandObject] = useState({});
  const [brandsTemp, setBrandsTemp] = useState([]);

  const [brandIdTobeUpdated, setBrandIdToBeUpdated] = useState(null);
  const [brandIdToBeDeleted, setBrandIdToBeDeleted] = useState(null);
  const [confirmDeleteAlert, setConfirmDeleteAlert] = useState(null);
  const [showModal, setShowModal] = useState(false);
 



  
  const {
    brands,
    addingBrand,
    addBrandResponse,
    deleteBrandResponse,
    updateBrandResponse,
    error,
  } = useSelector((state) => state.brands);


  const dispatch = useDispatch();

  
  
  useEffect(() => {
    dispatch(getBrands());
    // dispatch(getPrivilagesOptions());
    // dispatch(getCompaniesOptions());
  }, []);
  // useEffect(() => {
  //   if (selectedbrandpremium !== null) {
  //     dispatch(selectedbrandpremium.value);
  //   }
  // }, [selectedbrandpremium]);

  useEffect(() => {
    if (addBrandResponse.type === "success") {
      toastr.success(addBrandResponse.message);
    } else if (addBrandResponse.type === "failure") {
      toastr.error(error.data.message, addBrandResponse.message);
    }
  }, [addBrandResponse]);

  useEffect(() => {
    if (deleteBrandResponse.type === "success") {
      toastr.success(deleteBrandResponse.message);
    } else if (deleteBrandResponse.type === "failure") {
      toastr.error(error.data.message, deleteBrandResponse.message);
    }
  }, [deleteBrandResponse]);

  useEffect(() => {
    if (updateBrandResponse.type === "success") {
      setShowModal(false);
      setBrandIdToBeUpdated(null);
      // setPasswordObject({});
      setBrandIdToBeUpdated(null);
      toastr.success(updateBrandResponse.message);
    } else if (updateBrandResponse.type === "failure") {
      toastr.error(error.data.message, updateBrandResponse.message);
    }
  }, [updateBrandResponse]);

  let preUpdateBrand = (item) => {

     
  
    setBrandIdToBeUpdated(item._id);
    setBrandObject(item);
  };


  useEffect(() => {
    let brandsDuplicate = JSON.parse(JSON.stringify(brands));
    let brandData = [];
    brandsDuplicate.map((item, index) => {
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
              preUpdateBrand(item);
            }}
          ></i>
          <i
            className="uil-trash-alt"
            style={{ fontSize: "1.3em", cursor: "pointer" }}
            onClick={() => {
              setBrandIdToBeDeleted(item._id);
              setConfirmDeleteAlert(true);
            }}
          ></i>
        </div>
      );
      item.id = index + 1;
      // item.name = <div>{`${item.firstName} ${item.lastName}`}</div>;
      // item.privilage = <div>{item.privilage && item.privilage.name}</div>;
      // item.company = <div>{item.company && item.company.name}</div>;
      // item.branch = <div>{item.branch && item.branch.name}</div>;
      item.brandpremium = <div>{item.brandpremium && item.brandpremium.label}</div>
      // item.brandlogo = <img src={item.brandlogo && item.brandlogo} /> 
      // item.webbannerimage = <img src={item.webbannerimage && item.webbannerimage} /> 
      // item.appbannerimage =<img src={item.appbannerimage && item.appbannerimage} />
      brandData.push(item);
    }); 
    setBrandsTemp(brandData);
     
 
  }, [brands]);

 
const premiumoptions = [
  { value: 1, label: "yes" },
  { value: 2 , label: "no" },
  
]
//   const premiumOptionsGroup = [
//     {
//       options: premiumoptions,
//     },
//   ];


  function handleSelectedPremium(value) {
    setSelectedBrandPremium(value);
    setBrandObject({ ...brandObject,premiumbrand: value.value });
  }

  const data = {
    columns: [
      {
        label: "#",
        field: "id",
        sort: "asc",
        width: 10,
      },
      // {
      //   label: "Date",
      //   field: "date",
      //   sort: "asc",
      //   width: 60,
      // },
      // {
      //   label: "Time",
      //   field: "time",
      //   sort: "asc",
      //   width: 60,
      // },
      
      {
        label: "Brand Name(EN)",
        field: "brandname",
        sort: "asc",
        width: 70,
      },
      {
        label: "Brand Name(ML)",
        field: "brandname_ml",
        sort: "asc",
        width: 70,
      },
      {
        label: "Brand Priority",
        field: "brandpriority",
        sort: "asc",
        width: 70,
      },
      
      {
        label: "Brand Premium",
        field: "brandpremium",
        sort: "asc",
        width: 70,
      },
      {
        label: "Logo",
        field: "brandlogo",
        sort: "asc",
        width: 100,
      },
      {
        label: "Banner Image(Web)",
        field: "webbannerimage",
        sort: "asc",
        width: 100,
      },
      {
        label: "Banner Image(App)",
        field: "appbannerimage",
        sort: "asc",
        width: 100,
      },
      {
        label: "Added by",
        field: "addedby",
        sort: "asc",
        width: 60,
      },
      {
        label: "Status",
        field: "status",
        sort: "asc",
        width: 60,
      },
      {
        label: "Action",
        field: "action",
        sort: "asc",
        width: 100,
      },
    ],
    rows: brandsTemp,
      
     
    
  };

  let handleChangeInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setBrandObject({
      ...brandObject, 
      [name]:value
    })
  }
  const handleValidSubmitBrand = (event, values) => { 
    console.log(brandObject, "BO")
    brandIdTobeUpdated
      ? dispatch(updateBrand(brandObject))
      : dispatch(addBrand(brandObject));

  };

//   let handleChangeImageUpload =(event) => {
// setBrandObject({...brandObject, brandlogo:event.target.files[0]})
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
            dispatch(deleteBrand(brandIdToBeDeleted));
            setConfirmDeleteAlert(false);
          }}
          onCancel={() => setConfirmDeleteAlert(false)}
        >
          Are you sure you want to delete it?
        </SweetAlert>
      ) : null}
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs title="Home" breadcrumbItem="Brands" />
          <Row>
            <Col xl="12">
              <Card>
                <CardBody>
                  <AvForm className="needs-validation" 
                       onValidSubmit={(e, v) => {
                        handleValidSubmitBrand(e, v);
                      }}
                  >
                    <Row>
                      <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom01">Brand name English</Label>
                          <AvField
                            name="brandname"
                            value ={brandObject.brandname}
                            placeholder="Brand name"
                            type="text"
                            errorMessage="Enter Brand Name"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom01"
                            onChange ={handleChangeInput}
                          />
                        </div>
                      </Col>
                       
                      <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom02">Brand name Malayalam</Label>
                          <AvField
                            name="brandname_ml"
                            value ={brandObject.brandname_ml }
                            placeholder="Brand name ml"
                            type="text"
                            errorMessage="Enter Brand Name ML"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom02"
                            onChange ={handleChangeInput}
                          />
                        </div>
                      </Col>

                      
                      <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom03">Brand priority</Label>
                          <AvField
                            name="brandpriority"
                            value ={brandObject.brandpriority }

                            placeholder="Brand priority"
                            type="text"
                            errorMessage="Enter Brand Priority"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom03"
                            onChange ={handleChangeInput}

                          />
                        </div>
                      </Col>
                    
                    <Col md={3}>
                        <div className="mb-3">
                          <Label>Premium Brand</Label>
                          <Select
                            name="premiumbrand"
                            value={selectedbrandpremium}
                            onChange={(value) => {
                              handleSelectedPremium(value);
                            }}
                            options={premiumoptions}
                            classNamePrefix="select2-selection"
                          />
                        </div>
                      </Col>
                      </Row>
                     {/* <Row>
                      <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom04">Brand Logo</Label>
                          <AvField
                            name="brandlogo"
                            value ={brandObject.brandlogo } 
                            accept='.jpg, .png, .jpeg ,.svg'
                            // onChange= {handleChangeImageUpload}
                            type="file"
                            errorMessage="Please provide a valid file."
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom05"
                          />
                        </div>
                      </Col>
                      <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom04">Web banner Image</Label>
                          <AvField
                            name="webbannerimage"
                            value ={brandObject.webbannerimage }


                            accept='.jpg, .png, .jpeg, .svg'
                            // onChange={this.onChange}
                            type="file"
                            errorMessage="Please provide a valid file."
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom06"
                          />
                        </div>
                      </Col>
                      <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom04">App banner Image</Label>
                          <AvField
                            name="appbannerimage"
                            value ={brandObject.appbannerimage }
                            accept='.jpg, .png, .jpeg, .svg'
                            // onChange={this.onChange}
                            type="file"
                            errorMessage="Please provide a valid file."
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom07"
                          />
                        </div>
                      </Col>
                      
                    </Row> */}
                   
                   {brandIdTobeUpdated ? (
                      <Button
                        color="primary"
                        type="submit"
                        disabled={addingBrand ? true : false}
                      >
                        {addingBrand ? "Updating" : "Update"}
                      </Button>
                    ) : (
                      <Button
                        color="primary"
                        type="submit"
                        disabled={addingBrand ? true : false}
                      >
                        {addingBrand ? "Adding" : "Submit"}
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

export default withRouter(connect(mapStateToProps, { apiError })(Brands));

Brands.propTypes = {
  error: PropTypes.any,
  brands: PropTypes.array,
};

