import PropTypes from "prop-types";
import React, { useState,useEffect } from "react";

import { connect } from "react-redux";
import { Form, Input, Button, Row, Col } from "reactstrap";
import accessToken from "../../helpers/jwt-token-access/accessToken";
import axios from "axios";

import { Link } from "react-router-dom";

// Reactstrap
import { Dropdown, DropdownToggle, DropdownMenu } from "reactstrap";

// Import menuDropdown
import NotificationDropdown from "../CommonForBoth/TopbarDropdown/NotificationDropdown";
import ProfileMenu from "../CommonForBoth/TopbarDropdown/ProfileMenu";

// Import components
import MegaMenu from "../MegaMenu/MegaMenu";

import logoSm from "../../assets/images/logo-sm.svg";
import logoDark from "../../assets/images/logo-dark.png";
import logoLight from "../../assets/images/logo-new.png";

// import images
import github from "../../assets/images/brands/github.png";
import bitbucket from "../../assets/images/brands/bitbucket.png";
import dribbble from "../../assets/images/brands/dribbble.png";
import dropbox from "../../assets/images/brands/dropbox.png";
import mail_chimp from "../../assets/images/brands/mail_chimp.png";
import slack from "../../assets/images/brands/slack.png";
import Select from "react-select";
//i18n
import { withTranslation } from "react-i18next";

// Redux Store
import {
  showRightSidebarAction,
  toggleLeftmenu,
  changeSidebarType,
  
  
} from "../../store/actions";

const Header = (props) => {
  const [userId, setUserId] = useState(null);
  const [search, setsearch] = useState(false);
  const [socialDrp, setsocialDrp] = useState(false);
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const [selectedMasterCompany, setselectedMasterCompany] = useState( null);
  const [selectedMasterLocalbody, setselectedMasterLocalbody] = useState(null);
  const [masterLocalbodyOptionsGroup,setMasterLocalbodyOptionsGroup] = useState(null);
  const [masterComanyOptionsGroup,setMasterCompaniesOptionsGroup] = useState(null);

  const API_URL = process.env.REACT_APP_APIURL || "http://localhost:3099/";
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
 
  

useEffect(()=>{
      if (localStorage.getItem('authUser')) {
        var data = localStorage.getItem('authUser');
        var user_obj = JSON.parse(data);
        setUserId(user_obj._id);
       fetchMasterCompanies(user_obj._id);
       fetchMasterLocalbodies(user_obj._id);
      }
      
    },[])
  function fetchMasterCompanies(user_id)
  {
    axios
    .get(`${API_URL}company/list/single_options?id=` + user_id,
    {
      headers: {
        'x-access-token': accessToken,
      },
    })
    .then((res) => {
      var companies =
        res.data.data &&
        res.data.data.map((item) => {
          return {
            label: item.company_name,
            value: item._id,
          };
        });
        var user_company =
        res.data.user_company &&
        res.data.user_company.map((item) => {
          return {
            label: item.company_name,
            value: item._id,
          };
        });
      setMasterCompaniesOptionsGroup([
        {
          options: companies,
        },
      ]);
      handleSelectedMasterCompany(user_company[0]);
    });
  
  }
  
function fetchMasterLocalbodies(user_id,id=null)
{
  var data = localStorage.getItem('authUser');
  var user_obj = JSON.parse(data);
  user_id = user_obj._id;
  if(id!=null)
  {
    var url = `${API_URL}company/list/localbodies?id=` + user_id+`&cid=`+id;
  }
  else
  {
    var url = `${API_URL}company/list/localbodies?id=` + user_id;
  }
  axios
  .get( url, 
  {
    headers: {
      'x-access-token': accessToken,
    },
  })
  .then((res) => {
    var localbodies =
      res.data.data &&
      res.data.data.map((item) => {
        return {
          label: item.localbody_name,
          value: item._id,
        };
      });
      var user_localbodies =
      res.data.user_localbody &&
      res.data.user_localbody.map((item) => {
        return {
          label: item.localbody_name,
          value: item._id,
        };
      });
    setMasterLocalbodyOptionsGroup([
      {
        options: localbodies,
      },
    ]);
    setselectedMasterLocalbody(user_localbodies[0]);
  });

}

  function toggleFullscreen() {
    if (
      !document.fullscreenElement &&
      /* alternative standard method */ !document.mozFullScreenElement &&
      !document.webkitFullscreenElement
    ) {
      // current working methods
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen(
          Element.ALLOW_KEYBOARD_INPUT
        );
      }
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    }
  }

  function tToggle() {
    if (!isMobile) {
      var body = document.body;
      body.classList.toggle("vertical-collpsed");
      body.classList.toggle("sidebar-enable");
    }

    props.toggleLeftmenu(!props.leftMenu);
    if (props.leftSideBarType === "default") {
      props.changeSidebarType("condensed", isMobile);
    } else if (props.leftSideBarType === "condensed") {
      props.changeSidebarType("default", isMobile);
    }
  }

  function toggleMegaMenu() {
    setShowMegaMenu(!showMegaMenu);
  }
  function handleSelectedMasterCompany(value) {
    setselectedMasterCompany(value);
    fetchMasterLocalbodies(userId,value.value);
   }
  function handleSelectedMasterLocalbody(value) {
    let newValue = {
      name: value.label,
      _id: value.value,
    };
    setselectedMasterLocalbody(value);
  }

  return (
    <React.Fragment>
      {showMegaMenu ? <MegaMenu /> : null}
      <header id="page-topbar" >
        <div className="navbar-header">
          <div className="d-flex">
            <div className="navbar-brand-box">
              <Link to="/" className="logo logo-dark">
                <span className="logo-sm">
                  <img src={logoSm} alt="" height="22" />
                </span>
                <span className="logo-lg">
                  <img src={logoDark} alt="" height="20" />
                </span>
              </Link>

              <Link to="/" className="logo logo-light">
                <span className="logo-sm">
                  <img src={logoSm} alt="" height="22" />
                </span>
                <span className="logo-lg">
                  <img src={logoLight} alt="" height="20" />
                </span>
              </Link>
            </div>

            <button
              type="button"
              onClick={() => {
                tToggle();
              }}
              className="btn btn-sm px-3 font-size-16 header-item waves-effect vertical-menu-btn"
              id="vertical-menu-btn"
            >
              <i className="fa fa-fw fa-bars" />
            </button>

            {/* <div
              className="app-search d-none d-lg-block mt-2"
              style={{ cursor: "pointer" }}
            >
              <div
                className="position-relative"
                onClick={() => toggleMegaMenu()}
              >
                Mega Menu
                <i class="fas fa-sort-down"></i>
              </div>
            </div> */}

            <Form className="app-search d-none d-lg-block">
              <div className="position-relative">
                <input
                  type="text"
                  className="form-control"
                  placeholder={props.t("Search") + "..."}
                />
                <span className="uil-search"></span>
              </div>
            </Form>
            <Form className="app-search d-none d-lg-block">
              <div className="position-relative" style={{width:'200px'}}>
              <Select
                            name="master_company"
                            value={selectedMasterCompany}
                            onChange={(value) => {
                             handleSelectedMasterCompany(value);
                            }}
                            options={masterComanyOptionsGroup}
                            classNamePrefix="select2-selection"
                            placeholder="Company"
                          />
              </div>
            </Form>
            <Form className="app-search d-none d-lg-block">
              <div className="position-relative" style={{width:'200px'}}>
              <Select
                            name="master_localbody"
                            value={selectedMasterLocalbody}
                            onChange={(value) => {
                             handleSelectedMasterLocalbody(value);
                            }}
                            options={masterLocalbodyOptionsGroup}
                            classNamePrefix="select2-selection"
                            placeholder="Localboy"
                          />
              </div>
            </Form>
          </div>

          <div className="d-flex">
            <Dropdown
              className="d-inline-block d-lg-none ms-2"
              onClick={() => {
                setsearch(!search);
              }}
              type="button"
            >
              <DropdownToggle
                className="btn header-item noti-icon waves-effect"
                id="page-header-search-dropdown"
                tag="button"
              >
                {" "}
                <i className="uil-search" />
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-lg dropdown-menu-end p-0">
                <Form className="p-3">
                  <div className="form-group m-0">
                    <div className="input-group">
                      <Input
                        type="text"
                        className="form-control"
                        placeholder="Search ..."
                        aria-label="Recipient's username"
                      />
                      <div className="input-group-append">
                        <Button className="btn btn-primary" type="submit">
                          <i className="mdi mdi-magnify"></i>
                        </Button>
                      </div>
                    </div>
                  </div>
                </Form>
              </DropdownMenu>
            </Dropdown>

            <Dropdown
              className="d-none d-lg-inline-block ms-1"
              isOpen={socialDrp}
              toggle={() => {
                setsocialDrp(!socialDrp);
              }}
            >
              <DropdownToggle
                className="btn header-item noti-icon waves-effect"
                tag="button"
              >
                <i className="uil-apps"></i>
              </DropdownToggle>
              <DropdownMenu
                className="dropdown-menu-lg dropdown-menu-end"
                right
              >
                <div className="px-lg-2">
                  <Row className="g-0">
                    <Col>
                      <Link className="dropdown-icon-item" to="#">
                        <img src={github} alt="Github" />
                        <span>GitHub</span>
                      </Link>
                    </Col>
                    <Col>
                      <Link className="dropdown-icon-item" to="#">
                        <img src={bitbucket} alt="bitbucket" />
                        <span>Bitbucket</span>
                      </Link>
                    </Col>
                    <Col>
                      <Link className="dropdown-icon-item" to="#">
                        <img src={dribbble} alt="dribbble" />
                        <span>Dribbble</span>
                      </Link>
                    </Col>
                  </Row>

                  <Row className="g-0">
                    <Col>
                      <Link className="dropdown-icon-item" to="#">
                        <img src={dropbox} alt="dropbox" />
                        <span>Dropbox</span>
                      </Link>
                    </Col>
                    <Col>
                      <Link className="dropdown-icon-item" to="#">
                        <img src={mail_chimp} alt="mail_chimp" />
                        <span>Mail Chimp</span>
                      </Link>
                    </Col>
                    <Col>
                      <Link className="dropdown-icon-item" to="#">
                        <img src={slack} alt="slack" />
                        <span>Slack</span>
                      </Link>
                    </Col>
                  </Row>
                </div>
              </DropdownMenu>
            </Dropdown>

            <Dropdown className="d-none d-lg-inline-block ms-1">
              <button
                type="button"
                onClick={() => {
                  toggleFullscreen();
                }}
                className="btn header-item noti-icon waves-effect"
                data-toggle="fullscreen"
              >
                <i className="uil-minus-path"></i>
              </button>
            </Dropdown>

            <NotificationDropdown />

            <div
              // onClick={() => {
              //   props.showRightSidebarAction(!props.showRightSidebar);
              // }}
              className="dropdown d-inline-block"
            >
              <button
                type="button"
                className="btn header-item noti-icon right-bar-toggle waves-effect"
              >
                <i className="uil-cog"></i>
              </button>
            </div>

            <ProfileMenu />

            <Link to="/logout">
              <button
                type="button"
                className="btn header-item noti-icon right-bar-toggle waves-effect"
              >
                <i
                  class="fas fa-power-off"
                  style={{
                    fontSize: "1.2em",
                  }}
                ></i>
              </button>
            </Link>
          </div>
        </div>
      </header>
    </React.Fragment>
  );
};

Header.propTypes = {
  changeSidebarType: PropTypes.func,
  leftMenu: PropTypes.any,
  leftSideBarType: PropTypes.any,
  showRightSidebar: PropTypes.any,
  showRightSidebarAction: PropTypes.func,
  t: PropTypes.any,
  toggleLeftmenu: PropTypes.func,
};

const mapStatetoProps = (state) => {
  const { layoutType, showRightSidebar, leftMenu, leftSideBarType } =
    state.Layout;
  return { layoutType, showRightSidebar, leftMenu, leftSideBarType };
};

export default connect(mapStatetoProps, {
  showRightSidebarAction,
  toggleLeftmenu,
  changeSidebarType,
})(withTranslation()(Header));
