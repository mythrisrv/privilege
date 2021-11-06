import React from "react";
import { MDBDataTable } from "mdbreact";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Save from "@mui/icons-material/Save";
import Resete from "@mui/icons-material/ResetTvRounded";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Checkbox from "@mui/material/Checkbox";

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
import "./previlage.scss";
import { Grid } from "@mui/material";

const DatatableTables = () => {
  const data = {
    columns: [
      {
        label: "SI#",
        field: "si",
        sort: "asc",
        width: 150,
      },
      {
        label: "Privilage Name",
        field: "name",
        sort: "asc",
        width: 150,
      },
      {
        label: "Privilage Shortcode",
        field: "pcode",
        sort: "asc",
        width: 270,
      },
      {
        label: "Company Name",
        field: "cname",
        sort: "asc",
        width: 150,
      },
      // {
      //   label:"Branch Name",
      //   field:"branch",
      //   sort:"asc",
      //   width:150,
      // },
      {
        label: "Action",
        field: "action",
        sort: "asc",
        width: 200,
      },
    ],
    rows: [
      {
        si: "1",
        name: "Admin",
        pcode: "ADM",
        office: "Edinburgh",
        age: "61",
        date: "2011/04/25",
        salary: "$320",
        cname: (
          <>
            <FormControl component="fieldset">
              <FormGroup aria-label="position" row>
                <FormControlLabel
                style={{marginRight: "15%"}}
                  value="end"
                  control={<Checkbox />}
                  label="Mavoor road - Calicut"
                  labelPlacement="end"
                />

                <FormControlLabel
                  value="end"
                  control={<Checkbox />}
                  label="City Center - Thrissur"
                  labelPlacement="end"
                />

              

                <FormControlLabel
                style={{marginRight: "15%"}}
                  value="end"
                  control={<Checkbox />}
                  label="Kottakal - Malapuram"
                  labelPlacement="end"
                />
                <FormControlLabel
                  value="end"
                  control={<Checkbox />}
                  label="Kochi"
                  labelPlacement="end"
                />

                <Grid item lg="5"></Grid>

                <FormControlLabel
                  value="end"
                  control={<Checkbox />}
                  label="Australia"
                  labelPlacement="end"
                />
              </FormGroup>
            </FormControl>
          </>
        ),
        action: (
          <>
            {" "}
            <EditIcon />
            <DeleteIcon />
          </>
        ),
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
          <Breadcrumbs title="Home" breadcrumbItem="Privilage" />
          <Row>
            <Col xl="12">
              <Card>
                <CardBody>
                  <AvForm className="needs-validation">
                    <Row>
                      <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom01">Previlage</Label>
                          <AvField
                            name="firstname"
                            placeholder="Privilage name"
                            type="text"
                            errorMessage="Enter Previlage Name"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom01"
                          />
                        </div>
                      </Col>
                      <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom02">Shortcode</Label>
                          <AvField
                            name="lastname"
                            placeholder="Privilage Shortcode"
                            type="text"
                            errorMessage="Enter Privilage Shortcode"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom02"
                          />
                        </div>
                      </Col>
                      <Col md="3">
                        <div className="mt-4">
                          <Button color="primary" type="submit">
                            <Save></Save>
                            {"  "}
                            Save
                          </Button>
                        </div>
                      </Col>

                      <Col md="3">
                        <div className="mt-4">
                          <Button color="danger" type="submit">
                            <Resete></Resete>
                            {"  "}
                            Resete
                          </Button>
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
                  <CardTitle>View Privileges</CardTitle>
                  <hr />
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
