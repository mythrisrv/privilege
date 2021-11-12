import React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import RemoveRedEye from "@mui/icons-material/RemoveRedEye";
import Save from "@mui/icons-material/Save";
import Upload from "@mui/icons-material/Upload";

import { MDBDataTable } from "mdbreact";
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

import { AvForm, AvField } from "availity-reactstrap-validation";

//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import "./branch.scss";

const DatatableTables = () => {
  const [state, setState] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const handleChange = (event) => {
    setState(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };


  const [city, setCity] = React.useState("");
  const [open1, setOpen1] = React.useState(false);
  const handleChange1 = (event) => {
    setCity(event.target.value);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };

  const handleOpen1 = () => {
    setOpen1(true);
  };

  const [company, setCompany] = React.useState("");
  const [open2, setOpen2] = React.useState(false);
  const handleChange2 = (event) => {
    setCompany(event.target.value);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };

  const handleOpen2 = () => {
    setOpen2(true);
  };

  const data = {
    columns: [
      {
        label: "Company ID",
        field: "cid",
        sort: "asc",
        width: 150,
      },
      {
        label: "Company Name",
        field: "cname",
        sort: "asc",
        width: 270,
      },
      {
        label: "Code",
        field: "code",
        sort: "asc",
        width: 200,
      },
      {
        label: "Person Name",
        field: "pname",
        sort: "asc",
        width: 100,
      },
      {
        label: "Mobile",
        field: "mobile",
        sort: "asc",
        width: 10,
      },
      {
        label: "City",
        field: "city",
        sort: "asc",
        width: 100,
      },
      {
        label: "Added By",
        field: "addedby",
        sort: "asc",
        width: 100,
      },
      {
        label: "Action",
        field: "action",
        sort: "asc",
        width: 100,
      },
    ],
    rows: [
      {
        cid: "MK0001",
        cname: "SRV Infotech",
        code: "SRV",
        pname: "abc",
        mobile: "9999999999",
        city: "Kannur",
        addedby: "admin",
        action: (
          <>
            {" "}
            <RemoveRedEye />
            <EditIcon />
            <DeleteIcon />
          </>
        ),
      },
      {
        cid: "MK0001",
        cname: "SRV Infotech",
        code: "SRV",
        pname: "abc",
        mobile: "9999999999",
        city: "Kannur",
        addedby: "admin",
        action: (
          <>
            {" "}
            <RemoveRedEye />
            <EditIcon />
            <DeleteIcon />
          </>
        ),
      },
      {
        cid: "MK0001",
        cname: "SRV Infotech",
        code: "SRV",
        pname: "abc",
        mobile: "9999999999",
        city: "Kannur",
        addedby: "admin",
        action: (
          <>
            {" "}
            <RemoveRedEye />
            <EditIcon />
            <DeleteIcon />
          </>
        ),
      },
      {
        cid: "MK0001",
        cname: "SRV Infotech",
        code: "SRV",
        pname: "abc",
        mobile: "9999999999",
        city: "Kannur",
        addedby: "admin",
        action: (
          <>
            {" "}
            <RemoveRedEye />
            <EditIcon />
            <DeleteIcon />
          </>
        ),
      },
      {
        cid: "MK0001",
        cname: "SRV Infotech",
        code: "SRV",
        pname: "abc",
        mobile: "9999999999",
        city: "Kannur",
        addedby: "admin",
        action: (
          <>
            {" "}
            <RemoveRedEye />
            <EditIcon />
            <DeleteIcon />
          </>
        ),
      },
      {
        cid: "MK0001",
        cname: "SRV Infotech",
        code: "SRV",
        pname: "abc",
        mobile: "9999999999",
        city: "Kannur",
        addedby: "admin",
        action: (
          <>
            {" "}
            <RemoveRedEye />
            <EditIcon />
            <DeleteIcon />
          </>
        ),
      },
      {
        cid: "MK0001",
        cname: "SRV Infotech",
        code: "SRV",
        pname: "abc",
        mobile: "9999999999",
        city: "Kannur",
        addedby: "admin",
        action: (
          <>
            {" "}
            <RemoveRedEye />
            <EditIcon />
            <DeleteIcon />
          </>
        ),
      },
      {
        cid: "MK0001",
        cname: "SRV Infotech",
        code: "SRV",
        pname: "abc",
        mobile: "9999999999",
        city: "Kannur",
        addedby: "admin",
        action: (
          <>
            {" "}
            <RemoveRedEye />
            <EditIcon />
            <DeleteIcon />
          </>
        ),
      },
      {
        cid: "MK0001",
        cname: "SRV Infotech",
        code: "SRV",
        pname: "abc",
        mobile: "9999999999",
        city: "Kannur",
        addedby: "admin",
        action: (
          <>
            {" "}
            <RemoveRedEye />
            <EditIcon />
            <DeleteIcon />
          </>
        ),
      },
      {
        cid: "MK0001",
        cname: "SRV Infotech",
        code: "SRV",
        pname: "abc",
        mobile: "9999999999",
        city: "Kannur",
        addedby: "admin",
        action: (
          <>
            {" "}
            <RemoveRedEye />
            <EditIcon />
            <DeleteIcon />
          </>
        ),
      },
      {
        cid: "MK0001",
        cname: "SRV Infotech",
        code: "SRV",
        pname: "abc",
        mobile: "9999999999",
        city: "Kannur",
        addedby: "admin",
        action: (
          <>
            {" "}
            <RemoveRedEye />
            <EditIcon />
            <DeleteIcon />
          </>
        ),
      },
    ],
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs title="Home" breadcrumbItem="Manage Branch" />

          {/*Text field 1*/}
          <Row>
            <Col xl="12">
              <Card>
                <CardBody>
                  <AvForm className="needs-validation">
                    <Row>
                      <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom05">
                            Select Company
                          </Label>
                          <FormControl style={{width: "97%"}} sx={{ m: 1, width: 273 }}>
                            {/* <InputLabel id="demo-controlled-open-select-label">
                              Age
                            </InputLabel> */}
                            <Select
                              style={{ height: "31px" }}
                              labelId="demo-controlled-open-select-label"
                              id="demo-controlled-open-select"
                              open={open2}
                              onClose={handleClose2}
                              onOpen={handleOpen2}
                              value={company}
                              label="State"
                              onChange={handleChange2}
                            >
                              <MenuItem value="">
                                <em>None</em>
                              </MenuItem>

                              <MenuItem value={10}>company 1</MenuItem>
                              <MenuItem value={20}>Company 2</MenuItem>
                              <MenuItem value={30}>Company 3</MenuItem>
                              <MenuItem value={10}>Company 4</MenuItem>
                            </Select>
                          </FormControl>
                        </div>
                      </Col>
                      <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom01">
                            Branch Name
                          </Label>
                          <AvField
                            name="companyname"
                            placeholder="Select Branch"
                            type="text"
                            errorMessage="Enter Company Name"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom01"
                          />
                        </div>
                      </Col>

                      <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom01">Short Code</Label>
                          <AvField
                            name="shortcode"
                            placeholder="Short Code"
                            type="text"
                            errorMessage="Enter Short code"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom01"
                          />
                        </div>
                      </Col>
                      <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom01">
                            Contact Person
                          </Label>
                          <AvField
                            name="contactperson"
                            placeholder="Contact Person"
                            type="text"
                            errorMessage="Enter Contact Person"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom01"
                          />
                        </div>
                      </Col>

                      {/*Text field 2*/}
                    </Row>
                    <Row>
                      <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom01">
                            Designation
                          </Label>
                          <AvField
                            name="designation"
                            placeholder="Designation"
                            type="text"
                            errorMessage="Enter Designation"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom01"
                          />
                        </div>
                      </Col>
                      <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom03">Mobile No.</Label>
                          <AvField
                            name="mobileno"
                            placeholder="Mobile No."
                            type="text"
                            errorMessage="Enter Mobile No.."
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom03"
                          />
                        </div>
                      </Col>
                      <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom04">
                            Landline No.
                          </Label>
                          <AvField
                            name="landlineno"
                            placeholder="Landline No."
                            type="text"
                            errorMessage="Enter Landline No."
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom04"
                          />
                        </div>
                      </Col>
                      <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom05">Email ID</Label>
                          <AvField
                            name="email"
                            placeholder="Email ID"
                            type="text"
                            errorMessage=" Please provide a valid Email ID."
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom05"
                          />
                        </div>
                      </Col>
                    </Row>

                    {/*Text field 3*/}
                    <Row>
                      <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom05">Website</Label>
                          <AvField
                            name="website"
                            placeholder="Website"
                            type="text"
                            errorMessage=" Please provide a Website url."
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom05"
                          />
                        </div>
                      </Col>
                      <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom03">Address</Label>
                          <AvField
                            name="address"
                            placeholder="Address"
                            type="text"
                            errorMessage="Enter Your Address"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom03"
                          />
                        </div>
                      </Col>
                      <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom05">
                            Select State
                          </Label>
                          <FormControl style={{width: "97%"}} sx={{ m: 1, width: 273 }}>
                            {/* <InputLabel id="demo-controlled-open-select-label">
                              Age
                            </InputLabel> */}
                            <Select
                              style={{ height: "31px" }}
                              labelId="demo-controlled-open-select-label"
                              id="demo-controlled-open-select"
                              open={open}
                              onClose={handleClose}
                              onOpen={handleOpen}
                              value={state}
                              label="State"
                              onChange={handleChange}
                            >
                              <MenuItem value="">
                                <em>None</em>
                              </MenuItem>

                              <MenuItem value={10}>Andhra Pradesh</MenuItem>
                              <MenuItem value={20}>Arunachal Pradesh</MenuItem>
                              <MenuItem value={30}>Assam</MenuItem>
                              <MenuItem value={10}>Bihar</MenuItem>
                              <MenuItem value={20}>Chhattisgarh</MenuItem>
                              <MenuItem value={30}>Goa</MenuItem>
                              <MenuItem value={10}>Gujarat</MenuItem>
                              <MenuItem value={20}>Haryana</MenuItem>
                              <MenuItem value={30}>Himachal Pradesh</MenuItem>
                              <MenuItem value={10}>Jammu and Kashmir</MenuItem>
                              <MenuItem value={20}>Jharkhand</MenuItem>
                              <MenuItem value={30}>Karnataka</MenuItem>
                              <MenuItem value={20}>Kerala</MenuItem>

                              <MenuItem value={10}>Madhya Pradesh</MenuItem>
                              <MenuItem value={20}>Maharashtra</MenuItem>
                              <MenuItem value={30}>Manipur</MenuItem>
                              <MenuItem value={10}>Meghalaya</MenuItem>
                              <MenuItem value={20}>Mizoram</MenuItem>
                              <MenuItem value={30}>Nagaland</MenuItem>
                              <MenuItem value={10}>Odisha</MenuItem>
                              <MenuItem value={20}>Punjab</MenuItem>
                              <MenuItem value={30}>Rajasthan</MenuItem>
                              <MenuItem value={10}>Sikkim</MenuItem>
                              <MenuItem value={20}>Tamil Nadu</MenuItem>
                              <MenuItem value={30}>Telangana</MenuItem>
                              <MenuItem value={10}>Tripura</MenuItem>
                              <MenuItem value={20}>Uttar Pradesh</MenuItem>
                              <MenuItem value={30}>Uttarakhand</MenuItem>
                              <MenuItem value={10}>West Bengal</MenuItem>
                            </Select>
                          </FormControl>
                        </div>
                      </Col>
                      <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom05">
                            Select City
                          </Label>
                          <FormControl style={{width: "97%"}} sx={{ m: 1, width: 273 }}>
                            {/* <InputLabel id="demo-controlled-open-select-label">
                              Age
                            </InputLabel> */}
                            <Select
                              style={{ height: "31px" }}
                              labelId="demo-controlled-open-select-label"
                              id="demo-controlled-open-select"
                              open={open1}
                              onClose={handleClose1}
                              onOpen={handleOpen1}
                              value={city}
                              label="City"
                              onChange={handleChange1}
                            >
                              <MenuItem value="">
                                <em>None</em>
                              </MenuItem>
                              <MenuItem value={10}>City1</MenuItem>
                              <MenuItem value={20}>City2</MenuItem>
                              <MenuItem value={30}>City3</MenuItem>
                            </Select>
                          </FormControl>
                        </div>
                      </Col>
                    </Row>

                    {/*Text field 4*/}
                    <Row>
                      <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom05">Pincode</Label>
                          <AvField
                            name="pincode"
                            placeholder="Pincode"
                            type="text"
                            errorMessage=" Please provide a Pincode."
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom05"
                          />
                        </div>
                      </Col>
                      <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom03">GSTIN</Label>
                          <AvField
                            name="gstin"
                            placeholder="GSTIN"
                            type="text"
                            errorMessage="Enter Your GSTIN"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom03"
                          />
                        </div>
                      </Col>
                      <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom04">PAN No.</Label>
                          <AvField
                            name="panno"
                            placeholder="PAN No"
                            type="text"
                            errorMessage="Enter PAN No."
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom04"
                          />
                        </div>
                      </Col>
                      <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom05">CIN No.</Label>
                          <AvField
                            name="cinno"
                            placeholder="CIN No."
                            type="text"
                            errorMessage="Enter Your CIN No."
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom05"
                          />
                        </div>
                      </Col>
                    </Row>

                    {/*Text field 5*/}
                    <Row>
                      <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom05">TDS No.</Label>
                          <AvField
                            name="tdsno"
                            placeholder="TDS No"
                            type="text"
                            errorMessage="Enter Your TDS No."
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom05"
                          />
                        </div>
                      </Col>
                      <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom03">
                            Company Logo(300x400)
                          </Label>
                          <br />
                          <Button variant="contained" component="label">
                            <Upload></Upload>
                            {"  "}
                            Upload File
                            <input type="file" hidden />
                          </Button>
                        </div>
                      </Col>

                      <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom03">Latitude</Label>
                          <AvField
                            name="latitude"
                            placeholder="Latitude"
                            type="text"
                            errorMessage="Enter Latitude"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom03"
                          />
                        </div>
                      </Col>
                      <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom04">Longitude</Label>
                          <AvField
                            name="longitude"
                            placeholder="Longitude"
                            type="text"
                            errorMessage="Enter Longitude"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom04"
                          />
                        </div>
                      </Col>
                      <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom04">
                            Delivery Area(Km)
                          </Label>
                          <AvField
                            name="longitude"
                            placeholder="Longitude"
                            type="text"
                            errorMessage="Enter Longitude"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom04"
                          />
                        </div>
                      </Col>
                      <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom04">
                            Delivery Type Rate
                          </Label>
                          <AvField
                            name="longitude"
                            placeholder="Longitude"
                            type="text"
                            errorMessage="Enter Longitude"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom04"
                          />
                        </div>
                      </Col>
                      <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom04">
                            Delivery Slot
                          </Label>
                          <AvField
                            name="longitude"
                            placeholder="Longitude"
                            type="text"
                            errorMessage="Enter Longitude"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom04"
                          />
                        </div>
                      </Col>
                      <Col md="3" style={{ marginTop: "3%" }}>
                        <div className="mb-3">
                          <div className="form-check mb-3">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value=""
                              id="invalidCheck"
                              required
                            />
                            <label
                              className="form-check-label"
                              htmlFor="invalidCheck"
                            >
                              Agree to terms and conditions
                            </label>
                            <div className="invalid-feedback">
                              You must agree before submitting.
                            </div>
                          </div>
                        </div>
                      </Col>
                    </Row>

                    {/*Text Field End*/}

                    <Button color="primary" type="submit">
                      <Save></Save> {"  "}
                      Submit
                    </Button>
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

export default DatatableTables;
