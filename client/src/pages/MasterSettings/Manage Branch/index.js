import React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Save from "@mui/icons-material/Save";
import Resete from "@mui/icons-material/Refresh";

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
  const [city, setCity] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);

  const handleChange = (event) => {
    setState(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleChange1 = (event) => {
    setCity(event.target.value);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };

  const handleOpen1 = () => {
    setOpen1(true);
  };

  const data = {
    columns: [
      {
        label: "SI#",
        field: "si",
        sort: "asc",
        width: 150,
      },
      {
        label: "Division",
        field: "division",
        sort: "asc",
        width: 270,
      },
      {
        label: "Branch Name",
        field: "bname",
        sort: "asc",
        width: 200,
      },
      {
        label: "Code",
        field: "code",
        sort: "asc",
        width: 100,
      },
      {
        label: "Action",
        field: "action",
        sort: "asc",
        width: 10,
      },
    ],
    rows: [
      {
        si: "1",
        division: "CADD INTERNATIONAL",
        bname: "Australia",
        code: "CIK06",
        action: (
          <>
            {" "}
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
          <Breadcrumbs title="Home" breadcrumbItem="Branch" />

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
                            Select Division
                          </Label>
                          <FormControl
                            sx={{ m: 1, width: 273 }}
                            placeholder="Pick a Division"
                          >
                            {/* <InputLabel id="demo-controlled-open-select-label">
                              Age
                            </InputLabel> */}
                            <Select
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
                                <em>Pick a Division</em>
                              </MenuItem>

                              <MenuItem value={20}>CADD INTERNATIONAL</MenuItem>
                              <MenuItem value={30}>RAYS & HUSE</MenuItem>
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
                            placeholder="Company Name"
                            type="text"
                            errorMessage="Enter Branch Name"
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
                        <Button color="primary" type="submit">
                          <Save></Save> {"  "}
                          Submit
                        </Button>
                        {"    "}
                        <Button color="danger" type="submit">
                          <Resete></Resete>{"  "}
                          Resete
                        </Button>
                      </Col>
                    </Row>

                    {/*Text Field End*/}
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
