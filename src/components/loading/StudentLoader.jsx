import React from "react";
import { FadeLoader } from "react-spinners";

const StudentLoader = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-screen overflow-auto bg-black/80 flex items-center justify-center z-50">
      <div className=" ">
        <FadeLoader color="#36d7b7" />
      </div>
    </div>
  );
};

export default StudentLoader;
