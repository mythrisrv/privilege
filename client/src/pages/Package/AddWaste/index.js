import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { MDBDataTable } from "mdbreact";
import axios from "axios";
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
  Input,
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
  addWasteItem,
  updateWasteItem,
  deleteWasteItem
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
const API_URL = process.env.REACT_APP_APIURL;

  //  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [uploadProgress, setUploadProgress] = useState();
  const [selectedType, setSelectedType] = useState(null);
  const [category, setCategory] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [wasteObject, setWasteObject] = useState(null);
  const [itemsIdTobeUpdated, setItemsIdToBeUpdated] = useState(null);
  const [itemsIdToBeDeleted, setItemsIdToBeDeleted] = useState(null);
  const [confirmDeleteAlert, setConfirmDeleteAlert] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [wasteItemsForTable, setWasteItemsForTable] = useState([]);
  const [accountType, setAccountType] = useState("");
  const [itemname, setItemname] = useState("");
  const [bags, setBags] = useState("");
  const [weight, setWeight] = useState("");
  const [amount, setAmount] = useState("")
  const[selectedImage,setSelectedImage]=useState(null);
  const[loadedImage,setLoadedImage]=useState(null);

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
    addWasteItemResponse,
    updateWasteItemResponse,
    deleteWasteItemResponse,
    addingWasteItem,
    
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
    if (addWasteItemResponse.type === "success") {
      dispatch(getWasteItems())
      toastr.success(addWasteItemResponse.message);
     
      //  setSelectedDistrict(null);
    } else if (addWasteItemResponse.type === "failure") {
      toastr.error(error.data.message, addWasteItemResponse.message);
    }
  }, [addWasteItemResponse]);

  useEffect(() => {
    if (deleteWasteItemResponse.type === "success") {
     dispatch(getWasteItems())
      toastr.success(deleteWasteItemResponse.message);
      setItemsIdToBeDeleted(null);
    } else if (deleteWasteItemResponse.type === "failure") {
      toastr.error(error.data.message, deleteWasteItemResponse.message);
    }
  }, [deleteWasteItemResponse]);

  useEffect(() => {
    if (updateWasteItemResponse.type === "success") {
      setShowModal(false);
      setItemsIdToBeUpdated(null);
      setPasswordObject({});
      toastr.success(updateWasteItemResponse.message);
    } else if (updateWasteItemResponse.type === "failure") {
      toastr.error(error.data.message, updateWasteItemResponse.message);
    }
  }, [updateWasteItemResponse]);

     let preUpdateData = (item) => {
       console.log(item.image)
       setItemname(item.waste_items_name)
       setBags(item.waste_items_bag)
       setWeight(item.waste_items_weight)
       setAmount(item.waste_items_amount)
       
       if(item.waste_items_type){
       let waste_items_type={
         label:item.waste_items_type.waste_cat_name,
         value:item.waste_items_type.waste_cat_name,
       }
       handleSelectedType(waste_items_type)
     }
    if(item.waste_item_cat){
      let waste_item_cat={
        label:item.waste_item_cat.waste_category_name,
        value:item.waste_item_cat.waste_category_name,
      }
      handleChangeCategory(waste_item_cat)
    }
    if(item.waste_items_image)
    {
      
     
    
    
    

     // setSelectedImage(`${API_URL}uploads/waste_images/${item.waste_items_image[0].img}`)
    setLoadedImage(`${API_URL}uploads/waste_images/${item.waste_items_image[0].img}`)
    
    }
   // console.log(wasteObject.category._id)
    setItemsIdToBeUpdated(item._id)
     setWasteObject({...item,password:null})
    }
   
    console.log(itemname)
    console.log(wasteObject)
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
      item.image=(
        <div style={{display:"flex",justifyContent:"space-evenly", height:"70px" ,with:"100px"}}>
          <img src={`${API_URL}uploads/waste_images/${item.waste_items_image[0].img}`}></img>
        </div>

      );
      item.active = (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div
            className=""
            style={{
              cursor: "pointer",
              color: "black",
              fontSize: ".7em",
              padding: ".5rem",
              borderRadius: ".3rem",
              background: "#fb6262",
            }}
            //onClick={() => }
          >
            Active
          </div>
        </div>
      );
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
                setItemsIdToBeDeleted(item._id);
                 setConfirmDeleteAlert(true);
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
     // item.image=item.waste_items_image[0].img
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
        field: "waste_items_weight",
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
        field: "active",
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
  const handleValidSubmit = (event, values) => {
const data=new FormData();
 data.append("id",itemsIdTobeUpdated)
data.append("name",itemname)
data.append("bags",bags)
data.append("weight",weight)
data.append("amount",amount)
data.append("category",category.value)
data.append("Type",selectedType.value)
data.append("file",selectedImage)

const update=new FormData();
/*update.append("id",itemsIdTobeUpdated)
if(wasteObject.Amount){
update.append("amount",wasteObject.Amount)}
if(wasteObject.WasteItem){
update.append("itemname",wasteObject.WasteItem)}
if(wasteObject.category._id){
update.append("category",wasteObject.category._id)}
if(wasteObject.wasteType){
update.append("Type",wasteObject.wasteType._id)}
if(wasteObject.Kg){
update.append("kg",wasteObject.Kg)}
if(wasteObject.bags){
update.append("Bags",wasteObject.bags)}
update.append("imageId",wasteObject.waste_items_image._id)*/
update.append("id",itemsIdTobeUpdated)
update.append("body",JSON.stringify(wasteObject))
update.append("file",wasteObject.image)
//console.log(data)
    itemsIdTobeUpdated
      ? 
     
      dispatch(updateWasteItem(update))
     : dispatch(addWasteItem(data));
     setSelectedType(null);
     setCategory(null);
     setBags("");
     setWeight("");
     setAmount("");
     setItemname("");
     setLoadedImage(null);
    //axios.post("http://localhost:3099/wasteItems/upload",data).then(res=>console.log(res))
  
  };

    function handleSelectedType(value) {
     // console.log(value )
      //console.log(e)
      let newValue = {
        name: value.label,
         _id: value.value,
       };
      setSelectedType(value);
     setWasteObject({ ...wasteObject, wasteType: newValue });
    }
    function handleChangeCategory(value) {
     // console.log(value )
      //console.log(e)
      let newValue = {
        name: value.label,
         _id: value.value,
       };
      setCategory(value);
     setWasteObject({ ...wasteObject, category: newValue });
    }
   
    function handleChangeItemname(e) {
     let name=e.target.name;
     let value=e.target.value;
    
      setItemname(value);
     setWasteObject({ ...wasteObject, [name]: value});
    }
    function handleChangeBags(e) {
      let name=e.target.name;
      let value=e.target.value;
     
       setBags(value);
      setWasteObject({ ...wasteObject, [name]: value});
     }
     function handleChangeWeight(e) {
      let name=e.target.name;
      let value=e.target.value;
     
       setWeight(value);
      setWasteObject({ ...wasteObject, [name]: value});
     }
     function handleChangeAmount(e) {
      let name=e.target.name;
      let value=e.target.value;
     
       setAmount(value);
      setWasteObject({ ...wasteObject, [name]: value});
     }
     function handleSelectedImage(e){
       console.log(e)
      let  name=e.target.name;
     let  value=e.target.files[0];
       

setLoadedImage(URL.createObjectURL(value))
       setSelectedImage(value)
       setWasteObject({ ...wasteObject, [name]:value});
     }
     
     console.log(selectedImage)
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
       {confirmDeleteAlert ? (
        <SweetAlert
          title=""
          showCancel
          confirmButtonText="Delete"
          confirmBtnBsStyle="success"
          cancelBtnBsStyle="danger"
          onConfirm={() => {
            dispatch(deleteWasteItem(itemsIdToBeDeleted));
            setConfirmDeleteAlert(false);
          }}
          onCancel={() => setConfirmDeleteAlert(false)}
        >
          Are you sure you want to delete it?
        </SweetAlert>
      ) : null}
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs title="Home" breadcrumbItem="Add Waste" />
          <Row>
            <Col xl="12">
              <Card>
                <CardBody>
                  <AvForm
                    className="form-control"
                     onValidSubmit={(e, v) => {
                       handleValidSubmit(e, v);
                     }}
                    enctype="multipart/form-data" 
                  >
                    <Row>
                      <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom05">Waste Item</Label>
                          <AvField
                            name="WasteItem"
                            placeholder=""
                            type="text"
                            value={itemname}
                            errorMessage="Enter Waste Item"
                            className="form-control"
                           // validate={{ required: { value: true } }}
                            id="validationCustom05"
                           onChange={handleChangeItemname}
                           
                          />
                        </div>
                      </Col>
                      <Col md="3">
                        <div className="mb-3">
                          <Label>Waste Category</Label>
                          <Select
                            name="waste_category"
                            value={category}
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
                          onChange={handleChangeCategory}
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
                            No.of Bags
                          </Label>
                          <AvField
                            name="bags"
                            placeholder=""
                            type="text"
                            value={bags}
                            errorMessage="Enter No. of Pages"
                            className="form-control"
                            //validate={{ required: { value: true } }}
                            id="validationCustom05"
                            onChange={handleChangeBags}
                          />
                        </div>
                      </Col>
                      <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom05">No. of Kg</Label>
                          <AvField
                            name="Kg"
                            placeholder="No. of Kg"
                            value={weight}
                            type="text"
                            errorMessage="Enter No. of Kg"
                            className="form-control"
                            //validate={{ required: { value: true } }}
                            id="validationCustom05"
                            onChange={handleChangeWeight}
                          />
                        </div>
                      </Col>
                      <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom05">Amount</Label>
                          <AvField
                            name="Amount"
                            placeholder="Amount"
                            value={amount}
                            type="text"
                            errorMessage="Enter Amount"
                            className="form-control"
                            //validate={{ required: { value: true } }}
                            id="validationCustom05"
                            onChange={handleChangeAmount}
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
                              name="image"
                              type="file"
                              errorMessage="Select Image"
                              className="form-control"
                              id="myImageInput"
                              
                              enctype="multipart/form-data"
                             
                              
                              onChange={handleSelectedImage}
                              //  id="getFile" style={{display:"none"}}
                              // onChange={handleChangeInput}
                            //   onChange={uploadImage}
                            />
                            <img src={loadedImage} style={{height:"30px"}}></img>
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
                    <Col>
                     <div className="mb-3" style={{paddingTop:"30px"}}>
                     {itemsIdTobeUpdated ? (
                      <Button
                        color="primary"
                        type="submit"
                        disabled={addingWasteItem ? true : false}
                       
                      >
                        {addingWasteItem ? "Updating" : "Update"}
                      </Button>
                    ) : (
                      <Button
                        color="primary"
                        type="submit"
                        disabled={addingWasteItem ? true : false}
                       >
                        {addingWasteItem ? "Adding" : "Submit"}
                        
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
