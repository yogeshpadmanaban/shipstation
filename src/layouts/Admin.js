import React from "react";
import { useLocation, Route, Switch } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import routes from "../routes.js";
import Navbars from "../components/Navbars/Navbar";

function Admin() {
  const location = useLocation();
  const mainPanel = React.useRef(null);
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
        console.log(prop);
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            render={(props) => <prop.component {...props} />}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainPanel.current.scrollTop = 0;
    if (
      window.innerWidth < 993 &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
      var element = document.getElementById("bodyClick");
      element.parentNode.removeChild(element);
    }
  }, [location]);
  return (
    <>
      <div className="wrapper">
        <Sidebar routes={routes} />
        <div className="main-panel" ref={mainPanel}>
          <Navbars />
          <div className="content">
            <Switch>{getRoutes(routes)}</Switch>
          </div>
        </div>
      </div>
    </>
  );
}

export default Admin;
