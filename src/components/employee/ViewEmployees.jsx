import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Table from "../Table/Table";

const ViewEmployees = () => {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  const params = useParams();
  return (
    <div className="w-full h-full text-black pt-10 pb-28 ">
      <h1 className="text-primary_colors text-2xl font-bold capitalize">
        {params?.role}
      </h1>
      <div className="mt-5 w-full">
        <Table department={params?.role} />
      </div>
    </div>
  );
};

export default ViewEmployees;
