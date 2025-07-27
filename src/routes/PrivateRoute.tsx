/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import Loader from "../common/Loader";
import { Navigate, useLocation } from "react-router-dom";
import useCurrentUser from "../hooks/useCurrentUser";

const PrivateRoute = ({ children, role }: any) => {
  const { user, loading }: any = useContext(AuthContext);
  const { data: currentUser }: any = useCurrentUser();
  const location = useLocation();
  if (loading) {
    return <Loader />;
  }
  if (!user) {
    return <Navigate to="/login" state={{ from: location }}></Navigate>;
  }

  if (role && currentUser?.role !== role) {
    return <Navigate to="/unauthorized" />;
  }
  return children;
};

export default PrivateRoute;
