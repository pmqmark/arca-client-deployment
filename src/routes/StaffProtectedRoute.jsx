import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const StaffProtectedRoute = () => {
  const user = useSelector((state) => state.auth.userInfo);
  return (
    <div>
      <div>
        {["employee", "leader", "admin"].includes(user?.role) ? <Outlet /> : <Navigate to="/" replace />}
      </div>
    </div>
  );
};

export default StaffProtectedRoute;
