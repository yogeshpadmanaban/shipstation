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

// import AddFunds from "./views/AddFunds";
import ListCarriers from "./views/ListCarriers";
import ListPackages from "./views/ListPackages";
import ListServices from "./views/ListServices";

// Orders
import ListOrders from "./views/ListOrders";
import ListOrderItems from "./views/ListOrderItems";

//fulfillments
// import ListFulfillments from "./views/ListFulfillments";

const routes = [
  {
    path: "/useraccounts",
    name: "Users",
    component: UserAccount,
    layout: "/admin",
    menu: "A",
    group: ""
  },
  {
    path: "/designsubmissions",
    name: "Submissions",
    component: DesignSubmissions,
    layout: "/admin",
    menu: "A",
    group: ""
  },
  {
    path: "/mockups",
    name: "Mockups",
    component: Mockup,
    layout: "/admin",
    menu: "A",
    group: ""
  },
  {
    path: "/products",
    name: "Products",
    component: Product,
    layout: "/admin",
    menu: "A",
    group: ""
  },
  {
    path: "/templates",
    name: "Templates",
    component: Template,
    layout: "/admin",
    menu: "A",
    group: ""
  },
  {
    path: "/materialinventories",
    name: "Inventory",
    component: Inventory,
    layout: "/admin",
    menu: "A",
    group: ""
  },

  // shipstation


  // Tags
  {
    path: "/listtags",
    name: "List Tags",
    component: ListTags,
    layout: "/admin",
    menu: "A",
    group: ""
  },

   // Users
  {
    path: "/listUsers",
    name: "List Users",
    component: ListUsers,
    layout: "/admin",
    menu: "A",
    group: ""
  },

  // Carriers

  // {
  //   path: "/addFunds",
  //   name: "Add Funds",
  //   component: AddFunds,
  //   layout: "/admin",
  //   menu: "A",
  //   group: "carrier"
  // },
  {
    path: "/listcarriers",
    name: "List Carriers",
    component: ListCarriers,
    layout: "/admin",
    menu: "A",
    group: "carrier"
  },
  {
    path: "/listpackages",
    name: "List Packages",
    component: ListPackages,
    layout: "/admin",
    menu: "A",
    group: "carrier"
  },
  {
    path: "/listservices",
    name: "List Services",
    component: ListServices,
    layout: "/admin",
    menu: "A",
    group: "carrier"
  },
   // getOrder
   {
    path: "/order",
    name: "List Order",
    component: ListOrders,
    layout: "/admin",
    menu: "A",
    group: ""
  },

  {
    path: "/orderitems",
    name: "List Order Items",
    component: ListOrderItems,
    layout: "/admin",
    menu: "A",
    group: ""
  },
  // fullfillments  
  // {
  //   path: "/listfulfillments",
  //   name: "List Fulfillments",
  //   component: ListFulfillments,
  //   layout: "/admin",
  //   menu: "A",
  //   group: ""
  // },
  {
    path: "/jobs",
    name: "Jobs",
    component: Job,
    layout: "/admin",
    menu: "W",
    group: ""
  },
  {
    path: "/workstations",
    name: "Work stations",
    component: WorkStation,
    layout: "/admin",
    menu: "W",
    group: ""
  },
  {
    path: "/printfiles",
    name: "Print files",
    component: PrintFile,
    layout: "/admin",
    menu: "W",
    group: ""
  },
  {
    path: "/submitdesigns",
    name: "Submit Designs",
    component: SubmitDesigns,
    layout: "/admin",
    menu: "C",
    group: ""
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
    menu: "C",
    group: ""
  },
  {
    path: "/createuser",
    name: "Create User",
    component: CreateUser,
    layout: "/admin",
    menu: "X",
    group: ""
  }


];

export default routes;
