import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { MDBDataTable } from "mdbreact";
import toastr from "toastr";
import {
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Label,
  Modal,
  Table,
  Progress,
} from "reactstrap";
import SweetAlert from "react-bootstrap-sweetalert";
import Select from "react-select";
import {
  getUsers,
  addUser,
  deleteUser,
  apiError,
  getPrivilagesOptions,
  getCompaniesOptions,
  getBranchesOptions,
  updateUser,
  getWasteItems,
  getWasteTypes,
  getWasteCategories,
  //getPrivilagesOptions,
} from "../../../store/actions";

// Redux
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { AvForm, AvField } from "availity-reactstrap-validation";

//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb";
// import "./user.scss";

const AddWaste = (props) => {
  //  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [uploadProgress, setUploadProgress] = useState();
  const [selectedType, setSelectedType] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [wasteObject, setWasteObject] = useState({});
  const [userIdTobeUpdated, setUserIdToBeUpdated] = useState(null);
  const [userIdToBeDeleted, setUserIdToBeDeleted] = useState(null);
  const [confirmDeleteAlert, setConfirmDeleteAlert] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [wasteItemsForTable, setWasteItemsForTable] = useState([]);
  const [accountType, setAccountType] = useState("");

  const [passwordObject, setPasswordObject] = useState({
    oldPassword: "",
    password: "",
    confirmPassword: "",
  });

  const {
    users,
    addingUser,
    addUserResponse,
    deleteUserResponse,
    updateUserResponse,
    error,
  } = useSelector((state) => state.users);

  const {
    wasteItems,
    wasteTypes,
    categories,
  }=useSelector((state)=>state.wasteItems);

  // const districtsOptions = useSelector(
  //   (state) => state.districts.districtsOptions
  // );

  const privilagesOptions = useSelector(
    (state) => state.privilages.privilagesOptions
  );
  const companiesOptions = useSelector(
    (state) => state.companies.companiesOptions
  );
  const branchesOptions = useSelector(
    (state) => state.branches.branchesOptions
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getPrivilagesOptions());
    dispatch(getCompaniesOptions());
   
    dispatch(getWasteItems());
    dispatch(getWasteTypes());
    dispatch(getWasteCategories())
  }, []);

  useEffect(() => {
    if (selectedCompany !== null) {
      dispatch(getBranchesOptions(selectedCompany.value));
    }
  }, [selectedCompany]);

  useEffect(() => {
    if (addUserResponse.type === "success") {
      toastr.success(addUserResponse.message);
      setSelectedType({});
      setSelectedCompany(null);
      setSelectedBranch(null);
      //  setSelectedDistrict(null);
    } else if (addUserResponse.type === "failure") {
      toastr.error(error.data.message, addUserResponse.message);
    }
  }, [addUserResponse]);

  useEffect(() => {
    if (deleteUserResponse.type === "success") {
      toastr.success(deleteUserResponse.message);
      setUserIdToBeDeleted(null);
    } else if (deleteUserResponse.type === "failure") {
      toastr.error(error.data.message, deleteUserResponse.message);
    }
  }, [deleteUserResponse]);

  useEffect(() => {
    if (updateUserResponse.type === "success") {
      setShowModal(false);
      setUserIdToBeUpdated(null);
      setPasswordObject({});
      toastr.success(updateUserResponse.message);
    } else if (updateUserResponse.type === "failure") {
      toastr.error(error.data.message, updateUserResponse.message);
    }
  }, [updateUserResponse]);

     let preUpdateData = (item) => {
       console.log(item.waste_items_type)
       if(item.waste_items_type){
       let waste_items_type={
         label:item.waste_items_type.waste_cat_name,
         value:item.waste_items_type.waste_cat_name,
       }
       handleSelectedType(waste_items_type)
     }}
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
    let wasteItemsData = [];

    wasteItems.map((item, index) => {
      item.action = (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {/* <i
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
                 preUpdateData(item);
            }}
          ></i>
          <i
            className="uil-eye"
            style={{
              fontSize: "1.3em",
              cursor: "pointer",
              marginLeft: "1rem",
              marginRight: "1rem",
            }}
            onClick={() => {
                 preUpdateData(item);
            }}
          ></i>
          <i
            className="uil-trash-alt"
            style={{ fontSize: "1.3em", cursor: "pointer" }}
            onClick={() => {
              //   setUserIdToBeDeleted(item._id);
              //   setConfirmDeleteAlert(true);
            }}
          ></i>
        </div>
      );
         item.id = index + 1;
      //   item.name1 = `${item.firstName} ${item.lastName}`;

      //   item.privilage1 = item.privilage && item.privilage.name;
      //   item.company1 = item.company && item.company.name;
      //   item.branch1 = item.branch && item.branch.name;
      if(item.waste_items_type) item.wastetype=item.waste_items_type.waste_cat_name;
      if(item.waste_item_cat) item.category=item.waste_item_cat.waste_category_name;
      if(item.waste_item_addedby)item.staff=item.waste_item_addedby.username;
      item.image=item.waste_items_image[0].img
        wasteItemsData.push(item);
    });
     setWasteItemsForTable(wasteItemsData);
  }, [wasteItems]);

  const data = {
    columns: [
      {
        label: "#",
        field: "id",
        sort: "asc",
        width: 150,
      },
      {
        label: "Waste item	 ",
        field: "waste_items_name",
        sort: "asc",
        width: 400,
      },

      {
        label: "Category	",
        field: "category",
        width: 300,
      },

      {
        label: "Type		",
        field: "wastetype",
        width: 300,
      },
      {
        label: "Bags	",
        field: "waste_items_bag",
        width: 300,
      },
      {
        label: "kg		",
        field: "waste_items_kg",
        width: 300,
      },
      {
        label: "Amount	",
        field: "waste_items_amount",
        width: 300,
      },
      {
        label: "Image	",

       field:"image",
      
        width: 300,
      },
      {
        label: "Staff	",
        field: "staff",
        width: 300,
      },
      {
        label: "Active/Inactive",
        field: "",
        width: 300,
      },
      {
        label: "Action",
        field: "action",
        width: 300,
      },
    ],
    rows: wasteItemsForTable,
   
  };
console.log(wasteItemsForTable)
  //   let privilagesOptionsData =
  //     privilagesOptions &&
  //     privilagesOptions.data &&
  //     privilagesOptions.data.map((item) => {
  //       return {
  //         label: item.name,
  //         value: item._id,
  //       };
  //     });

  //   let companiesOptionsData =
  //     companiesOptions &&
  //     companiesOptions.data &&
  //     companiesOptions.data.map((item) => {
  //       return {
  //         label: item.name,
  //         value: item._id,
  //       };
  //     });

  //   let branchesOptionsData =
  //     branchesOptions &&
  //     branchesOptions.data &&
  //     branchesOptions.data.map((item) => {
  //       return {
  //         label: item.name,
  //         value: item._id,
  //       };
  //     });

  //   const privilagesOptionsGroup = [
  //     {
  //       options: privilagesOptionsData,
  //     },
  //   ];

  //   const companiesOptionsGroup = [
  //     {
  //       options: companiesOptionsData,
  //     },
  //   ];

  //   const branchesOptionsGroup = [
  //     {
  //       options: branchesOptionsData,
  //     },
  //   ];

  //   function handleChangeUser(e) {
  //     let name = e.target.name;
  //     let value = e.target.value;
  //     setUserObject({ ...userObject, [name]: value });
  //   }

    function handleSelectedType(value) {
      console.log(value )
      //console.log(e)
      let newValue = {
        name: value.label,
         _id: value.value,
       };
      setSelectedType(value);
     setWasteObject({ ...wasteObject, wasteType: newValue });
    }
    console.log(selectedType)
console.log(wasteObject)
  //   function handleSelectedCompany(value) {
  //     let newValue = {
  //       name: value.label,
  //       _id: value.value,
  //     };
  //     setSelectedCompany(value);
  //     setUserObject({ ...userObject, company: newValue });
  //   }
  //   function handleSelectedBranch(value) {
  //     let newValue = {
  //       name: value.label,
  //       _id: value.value,
  //     };
  //     setSelectedBranch(value);
  //     setUserObject({ ...userObject, branch: newValue });
  //   }

  //   function handleChangePassword(e) {
  //     let name = e.target.name;
  //     let value = e.target.value;
  //     setPasswordObject({ ...passwordObject, [name]: value });
  //   }

  //   const handleValidSubmit = (event, values) => {
  //     userIdTobeUpdated
  //       ? dispatch(updateUser(userObject))
  //       : dispatch(addUser(userObject));
  //   };

  //   const handleValidSubmitPassword = (event, values) => {
  //     if (passwordObject.password == passwordObject.confirmPassword) {
  //       let item = {
  //         _id: userIdTobeUpdated,
  //         password: passwordObject.password,
  //       };
  //       dispatch(updateUser(item));
  //     } else {
  //       toastr.error("Passwords are not matching");
  //     }
  //   };

  //   let closeModal = () => {
  //     setShowModal(false);
  //     setUserIdToBeUpdated(null);
  //   };

  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs title="Home" breadcrumbItem="Add Waste" />
          <Row>
            <Col xl="12">
              <Card>
                <CardBody>
                  <AvForm
                    className="needs-validation"
                    // onValidSubmit={(e, v) => {
                    //   handleValidSubmit(e, v);
                    // }}
                  >
                    <Row>
                      <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom05">Waste Item</Label>
                          <AvField
                            name="WasteItem"
                            placeholder=""
                            type="text"
                            errorMessage="Enter Waste Item"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom05"
                           
                           
                          />
                        </div>
                      </Col>
                      <Col md="3">
                        <div className="mb-3">
                          <Label>Waste Category</Label>
                          <Select
                            name="waste_category"
                            //   value={selectCommunity}
                            //   onChange={(value) => {
                            //     handleSelectedCommunities(value);
                            //   }}
                            //   options={communitiesOptionsGroup}
                            classNamePrefix="select2-selection"
                            options={
                              categories.map((cat)=>{
                              return{
                                label:cat.waste_category_name,
                                value:cat._id,
                                key:cat._id
                              }
                              })
                            }
                          
                          />
                        </div>
                      </Col>
                      <Col md="3">
                        <div className="mb-3">
                          <Label>Waste Type</Label>
                          <Select
                            name="waste_type"
                            
                            //   value={selectCommunity}
                            //   onChange={(value) => {
                            //     handleSelectedCommunities(value);
                            //   }}
                            //   options={communitiesOptionsGroup}
                          
                            classNamePrefix="select2-selection"
                            value={selectedType}
                           options={
                             wasteTypes.map((types)=>{
                             return{
                               label:types.waste_cat_name,
                               value:types._id,
                               key:types._id
                             }
                             })
                           }
                          onChange={handleSelectedType}  
                            />
                              
                           
                        
                    
                         
                        </div>
                      </Col>
                      <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom05">
                            No. of Pages
                          </Label>
                          <AvField
                            name="Pages"
                            placeholder="No. of Pages"
                            type="text"
                            errorMessage="Enter No. of Pages"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom05"
                          />
                        </div>
                      </Col>
                      <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom05">No. of Kg</Label>
                          <AvField
                            name="Kg"
                            placeholder="No. of Kg"
                            type="text"
                            errorMessage="Enter No. of Kg"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom05"
                          />
                        </div>
                      </Col>
                      <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom05">Amount</Label>
                          <AvField
                            name="Amount"
                            placeholder="Amount"
                            type="text"
                            errorMessage="Enter Amount"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom05"
                          />
                        </div>
                      </Col>
                      <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom03">
                             Image
                          </Label>

                          {/* {productObject.product_image_main &&
                          productObject.product_image_main.length > 2 ? ( */}
                            {/* <div className="img-wraps"> */}
                              {/* {productObject.product_image_main &&
                              productObject.product_image_main.startsWith(
                                'http'
                              ) ? (
                                <img
                                  className="img-thumbnail"
                                  alt=""
                                  width="200"
                                //   src={`${productObject.product_image_main}`}
                                />
                              ) : (
                                <img
                                  className="img-thumbnail"
                                  alt=""
                                  width="200"
                                //   src={`${API_URL}public/uploads/product-images/${productObject.product_image_main}`}
                                />
                              )}

                              <button
                                className="btn btn-danger btn-sm btn-block waves-effect waves-light btn btn-danger"
                                // onClick={deleteProductImage}
                                style={{ width: '200px' }}
                              >
                                Delete
                              </button>
                            </div>
                          ) : ( */}
                            <AvField
                              name="product_image_main"
                              type="file"
                              errorMessage="Select Image"
                              className="form-control"
                              id="validationCustom04"
                              //  id="getFile" style={{display:"none"}}
                              // onChange={handleChangeInput}
                            //   onChange={uploadImage}
                            />
                           {/* )} */}

                          {uploadProgress && uploadProgress < 100 && (
                            <div className="mt-4">
                              {' '}
                              <Progress color="primary" value={uploadProgress}>
                                Uploading {uploadProgress}%
                              </Progress>
                            </div>
                          )}
                        </div>
                      </Col>
                    </Row>

                    <Row>
                      <Col md="1">
                        <div className="mt-4">
                          <Button color="primary" type="submit">
                            Save
                          </Button>
                        </div>
                      </Col>
                      <Col md="1">
                        <div className="mt-4">
                          <Button
                            color="danger"
                            type="reset"
                            onClick={() => setAccountType("")}
                          >
                            Reset
                          </Button>
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
                    paging={false}
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

export default withRouter(connect(mapStateToProps, { apiError })(AddWaste));

 AddWaste.propTypes = {
  error: PropTypes.any,
  wasteItems: PropTypes.array,
 };
