import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const LeadsProfile = ({ data }) => {
  console.log(data)
  const user = useSelector((state) => state?.auth?.userInfo);

  return (
    <>

      {data?.map((lead, i) => (
        <div
          key={i}
          // bg-gradient-to-r from-[#52C3FF] to-[#D0EAFF]
          className="bg-white p-5 flex flex-wrap w-full md:w-[450px] justify-around rounded-xl shadow-xl relative text-black hover:scale-105 ease-in-out duration-300 mb-4"
        >
          <img
            src={require("../../../assets/icon/application_ban.png")}
            alt="ban"
            className="w-10 absolute -top-2 right-3 object-contain"
          />

          {/* Lead Details */}
          <div className="p-5 flex flex-col w-full capitalize border rounded border-primary_colors/30">
            
            <h1 className="font-semibold text-sm">
              Student Name :{" "}
              <span className="font-thin ps-2">{lead?.name}</span>
            </h1>
            <h1 className="font-semibold text-sm">
              email : <span className="font-thin ps-2">{lead?.email}</span>
            </h1>
            <h1 className="font-semibold text-sm">
              phone :{" "}
              <span className="font-thin ps-2">{lead?.phone}</span>
            </h1>
            <h1 className="font-semibold text-sm">
              assignee : <span className="font-thin ps-2">{lead?.assignee?.name}</span>
            </h1>
            
          </div>

          {/* Button part */}
          <div className="py-3 w-full flex flex-col md:flex-row gap-3">
            
            <div
              className={`p-2 px-10 h-10 text-sm rounded ${
                lead?.status === "completed"
                  ? " text-green-800 border border-green-800"
                  : "text-[#E87D00] border border-[#E87D00]"
              } capitalize w-full text-center`}
            >
              {lead?.status}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default LeadsProfile;
