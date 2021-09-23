import React, {useState,useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { MDBDataTable } from "mdbreact";
import { AvForm, AvField } from "availity-reactstrap-validation";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import "./subcategory.scss";
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
  getSubcategories,
  addSubcategory,
  deleteSubcategory,
  updateSubcategory,
  getCategoriesOptions,
  apiError
} from "../../../store/actions";


const Subcategory = (props) => {

    const [subcategoryObject, setSubcategoryObject] = useState({});
    const [subcategoriesTemp, setThirdsubcategoriesTemp] = useState([]);
  
    const [subcategoryIdTobeUpdated, setSubcategoryIdToBeUpdated] = useState(null);
    const [subcategoryIdToBeDeleted, setSubcategoryIdToBeDeleted] = useState(null);
    const [confirmDeleteAlert, setConfirmDeleteAlert] = useState(null);
    const [showModal, setShowModal] = useState(false);

   //const [passwordObject, setPasswordObject] = useState({
      // oldPassword: "",
      // password: "",
      // confirmPassword: "",
    //});
    const {
      subcategories,     
      addingSubcategory,
      addSubcategoryResponse,
      deleteSubcategoryResponse,
      updateSubcategoryResponse,
      error,
    } = useSelector((state) => state.subcategories);
  
    const categoriesOptions = useSelector(
      (state) => state.categories.categoriesOptions
    );

    const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(getSubcategories()); 
      dispatch(getCategoriesOptions());
      // dispatch(getCompaniesOptions());
    }, []);

    
  
    useEffect(() => {
      if (addSubcategoryResponse.type === "success") {
        toastr.success(addSubcategoryResponse.message);
      } else if (addSubcategoryResponse.type === "failure") {
        toastr.error(error.data.message, addSubcategoryResponse.message);
      }
    }, [addSubcategoryResponse]);
  
    useEffect(() => {
      if (deleteSubcategoryResponse.type === "success") {
        toastr.success(deleteSubcategoryResponse.message);
      } else if (deleteSubcategoryResponse.type === "failure") {
        toastr.error(error.data.message, deleteSubcategoryResponse.message);
      }
    }, [deleteSubcategoryResponse]);
  
    useEffect(() => {
      if (updateSubcategoryResponse.type === "success") {
        setShowModal(false);
        setSubcategoryIdToBeUpdated(null);       
        //setSubcategoryIdToBeUpdated(null);
        toastr.success(updateSubcategoryResponse.message);
      } else if (updateSubcategoryResponse.type === "failure") {
        toastr.error(error.data.message, updateSubcategoryResponse.message);
      }
    }, [updateSubcategoryResponse]);
    
  
    let preUpdateSubcategory = (item) => {
       setSubcategoryIdToBeUpdated(item._id);
      setSubcategoryObject(item);
      setShowModal(true);
    };
  
    // let preUpdateUserPassword = (item) => {
    //   setSubcategoryIdToBeUpdated(item._id);
    //   setShowModal(true);
    // };
  
    useEffect(() => {
      let subcategoriesDuplicate = JSON.parse(JSON.stringify(subcategories));
      let subcategoryData = [];
      subcategoriesDuplicate.map((item, index) => {
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
                preUpdateSubcategory(item);
                
              }}
            ></i>
            <i
              className="uil-trash-alt"
              style={{ fontSize: "1.3em", cursor: "pointer" }}
              onClick={() => {
                setSubcategoryIdToBeDeleted(item._id);
                setConfirmDeleteAlert(true);
              }}
            ></i>
          </div>
        );
        item.id = index + 1;
        item.category1 = item.Category && item.Category.categoryname_en;
      //  item.sub_image_name = <img src={item.sub_image_name && item.sub_image_name}/>
        subcategoryData.push(item);
      });
      setThirdsubcategoriesTemp(subcategoryData);
    }, [subcategories]);


 // const [category, setSubcategory] = useState({})
  const data = {
    columns: [
      {
        label: "#",
        field: "id",
        sort: "asc",
        width: 10,
      },   
      {
        label: "Category",
        field: "category_name_english",
        sort: "asc",
        width: 70,
      },  
      {
        label: "Subcategory Name English ",
        field: "subcategoryname_en",
        sort: "asc",
        width: 70,
      },
      {
        label: "Subcategory Name Malayalam",
        field: "subcategory_name_malayalam",
        sort: "asc",
        width: 70,
      },
     
      {
        label: "Subcategory Image",
        field:"subcategoryimage",
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
    rows: subcategoriesTemp,
      
    
  };

  let categoriesOptionsData =
    categoriesOptions &&
    categoriesOptions.data &&
    categoriesOptions.data.map((item) => {
      return {
        label: item.categoryname_en,
        value: item._id,
      };
    });

    const categoriesOptionsGroup = [
      {
        options: categoriesOptionsData,
      },
    ];

  let handleChangeInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setSubcategoryObject({
      ...subcategoryObject, 
      [name]:value
    })
  }
  const handleValidSubmitSubcategory = (event, values) => {
    console.log(subcategoryObject, "AA" );
    subcategoryIdTobeUpdated
      ? dispatch(updateSubcategory(subcategoryObject))
      : dispatch(addSubcategory(subcategoryObject));
  };
  // let handleChangeImageUpload =(event) => {
  //   setSubcategoryObject({...subcategoryObject, sub_image_name:event.target.files[0].name})
  //     }


      let closeModal = () => {
        setShowModal(false);
        setSubcategoryIdToBeUpdated(null);
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
            dispatch(deleteSubcategory(subcategoryIdToBeDeleted));
            setConfirmDeleteAlert(false);
          }}
          onCancel={() => setConfirmDeleteAlert(false)}
        >
          Are you sure you want to delete it?
        </SweetAlert>
      ) : null}
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs title="Home" breadcrumbItem="Subcategory"/>
          <Row>
            <Col xl="12">
              <Card>
                <CardBody>
                  <AvForm className="needs-validation" 
                       onValidSubmit={(e, v) => {
                        handleValidSubmitSubcategory(e, v);
                      }}
                  >
                    <Row>
                    <Col md={4}>
                        <div className="mb-3">
                          <Label>Category</Label>
                          <Select
                            name="privilage" 
                           // value={selectedPrivilage}
                            // onChange={(value) => {
                            //   handleSelectedPrivilage(value);
                            // }}
                            options={categoriesOptionsGroup}
                            classNamePrefix="select2-selection"
                          />
                        </div>
                      </Col>
                      <Col md="4">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom01">Subcategory Name English</Label>
                          <AvField
                            name="subcategory_name_english"
                            value={subcategoryObject.subcategory_name_english}
                            placeholder="Subcategory Name"
                            type="text"
                            errorMessage="Enter Subcategory Name"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom01"
                            onChange ={handleChangeInput}
                          />
                        </div>
                      </Col>
                      <Col md="4">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom02">Subcategory Name Malayalam</Label>
                          <AvField
                            name="subcategory_name_malayalam"
                            value={subcategoryObject.subcategory_name_malayalam}
                            placeholder="Subcategory Name"
                            type="text"
                            errorMessage="Enter Subcategory Name"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom02"
                            onChange ={handleChangeInput}
                          />
                        </div>
                      </Col>
                   
                      <Col md="4">
                      <div className="mb-3">
                          <Label htmlFor="validationCustom04">SubCategory Image</Label>
                          <AvField
                            name="sub_image_name"
                           // value={subcategoryObject.sub_image_name}
                            accept='.jpg, .png, .jpeg ,.svg'
                          // onChange={handleChangeImageUpload}
                            type="file"
                            errorMessage="Please provide a valid file."
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom03"
                          />
                        </div>
                      </Col>
                   
                      </Row>
                    
                   
                  
                    {subcategoryIdTobeUpdated ? (
                      <Button
                        color="primary"
                        type="submit"
                        disabled={addingSubcategory ? true : false}
                      >
                        {addingSubcategory ? "Updating" : "Update"}
                      </Button>
                    ) : (
                      <Button
                        color="primary"
                        type="submit"
                        disabled={addingSubcategory ? true : false}
                      >
                        {addingSubcategory ? "Adding" : "Submit"}
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
  // const { error } = state.Subcategory;
  // return { error };
};

export default withRouter(connect(mapStateToProps, {apiError})(Subcategory));

Subcategory.propTypes = {
  error: PropTypes.any,
  subcategories: PropTypes.array,
};
