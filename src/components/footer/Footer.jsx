import React from "react";

const Footer = () => {
  return (
    <div className="right-0 w-full ">
      <div className="">
        <footer className="bg-primary_colors shadow z-50">
          <div className="w-full mx-auto max-w-screen-xl p-4 flex flex-col md:items-center md:justify-center">
            <span className="text-sm text-white sm:text-center ">
              © 2024{" "}
              <a href="#" className="hover:underline">
                ARCA NOE
              </a>
              . All Rights Reserved.
            </span>
            <span className="text-sm text-white sm:text-center ">
              Developed By
              <a
                href="https://qmarktechnolabs.com/"
                target="blank"
                className="hover:underline hover:text-purple-600"
              >
                {" "}
                Qmark Technolabs
              </a>
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Footer;
