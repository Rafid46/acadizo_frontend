import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Home from "../pages/Home";

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
        path: "contact",
        element: <Contact />,
      },
    ],
  },
  {
    path: "/home",
    element: <Home />,
  },
]);
export default router;
