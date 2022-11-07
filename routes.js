// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: Dashboard,

    layout: "/admin",
  },
  {
    path: "/table-list",
    name: "History",
    rtlName: "قائمة الجدول",
    icon: "content_paste",

    layout: "/admin",
  },
];

export default dashboardRoutes;
