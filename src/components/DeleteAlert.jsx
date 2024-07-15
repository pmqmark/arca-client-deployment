import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import ReqLoader from "./loading/ReqLoader";
import { toast } from "react-toastify";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { deleteLeadRoute } from "../utils/Endpoint";

const DeleteAlert = ({ setModal, data, getMethod }) => {
  const axios = useAxiosPrivate()
  const [loader, setLoader] = useState(false);

  const handlerCancel = () => {
    setModal(false)
  };

  const handlerYes = async() => {
    try {
      setLoader(true)
      await axios
        .delete(`${deleteLeadRoute}/${data?._id}`)
        .then((res) => {
          toast.success(res?.data?.msg);
          getMethod();
          handlerCancel();
        })
        .catch((error) => {
          console.log(error);
          toast.error(error?.response?.data?.msg);
        });
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  

  return (
    <div className="fixed top-0 left-0 w-full h-screen overflow-auto bg-black/50 flex items-center justify-center z-50 p-5">
      <div className="relative bg-white w-full md:w-1/3 rounded-lg  p-5">
        {/* <IoClose
          onClick={() => setModal(false)}
          className="absolute right-1 top-1 rounded bg-primary_colors text-white cursor-pointer"
        /> */}
        <div className="flex flex-col w-full  items-center justify-center border-2 rounded-lg border-dotted border-primary_colors p-5 md:p-17">
          <h1 className="font-bold text-center text-xl md:text-[20px] text-primary_colors pb-3">
            Are Your Sure You Want To Delete This?
          </h1>
          <div className="w-full flex flex-col md:flex-row justify-around md:gap-5">
            {/* BUTTON */}
            <div className="text-white text-normal space-x-3 flex items-center justify-end mt-5 w-full ">
              <button
              onClick={handlerYes}
                type="button"
                className="bg-red-700 p-3 px-5 rounded-lg hover:scale-105 ease-in-out duration-200 text-xs w-full"
              >
                Yes
              </button>
            </div>
            <div className="text-white text-normal space-x-3 flex items-center justify-end mt-5 w-full ">
              <button
                onClick={handlerCancel}
                type="button"
                className="bg-primary_colors p-3 px-5 rounded-lg hover:scale-105 ease-in-out duration-200 text-xs w-full"
              >
               Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
      {loader && <ReqLoader />}
    </div>
  );
};

export default DeleteAlert;
