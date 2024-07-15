import React, { useState } from "react";
import { Sidebar, SidebarE, SidebarL } from "../../data/SideBar";
import { Link, useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";

const SideMenu = () => {
  const user = useSelector((state) => state?.auth?.userInfo);
  const [sideArrow, setSideArrow] = useState(true);

  // const location = useLocation();
  const params = useLocation()
  return (
    <div
      className={`hidden relative pt-10 min-h-screen bg-gradient-to-l from-white to-[#f5f6f8] ${sideArrow ? "md:w-1/5 " : "w-[120px] flex flex-col items-center  "
        } ${user?.role === "student" ? "hidden" : "md:flex"}`}
    >
      <div className={`mx-5 md:mx-10 flex flex-col w-full  ${sideArrow ? "" : "items-center"}`}>
        {user?.role === "admin" ? (
          Sidebar.map((data) => (
            <Link key={data?.id} to={data.path}>
              <div
                className={` flex items-center gap-3 cursor-pointer mb-4 ${sideArrow ? "md:w-[160px]" : "w-10"} ${params?.pathname.includes(data?.path) &&
                  // data.path === location.pathname &&
                  "bg-[#058BD2] w-full text-white p-2 rounded hover:scale-105 ease-in-out duration-300"
                  }`}
              >
                {sideArrow ? (
                  <>
                    {data.icon} {data.name}
                  </>
                ) : (
                  data.icon
                )}
              </div>
            </Link>
          ))
        )  : (
          <div className="hidden"></div>
        )}

        {
           user?.role === "leader" ? (
            SidebarL.map((data) => (
              <Link key={data?.id} to={data.path}>
                <div
                  className={`flex items-center gap-3 cursor-pointer mb-4 ${sideArrow ? "w-[200px]" : "w-10"} ${params?.pathname.includes(data?.path) &&
                    // data.path === location.pathname &&
                    "bg-[#058BD2] w-full text-white p-2 rounded hover:scale-105 ease-in-out duration-300"
                    }`}
                >
                  {sideArrow ? (
                    <>
                      {data.icon} {data.name}
                    </>
                  ) : (
                    data.icon
                  )}
                </div>
              </Link>
            ))
          ): (
            <div className="hidden"></div>
          )
        }
        {
           user?.role === "employee" ? (
            SidebarE.map((data) => (
              <Link key={data?.id} to={data.path}>
                <div
                  className={`flex items-center gap-3 cursor-pointer mb-4 ${sideArrow ? "w-[200px]" : "w-10"} ${params?.pathname.includes(data?.path) &&
                    // data.path === location.pathname &&
                    "bg-[#058BD2] w-full text-white p-2 rounded hover:scale-105 ease-in-out duration-300"
                    }`}
                >
                  {sideArrow ? (
                    <>
                      {data.icon} {data.name}
                    </>
                  ) : (
                    data.icon
                  )}
                </div>
              </Link>
            ))
          ): (
            <div className="hidden"></div>
          )
        }

        {/* Arrow */}
        <div className="w-fit flex absolute top-64 -right-3 items-end justify-end mt-10">
          {sideArrow ? (
            <MdOutlineKeyboardDoubleArrowLeft
              onClick={() => setSideArrow(false)}
              size={40}
              className="bg-primary_colors rounded-full p-2 text-white shadow-lg cursor-pointer hover:scale-105 ease-in-out duration-300"
            />
          ) : (
            <MdOutlineKeyboardDoubleArrowRight
              onClick={() => setSideArrow(true)}
              size={40}
              className="bg-primary_colors rounded-full p-2 text-white shadow-lg cursor-pointer hover:scale-105 ease-in-out duration-300"
            />
          )}
        </div>
      </div>
    </div>
  );
};
export default SideMenu;
