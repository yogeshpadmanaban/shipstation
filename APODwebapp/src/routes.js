import CreateUser from "./views/CreateUser";
import DesignSubmissions from "./views/DesignSubmissions";
import SubmitDesigns from "./views/SubmitDesigns";
import Mockup from "./views/Mockup";
import Inventory from "./views/Inventory";
import Template from "./views/Template";
import PrintFile from "./views/PrintFile";
import WorkStation from "./views/WorkStation";
import Job from "./views/Job";
import ExportListings from "./views/ExportListings";
import UserAccount from "./views/UserAccount";
import ProductSettings from "./views/ProductSettings";
import Product from "./views/Product";

// shipstation

// Tags
import ListTags from "./views/ListTags";

// Users
import ListUsers from "./views/ListUsers";

// Carriers
import ListCarriers from "./views/ListCarriers";
import ListPackages from "./views/ListPackages";
import ListServices from "./views/ListServices";

const routes = [
  {
    path: "/useraccounts",
    name: "Users",
    component: UserAccount,
    layout: "/admin",
    menu: "A"
  },
  {
    path: "/designsubmissions",
    name: "Submissions",
    component: DesignSubmissions,
    layout: "/admin",
    menu: "A"
  },
  {
    path: "/mockups",
    name: "Mockups",
    component: Mockup,
    layout: "/admin",
    menu: "A"
  },
  {
    path: "/products",
    name: "Products",
    component: Product,
    layout: "/admin",
    menu: "A"
  },
  {
    path: "/templates",
    name: "Templates",
    component: Template,
    layout: "/admin",
    menu: "A"
  },
  {
    path: "/materialinventories",
    name: "Inventory",
    component: Inventory,
    layout: "/admin",
    menu: "A"
  },

  // shipstation


  // Tags
  {
    path: "/listtags",
    name: "ListTags",
    component: ListTags,
    layout: "/admin",
    menu: "A"
  },

  // Carriers
  {
    path: "/listcarriers",
    name: "ListCarriers",
    component: ListCarriers,
    layout: "/admin",
    menu: "A"
  },
  {
    path: "/listpackages",
    name: "ListPackages",
    component: ListPackages,
    layout: "/admin",
    menu: "A"
  },
  {
    path: "/listservices",
    name: "ListServices",
    component: ListServices,
    layout: "/admin",
    menu: "A"
  },

  // Users

  {
    path: "/listUsers",
    name: "ListUsers",
    component: ListUsers,
    layout: "/admin",
    menu: "A"
  },



  {
    path: "/jobs",
    name: "Jobs",
    component: Job,
    layout: "/admin",
    menu: "W"
  },
  {
    path: "/workstations",
    name: "Work stations",
    component: WorkStation,
    layout: "/admin",
    menu: "W"
  },
  {
    path: "/printfiles",
    name: "Print files",
    component: PrintFile,
    layout: "/admin",
    menu: "W"
  },




  {
    path: "/submitdesigns",
    name: "Submit Designs",
    component: SubmitDesigns,
    layout: "/admin",
    menu: "C"
  },
  {
    path: "/exportlistings",
    name: "Export Listings",
    component: ExportListings,
    layout: "/admin",
    menu: "C"
  },
  {
    path: "/productsettings",
    name: "Product Settings",
    component: ProductSettings,
    layout: "/admin",
    menu: "C"
  },


  {
    path: "/createuser",
    name: "Create User",
    component: CreateUser,
    layout: "/admin",
    menu: "X"
  }


];

export default routes;
