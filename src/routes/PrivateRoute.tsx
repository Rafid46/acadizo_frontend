/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import Loader from "../common/Loader";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }: any) => {
  const { user, loading }: any = useContext(AuthContext);
  const location = useLocation();
  if (loading) {
    return <Loader />;
  }
  if (user) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }}></Navigate>;
};

export default PrivateRoute;
