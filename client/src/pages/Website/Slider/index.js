import React, {useState,useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { MDBDataTable } from "mdbreact";
import { AvForm, AvField } from "availity-reactstrap-validation";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import "./slider.scss";
// Redux
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import toastr from "toastr";
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
import SweetAlert from "react-bootstrap-sweetalert";
import Select from "react-select";
import {
  getSliders,
  addSlider,
  deleteSlider,
  updateSlider,
  apiError
} from "../../../store/actions";


const Slider = (props) => {

    const [sliderObject, setSliderObject] = useState({});
    const [slidersTemp, setSlidersTemp] = useState([]);
  
    const [sliderIdTobeUpdated, setSliderIdToBeUpdated] = useState(null);
    const [sliderIdToBeDeleted, setSliderIdToBeDeleted] = useState(null);
    const [confirmDeleteAlert, setConfirmDeleteAlert] = useState(null);
    const [showModal, setShowModal] = useState(false);

   //const [passwordObject, setPasswordObject] = useState({
      // oldPassword: "",
      // password: "",
      // confirmPassword: "",
    //});
    const {
      sliders,
      addingSlider,
      addSliderResponse,
      deleteSliderResponse,
      updateSliderResponse,
      error,
    } = useSelector((state) => state.sliders);
  
  
    const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(getSliders());
      // dispatch(getPrivilagesOptions());
      // dispatch(getCompaniesOptions());
    }, []);

    
  
    useEffect(() => {
      if (addSliderResponse.type === "success") {
        toastr.success(addSliderResponse.message);
      } else if (addSliderResponse.type === "failure") {
        toastr.error(error.data.message, addSliderResponse.message);
      }
    }, [addSliderResponse]);
  
    useEffect(() => {
      if (deleteSliderResponse.type === "success") {
        toastr.success(deleteSliderResponse.message);
      } else if (deleteSliderResponse.type === "failure") {
        toastr.error(error.data.message, deleteSliderResponse.message);
      }
    }, [deleteSliderResponse]);
  
    useEffect(() => {
      if (updateSliderResponse.type === "success") {
        setShowModal(false);
        setSliderIdToBeUpdated(null);       
        //setSliderIdToBeUpdated(null);
        toastr.success(updateSliderResponse.message);
      } else if (updateSliderResponse.type === "failure") {
        toastr.error(error.data.message, updateSliderResponse.message);
      }
    }, [updateSliderResponse]);
    
  
    let preUpdateSlider = (item) => {
       setSliderIdToBeUpdated(item._id);
      setSliderObject(item);
      setShowModal(true);
    };
  
    // let preUpdateUserPassword = (item) => {
    //   setSliderIdToBeUpdated(item._id);
    //   setShowModal(true);
    // };
  
    useEffect(() => {
      let slidersDuplicate = JSON.parse(JSON.stringify(sliders));
      let sliderData = [];
      slidersDuplicate.map((item, index) => {
        item.action = (
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {/* <i
              className="uil-key-skeleton"
              style={{ fontSize: "1.3em", cursor: "pointer" }}
              onClick={() => {
               // preUpdateUserPassword(item);
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
                preUpdateSlider(item);
                
              }}
            ></i>
            <i
              className="uil-trash-alt"
              style={{ fontSize: "1.3em", cursor: "pointer" }}
              onClick={() => {
                setSliderIdToBeDeleted(item._id);
                setConfirmDeleteAlert(true);
              }}
            ></i>
          </div>
        );
        item.id = index + 1;
        
        sliderData.push(item);
      });
      setSlidersTemp(sliderData);
    }, [sliders]);


 // const [slider, setSlider] = useState({})
  const data = {
    columns: [
      {
        label: "#",
        field: "id",
        sort: "asc",
        width: 10,
      },     
      {
        label: "Slider Name",
        field: "slider_name",
        sort: "asc",
        width: 70,
      },
          
      {
        label: "Android Banner",
        field: "slider_icon_svg",
        sort: "asc",
        width: 70,
      },
      {
        label: "Ios Banner",
        field: "web_banner_image",
        sort: "asc",
        width: 100,
      },
    
      {
        label: "Web banner",
        field: "app_banner_image",
        sort: "asc",
        width: 100,
      },
      {
        label: "Web banner(webp)",
        field: "app_banner_image",
        sort: "asc",
        width: 100,
      },
      {
        label: "App banner(Webp)",
        field: "app_banner_image",
        sort: "asc",
        width: 100,
      },
      {
        label: "Slider URL Web",
        field: "slider_url_web",
        sort: "asc",
        width: 100,
      },
      {
        label: "Slider URL App",
        field: "slider_url_app",
        sort: "asc",
        width: 100,
      },
      {
        label: "Added by",
        field: "added_by",
        sort: "asc",
        width: 60,
      },
      {
        label: "Status",
        field: "status",
        sort: "asc",
        width: 60,
      },
      {
        label: "Action",
        field: "action",
        sort: "asc",
        width: 100,
      },
    ],
    rows: slidersTemp,
      
    
  };

  let handleChangeInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setSliderObject({
      ...sliderObject, 
      [name]:value
    })
  }
  const handleValidSubmitSlider = (event, values) => {
    console.log(sliderObject, "AA" );
    sliderIdTobeUpdated
      ? dispatch(updateSlider(sliderObject))
      : dispatch(addSlider(sliderObject));
  };
  let handleChangeImageUpload =(event) => {
    setSliderObject({...sliderObject, slider_icon_svg:event.target.files[0].name})
      }

      let closeModal = () => {
        setShowModal(false);
        setSliderIdToBeUpdated(null);
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
            dispatch(deleteSlider(sliderIdToBeDeleted));
            setConfirmDeleteAlert(false);
          }}
          onCancel={() => setConfirmDeleteAlert(false)}
        >
          Are you sure you want to delete it?
        </SweetAlert>
      ) : null}
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs title="Home" breadcrumbItem="Slider"/>
          <Row>
            <Col xl="12">
              <Card>
                <CardBody>
                  <AvForm className="needs-validation" 
                       onValidSubmit={(e, v) => {
                        handleValidSubmitSlider(e, v);
                      }}
                  >
                    <Row>
                      <Col md="4">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom01">Slider Name</Label>
                          <AvField
                            name="slider_name"
                            value={sliderObject.slider_name}
                            placeholder="Slider Name"
                            type="text"
                            errorMessage="Enter Slider Name"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom01"
                            onChange ={handleChangeInput}
                          />
                        </div>
                      </Col>
                      <Col md="4">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom02">Slider URL Web</Label>
                          <AvField
                            name="slider_url_web"
                            value={sliderObject.slider_url_web}
                            placeholder="Slider Name"
                            type="text"
                            errorMessage="Enter Slider Name"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom02"
                            onChange ={handleChangeInput}
                          />
                        </div>
                      </Col>
                      <Col md="4">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom02">Slider URL App</Label>
                          <AvField
                            name="slider_url_app"
                            value={sliderObject.slider_url_app}
                            placeholder="Slider Name"
                            type="text"
                            errorMessage="Enter Slider Name"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom02"
                            onChange ={handleChangeInput}
                          />
                        </div>
                      </Col>
                      <Col md="4">
                      <div className="mb-3">
                          <Label htmlFor="validationCustom04">Android Banner</Label>
                          <AvField
                            name="android_banner"
                            // value={sliderObject.slider_icon_svg}
                            accept='.jpg, .png, .jpeg ,.svg'
                            onChange={handleChangeImageUpload}
                            type="file"
                            errorMessage="Please provide a valid file."
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom03"
                          />
                        </div>
                      </Col>
                    
                   
                      
                     
                      <Col md="4">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom04">IOS banner</Label>
                          <AvField
                            name="ios_banner"
                            //value={sliderObject.web_banner_image}
                            accept='.jpg, .png, .jpeg ,.svg'
                            onChange={handleChangeImageUpload}
                            type="file"
                            errorMessage="Please provide a valid file."
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom04"
                          />
                        </div>
                      </Col>
                      <Col md="4">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom04">Web Banner</Label>
                          <AvField
                            name="web_banner"
                            // value={sliderObject.app_banner_image}
                            accept='.jpg, .png, .jpeg, .svg'
                             onChange={handleChangeImageUpload}
                            type="file"
                            errorMessage="Please provide a valid file."
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom05"
                          />
                        </div>
                      </Col>
                      <Col md="4">
                      <div className="mb-3">
                          <Label htmlFor="validationCustom04">Web Banner webp</Label>
                          <AvField
                            name="web_banner_webp"
                            // value={sliderObject.slider_icon_svg}
                            accept='.jpg, .png, .jpeg ,.svg'
                            onChange={handleChangeImageUpload}
                            type="file"
                            errorMessage="Please provide a valid file."
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom03"
                          />
                        </div>
                      </Col>
                      <Col md="4">
                      <div className="mb-3">
                          <Label htmlFor="validationCustom04">App Banner webp</Label>
                          <AvField
                            name="app_banner_webp"
                            // value={sliderObject.slider_icon_svg}
                            accept='.jpg, .png, .jpeg ,.svg'
                            onChange={handleChangeImageUpload}
                            type="file"
                            errorMessage="Please provide a valid file."
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom03"
                          />
                        </div>
                      </Col>
                     
                      
                      {/* <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom04">App banner Image</Label>
                          <AvField
                            name="appbannerimage"
                            accept='.jpg, .png, .jpeg, .svg'
                            // onChange={this.onChange}
                            type="file"
                            errorMessage="Please provide a valid file."
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom07"
                          />
                        </div>
                      </Col> */}
                      
                    </Row>
                   
                  
                    {sliderIdTobeUpdated ? (
                      <Button
                        color="primary"
                        type="submit"
                        disabled={addingSlider ? true : false}
                      >
                        {addingSlider ? "Updating" : "Update"}
                      </Button>
                    ) : (
                      <Button
                        color="primary"
                        type="submit"
                        disabled={addingSlider ? true : false}
                      >
                        {addingSlider ? "Adding" : "Submit"}
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

const mapStateToProps = (state) => {
  // const { error } = state.Slider;
  // return { error };
};

export default withRouter(connect(mapStateToProps, {apiError})(Slider));

Slider.propTypes = {
  error: PropTypes.any,
  sliders: PropTypes.array,
};
