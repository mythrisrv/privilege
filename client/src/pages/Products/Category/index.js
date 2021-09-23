import React, {useState,useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { MDBDataTable } from "mdbreact";
import { AvForm, AvField } from "availity-reactstrap-validation";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import "./category.scss";
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
  getCategories,
  addCategory,
  deleteCategory,
  updateCategory,
  apiError
} from "../../../store/actions";


const Category = (props) => {

    const [categoryObject, setCategoryObject] = useState({});
    const [categoriesTemp, setCategoriesTemp] = useState([]);
  
    const [categoryIdTobeUpdated, setCategoryIdToBeUpdated] = useState(null);
    const [categoryIdToBeDeleted, setCategoryIdToBeDeleted] = useState(null);
    const [confirmDeleteAlert, setConfirmDeleteAlert] = useState(null);
    const [showModal, setShowModal] = useState(false);

   //const [passwordObject, setPasswordObject] = useState({
      // oldPassword: "",
      // password: "",
      // confirmPassword: "",
    //});
    const {
      categories,
      addingCategory,
      addCategoryResponse,
      deleteCategoryResponse,
      updateCategoryResponse,
      error,
    } = useSelector((state) => state.categories);
  
  
    const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(getCategories());
      // dispatch(getPrivilagesOptions());
      // dispatch(getCompaniesOptions());
    }, []);

    
  
    useEffect(() => {
      if (addCategoryResponse.type === "success") {
        toastr.success(addCategoryResponse.message);
      } else if (addCategoryResponse.type === "failure") {
        toastr.error(error.data.message, addCategoryResponse.message);
      }
    }, [addCategoryResponse]);
  
    useEffect(() => {
      if (deleteCategoryResponse.type === "success") {
        toastr.success(deleteCategoryResponse.message);
      } else if (deleteCategoryResponse.type === "failure") {
        toastr.error(error.data.message, deleteCategoryResponse.message);
      }
    }, [deleteCategoryResponse]);
  
    useEffect(() => {
      if (updateCategoryResponse.type === "success") {
        setShowModal(false);
        setCategoryIdToBeUpdated(null);       
        //setCategoryIdToBeUpdated(null);
        toastr.success(updateCategoryResponse.message);
      } else if (updateCategoryResponse.type === "failure") {
        toastr.error(error.data.message, updateCategoryResponse.message);
      }
    }, [updateCategoryResponse]);
    
  
    let preUpdateCategory = (item) => {
       setCategoryIdToBeUpdated(item._id);
      setCategoryObject(item);
      setShowModal(true);
    };
  
    // let preUpdateUserPassword = (item) => {
    //   setCategoryIdToBeUpdated(item._id);
    //   setShowModal(true);
    // };
  
    useEffect(() => {
      let categoriesDuplicate = JSON.parse(JSON.stringify(categories));
      let categoryData = [];
      categoriesDuplicate.map((item, index) => {
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
        item.category_icon_svg = (
          <div style={{ textAlign: 'center' }}>
            <img style= {{ width:50 }} src={`category_images/${item.category_icon_svg}`} />
          </div>
        );
        item.app_banner_image = (
          <div style={{ textAlign: 'center' }}>
           <img style= {{ width:50 }} src={`category_images/${item.app_banner_image}`} />
          </div>
        );
        item.web_banner_image = (
          <div style={{ textAlign: 'center' }}>
           <img style= {{ width:50 }} src={`category_images/${item.web_banner_image}`} />
          </div>
        );
      
        categoryData.push(item);
      });
      setCategoriesTemp(categoryData);
    }, [categories]);


 // const [category, setCategory] = useState({})
  const data = {
    columns: [
      {
        label: "#",
        field: "id",
        sort: "asc",
        width: 10,
      },     
      {
        label: "Category Name English ",
        field: "categoryname_en",
        sort: "asc",
        width: 70,
      },
      {
        label: "Category Name Malayalam",
        field: "categoryname_ml",
        sort: "asc",
        width: 70,
      },
     
      {
        label: "Category Icon SVG",
        field: "category_icon_svg",
        sort: "asc",
        width: 70,
      },
      {
        label: "Banner Image(web)",
        field: "web_banner_image",
        sort: "asc",
        width: 100,
      },
    
      {
        label: "Banner Image(App)",
        field: "app_banner_image",
        sort: "asc",
        width: 100,
      },
      {
        label: "Added by",
        field: "added_by",
        sort: "asc",
        width: 60,
      },
      // {
      //   label: "Status",
      //   field: "status",
      //   sort: "asc",
      //   width: 60,
      // },
      {
        label: "Action",
        field: "action",
        sort: "asc",
        width: 100,
      },
    ],
    rows: categoriesTemp,
      
    
  };

  let handleChangeInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setCategoryObject({
      ...categoryObject, 
      [name]:value
    })
  }
  const handleValidSubmitCategory = (event, values) => {
    console.log(categoryObject, "AA" );
    categoryIdTobeUpdated
      ? dispatch(updateCategory(categoryObject))
      : dispatch(addCategory(categoryObject));
  };
  let handleChangeImageUpload =(event) => {
    setCategoryObject({...categoryObject, category_icon_svg:event.target.files[0].name})
      }

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
          <Breadcrumbs title="Home" breadcrumbItem="Category"/>
          <Row>
            <Col xl="12">
              <Card>
                <CardBody>
                  <AvForm className="needs-validation" 
                       onValidSubmit={(e, v) => {
                        handleValidSubmitCategory(e, v);
                      }}
                  >
                    <Row>
                      <Col md="4">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom01">Category Name English</Label>
                          <AvField
                            name="categoryname_en"
                            value={categoryObject.categoryname_en}
                            placeholder="Category Name"
                            type="text"
                            errorMessage="Enter Category Name"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom01"
                            onChange ={handleChangeInput}
                          />
                        </div>
                      </Col>
                      <Col md="4">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom02">Category Name Malayalam</Label>
                          <AvField
                            name="categoryname_ml"
                            value={categoryObject.categoryname_ml}
                            placeholder="Category Name"
                            type="text"
                            errorMessage="Enter Category Name"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom02"
                            onChange ={handleChangeInput}
                          />
                        </div>
                      </Col>
                      <Col md="4">
                      <div className="mb-3">
                          <Label htmlFor="validationCustom04">Category Icon(svg)</Label>
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
                      </Col>
                    
                   
                      </Row>
                     <Row>
                      <Col md="4">
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
                      </Col>
                      <Col md="4">
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
                      </Col>
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
  // const { error } = state.Category;
  // return { error };
};

export default withRouter(connect(mapStateToProps, {apiError})(Category));

Category.propTypes = {
  error: PropTypes.any,
  categories: PropTypes.array,
};
