import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { MDBDataTable } from "mdbreact";
import toastr from "toastr";
import { Row, Col, Card, CardBody, Button, Label, Modal } from "reactstrap";
import SweetAlert from "react-bootstrap-sweetalert";
import Select from "react-select";
import {

  //getCustomerTypesOptions,
  //getDesignationsOptions,
  //getDistrictOptions,
  //getLocalbodyOptions,
  //getWardOptions,
  //getPackageOptions,
  //getBillingtypeOptions,
  getUsers,
  addUser,
  deleteUser,
  apiError,
  getPrivilagesOptions,
  getCompaniesOptions,
  getBranchesOptions,
  updateUser,
  getCustomers,
} from "../../../store/actions";

// Redux
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { AvForm, AvField } from "availity-reactstrap-validation";

//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb";
//import "./user.scss";

const Customers = (props) => {
  //edited

  //const [selectedCustomerType,setSelectedCustomerType]=useState(null); 
  //const[selectedDesignation,setSelectedDesignation]=useState(null);
  //const[selectedDistrict,setSelectedDistrict]=useState(null);
  //const[selectedLocalbody,setSelectedLocalbody]=useState(null);
  //const[selectedWard,setSelectedWard]=useState(null);
  //const[selectedPackage,setSelectedPackage]=useState(null);
  //const[selectedBillingtype,setSelectedBillingtype]=useState(null);
  
  const [selectedPrivilage, setSelectedPrivilage] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [userObject, setUserObject] = useState({});
  const [userIdTobeUpdated, setUserIdToBeUpdated] = useState(null);
  const [userIdToBeDeleted, setUserIdToBeDeleted] = useState(null);
  const [confirmDeleteAlert, setConfirmDeleteAlert] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [usersForTable, setUsersForTable] = useState([]);

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
  customers
}=useSelector((state)=>state.customers);
  //edited
  
  // const customertypeOptions = useSelector(
  //   (state)=> state.customertypes.customertypeOptions
  // );

  // const designationOptions = useSelector(
  //   (state)=> state.designations.designationOptions
  // );

  // const districtOptions = useSelector(
  //   (state)=> state.districts.districtOptions
  // );

  // const localbodyOptions = useSelector(
  //   (state)=> state.localbodies.localbodyOptions
  // );

  // const WardOptions = useSelector(
  //   (state)=> state.wards.wardsOptions
  // );

  // const PackageOptions = useSelector(
  //   (state)=> state.packages.packageOptions
  // );

  // const BillingtypeOptions = useSelector(
  //   (state)=> state.billingtypes.billingtypeOptions
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
    dispatch(getCustomers())
    //dispatch(getUsers());
    //dispatch(getPrivilagesOptions());
   // dispatch(getCompaniesOptions());
    //edited
   //dispatch(getCustomerTypesOptions());
    //dispatch(getDesignationOptions());
    //dispatch(getDistrictOptions());
    //dispatch(getLocalbodyOptions());
    //dispatch(getWardOptions());
    //dispatch(getPackageOptions());
    //dispatch(getBillingtypeOptions());
  }, []);

  useEffect(() => {
    if (selectedCompany !== null) {
      dispatch(getBranchesOptions(selectedCompany.value));
    }
  }, [selectedCompany]);

  useEffect(() => {
    if (addUserResponse.type === "success") {
      toastr.success(addUserResponse.message);
      setSelectedPrivilage({});
      setSelectedCompany(null);
      setSelectedBranch(null);
      //edited
      //setSelectedCustomerType(null);
      //setSelectedDesignation(null);
      //setSelectedDistrict(null);
      //selectedLocalbody(null);
      //selectedWard(null);
      //selectedPackage(null);
      //selectedBillingtype(null);


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

  let preUpdateUser = (item) => {
    //edited 

    // if (item.customertype) {
    //   let customertype = {
    //     label:item.customertype.name,
    //     value: item.customertype._id,
    //   };
    //   handleSelectedCustomerType(customertype);
    // }

    // if (item.designation) {
    //   let designation = {
    //     label:item.designation.name,
    //     value: item.designation._id,
    //   };
    //   handleSelectedDesignation(designation);
    // }

    // if (item.district) {
    //   let district = {
    //     label:item.district.name,
    //     value: item.district._id,
    //   };
    //   handleSelectedDistrict(district);
    // }

    // if (item.localbody) {
    //   let localbody = {
    //     label:item.localbody.name,
    //     value: item.localbody._id,
    //   };
    //   handleSelectedLocalbody(Localbody);
    // }

    // if (item.ward) {
    //   let ward = {
    //     label:item.ward.name,
    //     value: item.ward._id,
    //   };
    //   handleSelectedWard(Ward);
    // }

    
    // if (item.package) {
    //   let package = {
    //     label:item.package.name,
    //     value: item.package._id,
    //   };
    //   handleSelectedPackage(package);
    // }


     // if (item.billingtype) {
    //   let Billingtype = {
    //     label:item.billingtype.name,
    //     value: item.billingtype._id,
    //   };
    //   handleSelectedBillingtype(package);
    // }


    if (item.privilage) {
      let privilage = {
        label: item.privilage.name,
        value: item.privilage._id,
      };
      handleSelectedPrivilage(privilage);
    }
    if (item.company) {
      let company = {
        label: item.company.name,
        value: item.company._id,
      };
      handleSelectedCompany(company);
    }
    if (item.branch) {
      let branch = {
        label: item.branch.name,
        value: item.branch._id,
      };
      handleSelectedBranch(branch);
    }

    setUserIdToBeUpdated(item._id);
    setUserObject({ ...item, password: null });
  };

  let preUpdateUserPassword = (item) => {
    setUserIdToBeUpdated(item._id);
    setShowModal(true);
  };

  useEffect(() => {
    let customerData = [];

    customers.map((item, index) => {
      item.action = (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <i
            className="uil-key-skeleton"
            style={{ fontSize: "1.3em", cursor: "pointer" }}
            onClick={() => {
              preUpdateUserPassword(item);
            }}
          ></i>
          <i
            className="uil-edit-alt"
            style={{
              fontSize: "1.3em",
              cursor: "pointer",
              marginLeft: "1rem",
              marginRight: "1rem",
            }}
            onClick={() => {
              preUpdateUser(item);
            }}
          ></i>
          <i
            className="uil-trash-alt"
            style={{ fontSize: "1.3em", cursor: "pointer" }}
            onClick={() => {
              setUserIdToBeDeleted(item._id);
              setConfirmDeleteAlert(true);
            }}
          ></i>
        </div>
      );
      item.id = index + 1;
      item.name1 = `${item.firstName} ${item.lastName}`;
      item.privilage1 = item.privilage && item.privilage.name;
      item.company1 = item.company && item.company.name;
      item.branch1 = item.branch && item.branch.name;
    // item.type=item.cust_type.customer_type_name;
    //item.district=item.district.district_name
      item.localbody="localbody name";
      item.ward="ward name"
      customerData.push(item);
    });
    setUsersForTable(customerData);
  }, [customers]);

  const data = {
    columns: [
              {
                label: "#",
                field: "id",
                sort: "asc",
                width: 150,
              },
              {
                label: "Reg No",
                field: "cust_reg_no",
                sort: "asc",
                width: 400,
              },
              {
                label: "Type",
                field: "type",
                sort: "asc",
                width: 200,
              },
              {
                label: "Name",
                field: "cust_name",
                sort: "asc",
                width: 200,
              },
              {
                label: "Phone",
                field: "cust_phone",
                sort: "asc",
                width: 200,
              },
             
              {
                label: "District",
                field: "district",
                sort: "asc",
                width: 150,
              },
              {
                label: "Localbody",
                field: "localbody",
                sort: "asc",
                width: 150,
              },
              {
                label: "Ward",
                field: "ward",
                sort: "asc",
                width: 100,
              },
              {
                label: "Staff",
                field: "staff",
                sort: "asc",
                width: 100,
              },
              {
                label: "Verification Status",
                field: "verification status",
                sort: "asc",
                width: 100,
              },
              {
                label: "Action",
                field: "action",
                width: 300,
              },
            ],
    rows: usersForTable,
  };

  //edited 
  
  //  let customerTypeOptionsData =
  //     customertypeOptions &&
  //     customertypeOptions.data &&
  //     customertypeOptions.data.map((item) => {
  //       return {
  //         label: item.name,
  //         value: item._id,
  //       };
  //     });

  //  let designationData =
  //     designationOptions &&
  //     designationOptions.data &&
  //     designationOptions.data.map((item) => {
  //       return {
  //         label: item.name,
  //         value: item._id,
  //       };
  //     });

  //  let districtData =
  //     districtOptions &&
  //     districtOptions.data &&
  //     districtOptions.data.map((item) => {
  //       return {
  //         label: item.name,
  //         value: item._id,
  //       };
  //     });

  //  let localbodyData =
  //     localbodyOptions &&
  //     localbodyOptionsdata &&
  //     localbodyOptions.data.map((item) => {
  //       return {
  //         label: item.name,
  //         value: item._id,
  //       };
  //     });

  //  let wardData =
  //     wardOptions &&
  //     wardOptionsdata &&
  //     wardOptions.data.map((item) => {
  //       return {
  //         label: item.name,
  //         value: item._id,
  //       };
  //     });

  //  let packagaData =
  //     packageOptions &&
  //     packageOptionsdata &&
  //     packageOptions.data.map((item) => {
  //       return {
  //         label: item.name,
  //         value: item._id,
  //       };
  //     });

  //  let billingtypeData =
  //     billingtypeOptions &&
  //     billingtypeOptionsdata &&
  //     billingtypeOptions.data.map((item) => {
  //       return {
  //         label: item.name,
  //         value: item._id,
  //       };
  //     });


  let privilagesOptionsData =
    privilagesOptions &&
    privilagesOptions.data &&
    privilagesOptions.data.map((item) => {
      return {
        label: item.name,
        value: item._id,
      };
    });

  let companiesOptionsData =
    companiesOptions &&
    companiesOptions.data &&
    companiesOptions.data.map((item) => {
      return {
        label: item.name,
        value: item._id,
      };
    });

  let branchesOptionsData =
    branchesOptions &&
    branchesOptions.data &&
    branchesOptions.data.map((item) => {
      return {
        label: item.name,
        value: item._id,
      };
    });

    //edited

    // const customertypeOptionsGroup = [
    //   {
    //     options:customerTypeOptionsData,
    //   },
    // ];


    // const designationOptionsGroup = [
    //   {
    //     options:designationOptionsData,
    //   },
    // ];

   // const districtOptionsGroup = [
    //   {
    //     options:districtOptionsData,
    //   },
    // ];

    // const localbodyOptionsGroup = [
    //   {
    //     options:localbodyOptionsData,
    //   },
    // ];

    // const wardOptionsGroup = [
    //   {
    //     options:wardOptionsData,
    //   },
    // ];

    // const packageOptionsGroup = [
    //   {
    //     options:packageOptionsData,
    //   },
    // ];

    // const billingtypeOptionsGroup = [
    //   {
    //     options:billingtypeOptionsData,
    //   },
    // ];

  const privilagesOptionsGroup = [
    {
      options: privilagesOptionsData,
    },
  ];

  const companiesOptionsGroup = [
    {
      options: companiesOptionsData,
    },
  ];

  const branchesOptionsGroup = [
    {
      options: branchesOptionsData,
    },
  ];

  function handleChangeCustomer(e) {
    let name = e.target.name;
    let value = e.target.value;
    setUserObject({ ...userObject, [name]: value });
  }

  //edited

  // function  handleSelectedCustomerType(value) {
  //   let newValue = {
  //     name: value.label,
  //     _id: value.value,
  //   };
  //   setSelectedCustomerType(value);
  //   setUserObject({ ...userObject, customertype: newValue });
  // }

  // function  handleSelectedDesignation(value) {
  //   let newValue = {
  //     name: value.label,
  //     _id: value.value,
  //   };
  //   setSelectedDesignation(value);
  //   setUserObject({ ...userObject, designation: newValue });
  // }

  // function  handleSelectedDistrict(value) {
  //   let newValue = {
  //     name: value.label,
  //     _id: value.value,
  //   };
  //   setSelectedDistrict(value);
  //   setUserObject({ ...userObject, district: newValue });
  // }

  // function  handleSelectedLocalbody(value) {
  //   let newValue = {
  //     name: value.label,
  //     _id: value.value,
  //   };
  //   setSelectedLocalbody(value);
  //   setUserObject({ ...userObject, localbody: newValue });
  // }

   // function  handleSelectedWard(value) {
    //   let newValue = {
    //     name: value.label,
    //     _id: value.value,
    //   };
    //   setSelectedWard(value);
    //   setUserObject({ ...userObject, ward: newValue });
    // }

    // function  handleSelectedPackage(value) {
    //   let newValue = {
    //     name: value.label,
    //     _id: value.value,
    //   };
    //   setSelectedPackage(value);
    //   setUserObject({ ...userObject, package: newValue });
    // }
  
    // function  handleSelectedBillingtype(value) {
    //   let newValue = {
    //     name: value.label,
    //     _id: value.value,
    //   };
    //   setSelectedBillingtype(value);
    //   setUserObject({ ...userObject, billingtype: newValue });
    // }
  
  
    function handleSelectedPrivilage(value) {
    let newValue = {
      name: value.label,
      _id: value.value,
    };
    setSelectedPrivilage(value);
    setUserObject({ ...userObject, privilage: newValue });
  }

  function handleSelectedCompany(value) {
    let newValue = {
      name: value.label,
      _id: value.value,
    };
    setSelectedCompany(value);
    setUserObject({ ...userObject, company: newValue });
  }
  function handleSelectedBranch(value) {
    let newValue = {
      name: value.label,
      _id: value.value,
    };
    setSelectedBranch(value);
    setUserObject({ ...userObject, branch: newValue });
  }

  function handleChangePassword(e) {
    let name = e.target.name;
    let value = e.target.value;
    setPasswordObject({ ...passwordObject, [name]: value });
  }

  const handleValidSubmit = (event, values) => {
    userIdTobeUpdated
      ? dispatch(updateUser(userObject))
      : dispatch(addUser(userObject));
  };

  const handleValidSubmitPassword = (event, values) => {
    if (passwordObject.password == passwordObject.confirmPassword) {
      let item = {
        _id: userIdTobeUpdated,
        password: passwordObject.password,
      };
      dispatch(updateUser(item));
    } else {
      toastr.error("Passwords are not matching");
    }
  };

  let closeModal = () => {
    setShowModal(false);
    setUserIdToBeUpdated(null);
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
            dispatch(deleteUser(userIdToBeDeleted));
            setConfirmDeleteAlert(false);
          }}
          onCancel={() => setConfirmDeleteAlert(false)}
        >
          Are you sure you want to delete it?
        </SweetAlert>
      ) : null}

      <Modal
        isOpen={showModal}
        toggle={() => {
          closeModal();
        }}
        centered={true}
      >
        <div className="modal-header">
          <h5 className="modal-title mt-0">Confirmation</h5>
          <button
            type="button"
            onClick={() => {
              closeModal();
            }}
            className="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <AvForm
          className="needs-validation"
          onValidSubmit={(e, v) => {
            handleValidSubmitPassword(e, v);
          }}
        >
          <div className="modal-body">
            {/* <Row>
              <Col md="12">
                <div className="mb-3">
                  <Label htmlFor="validationCustom05">Password</Label>
                  <AvField
                    name="password"
                    placeholder="Password"
                    type="password"
                    errorMessage=" Please provide a valid password"
                    className="form-control"
                    validate={{ required: { value: true } }}
                    id="validationCustom05"
                    value={passwordObject.password}
                    onChange={handleChangePassword}
                  />
                </div>
              </Col>
              <Col md="12">
                <div className="mb-3">
                  <Label htmlFor="validationCustom05">Confirm Password</Label>
                  <AvField
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    type="password"
                    errorMessage=" Please confirm the password"
                    className="form-control"
                    validate={{ required: { value: true } }}
                    id="validationCustom05"
                    value={passwordObject.confirmPassword}
                    onChange={handleChangePassword}
                  />
                </div>
              </Col>
            </Row> */}
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-dark"
              style={{ marginRight: "1rem" }}
              onClick={closeModal}
            >
              Close
            </button>
            <button className="btn btn-primary" type="submit">
              Confirm
            </button>
          </div>
        </AvForm>
      </Modal>

      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs title="Home" breadcrumbItem="Manage Customers" />
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
                          <Label>Customer Type</Label>
                           <Select
                            name="customer type"
                             //edited 
                             //value={selectedCustomerType}
                            value={selectedPrivilage}
                            onChange={(value) => {
                             //edited 
                             //handleSelectedCustomerType(value);
                             handleSelectedPrivilage(value);
                            }}
                            //edited
                            //options={customertypeOptionsGroup}
                            options={privilagesOptionsGroup}
                            classNamePrefix="select2-selection"
                          />
                        </div>
                      </Col>
                      <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom02">Name</Label>
                          <AvField
                            name="Name"
                            placeholder="Name"
                            type="text"
                            errorMessage="Enter name"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom02"
                            value={userObject.Name}
                            onChange={handleChangeCustomer}
                          />
                        </div>
                      </Col>

                      <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom03">Phone</Label>
                          <AvField
                            name="phone"
                            placeholder="Phone"
                            type="text"
                            errorMessage="Enter valid phone"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom03"
                            value={userObject.phone}
                            onChange={handleChangeCustomer}
                          />
                        </div>
                      </Col>
                      <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom03">Land line number</Label>
                          <AvField
                            name="landnum"
                            placeholder="Land line number"
                            type="text"
                            errorMessage="Enter valid number"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom03"
                            value={userObject.landlineno}
                            onChange={handleChangeCustomer}
                          />
                        </div>
                      </Col>
                      <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom01">Watsapp Number</Label>
                          <AvField
                            name="watsapp number"
                            placeholder="Watsapp number"
                            type="text"
                            errorMessage="Enter Watsapp number"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom01"
                            value={userObject.watsappno}
                            onChange={handleChangeCustomer}
                          />
                        </div>
                      </Col>
                      <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom01">Email</Label>
                          <AvField
                            name="email"
                            placeholder="Email"
                            type="text"
                            errorMessage="Enter Email"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom01"
                            value={userObject.email}
                            onChange={handleChangeCustomer}
                          />
                        </div>
                      </Col>
                      <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom01">Address</Label>
                          <AvField
                            name="address"
                            placeholder="Address"
                            type="text"
                            errorMessage="Enter Address"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom01"
                            value={userObject.address}
                            onChange={handleChangeCustomer}
                          />
                        </div>
                      </Col>
                      <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom01">Address 1</Label>
                          <AvField
                            name="Address1"
                            placeholder="Address1"
                            type="text"
                            errorMessage="Enter Address1"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom01"
                            value={userObject.address1}
                            onChange={handleChangeCustomer}
                          />
                        </div>
                      </Col>
                      <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom01">House No</Label>
                          <AvField
                            name="House no"
                            placeholder="House No"
                            type="text"
                            errorMessage="Enter House no"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom01"
                            value={userObject.houseno}
                            onChange={handleChangeCustomer}
                          />
                        </div>
                      </Col>
                      <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom01">Number of Members</Label>
                          <AvField
                            name="Number of Members"
                            placeholder="Number of Members"
                            type="text"
                            errorMessage="Enter number of members"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom01"
                            value={userObject.noofmembers}
                            onChange={handleChangeCustomer}
                          />
                        </div>
                      </Col>
                      <Col md="3">
                        <div className="mb-3">
                          <Label>Designation</Label>
                          <Select
                            name="Designation"
                            //edited
                            //value={selectedDesignation}
                            value={selectedPrivilage}
                            onChange={(value) => {
                              //edited
                              //handleSelectedDesignation(value)
                              handleSelectedPrivilage(value);
                            }}
                            //edited
                            //options={designationOptionGroup}
                            options={privilagesOptionsGroup}
                            classNamePrefix="select2-selection"
                          />
                        </div>
                      </Col>
                      <Col md="3">
                        <div className="mb-3">
                          <Label>District</Label>
                          <Select
                            name="District"
                            //edited
                            //value={selectedDistrict}
                            value={selectedPrivilage}
                            onChange={(value) => {
                              //edited
                              //handleSelectedDistrict(value)
                              handleSelectedPrivilage(value);
                            }}
                            //edited
                            //options={districtOptionGroup}
                            options={privilagesOptionsGroup}
                            classNamePrefix="select2-selection"
                          />
                        </div>
                      </Col>
                      <Col md="3">
                        <div className="mb-3">
                          <Label>Local Body</Label>
                          <Select
                            name="Local Body"
                            //edited
                            //value={selectedLocalbody}
                            value={selectedPrivilage}
                            onChange={(value) => {
                               //edited
                              //handleSelectedLocalbody(value)
                              handleSelectedPrivilage(value);
                            }}
                            //edited
                            //options={localbodyOptionGroup}
                            options={privilagesOptionsGroup}
                            classNamePrefix="select2-selection"
                          />
                        </div>
                      </Col>
                      <Col md="3">
                        <div className="mb-3">
                          <Label>Ward</Label>
                          <Select
                            name="Ward"
                            //edited
                            //value={selectedWard}
                            value={selectedPrivilage}
                            onChange={(value) => {
                              //edited
                              //handleSelectedWard(value)
                              handleSelectedPrivilage(value);
                            }}
                            //edited
                            //options={wardOptionGroup}
                            options={privilagesOptionsGroup}
                            classNamePrefix="select2-selection"
                          />
                        </div>
                      </Col>
                      <Col md="3">
                        <div className="mb-3">
                          <Label>Packages</Label>
                          <Select
                            name="Packages"
                            //edited
                            //value={selectedPackage}
                            value={selectedCompany}
                            onChange={(value) => {
                               //edited
                              //handleSelectedPackage(value)
                              handleSelectedCompany(value);
                            }}
                            //edited
                            //options={packageOptionGroup}
                            options={companiesOptionsGroup}
                            classNamePrefix="select2-selection"
                          />
                        </div>
                      </Col>
                      <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom01">Group</Label>
                          <AvField
                            name="Group"
                            placeholder="Group"
                            type="text"
                            errorMessage="Enter Group"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom01"
                            value={userObject.group}
                            onChange={handleChangeCustomer}
                          />
                        </div>
                      </Col>
                      <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom01">Latitude</Label>
                          <AvField
                            name="Latitude"
                            placeholder="Latitude"
                            type="text"
                            errorMessage="Enter Latitude"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom01"
                            value={userObject.latitude}
                            onChange={handleChangeCustomer}
                          />
                        </div>
                      </Col>
                      <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom01">Longitude</Label>
                          <AvField
                            name="Longitude"
                            placeholder="Longitude"
                            type="text"
                            errorMessage="Enter Longitude"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom01"
                            value={userObject.longitude}
                            onChange={handleChangeCustomer}
                          />
                        </div>
                      </Col>
                       <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom02">Building Image</Label>
                          <AvField
                            name="mobile_icon_svg"
                            id="mobile_icon_svg"
                            type="file"
                            errorMessage="Upload  Image"
                            className="form-control"
                            //onChange={onChangeHandler}
                          />
                        </div>
                      </Col>
                      <Col md="3">
                        <div className="mb-3">
                          <Label>Billing Type</Label>
                          <Select
                            name="Billing Type"
                            //edited
                            //value={selectedBillingtype}
                            value={selectedCompany}
                            onChange={(value) => {
                               //edited
                              //handleSelectedBillingtype(value)
                              handleSelectedCompany(value);
                            }}
                            //edited
                            //options={BillingtypeOptionGroup}
                            options={companiesOptionsGroup}
                            classNamePrefix="select2-selection"
                          />
                        </div>
                      </Col>
                     
                     
                      {/* {userIdTobeUpdated ? null : (
                          <Col md="3">
                          <div className="mb-3">
                            <Label htmlFor="validationCustom05">Password</Label>
                            <AvField
                              name="password"
                              placeholder="Password"
                              type="password"
                              errorMessage=" Please provide a valid password"
                              className="form-control"
                              validate={{ required: { value: true } }}
                              id="validationCustom05"
                              value={userObject.password}
                              onChange={handleChangeUser}
                            />
                          </div>
                        </Col>
                        
                      )} */}
                    </Row>

                    {userIdTobeUpdated ? (
                      <Button
                        color="primary"
                        type="submit"
                        disabled={addingUser ? true : false}
                      >
                        {addingUser ? "Updating" : "Update"}
                      </Button>
                    ) : (
                      <Button
                        color="primary"
                        type="submit"
                        disabled={addingUser ? true : false}
                      >
                        {addingUser ? "Adding" : "Submit"}
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

export default withRouter(connect(mapStateToProps, { apiError })(Customers));

Customers.propTypes = {
  error: PropTypes.any,
  users: PropTypes.array,
};


















