import React, { useEffect } from "react";
import TeamTable from "../Table/TeamTable";

const ViewTeam = () => {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <div className="w-full h-full text-black pt-10 pb-28 ">
      <h1 className="text-primary_colors text-2xl font-bold capitalize">
        Team Members
      </h1>
      <div className="mt-5 w-full">
        <TeamTable />
      </div>
    </div>
  );
};

export default ViewTeam;
