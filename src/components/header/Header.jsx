import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { LuMenu } from "react-icons/lu";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineLogin } from "react-icons/ai";
import {userLogout } from "../../utils/Endpoint";
import { logout } from "../../redux/slices/AuthSlicer";

import profile from "../../assets/icon/profileicon.png";
import { Sidebar, SidebarE, SidebarL } from "../../data/SideBar";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const Header = () => {
  const instance = useAxiosPrivate();

  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState("");
  const user = useSelector((state) => state?.auth?.userInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      navigate(`/applications/search?query=${search}`);

    }
  };

  const LogoutHandler = async () => {
    await instance
      .get(userLogout)
      .then((res) => {
        dispatch(logout());
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const LogoClick = () => {
    if (user.role === "admin") {
      navigate("/admin/dashboard")
    } else if (user.role === "employee") {
      navigate("/employee/dashboard")
    } else if (user.role === "student") {
      navigate("/student/dashboard")
    }
  }

  return (
    <>
      <div className="shadow-sm fixed z-40 w-full bg-white top-0">
        <div className="container mx-auto w-full">
          <div className="mx-1 flex items-center justify-between p-5">
            <div className="w-full cursor-pointer" onClick={LogoClick}>
              <img
                src={require("../../assets/logo.png")}
                alt="Logo"
                className="w-20"
              />
            </div>

            {
              user?.role === 'admin'
              &&
              <div className="w-full relative hidden md:flex">
                <CiSearch
                  onClick={()=> navigate(`/applications/search?query=${search}`)}
                  className="absolute text-slate-400 top-2 ms-3 cursor-pointer"
                  size={25}
                />
                <input
                  type="text"
                  name="search"
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={handleKeyPress}
                  className="border w-full ps-10 p-2 rounded-lg shadow-sm outline-none ring-0 text-sm text-slate-400"
                  placeholder="Search Application"
                />
              </div>

            }


            <div className="hidden md:flex gap-3 w-full items-center justify-end">
              <div
                onClick={LogoutHandler}
                className="mt-2 flex flex-col justify-end hover:text-primary_colors cursor-pointer"
              >
                <AiOutlineLogin className="" size={30} />
                <h1 className="text-xs text-secondary mt-1 cursor-pointer hover:text-primary_colors">
                  Logout
                </h1>
              </div>
              <div className="flex flex-col items-center">
                <img
                  src={`${user?.image ? user?.image : profile}`}
                  alt="proPic"
                  className="w-10 rounded-full cursor-pointer"
                />
                <h1 className="text-xs text-secondary mt-1 capitalize">
                  {user?.name}
                </h1>
              </div>
            </div>

            <div>
              {!menu ? (
                <LuMenu
                  className="md:hidden"
                  size={30}
                  onClick={() => setMenu(!menu)}
                />
              ) : (
                <div className="md:hidden">
                  <IoClose size={30} onClick={() => setMenu(false)} />
                  <div className="absolute w-full left-0 p-5">
                    <div className="bg-white shadow p-3 rounded-lg">
                      {
                        user?.role === 'admin'
                        &&
                        <div className="w-full relative">
                          <CiSearch
                            onClick={()=> {navigate(`/applications/search?query=${search}`); setMenu(false)}}
                            className="absolute text-slate-400 top-2 ms-3 cursor-pointer"
                            size={25}
                          />
                          <input
                            type="text"
                            name="search"
                            onChange={(e) => setSearch(e.target.value)}
                            className="border w-full ps-10 p-2 rounded-lg shadow-sm outline-none ring-0 text-sm text-slate-400"
                            placeholder="Search"
                          />
                        </div>

                      }
                      <div className="flex flex-col gap-3 w-full items-center mt-3">
                        <div className="flex gap-3 w-full items-center justify-between mt-3">

                          <div>
                            <img
                              src={require("../../assets/icon/profileicon.png")}
                              alt="proPic"
                              className="w-10 rounded-full cursor-pointer"
                            />
                            <h1 className="text-xs text-secondary mt-1 capitalize">
                              {user?.name}
                            </h1>
                          </div>

                          <div
                            onClick={LogoutHandler}
                            className="mt-2 flex flex-col justify-end hover:text-primary_colors cursor-pointer"
                          >
                            <AiOutlineLogin className="" size={30} />
                            <h1 className="text-xs text-secondary mt-1 cursor-pointer hover:text-primary_colors">
                              Logout
                            </h1>
                          </div>

                        </div>

                        {user?.role === "admin" ? (
                          Sidebar.map((data) => (
                            <Link key={data?.id} to={data.path}
                              onClick={() => setMenu(false)}
                              className="w-full flex justify-between items-center border p-2 rounded hover:scale-105 ease-in-out duration-300"
                            >
                              <div className="text-xs flex flex-col items-center ">
                                <h2 className="font-semibold">{data?.name}</h2>
                              </div>
                              <div>
                                {data.icon}
                              </div>
                            </Link>
                          ))
                        ) 
                        : user?.role === "employee" ? (
                          SidebarE.map((data) => (
                            <Link key={data?.id} to={data.path}
                              onClick={() => setMenu(false)}
                              className="w-full flex justify-between items-center border p-2 rounded hover:scale-105 ease-in-out duration-300"
                            >
                              <div className="text-xs flex flex-col items-center ">
                                <h2 className="font-semibold">{data?.name}</h2>
                              </div>
                              <div>
                                {data.icon}
                              </div>
                            </Link>
                          ))
                        ) 
                        : user?.role === "leader" ? (
                          SidebarL.map((data) => (
                            <Link key={data?.id} to={data.path}
                              onClick={() => setMenu(false)}
                              className="w-full flex justify-between items-center border p-2 rounded hover:scale-105 ease-in-out duration-300"
                            >
                              <div className="text-xs flex flex-col items-center ">
                                <h2 className="font-semibold">{data?.name}</h2>
                              </div>
                              <div>
                                {data.icon}
                              </div>
                            </Link>
                          ))
                        ) 
                        : (
                          <div className="hidden"></div>
                        )}

                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
