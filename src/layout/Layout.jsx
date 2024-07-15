import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import SideMenu from "../components/sideMenu/SideMenu";

const Layout = () => {
  return (
    <div className="bg-[#F5F6F8] w-full">
      <Header />
      <div className="flex min-w-screen min-h-screen mt-24  ">
        <div
          className={`container mx-auto flex w-full gap-10 px-5 `}
        >
          <SideMenu />
          <div className="w-full">{<Outlet />}</div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
