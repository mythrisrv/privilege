import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { MDBDataTable } from "mdbreact";
import toastr from "toastr";
import { Row, Col, Card, CardBody, Button, Label, Modal } from "reactstrap";
import SweetAlert from "react-bootstrap-sweetalert";
import Select from "react-select";
import MyDocument from "./Document";
import { PDFViewer,Image } from '@react-pdf/renderer';
import {
  getUsers,
  addUser,
  deleteUser,
  apiError,
  getPrivilagesOptions,
  getCompaniesOptions,
  getBranchesOptions,
  updateUser,
  getLocalbodies,
  addQrcode,
  getQrcode,
  getQrcodesSuccess,
  getQrcodeFail
  //getPrivilagesOptions,
} from "../../../store/actions";

// Redux
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { AvForm, AvField } from "availity-reactstrap-validation";

//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb";
// import "./user.scss";

const QrCode = (props) => {
  //  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedPrivilage, setSelectedPrivilage] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [qrObject, setQrObject] = useState({});
  const [userIdTobeUpdated, setUserIdToBeUpdated] = useState(null);
  const [userIdToBeDeleted, setUserIdToBeDeleted] = useState(null);
  const [confirmDeleteAlert, setConfirmDeleteAlert] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [qrDataForTable, setqrDataForTable] = useState([]);
  const [accountType, setAccountType] = useState("");
  const [image, setImage] = useState("");
  const [localbody,setLocalbody]=useState(null);
  const[start,setStart]=useState("");
  const[end,setEnd]=useState("");

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

  // const districtsOptions = useSelector(
  //   (state) => state.districts.districtsOptions
  // );
  
const {localbodies}=useSelector((state)=>state.localbodies)
const {qrcodes,adding,addResponse}=useSelector((state)=>state.qrcodes)

  const dispatch = useDispatch();

  useEffect(() => {
   
    dispatch(getLocalbodies())
    dispatch(getQrcode())
    //  dispatch(getDistrictsOptions());
  }, []);

  useEffect(() => {
    if (selectedCompany !== null) {
      dispatch(getBranchesOptions(selectedCompany.value));
    }
  }, [selectedCompany]);

  useEffect(() => {
    if (addResponse.type === "success") {
      dispatch(getQrcode())
      toastr.success(addUserResponse.message);
      setSelectedPrivilage({});
      setSelectedCompany(null);
      setSelectedBranch(null);
      //  setSelectedDistrict(null);
    } else if (addResponse.type === "failure") {
      toastr.error(error.data.message, addUserResponse.message);
    }
  }, [addResponse]);

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

  //   let preUpdateUser = (item) => {
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
 
  function viewpdf(){
    console.log("hai")
    return(
      <Image
  style={{  width: 500,
    height: 500,}}
  src="https://image.shutterstock.com/image-photo/tiny-floating-house-on-lake-600w-1980476267.jpg"
/> 
    )

  }
  useEffect(() => {
   
    let qrData = [];

    qrcodes?.map((item, index) => {
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
              background: "#00bcd4",
            }}
           
          >
              View PDF
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
              //   preUpdateUser(item);
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
      if(item.qrcode_localbody_id!=null)
        item.localbody = item.qrcode_localbody_id.localbody_name;
        if(item.qrcode_addedby!=null)
        item.user=item.qrcode_addedby.username
      //   item.branch1 = item.branch && item.branch.name;
         qrData.push(item);
    });
     setqrDataForTable(qrData);
  }, [qrcodes]);

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
        field: "qrcode_date",
        sort: "asc",
        width: 400,
      },
      {
        label: "Time	",
        field: "qrcode_time",
        sort: "asc",
        width: 200,
      },
      {
        label: "Local Body",
        field: "localbody",
        width: 300,
      },
      {
        label: "Added By",
        field: "user",
        width: 300,
      },
      {
        label: "Action",
        field: "active",
        width: 300,
      },
    ],
    rows: qrDataForTable,
  };

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
  function handleChangeLocalbody(value) {
    // console.log(value )
     //console.log(e)
     let newValue = {
       name: value.label,
        _id: value.value,
      };
     setLocalbody(value);
    setQrObject({ ...qrObject, localbody: newValue });
   }
    function handleChangeStart(e) {
       let name = e.target.name;
      let value = e.target.value;
      setQrObject({ ...qrObject, [name]: value });
     }
     function handleChangeEnd(e) {
      let name = e.target.name;
     let value = e.target.value;
     setQrObject({ ...qrObject, [name]: value });
    }

    const handleValidSubmit = (event, values) => {
     
         dispatch(addQrcode(qrObject));
       
       
    };

  //   function handleSelectedPrivilage(value) {
  //     let newValue = {
  //       name: value.label,
  //       _id: value.value,
  //     };
  //     setSelectedPrivilage(value);
  //     setUserObject({ ...userObject, privilage: newValue });
  //   }

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
  // handleClick(){
     
 // let uri=data.toDataURl('image/png',0.3)
 // setImage(uri)
  //}

  //   let closeModal = () => {
  //     setShowModal(false);
  //     setUserIdToBeUpdated(null);
  //   };

  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs title="Home" breadcrumbItem="Qr Code" />
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
                            name="customer_community_id"
                            //   value={selectCommunity}
                            //   onChange={(value) => {
                            //     handleSelectedCommunities(value);
                            //   }}
                              options={localbodies?.map((data)=>{
                                return{
                                  label:data.localbody_name,
                                  value:data._id,
                                  key:data._id,
                                }
                              })}
                            classNamePrefix="select2-selection"
                            onChange={handleChangeLocalbody}
                          />
                        </div>
                      </Col>
                      <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom05">Start</Label>
                          <AvField
                            name="Start"
                            placeholder="Start"
                            type="text"
                            errorMessage="Enter Start"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom05"
                            onChange={handleChangeStart}
                          />
                        </div>
                      </Col>
                      <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom05">End</Label>
                          <AvField
                            name="End"
                            placeholder="End"
                            type="text"
                            errorMessage="Enter End"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom05"
                            onChange={handleChangeEnd}
                          />
                        </div>
                      </Col>
                      <Col md="2">
                        <div className="mt-4">
                          <Button color="primary" type="submit"
                         >
                            Generate Qr Code
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
                         <div>
                           {
                             image ?
                             <PDFViewer> <MyDocument src={image}/></PDFViewer> : null
                           }
                         </div>*/
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

export default withRouter(connect(mapStateToProps, { apiError })(QrCode));

 QrCode.propTypes = {
  error: PropTypes.any,
  qrcodes: PropTypes.array,
 };
