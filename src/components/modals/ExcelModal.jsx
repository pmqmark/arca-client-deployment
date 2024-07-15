import React from "react";
import { IoClose } from "react-icons/io5";
import DragDropFIles from "../DragDropFIles";

const ExcelModal = ({ setModal, getData }) => {
  const updateFunction = () => {
    getData();
    setModal(false);
  };
  return (
    <div className="fixed top-0 left-0 w-full h-screen overflow-auto bg-black/50 flex items-center justify-center z-50">
      <div className="relative bg-white mt-60  md:mt-0 md:w-1/2 rounded-lg p-5  md:p-10 md:px-14 m-5">
        <IoClose
          onClick={() => setModal(false)}
          className="absolute right-3 top-3 rounded bg-primary_colors text-white cursor-pointer"
        />
        <div className="">
          <DragDropFIles updateFunction={updateFunction} />
        </div>
      </div>
    </div>
  );
};

export default ExcelModal;
