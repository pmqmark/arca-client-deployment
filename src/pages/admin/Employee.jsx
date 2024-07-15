import React, { useEffect } from "react";
import EmployeeCard from "../../components/employee/EmployeeCard";

import { EmployeeCards } from "../../data/Employee";

const Employee = () => {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <div className="w-full h-full text-black pt-10 pb-28">
      <h1 className="text-primary_colors text-2xl font-bold">
        Manage Employee
      </h1>
      <div className="flex flex-wrap mt-5 ">
        {EmployeeCards.map((items, i) => (
          <EmployeeCard key={i} data={items} />
        ))}
      </div>
    </div>
  );
};

export default Employee;
