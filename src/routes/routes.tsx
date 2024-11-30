import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import About from "../pages/About";
import Home from "../pages/Home";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";

import UpdateProfile from "../pages/profile/UpdateProfile";
import Modules from "../pages/profile/sidebar/Modules";
import InstitutionSection from "../pages/InstitutionSection";
import Users from "../pages/profile/Users";
import Overview from "../pages/Institution/Overview";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "about",
        element: <About />,
      },
      {
        path: "modules",
        element: <Modules />,
      },
      {
        path: "update-profile",
        element: <UpdateProfile />,
      },
      {
        path: "dashboard",
        element: <InstitutionSection />,
      },
      {
        path: "users",
        element: <Users />,
      },
    ],
  },
  {
    path: "/institution",
    element: <MainLayout />,
    children: [
      {
        path: "overview",
        element: <Overview />,
      },
    ],
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
export default router;
