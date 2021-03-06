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
  Input,
  FormGroup,
} from "reactstrap";
import SweetAlert from "react-bootstrap-sweetalert";
import Select from "react-select";
import Chip from "@mui/material/Chip";
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
  getGroups,
  getLocalbodies,
  getGroup,
  addGroup,
  deleteGroup,
  updateGroup,
  getWardOptions,
  getWards,
  getLocalbodyOptions,
  getLocalbody,
  getDistrictOptions,

  //getPrivilagesOptions,
} from "../../../store/actions";

// Redux
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { AvForm, AvField } from "availity-reactstrap-validation";

//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb";
// import "./user.scss";

const Group = (props) => {
  //  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedPrivilage, setSelectedPrivilage] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [userObject, setUserObject] = useState({});
  const [groupIdTobeUpdated, setGroupIdToBeUpdated] = useState(null);
  const [groupIdToBeDeleted, setGroupIdToBeDeleted] = useState(null);
  const [confirmDeleteAlert, setConfirmDeleteAlert] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [groupDataForTable, setgroupDataForTable] = useState([]);
  const [accountType, setAccountType] = useState("");
  const [selectedLocalbody, setselectedLocalbody] = useState({});
  const [selectedWard, setSelectedWard] = useState(null);
  const [selectedDistrict, setselectedDistrict] = useState({});
  const [groupname, setGroupname] = useState("");
  const [groupcode, setGroupcode] = useState("");

  const [groupObject, setgroupObject] = useState({});

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
    groups,
    addingGroup,
    addGroupResponse,
    deleteGroupResponse,
    updateGroupResponse,
  } = useSelector((state) => state.groups);

  const { localbodyOptions, localbody } = useSelector(
    (state) => state.localbodies
  );
  const { districtOptions } = useSelector((state) => state.districts);

  // const districtsOptions = useSelector(
  //   (state) => state.districts.districtsOptions
  // );

  const privilagesOptions = useSelector(
    (state) => state.privilages.privilagesOptions
  );
  const companiesOptions = useSelector(
    (state) => state.companies.companiesOptions
  );

  const { wardOptions } = useSelector((state) => state.wards);

  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(getUsers())
    dispatch(getGroups());
    dispatch(getDistrictOptions());
    // dispatch(getWardOptions(selectedLocalbody))
  }, []);

  useEffect(() => {
    if (addGroupResponse.type === "success") {
      dispatch(getGroups());
      toastr.success(addGroupResponse.message);
      setSelectedPrivilage({});
      setSelectedCompany(null);
      setSelectedBranch(null);
    } else if (addGroupResponse.type === "failure") {
      toastr.error(error.data.message, addGroupResponse.message);
    }
  }, [addGroupResponse]);
  useEffect(() => {
    if (deleteGroupResponse.type === "success") {
      dispatch(getGroups());
      toastr.success(deleteGroupResponse.message);
      setGroupIdToBeDeleted(null);
    } else if (deleteGroupResponse.type === "failure") {
      toastr.error(error.data.message, deleteGroupResponse.message);
    }
  }, [deleteGroupResponse]);

  useEffect(() => {
    if (updateGroupResponse.type === "success") {
      dispatch(getGroups());
      setShowModal(false);
      setGroupIdToBeUpdated(null);
      setPasswordObject({});
      toastr.success(updateGroupResponse.message);
    } else if (updateGroupResponse.type === "failure") {
      toastr.error(error.data.message, updateGroupResponse.message);
    }
  }, [updateGroupResponse]);

  let preUpdateGroup = (item) => {
    console.log(item);
    if (item.group_name) {
      let group = item.group_name.split("/");
      setGroupname(group[1]);
    }

    if (item.group_localbody_name_id) {
      let localbodyname = {
        label: item.group_localbody_name_id.localbody_name,
        value: item.group_localbody_name_id._id,
      };
      handleSelectedLocalbody(localbodyname);
    }
    if (item.group_ward) {
      var result = item.group_ward.map(function (itm) {
        return { label: itm.ward_name, value: itm._id };
      });

      handleSelectedWard(result);
    }
    if (item.group_district) {
      let district = {
        label: item.group_district.district_name,
        value: item.group_district._id,
      };
      handleChangeDistrict(district);
    }

    setGroupIdToBeUpdated(item._id);
    setgroupObject({ ...item, password: null });
  };

  let preUpdateLocalbodyPassword = (item) => {
    setGroupIdToBeUpdated(item._id);
    setShowModal(true);
  };

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
    let groupsData = [];
    groups?.map((item, index) => {
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
              preUpdateGroup(item);
            }}
          ></i>
          <i
            className="uil-trash-alt"
            style={{ fontSize: "1.3em", cursor: "pointer" }}
            onClick={() => {
              setGroupIdToBeDeleted(item._id);
              setConfirmDeleteAlert(true);
            }}
          ></i>
        </div>
      );
      if (item.group_ward != null) {
        item.ward = (
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {item.group_ward?.map((data) => {
              return <Chip size="small" label={data.ward_name}></Chip>;
            })}
          </div>
        );
      }
      item.id = index + 1;
      //   item.name1 = `${item.firstName} ${item.lastName}`;

      //   item.privilage1 = item.privilage && item.privilage.name;
      //   item.company1 = item.company && item.company.name;
      //   item.branch1 = item.branch && item.branch.name;
      if (item.group_localbody_name_id != null) {
        item.localbody = item.group_localbody_name_id.localbody_name;
      }
      if (item.group_addedby != null) {
        item.addedby = item.group_addedby.username;
      }
      groupsData.push(item);
    });
    setgroupDataForTable(groupsData);
  }, [groups]);

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
        field: "group_date",
        sort: "asc",
        width: 400,
      },
      {
        label: "Time	",
        field: "group_time",
        sort: "asc",
        width: 200,
      },
      {
        label: "GroupName	",
        field: "group_name",
        sort: "asc",
        width: 200,
      },
      {
        label: "LocalBody",
        field: "localbody",
        width: 300,
      },
      {
        label: "Ward",
        field: "ward",
        width: 300,
      },
      {
        label: "Incentive",
        field: "",
        width: 300,
      },
      {
        label: "staff",
        field: "addedby",
        width: 300,
      },
      {
        label: "Action",
        field: "action",
        width: 300,
      },
    ],
    rows: groupDataForTable,
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
  //   ]

  //   function handleChangeUser(e) {
  //     let name = e.target.name;
  //     let value = e.target.value;
  //     setUserObject({ ...userObject, [name]: value });
  //   }
  function code() {
    let code;
    if (localbody === {} && groupname === "") {
      code = "";
    } else code = `${localbody.short_code}/${groupname}`;
    return code;
  }

  function handleSelectedLocalbody(value) {
    setselectedLocalbody(value);
    let newValue = {
      name: value.label,
      _id: value.value,
    };
    dispatch(getLocalbody(value.value));
    dispatch(getWardOptions(value.value));

    setgroupObject({ ...groupObject, localbody: newValue });
  }
  useEffect(() => {
    if (localbody.short_code)
      setGroupcode(`${localbody.short_code}/${groupname}`);
  }, [localbody, groupname]);
  useEffect(() => {
    setgroupObject({ ...groupObject, group_name: groupcode });
  }, [groupcode]);
  function handleChangeDistrict(value) {
    setselectedDistrict(value);
    let newValue = {
      name: value.label,
      _id: value.value,
    };
    dispatch(getLocalbodyOptions(value.value));
    setgroupObject({ ...groupObject, district: newValue });
  }

  function handleSelectedWard(values) {
    console.log(values);
    setSelectedWard(values);
    let ward = [];
    values?.map((v) => ward.push(v.value));
    // Object.assign({},ward)
    // console.log(ward)
    setgroupObject({ ...groupObject, wards: ward });
  }

  //console.log(selectedWard)
  function handleGroupname(e) {
    let name = e.target.name;
    let value = e.target.value;
    setGroupname(value);
    let code = `${localbody.short_code}/${value}`;
    setgroupObject({ ...groupObject, [name]: value, group_name: code });
  }

  console.log(groupObject);
  const handleValidSubmit = (event, values) => {
    console.log(event);
    groupIdTobeUpdated
      ? dispatch(updateGroup(groupObject))
      : dispatch(addGroup(groupObject));

    setselectedLocalbody({});
    setGroupname("");
    setSelectedWard(null);
    setselectedDistrict({});
    setGroupcode(null);
  };
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
            dispatch(deleteGroup(groupIdToBeDeleted));
            setConfirmDeleteAlert(false);
          }}
          onCancel={() => setConfirmDeleteAlert(false)}
        >
          Are you sure you want to delete it?
        </SweetAlert>
      ) : null}
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs title="Home" breadcrumbItem="Manage Group" />
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
                          <Label>District</Label>
                          <Select
                            name="localbody_name"
                            value={selectedDistrict}
                            //   onChange={(value) => {
                            //     handleSelectedCommunities(value);
                            //   }}
                            options={districtOptions?.map((item) => {
                              return {
                                label: item.district_name,
                                value: item._id,
                                key: item._id,
                              };
                            })}
                            classNamePrefix="select2-selection"
                            onChange={handleChangeDistrict}
                          />
                        </div>
                      </Col>
                      <Col md="3">
                        <div className="mb-3">
                          <Label>Localbody</Label>
                          <Select
                            name="localbody_name"
                            value={selectedLocalbody}
                            //   onChange={(value) => {
                            //     handleSelectedCommunities(value);
                            //   }}
                            options={localbodyOptions?.map((item) => {
                              return {
                                label: item.localbody_name,
                                value: item._id,
                                key: item._id,
                              };
                            })}
                            classNamePrefix="select2-selection"
                            onChange={handleSelectedLocalbody}
                          />
                        </div>
                      </Col>

                      <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom05">Group Name</Label>
                          <AvField
                            name="groupname"
                            placeholder=""
                            type="text"
                            errorMessage="Enter Group name"
                            value={groupname}
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom05"
                            onChange={handleGroupname}
                          />
                        </div>
                      </Col>

                      <Col md="3">
                        <div className="mb-3" style={{ paddingTop: "30px" }}>
                          <AvField
                            readOnly
                            name="groupcode"
                            placeholder=" group name"
                            type="text"
                            errorMessage=""
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom01"
                            value={groupcode}
                            //onChange={handleChangegroupcode}
                          />
                        </div>
                      </Col>

                      <Col md="3">
                        <div className="mb-3">
                          <Label>select ward</Label>
                          <Select
                            isMulti
                            name="ward_name"
                            value={selectedWard}
                            options={wardOptions?.map((ward) => {
                              return {
                                label: ward.ward_name,
                                value: ward._id,
                                key: ward._id,
                              };
                            })}
                            onChange={handleSelectedWard}
                          />
                        </div>
                      </Col>
                      <Col md="3">
                        <div className="mb-3">
                          <Label>select incentive</Label>
                          <Select
                            name="localbody_name"
                            //   value={selectCommunity}
                            //   onChange={(value) => {
                            //     handleSelectedCommunities(value);
                            //   }}
                            //   options={communitiesOptionsGroup}
                            classNamePrefix="select2-selection"
                          />
                        </div>
                      </Col>

                      <Col>
                        <div className="mb-3" style={{ paddingTop: "30px" }}>
                          {groupIdTobeUpdated ? (
                            <Button
                              color="primary"
                              type="submit"
                              disabled={addingGroup ? true : false}
                            >
                              {addingGroup ? "Updating" : "Update"}
                            </Button>
                          ) : (
                            <Button
                              color="primary"
                              type="submit"
                              disabled={addingGroup ? true : false}
                            >
                              {addingGroup ? "Adding" : "Submit"}
                            </Button>
                          )}
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
                    paging={true}
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

export default withRouter(connect(mapStateToProps, { apiError })(Group));

Group.propTypes = {
  error: PropTypes.any,
  groups: PropTypes.array,
};
