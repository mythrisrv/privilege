import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { MDBDataTable } from "mdbreact";
import {CSVLink} from "react-csv"
import toastr from "toastr";
import { Row, Col, Card, CardBody, Button, Label, Modal, } from "reactstrap";
import SweetAlert from "react-bootstrap-sweetalert";
import Select from "react-select";
import RemoveRedEye from "@mui/icons-material/RemoveRedEye";
import LoopIcon from '@mui/icons-material/Loop';
import Stack from "@mui/material/Stack";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";


import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";

//Dialogue box table content's
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import moment from "moment"

import {
  getUsers,
  addUser,
  deleteUser,
  apiError,
  getPrivilagesOptions,
  getCompaniesOptions,
  getBranchesOptions,
  updateUser,
  getTariff,
  getDistrictOptions,
  getLocalbodies,
  getGroups,
  getTariffOptions,
  updateTariffStatus,
  getLocalbodyOptions,
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

const ViewTariff = (props) => {
  //  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedPrivilage, setSelectedPrivilage] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState({});
  const [userObject, setUserObject] = useState({});
  const [userIdTobeUpdated, setUserIdToBeUpdated] = useState(null);
  const [userIdToBeDeleted, setUserIdToBeDeleted] = useState(null);
  const [confirmDeleteAlert, setConfirmDeleteAlert] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [tariffForTable, setTariffForTable] = useState([]);
  const [accountType, setAccountType] = useState("");
  const [form, setForm] = React.useState(false);
  const[filterString,setFilterString]=useState(null);
const[filteredData,setFilteredData]=useState(null)
//const[tariffData,setTariffData]=useState([])
const[tableData,setTableData]=useState([])
const[district,setDistrict]=useState({})
const[localbody,setLocalbody]=useState({})
const[selectedLocalbody,setselectedLocalbody]=useState("");

const[selectedPackage,setSelectedPackage]=useState({})
const[datevalue,setDateValue]=useState(null);
const[status,setStatus]=useState({})
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

 

  const{ districtOptions}=useSelector((state)=>state.districts)
  const{tariff,packages,updateTariffResponse}=useSelector((state)=>state.tariff)
  
   const{localbodyOptions}=useSelector((state)=>state.localbodies)
   const{groupOptions}=useSelector((state)=>state.groups)
   const statusOptions=[
    { value:0,label:"Active"},
    {value:1,label:"Inactive"},
    {value:2,label:"Hold"},

   ]
  const dispatch = useDispatch();

  useEffect(() => {
   
  dispatch( getDistrictOptions());
   dispatch(getTariffOptions())
   dispatch(getGroups());
   dispatch(getTariff());
   dispatch(getLocalbodies());
   }, []);
console.log(tariff)
  useEffect(() => {
   
    if (updateTariffResponse.type === "success") {
      dispatch(getTariff())
      
      toastr.success(updateTariffResponse.message);
    } else if (updateTariffResponse.type === "failure") {
      toastr.error(error.data.message, updateTariffResponse.message);
    }
  }, [updateTariffResponse]);
  const handleClickOpenForm = (item) => {
  let itemData=[];

    itemData.push(item);
    setTableData(itemData)
    
    setForm(true);
  };

  const handleCloseForm = () => {
    setForm(false);
  };

 

  useEffect(() => {
    let tariffData = [];
  console.log(tariff)

    tariff?.map((item, index) => {
      console.log(item)
      item.action = (
        <div style={{ display: "flex", justifyContent: "center" ,}}>
          <RemoveRedEye onClick={()=>{handleClickOpenForm(item)}}
              style={{ cursor: "pointer" }}/>
         
        </div>
      );
      if(item.status===0){
      item.activestatus = (
        
        <div style={{ display: "flex", justifyContent: "center" ,}}>
        <Button color="success" size="sm" onClick={()=>{
          dispatch(updateTariffStatus(item))
        }}>Active </Button>
         
        </div>
      );}
      if(item.status===1){
        item.activestatus = (
        
          <div style={{ display: "flex", justifyContent: "center" ,}}>
          <Button color="danger" size="sm" onClick={()=>{
            dispatch(updateTariffStatus(item))
          }}>Inactive</Button>
           
          </div>
        );}
        if(item.status==2){
          item.activestatus = (
          
            <div style={{ display: "flex", justifyContent: "center" ,}}>
            <Button color="primary" size="sm" onClick={()=>{
              dispatch(updateTariffStatus(item))
            }}>Hold</Button>
             
            </div>
          )}

      
         item.id = index + 1;
      //   item.name1 = `${item.firstName} ${item.lastName}`;

      //   item.privilage1 = item.privilage && item.privilage.name;
      //   item.company1 = item.company && item.company.name;
      if (item.freebags) {
        const sum = item.freebags.reduce(
          (partial_sum, a) => partial_sum + a,
          0
        );
        item.freeBags = sum;
      }
      
      if(item.status===0)
      item.tariffstatus="Active"
      else if(item.status===1)
      item.tariffstatus="Inactive"
      else 
      item.tariffstatus="Hold"
    
      

     
        tariffData.push(item);
    });
     setTariffForTable(tariffData);
  }, [tariff]);
  const headers = [
    { label: "Date", key: "tariff_assign_date" },
    { label: "Customer ID", key: "customerId" },
    { label: "Name", key: "cust_name" },
    { label: "Address", key: "address" },
    { label: "Address", key: "address1" },
    { label: "Phone", key: "cust_phone" },
    { label: "House No", key: "houseNo" },
    { label: "Customer Type", key: "cust_type" },
    { label: "Ward", key: "ward" },
    { label: "Group", key: "groupName" },
    { label: "Package", key: "package" },
    { label: "Validity", key: "validity" },
    { label: "Basic Fee", key: "basicfee" },
    { label: "Status", key: "status" },

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
        label: "Time",
        field: "time",
        sort: "asc",
        width: 400,
      },
      {
        label: "Customer ID",
        field: "customerId",
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
        label: "Package",
        field: "package",
        sort: "asc",
        width: 200,
      },
      {
        label: "Validity",
        field: "validity",
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
        label: "BasicFee		",
        field: "basicfee",
        sort: "asc",
        width: 200,
      },
      {
        label: "Status",
        field: "activestatus",
        sort: "asc",
        width: 200,
      },
      {
        label: "	Action	",
        field: "action",
        sort: "asc",
        width: 200,
      },
    ],
    rows: tariffForTable
  };
 
 

 
    
   
  function handleChangeDistrict(values){
   
   setDistrict(values);
   dispatch(getLocalbodyOptions(values.value))
}
 
function handelChangeLocalbody(value){
   setLocalbody(value);
   dispatch(getGroupOptions(value.value))
let filterData=tariff?.filter(item=>item.localbodyName===value.label)
  setTariffForTable(filterData)
}
function handleChangestatus(values){
  setStatus(values);
  
let filterData=tariff?.filter(item=>item.status===values.value)
 setTariffForTable(filterData)
}

function handleChangeGroup(value){
  setSelectedGroup(value);
  
let filterData=tariff?.filter(item=>item.groupName===value.label)
 setTariffForTable(filterData)
}
  
function handleChangepackage(value){
   setSelectedPackage(value);
     let filterData=tariff?.filter(item=>item.package===value.label)
      setTariffForTable(filterData)
     }
 
  
  function handleChangeDate(value){
   console.log(value)
    setDateValue(value)
    const format2 = "DD-MM-YYYY"
   
   
 let ndate = moment(value).format(format2);

    console.log(ndate)
    let filterData=tariff?.filter(item=>item.date===ndate)
    setTariffForTable(filterData)
 

  }
  function handleClick(){
    setDistrict({});
    setLocalbody({});
    //setFilteredData(tariff);
    setTariffForTable(tariff)
    setSelectedPackage({})
    setDateValue(null)
    setStatus({})
    setSelectedGroup({})
  }

  //   };

  return (
    <>
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs title="Home" breadcrumbItem="View Tariff" />
          <Col className="col-12">
            <Card>
              <CardBody>
                <Row>
                  <Col md="3">
                    <div className="mb-3" style={{paddingTop:"30px"}}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                              <Stack spacing={10} >
                                <DesktopDatePicker
                                  label="Date"
                                  inputFormat="dd/MM/yyyy"
                                 value={datevalue}
                                 onChange={handleChangeDate}
                                 renderInput={(params) => (
                                  <TextField  {...params} />
                                )}
                                />
                              </Stack>
                            </LocalizationProvider>
                    </div>
                  </Col>
                  <Col md="3">
                    <div className="mb-3">
                      <Label>District</Label>
                      <Select
                        name="customer_community_id"
                          value={district}
                        //   onChange={(value) => {
                        //     handleSelectedCommunities(value);
                        //   }}
                        //   options={communitiesOptionsGroup}
                        classNamePrefix="select2-selection"
                       
                        onChange={handleChangeDistrict}
                        options = {districtOptions ?.map((items)=>{
                          return{
                            label:items.district_name,
                            value:items._id
                            
                          }
                        })}
                       />
                    </div>
                  </Col>
                  <Col md="3">
                    <div className="mb-3">
                      <Label>Localbody</Label>
                      <Select
                        name="customer_community_id"
                          value={localbody}
                        //   onChange={(value) => {
                        //     handleSelectedCommunities(value);
                        //   }}
                        //   options={communitiesOptionsGroup}
                        classNamePrefix="select2-selection"
                        onChange={handelChangeLocalbody}
                       options={localbodyOptions?.map((itm)=>{
                         return{
                           label:itm.localbody_name,
                           value:itm._id,
                           key:itm._id
                         }
                       })} 
                      />
                    </div>
                  </Col>
                  <Col md="3">
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
                        options={groupOptions?.map((itm)=>{
                            return{
                              label:itm.group_name,
                              value:itm._id,
                              key:itm._id
                            }
                          })} 
                          onChange={handleChangeGroup}
                      />
                    </div>
                  </Col>
                  <Col md="3">
                    <div className="mb-3">
                      <Label>Package</Label>
                      <Select
                        name="customer_community_id"
                          value={selectedPackage}
                        //   onChange={(value) => {
                        //     handleSelectedCommunities(value);
                        //   }}
                        //   options={communitiesOptionsGroup}
                        classNamePrefix="select2-selection"
                        onChange={handleChangepackage}
                        options={packages?.map((item)=>{
                          return{
                            label:item.package_name,
                            value:item._id
                          }
                        })}
                      />
                    </div>
                  </Col>
                  <Col md="3">
                    <div className="mb-3">
                      <Label>Status</Label>
                      <Select
                        name="customer_community_id"
                          value={status}
                        //   onChange={(value) => {
                        //     handleSelectedCommunities(value);
                        //   }}
                        //   options={communitiesOptionsGroup}
                        onChange={handleChangestatus}
                        classNamePrefix="select2-selection"
                        options={statusOptions}
                      />
                    </div>
                   
                  </Col>
                  <Col md="3">
                    <div className="mb-3" style={{paddingTop:"30px"}}>
                     <LoopIcon onClick={handleClick} ></LoopIcon>
                    </div></Col>
                    <Col md="3">
                    <div className="mb-3">
                   
                    {filteredData ?
                    <Button color="success">
                    <CSVLink
       // headers={fileHeaders}
        data={tariffForTable}
        headers= {headers}
        fileName="results.csv"
        target="_blank"
      >
        Export
      </CSVLink></Button>:null}
      </div>
                  </Col>
                </Row>
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
    <div>
        <Dialog open={form} onClose={handleCloseForm} fullWidth={true} maxWidth="xl">
          <DialogTitle style={{ textAlign: "center" }}>
          
          </DialogTitle>
          <DialogContent >
            <DialogContentText>
              <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="caption table">
                  <TableHead>
                
                     </TableHead>
               
                 
                  <TableBody>
                  {tableData.map((row) => (
                    <TableRow>
                   
                      <TableCell style={{ fontWeight: "" }}>
                         Date:
                      </TableCell>
                      <TableCell align="left">{row.date}</TableCell>
                      <TableCell align="left" style={{ fontWeight: "" }}>
                         Time:
                      </TableCell>
                      <TableCell align="left">{row.time}</TableCell>
                      {/* <TableCell align="right">Protein&nbsp;(g)</TableCell> */}

                    </TableRow>
                   
                  ))}
                    {tableData.map((row) => (
                     
                      <TableRow key={row.name}>
                        <TableCell component="th" scope="row">
                        customerID
                        </TableCell>
                        <TableCell align="left">{row.customerId}</TableCell>
                        <TableCell align="left">Name</TableCell>
                       
                        <TableCell align="left">{row.cust_name}</TableCell>
                       

                        
                       
            
                      </TableRow>
                    ))}
                     {tableData.map((row) => (
                     
                     <TableRow key={row.name}>
                       <TableCell component="th" scope="row">
                       Customer Type
                       </TableCell>
                       <TableCell align="left">{row.custType}</TableCell>
                       <TableCell align="left">Localbody Type</TableCell>
                      
                       <TableCell align="left">{row.localbodyType}</TableCell>
                      

                       
                      
           
                     </TableRow>
                   ))}
                    {tableData.map((row) => (
                     
                     <TableRow key={row.name}>
                       <TableCell component="th" scope="row">
                       package Name
                       </TableCell>
                       <TableCell align="left">{row.package}</TableCell>
                       <TableCell align="left">Package Validity</TableCell>
                      
                       <TableCell align="left">{row.validity}</TableCell>
                      

                       
                      
           
                     </TableRow>
                     
                   ))}
                    {tableData.map((row) => (
                     
                     <TableRow key={row.name}>
                       <TableCell component="th" scope="row">
                       Visit/month
                       </TableCell>
                       <TableCell align="left">{row.visitperMonth}</TableCell>
                       <TableCell align="left">Registration Fee</TableCell>
                      
                       <TableCell align="left">{row.regFee}</TableCell>
                      

                       
                      
           
                     </TableRow>
                   ))}
                    {tableData.map((row) => (
                     
                     <TableRow key={row.name}>
                       <TableCell component="th" scope="row">
                       Basic Fee
                       </TableCell>
                       <TableCell align="left">{row.basicfee}</TableCell>
                       <TableCell align="left">Free Bags</TableCell>
                      
                       <TableCell align="left">{row.freeBags}</TableCell>
                      

                       
                      
           
                     </TableRow>
                   ))}
                    {tableData.map((row) => (
                     
                     <TableRow key={row.name}>
                       <TableCell component="th" scope="row">
                       Staff
                       </TableCell>
                       <TableCell align="left">{row.staff}</TableCell>
                       
                      

                       
                      
           
                     </TableRow>
                   ))}
                  </TableBody>
                </Table>
                <DialogTitle style={{ textAlign: "center" }}>
                  Package Item Detailes
          
          </DialogTitle>
          <Table>
          <TableHead>
                  {tableData.map((row) => (
                   // console.log(row)
                    <TableRow>
                   
                      <TableCell style={{ fontWeight: "bold" }}>
                         Item Name
                    
                      {row.itemName.map((data)=>{
                        return (
                          <TableRow>
                            <TableCell align="left">
                              {data}
                            </TableCell>
                            </TableRow>

                           
                        )

                      })}
                      </TableCell>
                     
                      <TableCell align="left" style={{ fontWeight: "bold" }}>
                         Free Bags
                     
                      
                      {row.freebags.map((data)=>{
                        return (
                          <TableRow>
                            <TableCell align="left">
                              {data}
                            </TableCell>
                            </TableRow>

                           
                        )

                      })}
                       </TableCell>

                    </TableRow>
                    ))}

{tableData.map((row) => (
    <TableRow>
                     {row.wasteItems?.map((data)=>{
                      return(
                      <TableRow>
                       <TableCell align="left">{data.waste_items_name}</TableCell>
                       </TableRow>
                       
                      )

                    })
                   }
                   </TableRow>

                   ))}
                   
                  
                  </TableHead>
                  <TableBody>
                   {tableData.map((row) => (
                     
                     <TableRow key={row.name}>
                      
                       <TableCell align="left">{}</TableCell>
                      
                      
                       <TableCell align="left">{}</TableCell>
                      

                       
                      
           
                     </TableRow>
                     
                   ))}
                    </TableBody>
                     </Table>
              </TableContainer>
             
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseForm} color="success">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
    
  );
};

const mapStateToProps = (state) => {};

export default withRouter(connect(mapStateToProps, { apiError })(ViewTariff));

 //ViewTariff.propTypes = {
  // error: PropTypes.any,
  //tariff: PropTypes.array,
 //};
