import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { MDBDataTable } from "mdbreact";
import toastr from "toastr";
import { Row, Col, Card, CardBody, Button, Label, Modal } from "reactstrap";
import SweetAlert from "react-bootstrap-sweetalert";
import LoopIcon from "@mui/icons-material/Loop";
import Select from "react-select";
import moment from "moment"
import { CSVLink } from "react-csv";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import {
  getUsers,
  addUser,
  deleteUser,
  apiError,
  getPrivilagesOptions,
  getCompaniesOptions,
  getBranchesOptions,
  updateUser,
  getReceipts,
  getDistrictOptions,
  getLocalbodyOptions,
  getWardOptions,
  getWardsGroupOptions
  //getPrivilagesOptions,
} from "../../store/actions";

// Redux
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { AvForm, AvField } from "availity-reactstrap-validation";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
// import "./user.scss";

const ViewReceipt = (props) => {
  //  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedPrivilage, setSelectedPrivilage] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState({});
  const [selectedLocalbody, setSelectedLocalbody] = useState({});
  const [selectedWard, setSelectedWard] = useState({});
  const [selectedGroup, setSelectedGroup] = useState({});
  const [selectedStaff, setSelectedStaff] = useState({});
  const [selectedDate1, setSelectedDate1] = useState("");
  const [selectedDate2, setSelectedDate2] = useState("");
  
  const [userObject, setUserObject] = useState({});
  const [userIdTobeUpdated, setUserIdToBeUpdated] = useState(null);
  const [userIdToBeDeleted, setUserIdToBeDeleted] = useState(null);
  const [confirmDeleteAlert, setConfirmDeleteAlert] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [receiptsForTable, setReceiptsForTable] = useState([]);
  const [filteredData, setFilteredData] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [form, setForm] = React.useState(false);

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

   const {districtOptions} = useSelector(
    (state) => state.districts)
    const {localbodyOptions} = useSelector(
      (state) => state.localbodies)
      const {wardOptions} = useSelector(
        (state) => state.wards)

        const { wardsGroupOptions } = useSelector((state) => state.groups);


  const privilagesOptions = useSelector(
    (state) => state.privilages.privilagesOptions
  );
  const companiesOptions = useSelector(
    (state) => state.companies.companiesOptions
  );
  const branchesOptions = useSelector(
    (state) => state.branches.branchesOptions
  );
  const {receipts}=useSelector((state)=>state.receipt)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
   
    dispatch(getReceipts())
     dispatch(getDistrictOptions());
  }, []);

 
 

 

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

  const handleClickOpenForm = (item) => {
    let itemData = [];

    itemData.push(item);
    setTableData(itemData);

    setForm(true);
  };
  const handleCloseForm = () => {
    setForm(false);
  };


  useEffect(() => {
    let receiptData = [];

    receipts?.map((item, index) => {
      item.action = (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
           <i
            className="uil-eye"
            style={{
              fontSize: "1.3em",
              cursor: "pointer",
              marginLeft: "1rem",
              marginRight: "1rem",
            }}
            onClick={() => {
              handleClickOpenForm(item);
            }}
          ></i>
        </div>)
     
         item.id = index + 1;
         if(item.date){
          const format2 = "DD-MM-YYYY"
         
          
      item.date = moment(item.date).format(format2);

        }
       receiptData.push(item);
    });
     setReceiptsForTable(receiptData);
  }, [receipts]);

  const headers = [
    {label:"ReceiptNo",key:"receiptNo"},
    { label: "Customer ID", key: "customerId" },
    { label: "Name", key: "custName" },
    { label: "District", key: "district" },
    { label: "Group", key: "customergroup" },
    { label: "Ward", key: "customerward" },
   
    { label: "Total Amount", key: "Amount" },
     { label: " Due Amount", key: "dueAmount" },
     { label: "Staff", key: "staff" },
  ];

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
        field: "date",
        sort: "asc",
        width: 400,
      },
      {
        label: "Receipt No",
        field: "receiptNo",
        sort: "asc",
        width: 200,
      },
      {
        label: "Customer ID		",
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
        label: "Group",
        field: "customergroup",
        sort: "asc",
        width: 200,
      },
      {
        label: "	Ward	",
        field: "customerward",
        sort: "asc",
        width: 200,
      },

      {
        label: "Amount	",
        field: "Amount",
        sort: "asc",
        width: 200,
      },
      {
        label: "	DueAmount",
        field: "dueAmount",
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
    rows: receiptsForTable,
  };


  useEffect(() => {
    let newreceiptData = [];

    filteredData?.map((item, index) => {
     
         item.id = index + 1;
       newreceiptData.push(item);
    });
     setReceiptsForTable(newreceiptData);
  }, [filteredData]);

  const fdata = {
    columns: [
      {
        label: "#",
        field: "id",
        sort: "asc",
        width: 150,
      },
      {
        label: "Date",
        field: "date",
        sort: "asc",
        width: 400,
      },
      {
        label: "Receipt No",
        field: "receiptNo",
        sort: "asc",
        width: 200,
      },
      {
        label: "Customer ID		",
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
        label: "Group",
        field: "customergroup",
        sort: "asc",
        width: 200,
      },
      {
        label: "	Ward	",
        field: "customerward",
        sort: "asc",
        width: 200,
      },

      {
        label: "Amount	",
        field: "Amount",
        sort: "asc",
        width: 200,
      },
      {
        label: "	DueAmount",
        field: "dueAmount",
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
    rows: receiptsForTable,
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

    function handleChangeDate1(e) {
      let values=e.target.value

     let  StartDate = moment(values).format('DD-MM-YYYY');
      setSelectedDate1(StartDate)
      let filterData=receipts.filter((item)=>item.date===StartDate)
    setFilteredData(filterData)
    }

    function handleChangeDate2(e) {
      let values=e.target.value
     let  StartDate = moment(values).format('DD-MM-YYYY');
     const filter = receipts.filter(element => {
      
      return element.date === StartDate 
    });
    
   setFilteredData(filter)
    if (selectedDate1) {
      let start = new Date(selectedDate1).getTime();
      let end = new Date(StartDate).getTime();
      let result = receipts?.filter((d) => {
        var time = new Date(d.date).getTime();
        return start <= time && time <= end;
        
      });
      
      setFilteredData(result)
    }
  }

    function handleChangeDistrict(value){
      setSelectedDistrict(value)
      dispatch(getLocalbodyOptions(value.value))
      let filterData=receipts.filter((item)=>item.district===value.label)
      setFilteredData(filterData)
    }
    function handleChangeLocalbody(value){
      setSelectedLocalbody(value)
      dispatch(getWardOptions(value.value))
      let filterData=receipts.filter((item)=>item.localbody===value.label)
      setFilteredData(filterData)
    }

    function handleChangeWard(value){
      setSelectedWard(value)
      dispatch(getWardsGroupOptions(value.value))
      let filterData=receipts.filter((item)=>item.customerward===value.label)
      setFilteredData(filterData)
    }

    function handleChangeGroup(value){
      setSelectedGroup(value)
      let filterData=receipts.filter((item)=>item.customergroup===value.label)
      setFilteredData(filterData)
    }
    function handleChangeStaff(value){
      setSelectedStaff(value)
      let filterData=receipts.filter((item)=>item.staff===value.label)
      setFilteredData(filterData)
    }

    function handleClick() {
      setSelectedDistrict({});
      setSelectedLocalbody({});
      setFilteredData(receipts);
      setSelectedDate1("");
      setSelectedDate2("");
      setSelectedWard({});
      setSelectedGroup({});
      setSelectedStaff({})
    }
  

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

  return (
    <>
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs title="Home" breadcrumbItem="View Receipt" />
          <Col className="col-12">
            <Card>
              <CardBody>
                <Row>
                  <Col md="3">
                    <div className="mb-3">
                      <Label htmlFor="validationCustom05"> From</Label>
                      <div className="col-md-10">
                        <input
                          className="form-control"
                          type="date"
                          //value={selectedDate1}
                          defaultValue="mm/dd/yyyy"
                          id="example-date-input"
                          onChange={handleChangeDate1}
                        />
                      </div>
                    </div>
                  </Col>
                  <Col md="3">
                    <div className="mb-3">
                      <Label htmlFor="validationCustom05">To</Label>
                      <div className="col-md-10">
                        <input
                          className="form-control"
                          type="date"
                         // value={selectedDate2}
                          defaultValue="mm/dd/yyyy"
                          id="example-date-input"
                          onChange={handleChangeDate2}
                        
                        />
                      </div>
                    </div>
                  </Col>
                  <Col md="3">
                    <div className="mb-3">
                      <Label>District</Label>
                      <Select
                        name="customer_community_id"
                          value={selectedDistrict}
                        //   onChange={(value) => {
                        //     handleSelectedCommunities(value);
                        //   }}
                        //   options={communitiesOptionsGroup}
                        classNamePrefix="select2-selection"
                        options={districtOptions?.map((item)=>{
                          return{
                            label:item.district_name,
                            value:item._id,
                            key:item._id
                          }
                        })}
                        onChange={handleChangeDistrict}
                      />
                    </div>
                  </Col>
                  <Col md="3">
                    <div className="mb-3">
                      <Label>Localbody</Label>
                      <Select
                        name="customer_community_id"
                           value={selectedLocalbody}
                        //   onChange={(value) => {
                        //     handleSelectedCommunities(value);
                        //   }}
                        //   options={communitiesOptionsGroup}
                        classNamePrefix="select2-selection"
                        options={localbodyOptions?.map((item)=>{
                          return{
                            label:item.localbody_name,
                            value:item._id,
                            key:item._id
                          }
                        })}
                        onChange={handleChangeLocalbody}
                      />
                    </div>
                  </Col>

                  <Col md="3">
                    <div className="mb-3">
                      <Label>Ward</Label>
                      <Select
                        name="customer_community_id"
                           value={selectedWard}
                        //   onChange={(value) => {
                        //     handleSelectedCommunities(value);
                        //   }}
                        //   options={communitiesOptionsGroup}
                        classNamePrefix="select2-selection"
                        options={wardOptions?.map((item)=>{
                          return{
                            label:item.ward_name,
                            value:item._id,
                            key:item._id
                          }
                        })}
                        onChange={handleChangeWard}
                      />
                    </div>
                  </Col>
                  <Col md="3">
                    <div className="mb-3">
                      <Label>Group</Label>
                      <Select
                        name="customer_community_id"
                          value={selectedGroup}
                        //   onChange={(value) => {
                        //     handleSelectedCommunities(value);
                        //   }}
                        //   options={communitiesOptionsGroup}
                        classNamePrefix="select2-selection"
                        options={wardsGroupOptions?.map((item)=>{
                          return{
                            label:item.group_name,
                            value:item._id,
                            key:item._id,
                          }
                        })}
                        onChange={handleChangeGroup}
                      />
                    </div>
                  </Col>
                  <Col md="3">
                    <div className="mb-3">
                      <Label>Staff</Label>
                      <Select
                        name="customer_community_id"
                           value={selectedStaff}
                        //   onChange={(value) => {
                        //     handleSelectedCommunities(value);
                        //   }}
                        //   options={communitiesOptionsGroup}
                        classNamePrefix="select2-selection"
                        options={users?.map((item)=>{
                          return{
                            label:item.username,
                            value:item._id
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
                  <Row>
                  <Col md="1">
                        <div className="mt-4">
                        <Button color="success">
                            <CSVLink
                              // headers={fileHeaders}
                              data={receiptsForTable}
                              headers={headers}
                              fileName="invoice.csv"
                              target="_blank"
                            >
                              Export
                            </CSVLink></Button>
                        </div>
                      </Col>
                    </Row>
                </Row>
             {filteredData ?   <MDBDataTable
                  responsive
                  bordered
                  data={fdata}
                  searching={true}
                  paging={true}
                  info={false}
                />:
                <MDBDataTable
                responsive
                bordered
                data={data}
                searching={true}
                paging={true}
                info={false}
              />}
              </CardBody>
            </Card>
          </Col>
        </div>
      </div>
    </React.Fragment>
     <div>
     <Dialog open={form} onClose={handleCloseForm}>
       <DialogTitle style={{ textAlign: "center" }}>
         <CloseIcon
           onClick={handleCloseForm}
           sx={{
             position: "absolute",
             right: 8,
             top: 8,
             color: (theme) => theme.palette.grey[500],
           }}
         />
       </DialogTitle>
       <DialogContent>
         <DialogContentText>
           <TableContainer component={Paper}>
             <Table sx={{ minWidth: 650 }} aria-label="caption table">
               <TableBody>
                 {tableData.map((row) => (
                   <TableRow>
                     <TableCell component="th" scope="row">
                       Date:
                     </TableCell>
                     <TableCell align="left">{row.date}</TableCell>
                     <TableCell align="left">Time:</TableCell>
                     <TableCell align="left">{row.time}</TableCell>
                   </TableRow>
                 ))}
                 {tableData.map((row) => (
                   <TableRow>
                     <TableCell component="th" scope="row">
                       Receipt No:
                     </TableCell>
                     <TableCell align="left">{row.receiptNo}</TableCell>
                     <TableCell align="left">Customer Id:</TableCell>
                     <TableCell align="left">{row.customerId}</TableCell>
                   </TableRow>
                 ))}
                 {tableData.map((row) => (
                   <TableRow>
                     <TableCell component="th" scope="row">
                       Name:
                     </TableCell>
                     <TableCell align="left">
                       {row.custName}
                     </TableCell>
                     <TableCell align="left">Group:</TableCell>
                     <TableCell align="left">
                       {row.customergroup}
                     </TableCell>
                   </TableRow>
                 ))}
                 {tableData.map((row) => (
                   <TableRow>
                     <TableCell component="th" scope="row">
                       Ward
                     </TableCell>
                     <TableCell align="left">
                       {row.customerward} 
                     </TableCell>
                     <TableCell align="left">Amount:</TableCell>
                     <TableCell align="left">
                       {row.Amount}
                     </TableCell>
                   </TableRow>
                 ))}
                 {tableData.map((row) => (
                   <TableRow>
                     <TableCell component="th" scope="row">
                       DueAmount:
                     </TableCell>
                     <TableCell align="left">{row.dueAmount} </TableCell>
                     <TableCell align="left">Staff:</TableCell>
                     <TableCell align="left">{row.staff}</TableCell>
                   </TableRow>
                 ))}
               </TableBody>
             </Table>
            </TableContainer>
         </DialogContentText>
       </DialogContent>
       <DialogActions></DialogActions>
     </Dialog>
   </div>
   </>
  );
};

const mapStateToProps = (state) => {};

export default withRouter(connect(mapStateToProps, { apiError })(ViewReceipt));

 ViewReceipt.propTypes = {
  error: PropTypes.any,
   receipts: PropTypes.array,
 };
