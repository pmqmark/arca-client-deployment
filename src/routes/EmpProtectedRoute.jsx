import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const EmpProtectedRoute = () => {
    const user = useSelector((state) => state.auth.userInfo);
    return (
      <div>
        <div>
          {["employee", "leader"].includes(user?.role) ? <Outlet /> : <Navigate to="/" replace />}
        </div>
      </div>
    );
}

export default EmpProtectedRoute