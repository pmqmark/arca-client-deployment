import React, { useRef, useState } from "react";
import { createBulkLeadData } from "../utils/Endpoint";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import ReqLoader from "./loading/ReqLoader";

const DragDropFIles = ({ updateFunction }) => {
  const user = useSelector((state) => state?.auth?.userInfo);
  const [file, setFile] = useState();
  const inputRef = useRef();
  const axios = useAxiosPrivate();
  const [loading, setLoading] = useState(false);

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    if (event?.dataTransfer?.files.length > 1) {
      toast.warning("Please add one file");
    } else {
      setFile(event?.dataTransfer?.files[0]);
      console.log(event?.dataTransfer?.files[0]);
    }
  };

  const fromComputer = (event) => {
    const selectedFile = event?.target?.files[0];
    const allowedExtensions = ["xlsx"];
    const fileExtension = selectedFile.name.split(".").pop().toLowerCase();
    if (event?.target?.files.length > 1) {
      toast.warning("Please add one file");
    } else if (!allowedExtensions.includes(fileExtension)) {
      toast.warning("Only .xlsx files are allowed");
      return;
    } else {
      setFile(event?.target?.files[0]);
      console.log(event?.target?.files);
    }
  };

  console.log("user.role", user.role)

  const handleUpload = async (event) => {
    const formData = new FormData();
    formData.append("excelFile", file);

    if(user.role === "leader"){
      formData.append("assignee", user?._id)
    }

    if (["admin","leader"].includes(user?.role)) {
      setLoading(true);
      try {
        await axios
          .post(createBulkLeadData, formData)
          .then((res) => {
            console.log(res);
            toast.success(res?.data?.msg);
            updateFunction();
          })
          .catch((error) => {
            console.log(error);
            toast.error(error?.response?.data?.msg);
          })
          .finally(() => {
            setLoading(false);
          });
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.warning("You Don't Have Permission");
    }
  };

  return (
    <>
      <div
        className={`border-2 border-dashed border-primary_colors rounded-lg p-1.5`}
      >
        <div
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className="bg-[#058BD2]/20 p-10 rounded-lg flex flex-col items-center justify-center text-[#51B4ED]"
        >
          {file ? (
            <>
              <h1 className="font-semibold text-[14px] md:text-xl text-Wrap">
                {file?.name}
              </h1>
              <button
                onClick={handleUpload}
                className="bg-primary_colors text-white text-xs p-2 w-full md:w-1/2 rounded mt-3 md:mt-5"
              >
                Submit
              </button>
            </>
          ) : (
            <>
              <h1 className="font-semibold text-[14px] md:text-xl">
                Drag and Drop files to Upload
              </h1>
              <h1 className="text-sm">only .xlsx extension allowed </h1>
              <h1 className="mt-3">--------------- Or ---------------</h1>
              <input
                type="file"
                onChange={fromComputer}
                hidden
                ref={inputRef}
              />
              <button
                onClick={() => inputRef.current.click()}
                className="bg-primary_colors text-white text-xs p-2 w-full md:w-1/2 rounded mt-3 md:mt-5"
              >
                Browse from computer
              </button>
            </>
          )}
        </div>
      </div>
      {loading && <ReqLoader />}
    </>
  );
};

export default DragDropFIles;
