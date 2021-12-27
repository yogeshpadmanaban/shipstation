import React from "react";
import { useLocation, NavLink } from "react-router-dom";
import { Nav, NavDropdown } from "react-bootstrap";

function Sidebar({ color, image, routes }) {
  const location = useLocation();
  const activeRoute = (routeName) => {
    return location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };

let filroutes = routes.filter((prop) => {
  if(prop.menu === sessionStorage.getItem('role') && prop.group != 'carrier'){
      return prop
  } else {
      return null
  } 
})

let carrierGroup = routes.filter((prop) => {
  if(prop.menu === sessionStorage.getItem('role') && prop.group == 'carrier'){
      return prop
  } else {
      return null
  } 
})

  return (
    <div className="sidebar" data-image={image} data-color={color}>
      <div
        className="sidebar-background"
        style={{
          backgroundImage: "url(" + image + ")",
        }}
      />
      <div className="sidebar-wrapper">
        <div className="logo d-flex align-items-center justify-content-start">
            APOD
        </div>

        <Nav>
          {filroutes.map((prop, key) => {
            if (!prop.redirect)
              return (
                <li
                  className={
                    prop.upgrade
                      ? "active active-pro"
                      : activeRoute(prop.layout + prop.path)
                  }
                  key={key}
                >
                  <NavLink
                    to={prop.layout + prop.path}
                    className="nav-link"
                    activeClassName="active"
                  >
                    <i className={prop.icon} />
                    <p>{prop.name}</p>
                  </NavLink>               
                </li>
              );
            return null;
          })}

        <NavDropdown title="CARRIERS" id="navbarScrollingDropdown">
          {carrierGroup.map((prop, key) => {
            if (!prop.redirect)
              return (
                <li
                  className={
                    prop.upgrade
                      ? "active active-pro"
                      : activeRoute(prop.layout + prop.path)
                  }
                  key={key}
                >
                <NavDropdown.Item href={prop.layout + prop.path}>{prop.name}</NavDropdown.Item>
                </li>
              );
            return null;
          })}
          </NavDropdown>
        </Nav>
      </div>
    </div>
  );
}

export default Sidebar;