import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AdminProtectedRoute = () => {
  const user = useSelector((state) => state.auth.userInfo);
  // console.log(user);
  return (
    <div>
      {user?.role === "admin" ? <Outlet /> : <Navigate to="/" replace />}
    </div>
  );
};

export default AdminProtectedRoute;
