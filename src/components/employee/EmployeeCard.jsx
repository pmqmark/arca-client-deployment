import React from "react";
import { Link } from "react-router-dom";

const EmployeeCard = ({ data }) => {
  return (
    <div className="w-full md:w-1/3 p-2">
      <Link to={`/admin/employee/list/${data?.path}`}>
        <div className="bg-primary_colors shadow-lg flex flex-col items-center justify-center rounded-xl p-5 hover:scale-95 ease-in-out duration-200 cursor-pointer">
          <img src={data?.image} alt="icon" className="w-24" />
          <h1 className="font-bold text-white">{data?.name}</h1>
        </div>
      </Link>
    </div>
  );
};

export default EmployeeCard;
 