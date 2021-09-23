import React, {useState,useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { MDBDataTable } from "mdbreact";
import { AvForm, AvField } from "availity-reactstrap-validation";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import "./thirdcategory.scss";
// Redux
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import toastr from "toastr";
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Label,
} from "reactstrap";
import SweetAlert from "react-bootstrap-sweetalert";
import Select from "react-select";
import {
  getThirdcategories,
  addThirdcategory,
  deleteThirdcategory,
  updateThirdcategory,
  apiError
} from "../../../store/actions";


const Thirdcategory = (props) => {

    const [thirdcategoryObject, setThirdcategoryObject] = useState({});
    const [thirdcategoriesTemp, setThirdthirdcategoriesTemp] = useState([]);
  
    const [thirdcategoryIdTobeUpdated, setThirdcategoryIdToBeUpdated] = useState(null);
    const [thirdcategoryIdToBeDeleted, setThirdcategoryIdToBeDeleted] = useState(null);
    const [confirmDeleteAlert, setConfirmDeleteAlert] = useState(null);
    const [showModal, setShowModal] = useState(false);

   //const [passwordObject, setPasswordObject] = useState({
      // oldPassword: "",
      // password: "",
      // confirmPassword: "",
    //});
    const {
      thirdcategories,
      addingThirdcategory,
      addThirdcategoryResponse,
      deleteThirdcategoryResponse,
      updateThirdcategoryResponse,
      error,
    } = useSelector((state) => state.thirdcategories);
  
  
    const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(getThirdcategories()); 
      // dispatch(getPrivilagesOptions());
      // dispatch(getCompaniesOptions());
    }, []);

    
  
    useEffect(() => {
      if (addThirdcategoryResponse.type === "success") {
        toastr.success(addThirdcategoryResponse.message);
      } else if (addThirdcategoryResponse.type === "failure") {
        toastr.error(error.data.message, addThirdcategoryResponse.message);
      }
    }, [addThirdcategoryResponse]);
  
    useEffect(() => {
      if (deleteThirdcategoryResponse.type === "success") {
        toastr.success(deleteThirdcategoryResponse.message);
      } else if (deleteThirdcategoryResponse.type === "failure") {
        toastr.error(error.data.message, deleteThirdcategoryResponse.message);
      }
    }, [deleteThirdcategoryResponse]);
  
    useEffect(() => {
      if (updateThirdcategoryResponse.type === "success") {
        setShowModal(false);
        setThirdcategoryIdToBeUpdated(null);       
        //setThirdcategoryIdToBeUpdated(null);
        toastr.success(updateThirdcategoryResponse.message);
      } else if (updateThirdcategoryResponse.type === "failure") {
        toastr.error(error.data.message, updateThirdcategoryResponse.message);
      }
    }, [updateThirdcategoryResponse]);
    
  
    let preUpdateThirdcategory = (item) => {
       setThirdcategoryIdToBeUpdated(item._id);
      setThirdcategoryObject(item);
      setShowModal(true);
    };
  
    // let preUpdateUserPassword = (item) => {
    //   setThirdcategoryIdToBeUpdated(item._id);
    //   setShowModal(true);
    // };
  
    useEffect(() => {
      let thirdcategoriesDuplicate = JSON.parse(JSON.stringify(thirdcategories));
      let thirdcategoryData = [];
      thirdcategoriesDuplicate.map((item, index) => {
        item.action = (
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {/* <i
              className="uil-key-skeleton"
              style={{ fontSize: "1.3em", cursor: "pointer" }}
              onClick={() => {
               // preUpdateUserPassword(item);
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
                preUpdateThirdcategory(item);
                
              }}
            ></i>
            <i
              className="uil-trash-alt"
              style={{ fontSize: "1.3em", cursor: "pointer" }}
              onClick={() => {
                setThirdcategoryIdToBeDeleted(item._id);
                setConfirmDeleteAlert(true);
              }}
            ></i>
          </div>
        );
        item.id = index + 1;
       
        thirdcategoryData.push(item);
      });
      setThirdthirdcategoriesTemp(thirdcategoryData);
    }, [thirdcategories]);


 // const [category, setThirdcategory] = useState({})
  const data = {
    columns: [
      {
        label: "#",
        field: "id",
        sort: "asc",
        width: 10,
      },   
      {
        label: "Subcategory",
        field: "subcategory",
        sort: "asc",
        width: 70,
      },  
      {
        label: "Thirdcategory Name English ",
        field: "thirdcategory_name_english",
        sort: "asc",
        width: 70,
      },
      {
        label: "Thirdcategory Name Malayalam",
        field: "thirdcategory_name_malayalam",
        sort: "asc",
        width: 70,
      },
     
      {
        label: "Thirdcategory Image",
        field:"thirdcategoryimage",
        sort: "asc",
        width: 70,
      },
     
      {
        label: "Added by",
        field: "added_by",
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
    rows: thirdcategoriesTemp,
      
    
  };

  let handleChangeInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setThirdcategoryObject({
      ...thirdcategoryObject, 
      [name]:value
    })
  }
  const handleValidSubmitThirdcategory = (event, values) => {
    console.log(thirdcategoryObject, "AA" );
    thirdcategoryIdTobeUpdated
      ? dispatch(updateThirdcategory(thirdcategoryObject))
      : dispatch(addThirdcategory(thirdcategoryObject));
  };
 

      let closeModal = () => {
        setShowModal(false);
        setThirdcategoryIdToBeUpdated(null);
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
            dispatch(deleteThirdcategory(thirdcategoryIdToBeDeleted));
            setConfirmDeleteAlert(false);
          }}
          onCancel={() => setConfirmDeleteAlert(false)}
        >
          Are you sure you want to delete it?
        </SweetAlert>
      ) : null}
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs title="Home" breadcrumbItem="Thirdcategory"/>
          <Row>
            <Col xl="12">
              <Card>
                <CardBody>
                  <AvForm className="needs-validation" 
                       onValidSubmit={(e, v) => {
                        handleValidSubmitThirdcategory(e, v);
                      }}
                  >
                    <Row>
                    <Col md={4}>
                        <div className="mb-3">
                          <Label>SubCategory</Label>
                          <Select
                            name="privilage" 
                           // value={selectedPrivilage}
                            // onChange={(value) => {
                            //   handleSelectedPrivilage(value);
                            // }}
                            // options={privilagesOptionsGroup}
                            classNamePrefix="select2-selection"
                          />
                        </div>
                      </Col>
                      <Col md="4">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom01">Thirdcategory Name English</Label>
                          <AvField
                            name="thirdcategory_name_english"
                            value={thirdcategoryObject.thirdcategory_name_english}
                            placeholder="Thirdcategory Name"
                            type="text"
                            errorMessage="Enter Thirdcategory Name"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom01"
                            onChange ={handleChangeInput}
                          />
                        </div>
                      </Col>
                      <Col md="4">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom02">Thirdcategory Name Malayalam</Label>
                          <AvField
                            name="thirdcategory_name_malayalam"
                            value={thirdcategoryObject.thirdcategory_name_malayalam}
                            placeholder="Thirdcategory Name"
                            type="text"
                            errorMessage="Enter Thirdcategory Name"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom02"
                            onChange ={handleChangeInput}
                          />
                        </div>
                      </Col>
                      {/* <Col md="4">
                      <div className="mb-3">
                          <Label htmlFor="validationCustom04">Thirdcategory Icon(svg)</Label>
                          <AvField
                            name="category_icon_svg"
                            // value={categoryObject.category_icon_svg}
                            accept='.jpg, .png, .jpeg ,.svg'
                            onChange={handleChangeImageUpload}
                            type="file"
                            errorMessage="Please provide a valid file."
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom03"
                          />
                        </div>
                      </Col> */}
                    
                   
                      </Row>
                     <Row>
                      {/* <Col md="4">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom04">Banner Image(web)</Label>
                          <AvField
                            name="web_banner_image"
                            //value={categoryObject.web_banner_image}
                            accept='.jpg, .png, .jpeg ,.svg'
                            onChange={handleChangeImageUpload}
                            type="file"
                            errorMessage="Please provide a valid file."
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom04"
                          />
                        </div>
                      </Col> */}
                      {/* <Col md="4">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom04">Banner Image(app)</Label>
                          <AvField
                            name="app_banner_image"
                            // value={categoryObject.app_banner_image}
                            accept='.jpg, .png, .jpeg, .svg'
                             onChange={handleChangeImageUpload}
                            type="file"
                            errorMessage="Please provide a valid file."
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom05"
                          />
                        </div>
                      </Col> */}
                      {/* <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom04">App banner Image</Label>
                          <AvField
                            name="appbannerimage"
                            accept='.jpg, .png, .jpeg, .svg'
                            // onChange={this.onChange}
                            type="file"
                            errorMessage="Please provide a valid file."
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom07"
                          />
                        </div>
                      </Col> */}
                      
                    </Row>
                   
                  
                    {thirdcategoryIdTobeUpdated ? (
                      <Button
                        color="primary"
                        type="submit"
                        disabled={addingThirdcategory ? true : false}
                      >
                        {addingThirdcategory ? "Updating" : "Update"}
                      </Button>
                    ) : (
                      <Button
                        color="primary"
                        type="submit"
                        disabled={addingThirdcategory ? true : false}
                      >
                        {addingThirdcategory ? "Adding" : "Submit"}
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
  // const { error } = state.Thirdcategory;
  // return { error };
};

export default withRouter(connect(mapStateToProps, {apiError})(Thirdcategory));

Thirdcategory.propTypes = {
  error: PropTypes.any,
  thirdcategories: PropTypes.array,
};
