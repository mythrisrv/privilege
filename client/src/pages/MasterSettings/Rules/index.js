import React from "react";
import { MDBDataTable } from "mdbreact";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Settings from "@mui/icons-material/Settings";

import MenuItem from "@mui/material/MenuItem";

import Select from "@mui/material/Select";

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
import "./rules.scss";
import { Grid } from "@mui/material";

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

  const data = {
    columns: [
      {
        label: "Main Menu",
        field: "mmenu",
        sort: "asc",
        width: 150,
      },
      {
        label: "Sub Menu",
        field: "smenu",
        sort: "asc",
        width: 150,
      },
      {
        label: (
          <>
            <FormControl component="fieldset">
              <FormGroup aria-label="position" row>
                <FormControlLabel
                  value="start"
                  control={<Checkbox />}
                  label="View"
                  labelPlacement="start"
                />
              </FormGroup>
            </FormControl>
          </>
        ),
        field: "view",
        sort: "asc",
        width: 270,
      },
      {
        label: (
          <>
            <FormControl component="fieldset">
              <FormGroup aria-label="position" row>
                <FormControlLabel
                  value="start"
                  control={<Checkbox />}
                  label="Edit"
                  labelPlacement="start"
                />
              </FormGroup>
            </FormControl>
          </>
        ),
        field: "edit",
        sort: "asc",
        width: 150,
      },
      {
        label: (
          <>
            <FormControl component="fieldset">
              <FormGroup aria-label="position" row>
                <FormControlLabel
                  value="start"
                  control={<Checkbox />}
                  label="Delete"
                  labelPlacement="start"
                />
              </FormGroup>
            </FormControl>
          </>
        ),
        field: "delete",
        sort: "asc",
        width: 150,
      },
      {
        label: (
          <>
            <FormControl component="fieldset">
              <FormGroup aria-label="position" row>
                <FormControlLabel
                  value="start"
                  control={<Checkbox />}
                  label="Export"
                  labelPlacement="start"
                />
              </FormGroup>
            </FormControl>
          </>
        ),
        field: "export",
        sort: "asc",
        width: 200,
      },
    ],
    rows: [
      //1st row start
      {
        mmenu: <>Accounts</>,
        smenu: (
          <>
            <FormControl component="fieldset">
              <FormGroup aria-label="position" row>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Add Free"
                />
                <Grid item lg="8"></Grid>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Account Head"
                />
                <Grid item lg="8"></Grid>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Add Expense"
                />
                <Grid item lg="8"></Grid>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Expense Analysis"
                />
                <Grid item lg="8"></Grid>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Monthly Report"
                />
              </FormGroup>
            </FormControl>
          </>
        ),

        view: (
          <>
            <FormControl component="fieldset">
              <FormGroup aria-label="position" row>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
              </FormGroup>
            </FormControl>
          </>
        ),
        edit: (
          <>
            <FormControl component="fieldset">
              <FormGroup aria-label="position" row>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
              </FormGroup>
            </FormControl>
          </>
        ),
        delete: (
          <>
            <FormControl component="fieldset">
              <FormGroup aria-label="position" row>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
              </FormGroup>
            </FormControl>
          </>
        ),
        export: (
          <>
            <FormControl component="fieldset">
              <FormGroup aria-label="position" row>
                <FormControlLabel
                  control={<Checkbox />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
                <FormControlLabel
                  control={<Checkbox />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
                <FormControlLabel
                  control={<Checkbox />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
                <FormControlLabel
                  control={<Checkbox />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
                <FormControlLabel
                  control={<Checkbox />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
              </FormGroup>
            </FormControl>
          </>
        ),
      },

      //2nd Row start

      {
        mmenu: <>Careers</>,
        smenu: (
          <>
            <FormControl component="fieldset">
              <FormGroup aria-label="position" row>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Add Career"
                />
                <Grid item lg="8"></Grid>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="job Application"
                />
                <Grid item lg="9"></Grid>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Subscribers"
                />
                <Grid item lg="8"></Grid>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Career Enquiries"
                />
                <Grid item lg="10"></Grid>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Internship"
                />
              </FormGroup>
            </FormControl>
          </>
        ),

        view: (
          <>
            <FormControl component="fieldset">
              <FormGroup aria-label="position" row>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
              </FormGroup>
            </FormControl>
          </>
        ),
        edit: (
          <>
            <FormControl component="fieldset">
              <FormGroup aria-label="position" row>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />

                <Grid item md="8"></Grid>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
              </FormGroup>
            </FormControl>
          </>
        ),
        delete: (
          <>
            <FormControl component="fieldset">
              <FormGroup aria-label="position" row>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
              </FormGroup>
            </FormControl>
          </>
        ),
        export: (
          <>
            <FormControl component="fieldset">
              <FormGroup aria-label="position" row>
                <FormControlLabel
                  control={<Checkbox />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
                <FormControlLabel
                  control={<Checkbox />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
                <FormControlLabel
                  control={<Checkbox />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
                <FormControlLabel
                  control={<Checkbox />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
                <FormControlLabel
                  control={<Checkbox />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
              </FormGroup>
            </FormControl>
          </>
        ),
      },

      //3rd Row start

      {
        mmenu: <>Certification</>,
        smenu: (
          <>
            <FormControl component="fieldset">
              <FormGroup aria-label="position" row>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Add Certificates"
                />
                <Grid item lg="8"></Grid>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Process Certificates"
                />
                <Grid item lg="8"></Grid>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Certification Request"
                />
                <Grid item lg="8"></Grid>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Add Certificates"
                />
                <Grid item lg="8"></Grid>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Process Certificates"
                />
                <Grid item lg="8"></Grid>
              </FormGroup>
            </FormControl>
          </>
        ),

        view: (
          <>
            <FormControl component="fieldset">
              <FormGroup aria-label="position" row>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
              </FormGroup>
            </FormControl>
          </>
        ),
        edit: (
          <>
            <FormControl component="fieldset">
              <FormGroup aria-label="position" row>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />

                <Grid item md="8"></Grid>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
              </FormGroup>
            </FormControl>
          </>
        ),
        delete: (
          <>
            <FormControl component="fieldset">
              <FormGroup aria-label="position" row>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
              </FormGroup>
            </FormControl>
          </>
        ),
        export: (
          <>
            <FormControl component="fieldset">
              <FormGroup aria-label="position" row>
                <FormControlLabel
                  control={<Checkbox />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
                <FormControlLabel
                  control={<Checkbox />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
                <FormControlLabel
                  control={<Checkbox />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
                <FormControlLabel
                  control={<Checkbox />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
                <FormControlLabel
                  control={<Checkbox />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
              </FormGroup>
            </FormControl>
          </>
        ),
      },

      //4th Row start

      {
        mmenu: <>Curriculam</>,
        smenu: (
          <>
            <FormControl component="fieldset">
              <FormGroup aria-label="position" row>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Curriculum"
                />
                <Grid item lg="8"></Grid>

                <Grid item lg="8"></Grid>
              </FormGroup>
            </FormControl>
          </>
        ),

        view: (
          <>
            <FormControl component="fieldset">
              <FormGroup aria-label="position" row>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>

                <Grid item md="8"></Grid>
              </FormGroup>
            </FormControl>
          </>
        ),
        edit: (
          <>
            <FormControl component="fieldset">
              <FormGroup aria-label="position" row>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>

                <Grid item md="8"></Grid>
              </FormGroup>
            </FormControl>
          </>
        ),
        delete: (
          <>
            <FormControl component="fieldset">
              <FormGroup aria-label="position" row>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>

                <Grid item md="8"></Grid>
              </FormGroup>
            </FormControl>
          </>
        ),
        export: (
          <>
            <FormControl component="fieldset">
              <FormGroup aria-label="position" row>
                <FormControlLabel
                  control={<Checkbox />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>

                <Grid item md="8"></Grid>
              </FormGroup>
            </FormControl>
          </>
        ),
      },

      //5th Row start

      {
        mmenu: <>Daily report</>,
        smenu: (
          <>
            <FormControl component="fieldset">
              <FormGroup aria-label="position" row>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Daily report"
                />
                <Grid item lg="8"></Grid>

                <Grid item lg="8"></Grid>
              </FormGroup>
            </FormControl>
          </>
        ),

        view: (
          <>
            <FormControl component="fieldset">
              <FormGroup aria-label="position" row>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>

                <Grid item md="8"></Grid>
              </FormGroup>
            </FormControl>
          </>
        ),
        edit: (
          <>
            <FormControl component="fieldset">
              <FormGroup aria-label="position" row>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>

                <Grid item md="8"></Grid>
              </FormGroup>
            </FormControl>
          </>
        ),
        delete: (
          <>
            <FormControl component="fieldset">
              <FormGroup aria-label="position" row>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>

                <Grid item md="8"></Grid>
              </FormGroup>
            </FormControl>
          </>
        ),
        export: (
          <>
            <FormControl component="fieldset">
              <FormGroup aria-label="position" row>
                <FormControlLabel
                  control={<Checkbox />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>

                <Grid item md="8"></Grid>
              </FormGroup>
            </FormControl>
          </>
        ),
      },

      //6th Row start

      {
        mmenu: <>Dashboard</>,
        smenu: (
          <>
            <FormControl component="fieldset">
              <FormGroup aria-label="position" row>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Dashboard"
                />
                <Grid item lg="8"></Grid>

                <Grid item lg="8"></Grid>
              </FormGroup>
            </FormControl>
          </>
        ),

        view: (
          <>
            <FormControl component="fieldset">
              <FormGroup aria-label="position" row>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>

                <Grid item md="8"></Grid>
              </FormGroup>
            </FormControl>
          </>
        ),
        edit: (
          <>
            <FormControl component="fieldset">
              <FormGroup aria-label="position" row>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>

                <Grid item md="8"></Grid>
              </FormGroup>
            </FormControl>
          </>
        ),
        delete: (
          <>
            <FormControl component="fieldset">
              <FormGroup aria-label="position" row>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>

                <Grid item md="8"></Grid>
              </FormGroup>
            </FormControl>
          </>
        ),
        export: (
          <>
            <FormControl component="fieldset">
              <FormGroup aria-label="position" row>
                <FormControlLabel
                  control={<Checkbox />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>

                <Grid item md="8"></Grid>
              </FormGroup>
            </FormControl>
          </>
        ),
      },

      //7th row start
      {
        mmenu: <>Enquiry</>,
        smenu: (
          <>
            <FormControl component="fieldset">
              <FormGroup aria-label="position" row>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Add Enquiry"
                />
                <Grid item lg="8"></Grid>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="View Enquiry"
                />
                <Grid item lg="8"></Grid>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="web Enquiry"
                />
                <Grid item lg="9"></Grid>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Curriculum"
                />
                <Grid item lg="8"></Grid>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Franchise"
                />
                <Grid item lg="8"></Grid>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Complaints"
                />
                <Grid item lg="8"></Grid>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Franchise"
                />
                <Grid item lg="8"></Grid>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Contact Us"
                />
              </FormGroup>
            </FormControl>
          </>
        ),

        view: (
          <>
            <FormControl component="fieldset">
              <FormGroup aria-label="position" row>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
              </FormGroup>
            </FormControl>
          </>
        ),
        edit: (
          <>
            <FormControl component="fieldset">
              <FormGroup aria-label="position" row>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
              </FormGroup>
            </FormControl>
          </>
        ),
        delete: (
          <>
            <FormControl component="fieldset">
              <FormGroup aria-label="position" row>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
              </FormGroup>
            </FormControl>
          </>
        ),
        export: (
          <>
            <FormControl component="fieldset">
              <FormGroup aria-label="position" row>
                <FormControlLabel
                  control={<Checkbox />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
                <FormControlLabel
                  control={<Checkbox />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
                <FormControlLabel
                  control={<Checkbox />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
                <FormControlLabel
                  control={<Checkbox />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
                <FormControlLabel
                  control={<Checkbox />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
              </FormGroup>
            </FormControl>
          </>
        ),
      },

      //8th Row start

      {
        mmenu: <>Event Registration</>,
        smenu: (
          <>
            <FormControl component="fieldset">
              <FormGroup aria-label="position" row>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="ICF"
                />
                <Grid item lg="8"></Grid>

                <Grid item lg="8"></Grid>
              </FormGroup>
            </FormControl>
          </>
        ),

        view: (
          <>
            <FormControl component="fieldset">
              <FormGroup aria-label="position" row>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>

                <Grid item md="8"></Grid>
              </FormGroup>
            </FormControl>
          </>
        ),
        edit: (
          <>
            <FormControl component="fieldset">
              <FormGroup aria-label="position" row>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>

                <Grid item md="8"></Grid>
              </FormGroup>
            </FormControl>
          </>
        ),
        delete: (
          <>
            <FormControl component="fieldset">
              <FormGroup aria-label="position" row>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>

                <Grid item md="8"></Grid>
              </FormGroup>
            </FormControl>
          </>
        ),
        export: (
          <>
            <FormControl component="fieldset">
              <FormGroup aria-label="position" row>
                <FormControlLabel
                  control={<Checkbox />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>

                <Grid item md="8"></Grid>
              </FormGroup>
            </FormControl>
          </>
        ),
      },

      //9th row start
      {
        mmenu: <>Manage</>,
        smenu: (
          <>
            <FormControl component="fieldset">
              <FormGroup aria-label="position" row>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="New Course"
                />
                <Grid item lg="8"></Grid>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="New Software "
                />
                <Grid item lg="8"></Grid>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Assign Software"
                />
                <Grid item lg="9"></Grid>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Add Syllabus"
                />
                <Grid item lg="8"></Grid>
              </FormGroup>
            </FormControl>
          </>
        ),

        view: (
          <>
            <FormControl component="fieldset">
              <FormGroup aria-label="position" row>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
              </FormGroup>
            </FormControl>
          </>
        ),
        edit: (
          <>
            <FormControl component="fieldset">
              <FormGroup aria-label="position" row>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
              </FormGroup>
            </FormControl>
          </>
        ),
        delete: (
          <>
            <FormControl component="fieldset">
              <FormGroup aria-label="position" row>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
              </FormGroup>
            </FormControl>
          </>
        ),
        export: (
          <>
            <FormControl component="fieldset">
              <FormGroup aria-label="position" row>
                <FormControlLabel
                  control={<Checkbox />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
                <FormControlLabel
                  control={<Checkbox />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
                <FormControlLabel
                  control={<Checkbox />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
                <FormControlLabel
                  control={<Checkbox />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
                <FormControlLabel
                  control={<Checkbox />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
              </FormGroup>
            </FormControl>
          </>
        ),
      },

      //10th row start
      {
        mmenu: <>Placements</>,
        smenu: (
          <>
            <FormControl component="fieldset">
              <FormGroup aria-label="position" row>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Add Company"
                />
                <Grid item lg="9"></Grid>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Add Job "
                />
                <Grid item lg="9"></Grid>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Placement Registration"
                />
                <Grid item lg="9"></Grid>
              </FormGroup>
            </FormControl>
          </>
        ),

        view: (
          <>
            <FormControl component="fieldset">
              <FormGroup aria-label="position" row>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
              </FormGroup>
            </FormControl>
          </>
        ),
        edit: (
          <>
            <FormControl component="fieldset">
              <FormGroup aria-label="position" row>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
              </FormGroup>
            </FormControl>
          </>
        ),
        delete: (
          <>
            <FormControl component="fieldset">
              <FormGroup aria-label="position" row>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
              </FormGroup>
            </FormControl>
          </>
        ),
        export: (
          <>
            <FormControl component="fieldset">
              <FormGroup aria-label="position" row>
                <FormControlLabel
                  control={<Checkbox />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
                <FormControlLabel
                  control={<Checkbox />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
                <FormControlLabel
                  control={<Checkbox />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
                <FormControlLabel
                  control={<Checkbox />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
                <FormControlLabel
                  control={<Checkbox />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
              </FormGroup>
            </FormControl>
          </>
        ),
      },

      //11th row start
      {
        mmenu: <>Students</>,
        smenu: (
          <>
            <FormControl component="fieldset">
              <FormGroup aria-label="position" row>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Web Registration"
                />
                <Grid item lg="9"></Grid>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="New Registration "
                />
                <Grid item lg="9"></Grid>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Ongoing Students"
                />
                <Grid item lg="9"></Grid>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Logging Students"
                />
                <Grid item lg="9"></Grid>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Upcoming Students"
                />
                <Grid item lg="9"></Grid>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Completed Students"
                />
                <Grid item lg="9"></Grid>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Certificates Students"
                />
                <Grid item lg="9"></Grid>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Textbooks"
                />
                <Grid item lg="9"></Grid>
              </FormGroup>
            </FormControl>
          </>
        ),

        view: (
          <>
            <FormControl component="fieldset">
              <FormGroup aria-label="position" row>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
              </FormGroup>
            </FormControl>
          </>
        ),
        edit: (
          <>
            <FormControl component="fieldset">
              <FormGroup aria-label="position" row>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
              </FormGroup>
            </FormControl>
          </>
        ),
        delete: (
          <>
            <FormControl component="fieldset">
              <FormGroup aria-label="position" row>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
              </FormGroup>
            </FormControl>
          </>
        ),
        export: (
          <>
            <FormControl component="fieldset">
              <FormGroup aria-label="position" row>
                <FormControlLabel
                  control={<Checkbox />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
                <FormControlLabel
                  control={<Checkbox />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
                <FormControlLabel
                  control={<Checkbox />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
                <FormControlLabel
                  control={<Checkbox />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
                <FormControlLabel
                  control={<Checkbox />}
                  label=""
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
                <Grid item md="8"></Grid>
              </FormGroup>
            </FormControl>
          </>
        ),
      },
    ],
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs title="Home" breadcrumbItem="Rules" />
          <Row>
            <Col xl="12">
              <Card>
                <CardBody>
                  <AvForm className="needs-validation">
                    <Row>
                      <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom05">Set Rules</Label>
                          <FormControl sx={{ m: 1, width: 273 }}>
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
                              <MenuItem value={0}>Admin</MenuItem>

                              <MenuItem value={1}>Director</MenuItem>
                              <MenuItem value={2}>Center Manager</MenuItem>
                              <MenuItem value={3}>Marketing & Sales</MenuItem>
                              <MenuItem value={4}>Accounts</MenuItem>
                              <MenuItem value={5}>General Manager</MenuItem>
                              <MenuItem value={6}>Business Head</MenuItem>
                              <MenuItem value={7}>Trainee</MenuItem>
                              <MenuItem value={8}>Masters</MenuItem>
                              <MenuItem value={9}>Accounts Master</MenuItem>
                              <MenuItem value={10}>
                                Central Manager - Australia
                              </MenuItem>
                              <MenuItem value={11}>Technical Head</MenuItem>
                              <MenuItem value={12}>RH Admin</MenuItem>
                              <MenuItem value={13}>Technical Manager</MenuItem>
                              <MenuItem value={14}>
                                Centre Manager - TCR
                              </MenuItem>
                            </Select>
                          </FormControl>
                        </div>
                      </Col>

                      <Col md="3">
                        <div className="mt-4">
                          <Button color="primary" type="submit">
                            <Settings></Settings>
                            {"  "}Set Rules
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
                  <CardTitle>View Rules</CardTitle>
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
