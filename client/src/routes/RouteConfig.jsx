import Layout from "../layout/Layout";
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import RequireAdminAuth from "../auth/RequireAdminAuth";
import AdminPanel from "../pages/AdminPanel";

const allRoutes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> }, // home page to browse products
      { path: "about", element: <About /> }, // about page
      { path: "contact", element: <Contact /> }, // contact page
      { 
        path: "admin", 
        element: <RequireAdminAuth/>,
        children: [
          { index: true, element: <AdminPanel /> },
        ]
      },
    ],
  },
  {
    path: "*",
    element: <div>Not Found</div>,
  }
];

export default allRoutes;
