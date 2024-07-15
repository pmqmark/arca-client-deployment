import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const StudentProtectedRoute = () => {
  const user = useSelector((state) => state.auth.userInfo);
  return (
    <div>
      {user?.role === "student" ? <Outlet /> : <Navigate to="/" replace />}
    </div>
  );
};

export default StudentProtectedRoute;
