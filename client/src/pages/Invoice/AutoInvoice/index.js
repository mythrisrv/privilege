import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { MDBDataTable } from "mdbreact";
import toastr from "toastr";
import { Row, Col, Card, CardBody, Button, Label, Modal } from "reactstrap";
import SweetAlert from "react-bootstrap-sweetalert";
import Select from "react-select";
import LoopIcon from "@mui/icons-material/Loop";
import moment from "moment";
import {
  getUsers,
  addUser,
  deleteUser,
  apiError,
  getPrivilagesOptions,
  getCompaniesOptions,
  getBranchesOptions,
  updateUser,
  getInvoiceList,
  getGroupOptions
  //getPrivilagesOptions,
} from "../../../store/actions";

// Redux
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { AvForm, AvField } from "availity-reactstrap-validation";

//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb";
// import "./user.scss";

const AutoInvoice = (props) => {
  //  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedPrivilage, setSelectedPrivilage] = useState(null);
  const [selectedStaff, setSelectedStaff] = useState({});
  const [selectedGroup, setSelectedGroup] = useState({});
  const [userObject, setUserObject] = useState({});
  const [userIdTobeUpdated, setUserIdToBeUpdated] = useState(null);
  const [userIdToBeDeleted, setUserIdToBeDeleted] = useState(null);
  const [confirmDeleteAlert, setConfirmDeleteAlert] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [invoiceForTable, setInvoiceForTable] = useState([]);
  const [accountType, setAccountType] = useState("");
  const [filteredData, setFilteredData] = useState(null);

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

  const privilagesOptions = useSelector(
    (state) => state.privilages.privilagesOptions
  );
  const companiesOptions = useSelector(
    (state) => state.companies.companiesOptions
  );
  const {groupOptions} = useSelector(
    (state) => state.groups
  );
  const {invoiceList} = useSelector(
    (state) => state.invoice
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getPrivilagesOptions());
    dispatch(getCompaniesOptions());
    //  dispatch(getDistrictsOptions());

    dispatch(getInvoiceList())
    dispatch(getGroupOptions())
  }, []);

 

  useEffect(() => {
    if (addUserResponse.type === "success") {
      toastr.success(addUserResponse.message);
      setSelectedPrivilage({});
      
      //setSelectedBranch(null);
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

  useEffect(() => {
    let invoiceData = [];

    invoiceList?.map((item, index) => {
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
            className="uil uil-eye"
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
         
        </div>
      );
        item.id = index + 1;
        if(item.invoiceDate){
          const format2 = "DD-MM-YYYY"
         
          
      item.invoicedate = moment(item.invoiceDate).format(format2);

        }
      //   item.name1 = `${item.firstName} ${item.lastName}`;

      //   item.privilage1 = item.privilage && item.privilage.name;
      //   item.company1 = item.company && item.company.name;
      //   item.branch1 = item.branch && item.branch.name;
        invoiceData.push(item);
    });
     setInvoiceForTable(invoiceData);
  }, [invoiceList]);

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
        field: "invoicedate",
        sort: "asc",
        width: 400,
      },
      {
        label: "	InvoiceNo	",
        field: "invoiceNo",
        sort: "asc",
        width: 200,
      },
      {
        label: "CustomerID	",
        field: "customerId",
        sort: "asc",
        width: 200,
      },
      {
        label: "Name	",
        field: "custName",
        sort: "asc",
        width: 200,
      },
      {
        label: "State	",
        field: "Kerala",
        sort: "asc",
        width: 200,
      },
      {
        label: "Group	",
        field: "group",
        sort: "asc",
        width: 200,
      },
      {
        label: "Ward	",
        field: "ward",
        sort: "asc",
        width: 200,
      },
      {
        label: "	Amount	",
        field: "amount",
        sort: "asc",
        width: 200,
      },
      {
        label: "Staff",
        field: "staff",
        sort: "asc",
        width: 200,
      },
      {
        label: "Action",
        field: "action",
        sort: "asc",
        width: 200,
      },
    ],
    rows: invoiceForTable,
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

  //   function handleChangeUser(e) {
  //     let name = e.target.name;
  //     let value = e.target.value;
  //     setUserObject({ ...userObject, [name]: value });
  //   }

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

  //   let closeModal = () => {
  //     setShowModal(false);
  //     setUserIdToBeUpdated(null);
  //   };
  function handleChangeDate(e) {
   let values=e.target.value
   let  StartDate = moment(values).format('DD-MM-YYYY');
   const filter = invoiceList?.filter(element => {
   
   
    return element.invoicedate === StartDate ;
  });
  console.log(filter)
  setInvoiceForTable(filter)
}
function handleClick() {
  setSelectedGroup({})
  setSelectedStaff({})
  setInvoiceForTable(invoiceList)
}

function handleChangeGroup(value){
  
  setSelectedGroup(value)
  let filterData=invoiceList?.filter((item)=>item.group===value.label)
 setInvoiceForTable(filterData)
  //setFilteredData(filterData)
}
function handleChangeStaff(value){
  
  setSelectedStaff(value)
  let filterData=invoiceList?.filter((item)=>item.staff===value.label)
 setInvoiceForTable(filterData)
  //setFilteredData(filterData)
}


  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs title="Home" breadcrumbItem="Transaction Log" />

          <Col className="col-12">
            <Card>
              <CardBody>
                <Row>
                  <Col md="4">
                    <div className="mb-3">
                      <Label htmlFor="validationCustom05">Date</Label>
                      <div className="col-md-10">
                        <input
                          className="form-control"
                          type="date"
                          defaultValue="2019-08-19"
                          id="example-date-input"
                          onChange={handleChangeDate}
                        />
                      </div>
                    </div>
                  </Col>
                  <Col md="4">
                    <div className="mb-3">
                      <Label>Group</Label>
                      <Select
                        name="customer_community_id"
                        //   value={selectCommunity}
                        //   onChange={(value) => {
                        //     handleSelectedCommunities(value);
                        //   }}
                        //   options={communitiesOptionsGroup}
                        value={selectedGroup}
                        classNamePrefix="select2-selection"
                        options={groupOptions?.map((item)=>{
                          return{
                            label:item.group_name,
                            value:item._id,
                            key:item._id
                          }
                        })}
                        onChange={handleChangeGroup}
                      />
                    </div>
                  </Col>
                  <Col md="4">
                    <div className="mb-3">
                      <Label>Staff</Label>
                      <Select
                        name="customer_community_id"
                        //   value={selectCommunity}
                        //   onChange={(value) => {
                        //     handleSelectedCommunities(value);
                        //   }}
                        //   options={communitiesOptionsGroup}
                        classNamePrefix="select2-selection"
                        value={selectedStaff}
                        options={users?.map((item)=>{
                          return{
                            label:item.username,
                            value:item._id,
                            key:item._id
                          }
                        })}
                        onChange={handleChangeStaff}
                      />
                    </div>
                  </Col>
                  <Col md="3">
                        <div className="mb-3" style={{ paddingTop: "30px" }}>
                          <LoopIcon onClick={handleClick}></LoopIcon>
                        </div>

                      </Col>
                </Row>
                <Col md="1">
                  <div className="mt-4">
                    <Button color="success" type="submit">
                      Export
                    </Button>
                  </div>
                </Col>
               
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
        </div>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {};

export default withRouter(connect(mapStateToProps, { apiError })(AutoInvoice));

AutoInvoice.propTypes = {
  error: PropTypes.any,
   invoiceList: PropTypes.array,
 };
