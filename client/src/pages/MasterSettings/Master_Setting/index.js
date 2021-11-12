import React from "react";
import { MDBDataTable } from "mdbreact";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Save from "@mui/icons-material/Save";
import Refresh from "@mui/icons-material/ResetTvRounded";
import InputLabel from "@mui/material/InputLabel";
import Box from "@material-ui/core/Box";

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Label,
  CardHeader,
} from "reactstrap";

import { AvForm, AvField } from "availity-reactstrap-validation";

//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import "./settings.scss";

const DatatableTables = () => {
  

  const [member, setMember] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const handleChange = (event) => {
    setMember(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };


  const [language, setLanguage] = React.useState("");
  const [open1, setOpen1] = React.useState(false);
  const handleChange1 = (event) => {
    setLanguage(event.target.value);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };

  const handleOpen1 = () => {
    setOpen1(true);
  };


  const [account, setAccount] = React.useState("");
  const [open2, setOpen2] = React.useState(false);
  const handleChange2 = (event) => {
    setAccount(event.target.value);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };

  const handleOpen2 = () => {
    setOpen2(true);
  };


  const [date, setDate] = React.useState("");
  const [open3, setOpen3] = React.useState(false);
  const handleChange3 = (event) => {
    setDate(event.target.value);
  };

  const handleClose3 = () => {
    setOpen3(false);
  };

  const handleOpen3 = () => {
    setOpen3(true);
  };

  
  const [month, setMonth] = React.useState("");
  const [open4, setOpen4] = React.useState(false);

  const handleChange4 = (event) => {
    setMonth(event.target.value);
  };

  const handleClose4 = () => {
    setOpen4(false);
  };

  const handleOpen4 = () => {
    setOpen4(true);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs title="Home" breadcrumbItem="Settings" />
          <Row>
            <Col xl="12">
              <Card>
                <CardBody>
                  <AvForm className="needs-validation">
                    {/*First row*/}
                    <Row>
                      <Col md="1">
                        <Label htmlFor="validationCustom05">Basic:</Label>
                      </Col>
                      <Col md="3">
                        <div className="mb-3">
                          <FormControl sx={{ m: 1, width: 273 }}>
                            <InputLabel id="demo-controlled-open-select-label">
                              Members
                            </InputLabel>
                            <Select
                         
                              labelId="demo-controlled-open-select-label"
                              id="demo-controlled-open-select"
                              open={open}
                              onClose={handleClose}
                              onOpen={handleOpen}
                              value={member}
                              label="member"
                              onChange={handleChange}
                            >
                              <MenuItem value="">
                                <em>--Select Customer Label--</em>
                              </MenuItem>

                              <MenuItem value={1}>Client</MenuItem>
                              <MenuItem value={2}>Customer</MenuItem>
                              <MenuItem value={3}>Members</MenuItem>
                              <MenuItem value={4}>Guest</MenuItem>
                            </Select>
                          </FormControl>
                        </div>
                      </Col>
                      <Col md="3"    className="txt-fields" >
                        <Label
                          htmlFor="validationCustom05"
                          style={{ fontWeight: "bold" }}
                        >
                          Customer:
                        </Label>
                      </Col>
                      <Col md="3">
                        <Label htmlFor="validationCustom05">Customer</Label>
                      </Col>
                    </Row>

                    {/*Second row*/}
                    <Row>
                      <Col md="1"></Col>
                      <Col md="3">
                        <div className="mb-3">
                          <FormControl sx={{ m: 1, width: 273 }}>
                            <InputLabel id="demo-controlled-open-select-label">
                              Select Language
                            </InputLabel>
                            <Select
                              labelId="demo-controlled-open-select-label"
                              id="demo-controlled-open-select"
                              open={open1}
                              onClose={handleClose1}
                              onOpen={handleOpen1}
                              value={language}
                              label="State"
                              onChange={handleChange1}
                            >
                              <MenuItem value="">
                                <em>--Select Language--</em>
                              </MenuItem>

                              <MenuItem value={1}>English</MenuItem>
                            </Select>
                          </FormControl>
                        </div>
                      </Col>
                      <Col md="3" className="txt-fields">
                        <Label
                          htmlFor="validationCustom05"
                          style={{ fontWeight: "bold" }}
                        >
                          Language:
                        </Label>
                      </Col>
                      <Col md="3">
                        <Label htmlFor="validationCustom05">English</Label>
                      </Col>

                      {/*Third row*/}
                      <Row>
                        <Col md="1">
                          <Label htmlFor="validationCustom05">
                            Accountings:
                          </Label>
                        </Col>
                        <Col md="3">
                          <div className="mb-3">
                            <FormControl sx={{ m: 1, width: 273 }}>
                              <InputLabel id="demo-controlled-open-select-label">
                                Select Currency
                              </InputLabel>
                              <Select
                                labelId="demo-controlled-open-select-label"
                                id="demo-controlled-open-select"
                                open={open2}
                                onClose={handleClose2}
                                onOpen={handleOpen2}
                                value={account}
                                label="State"
                                onChange={handleChange2}
                              >
                                <MenuItem value="">
                                  <em>--Selct Currency--</em>
                                </MenuItem>

                                <MenuItem value={1}>INR-Rupee</MenuItem>
                                <MenuItem value={2}>USD-Dollar</MenuItem>
                                <MenuItem value={3}>EUR-Euro</MenuItem>
                                <MenuItem value={4}>AED-Dirham</MenuItem>
                              </Select>
                            </FormControl>
                          </div>
                        </Col>
                        <Col md="3" className="txt-fields" >
                          <Label
                            htmlFor="validationCustom05"
                            style={{ fontWeight: "bold" }}
                          >
                            Currency:
                          </Label>
                        </Col>
                        <Col md="3">
                          <Label htmlFor="validationCustom05">
                            INR - Rupee
                          </Label>
                        </Col>
                      </Row>

                      {/*Fourth row*/}
                      <Row>
                        <Col md="1"></Col>
                        <Col md="3">
                          <div className="mb-3">
                            <FormControl sx={{ m: 1, width: 273 }}>
                              <InputLabel id="demo-controlled-open-select-label">
                                MM-DD-YYYY
                              </InputLabel>
                              <Select
                                labelId="demo-controlled-open-select-label"
                                id="demo-controlled-open-select"
                                open={open3}
                                onClose={handleClose3}
                                onOpen={handleOpen3}
                                value={date}
                                label="State"
                                onChange={handleChange3}
                              >
                                <MenuItem value="">
                                  <em>--Selct Date Formate--</em>
                                </MenuItem>

                                <MenuItem value={1}>MM-DD-YYYY</MenuItem>
                                <MenuItem value={2}>DD-MM-YYYY</MenuItem>
                              </Select>
                            </FormControl>
                          </div>
                        </Col>
                        <Col md="3" className="txt-fields" >
                          <Label
                            htmlFor="validationCustom05"
                            style={{ fontWeight: "bold" }}
                          >
                            Date Formate:
                          </Label>
                        </Col>
                        <Col md="3">
                          <Label htmlFor="validationCustom05">DD-MM-YY</Label>
                        </Col>
                      </Row>

                      {/*Fifth row*/}
                      <Row>
                        <Col md="1"></Col>
                        <Col md="3">
                          <div className="mb-3">
                            <FormControl sx={{ m: 1, width: 273 }}>
                              <InputLabel id="demo-controlled-open-select-label">
                                Select Account Month
                              </InputLabel>
                              <Select
                                labelId="demo-controlled-open-select-label"
                                id="demo-controlled-open-select"
                                open={open4}
                                onClose={handleClose4}
                                onOpen={handleOpen4}
                                value={month}
                                label="State"
                                onChange={handleChange4}
                              >
                                <MenuItem value="">
                                  <em>--Selct Account Month--</em>
                                </MenuItem>

                                <MenuItem value={1}>January</MenuItem>
                                <MenuItem value={2}>February</MenuItem>
                                <MenuItem value={3}>March</MenuItem>
                                <MenuItem value={4}>April</MenuItem>
                                <MenuItem value={5}>May</MenuItem>
                                <MenuItem value={6}>June</MenuItem>
                                <MenuItem value={7}>July</MenuItem>
                                <MenuItem value={8}>August</MenuItem>
                                <MenuItem value={9}>September</MenuItem>
                                <MenuItem value={10}>October</MenuItem>
                                <MenuItem value={11}>November</MenuItem>
                                <MenuItem value={12}>December</MenuItem>
                              </Select>
                            </FormControl>
                          </div>
                        </Col>
                        <Col md="3" className="txt-fields" >
                          <Label
                            htmlFor="validationCustom05"
                            style={{ fontWeight: "bold" }}
                          >
                            Account Month:
                          </Label>
                        </Col>
                        <Col md="3">
                          <Label htmlFor="validationCustom05">November</Label>
                        </Col>
                      </Row>

                      <Row>
                        <Box m={2} pt={3}>
                          <div className="mt-4">
                            <Button color="primary" type="submit">
                              <Save></Save>
                              {"  "}Submit
                            </Button>
                            {"  "}
                            <Button color="danger" type="submit">
                              <Refresh></Refresh>
                              {"  "}Resete
                            </Button>
                          </div>
                        </Box>
                      </Row>
                    </Row>
                  </AvForm>
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
