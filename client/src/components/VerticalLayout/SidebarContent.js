import PropTypes from "prop-types";
import React, { useCallback, useEffect, useRef } from "react";

// //Import Scrollbar
import SimpleBar from "simplebar-react";

// MetisMenu
import MetisMenu from "metismenujs";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

//i18n
import { withTranslation } from "react-i18next";

const SidebarContent = (props) => {
  const ref = useRef();

  const activateParentDropdown = useCallback((item) => {
    item.classList.add("active");
    const parent = item.parentElement;
    const parent2El = parent.childNodes[1];
    if (parent2El && parent2El.id !== "side-menu") {
      parent2El.classList.add("mm-show");
    }

    if (parent) {
      parent.classList.add("mm-active");
      const parent2 = parent.parentElement;

      if (parent2) {
        parent2.classList.add("mm-show"); // ul tag

        const parent3 = parent2.parentElement; // li tag

        if (parent3) {
          parent3.classList.add("mm-active"); // li
          parent3.childNodes[0].classList.add("mm-active"); //a
          const parent4 = parent3.parentElement; // ul
          if (parent4) {
            parent4.classList.add("mm-show"); // ul
            const parent5 = parent4.parentElement;
            if (parent5) {
              parent5.classList.add("mm-show"); // li
              parent5.childNodes[0].classList.add("mm-active"); // a tag
            }
          }
        }
      }
      scrollElement(item);
      return false;
    }
    scrollElement(item);
    return false;
  }, []);

  // Use ComponentDidMount and ComponentDidUpdate method symultaniously
  useEffect(() => {
    const pathName = props.location.pathname;

    new MetisMenu("#side-menu");
    let matchingMenuItem = null;
    const ul = document.getElementById("side-menu");
    const items = ul.getElementsByTagName("a");
    for (let i = 0; i < items.length; ++i) {
      if (pathName === items[i].pathname) {
        matchingMenuItem = items[i];
        break;
      }
    }
    if (matchingMenuItem) {
      activateParentDropdown(matchingMenuItem);
    }
  }, [props.location.pathname, activateParentDropdown]);

  useEffect(() => {
    ref.current.recalculate();
  });

  function scrollElement(item) {
    if (item) {
      const currentPosition = item.offsetTop;
      if (currentPosition > window.innerHeight) {
        ref.current.getScrollElement().scrollTop = currentPosition - 300;
      }
    }
  }

  return (
    <React.Fragment>
      <SimpleBar
        style={{ maxHeight: "100%" }}
        ref={ref}
        className="sidebar-menu-scroll"
      >
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            {/* <li className="menu-title">{props.t("Menu")} </li> */}
            <li>
              <Link to="/#" className="waves-effect">
                <i className="uil-home-alt"></i>
                {/* <span className="badge rounded-pill bg-primary float-end">
                  01
                </span> */}
                <span>{props.t("Dashboard")}</span>
              </Link>
            </li>

            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="uil-user"></i>
                <span>{props.t("User")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/user">
                    <i className="uil-plus"></i>
                    {props.t("Add/ Manage User")}
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="uil-shopping-basket"></i>
                <span>{props.t("Products")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/#">
                  <i className="uil-plus">
                    </i>{props.t("Add Products")}</Link>
                </li>
                <li>
                  <Link to="/ecommerce-product-detail">
                  <i className="uil-bill">
                    </i>
                    {props.t("Spot price")}
                  </Link>
                </li>
                
                <li>
                  <Link to="/category">
                  <i className="bx bx-play"></i> {props.t("Category")}
                  </Link>
                </li>
                <li>
                  <Link to="/subcategory">
                    <i className="bx bx-fast-forward"></i>{props.t("Sub Category")}</Link>
                </li>
                <li>
                  <Link to="/thirdcategory"><i className="bx bx-fast-forward-circle"></i>{props.t("3rd Level Category")}</Link>
                </li>

                <li>
                  
                  <Link to="/brands"> <i className="uil-bold"></i>
                 {props.t("Brands")}
                  </Link>
                </li>
                <li>
                  <Link to="/unit">
                    <i className= "bx bx-underline"></i>
                    {props.t("Unit")}</Link>
                </li>
                <li>
                  <Link to="/ecommerce-add-product">
                    {props.t("Offer Types")}
                  </Link>
                </li>
                <li>
                  <Link to="/ecommerce-add-product">
                    {props.t("Offer Products")}
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="uil-lock"></i>
                <span>{props.t("Security")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/tables-datatable">
                    <i className="uil-lock-alt"></i>
                    {props.t("Block/ Unblock IP")}
                  </Link>
                </li>
                <li>
                  <Link to="/tables-datatable">
                    <i className="uil-lock-alt"></i>
                    {props.t("Block/ Unblock User")}
                  </Link>
                </li>
                <li>
                  <Link to="/tables-datatable">
                    <i className="uil-align-justify"></i>
                    {props.t("User log/ Activity log")}
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="bx bx-list-ul"></i>
                <span>{props.t("Manage")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/tax">
                    <i className="bx bx-text"></i>
                    {props.t("Tax Rates")}
                  </Link>
                </li>
                <li>
                  <Link to="/city">
                    <i className="uil-shop"></i>
                    {props.t("City")}
                  </Link>
                </li>
                </ul>
                </li>

            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="uil-setting"></i>
                <span>{props.t("Master Settings")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/company">
                    <i className="uil-building"></i>
                    {props.t("Company")}
                  </Link>
                </li>
                <li>
                  <Link to="/tables-datatable">
                    <i className="uil-shop"></i>
                    {props.t("Manage Branch")}
                  </Link>
                </li>
                <li>
                  <Link to="/privilage">
                    <i className="uil-brightness-empty"></i>
                    {props.t("Privilage")}
                  </Link>
                </li>
                <li>
                  <Link to="/tables-datatable">
                    <i className="uil-newspaper"></i>
                    {props.t("Rules")}
                  </Link>
                </li>
              </ul>
            </li>
            <li>

              <Link to="/#" className="has-arrow waves-effect">
                <i className="uil-globe"></i>
                <span>{props.t("Website")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/banner">
                    <i className="uil-image"></i>
                    {props.t("Add Banner")}
                  </Link>
                </li>
                <li>
                  <Link to="/slider">
                    <i className="uil-image"></i>
                    {props.t("Add Slider")}
                  </Link>
                </li>
                <li>
                  <Link to="/">
                    <i className="uil-watch"></i>
                    {props.t("Delivery Time")}
                  </Link>
                </li>
                <li>
                  <Link to="/">
                    <i className="uil-parcel"></i>
                    {props.t("Offer Codes")}
                  </Link>
                </li>
              </ul>
            </li>


           

            {/* <li className="menu-title">{props.t("Apps")}</li>

            <li>
              <Link to="/calendar" className=" waves-effect">
                <i className="uil-calender"></i>
                <span>{props.t("Calendar")}</span>
              </Link>
            </li>

            <li>
              <Link to="/chat" className="waves-effect">
                <i className="uil-comments-alt"></i>
                <span className="badge rounded-pill bg-warning float-end">
                  {props.t("New")}
                </span>
                <span>{props.t("Chat")}</span>
              </Link>
            </li>*/

           

           /* <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="uil-envelope"></i>
                <span>{props.t("Email")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/email-inbox">{props.t("Inbox")}</Link>
                </li>
                <li>
                  <Link to="/email-read">{props.t("Read Email")} </Link>
                </li>
              </ul>
            </li> *

            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="uil-invoice"></i>
                <span>{props.t("Invoices")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/invoices-list">{props.t("Invoice List")}</Link>
                </li>
                <li>
                  <Link to="/invoices-detail">{props.t("Invoice Detail")}</Link>
                </li>
              </ul>
            </li> 

            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="uil-book-alt"></i>
                <span>{props.t("Contacts")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/contacts-grid">{props.t("User Grid")}</Link>
                </li>
                <li>
                  <Link to="/contacts-list">{props.t("User List")}</Link>
                </li>
                <li>
                  <Link to="/contacts-profile">{props.t("Profile")}</Link>
                </li>
              </ul>
            </li>

            <li className="menu-title">Pages</li>
            <li>
              <Link to="/#" className="waves-effect">
                <i className="uil-user-circle"></i>
                <span>{props.t("Authentication")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/pages-login">{props.t("Login")}</Link>
                </li>
                <li>
                  <Link to="/pages-register">{props.t("Register")}</Link>
                </li>
                <li>
                  <Link to="/page-recoverpw">
                    {props.t("Recover Password")}
                  </Link>
                </li>
                <li>
                  <Link to="/auth-lock-screen">{props.t("Lock Screen")}</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="uil-file-alt"></i>
                <span>{props.t("Utility")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/pages-starter">{props.t("Starter Page")}</Link>
                </li>
                <li>
                  <Link to="/pages-maintenance">{props.t("Maintenance")}</Link>
                </li>
                <li>
                  <Link to="/pages-comingsoon">{props.t("Coming Soon")}</Link>
                </li>
                <li>
                  <Link to="/pages-timeline">{props.t("Timeline")}</Link>
                </li>
                <li>
                  <Link to="/pages-faqs">{props.t("FAQs")}</Link>
                </li>
                <li>
                  <Link to="/pages-pricing">{props.t("Pricing")}</Link>
                </li>
                <li>
                  <Link to="/pages-404">{props.t("Error 404")}</Link>
                </li>
                <li>
                  <Link to="/pages-500">{props.t("Error 500")}</Link>
                </li>
              </ul>
            </li>

            <li className="menu-title">{props.t("Components")}</li>

            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="uil-flask"></i>
                <span>{props.t("UI Elements")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/ui-alerts">{props.t("Alerts")}</Link>
                </li>
                <li>
                  <Link to="/ui-buttons">{props.t("Buttons")}</Link>
                </li>
                <li>
                  <Link to="/ui-cards">{props.t("Cards")}</Link>
                </li>
                <li>
                  <Link to="/ui-carousel">{props.t("Carousel")}</Link>
                </li>
                <li>
                  <Link to="/ui-dropdowns">{props.t("Dropdowns")}</Link>
                </li>
                <li>
                  <Link to="/ui-grid">{props.t("Grid")}</Link>
                </li>
                <li>
                  <Link to="/ui-images">{props.t("Images")}</Link>
                </li>
                <li>
                  <Link to="/ui-lightbox">{props.t("Lightbox")}</Link>
                </li>
                <li>
                  <Link to="/ui-modals">{props.t("Modals")}</Link>
                </li>
                <li>
                  <Link to="/ui-rangeslider">{props.t("Range Slider")}</Link>
                </li>
                <li>
                  <Link to="/ui-session-timeout">
                    {props.t("Session Timeout")}
                  </Link>
                </li>
                <li>
                  <Link to="/ui-progressbars">{props.t("Progress Bars")}</Link>
                </li>
                <li>
                  <Link to="/ui-sweet-alert">{props.t("Sweet-Alert")}</Link>
                </li>
                <li>
                  <Link to="/ui-tabs-accordions">
                    {props.t("Tabs & Accordions")}
                  </Link>
                </li>
                <li>
                  <Link to="/ui-typography">{props.t("Typography")}</Link>
                </li>
                <li>
                  <Link to="/ui-video">{props.t("Video")}</Link>
                </li>
                <li>
                  <Link to="/ui-general">{props.t("General")}</Link>
                </li>
                <li>
                  <Link to="/ui-colors">{props.t("Colors")}</Link>
                </li>
                <li>
                  <Link to="/ui-rating">{props.t("Rating")}</Link>
                </li>
                <li>
                  <Link to="/ui-notifications">{props.t("Notifications")}</Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="waves-effect">
                <i className="uil-shutter-alt"></i>
                <span className="badge rounded-pill bg-info float-end">6</span>
                <span>{props.t("Forms")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/basic-elements">{props.t("Basic Elements")}</Link>
                </li>
                <li>
                  <Link to="/form-validation">
                    {props.t("Form Validation")}
                  </Link>
                </li>
                <li>
                  <Link to="/form-advanced">{props.t("Form Advanced")}</Link>
                </li>
                <li>
                  <Link to="/form-editors">{props.t("Form Editors")}</Link>
                </li>
                <li>
                  <Link to="/form-uploads">{props.t("Form File Upload")} </Link>
                </li>
                <li>
                  <Link to="/form-xeditable">{props.t("Form Xeditable")}</Link>
                </li>
                <li>
                  <Link to="/form-repeater">{props.t("Form Repeater")}</Link>
                </li>
                <li>
                  <Link to="/form-wizard">{props.t("Form Wizard")}</Link>
                </li>
                <li>
                  <Link to="/form-mask">{props.t("Form Mask")}</Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="uil-list-ul"></i>
                <span>{props.t("Tables")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/tables-basic">{props.t("Basic Table")}</Link>
                </li>
                <li>
                  <Link to="/tables-datatable">{props.t("Data Table")}</Link>
                </li>
                <li>
                  <Link to="/tables-responsive">
                    {props.t("Responsive Table")}
                  </Link>
                </li>
                <li>
                  <Link to="/tables-editable">{props.t("Editable Table")}</Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="uil-chart"></i>
                <span>{props.t("Charts")}</span>
              </Link>

              <ul className="sub-menu">
                <li>
                  <Link to="/apex-charts">{props.t("Apex")}</Link>
                </li>
                <li>
                  <Link to="/chartjs-charts">{props.t("Chartjs")}</Link>
                </li>
                <li>
                  <Link to="/e-charts">{props.t("E Chart")}</Link>
                </li>
                <li>
                  <Link to="/charts-knob">{props.t("Jquery Knob")}</Link>
                </li>
                <li>
                  <Link to="/sparkline-charts">
                    {props.t("Sparkline Chart")}
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="uil-streering"></i>
                <span>{props.t("Icons")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/icons-unicons">{props.t("Unicons")}</Link>
                </li>
                <li>
                  <Link to="/icons-boxicons">{props.t("Boxicons")}</Link>
                </li>
                <li>
                  <Link to="/icons-materialdesign">
                    {props.t("Material Design")}
                  </Link>
                </li>
                <li>
                  <Link to="/icons-dripicons">{props.t("Dripicons")}</Link>
                </li>
                <li>
                  <Link to="/icons-fontawesome">{props.t("Font awesome")}</Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="uil-location-point"></i>
                <span>{props.t("Maps")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/maps-google">{props.t("Google Maps")}</Link>
                </li>
                <li>
                  <Link to="/maps-vector">{props.t("Vector Maps")}</Link>
                </li>
                <li>
                  <Link to="/maps-leaflet">{props.t("Leaflet Maps")}</Link>
                </li>
              </ul>
            </li> */}

            {/* <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="uil-share-alt"></i>
                <span>{props.t("Multi Level")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/#">{props.t("Level 1.1")}</Link>
                </li>
                <li>
                  <Link to="/#" className="has-arrow">
                    {props.t("Level 1.2")}
                  </Link>
                  <ul className="sub-menu">
                    <li>
                      <Link to="/#">{props.t("Level 2.1")}</Link>
                    </li>
                    <li>
                      <Link to="/#">{props.t("Level 2.2")}</Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </li> */}
          </ul>
        </div>
      </SimpleBar>
    </React.Fragment>
  );
};

SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
};

export default withRouter(withTranslation()(SidebarContent));
