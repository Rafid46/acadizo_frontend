import { createBrowserRouter } from "react-router-dom";
// import MainLayout from "../layout/MainLayout";
import About from "../pages/About";
import Home from "../pages/Home";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";

import UpdateProfile from "../pages/profile/UpdateProfile";
import Modules from "../pages/profile/sidebar/Modules";
import InstitutionSection from "../pages/InstitutionSection";
import Users from "../pages/profile/Users";
import Overview from "../pages/Institution/Overview";
import TestDashboard from "../pages/TestDashboard";
import PrivateRoute from "./PrivateRoute";
import Unauthorized from "../pages/error/Unauthorized";
import Notice from "../pages/Institution/Notice";
import ActivityPage from "../pages/activity/ActivityPage";
import Homepage from "../pages/Home/Homepage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <TestDashboard />
      </PrivateRoute>
    ),
  },
  {
    path: "/home",
    element: <Homepage />,
  },

  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <TestDashboard />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <InstitutionSection />,
      },
      {
        path: "dashboard",
        element: <InstitutionSection />,
      },
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
        path: "notice",
        element: <Notice />,
      },

      {
        path: "AllUsers",
        element: (
          <Users />

          // <PrivateRoute role="teacher">
          //   <Users />
          // </PrivateRoute>
        ),
      },
      {
        path: "institution/overview",
        element: <Overview />,
      },
      {
        path: "institution/students",
        element: <Overview />,
      },
      {
        path: "institution/users",
        element: <Overview />,
      },
      {
        path: "activity/posts",
        element: <ActivityPage />,
      },
    ],
  },
  // {
  //   path: "/institution",
  //   element: <MainLayout />,
  //   children: [
  //     {
  //       path: "overview",
  //       element: <Overview />,
  //     },
  //   ],
  // },
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
  {
    path: "/unauthorized",
    element: <Unauthorized />,
  },
]);
export default router;
