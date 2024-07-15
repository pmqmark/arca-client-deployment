import React, { useState } from "react";
import { IoCloseCircle } from "react-icons/io5";
import { toast } from "react-toastify";
import { uploadDocumentRoute } from "../../utils/Endpoint";

import StudentLoader from "../loading/StudentLoader";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const DocModal = ({ setModal, applicationData, cb }) => {
  const axios = useAxiosPrivate();

  // console.log(applicationData)
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    document: null,
    docName: "",
  });

  // Input changer
  const onChangeHandler = (e) => {
    if (e.target.name === "document") {
      if (e.target.files.length > 1) {
        toast.warning("Please select only one file.");
      } else {
        setData({
          ...data,
          [e.target.name]: e.target.files[0],
        });
      }
    } else {
      setData({
        ...data,
        [e.target.name]: e.target.value,
      });
    }
  };

  // Reading the file
  const onsubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("document", data.document);

      // console.log("document", data.document)
      // console.log(formData);
      const response = await axios.post(
        `${uploadDocumentRoute}/${applicationData?._id}/${data?.docName}`,
        formData
      );
      // console.log(response);
      if (response?.status === 200 || response?.status === 201) {
        console.log(response);
        setLoading(false);
        setModal(false);
        cb();
        toast.success(response?.data?.msg);
      } else {
        toast.error("Data Fetching  error");
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.msg || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-screen overflow-auto bg-black/50 flex items-center justify-center z-50">
        <div className="relative bg-white mt-60  md:mt-0 md:w-1/2 rounded-lg p-5  md:p-10 md:px-14 m-5">
          <IoCloseCircle
            onClick={() => setModal(false)}
            className="absolute right-3 top-3 rounded bg-primary_colors text-white cursor-pointer"
          />
          {/* Form part */}
          <div className="flex flex-col w-full border p-5 rounded shadow">
            <form
              action=""
              onSubmit={onsubmitHandler}
              className="flex flex-col md:flex-row justify-around w-full gap-3"
            >
              {/* Drag and drop */}
              <div className="w-full md:w-1/2">
                <label
                  htmlFor="document"
                  className="flex items-center justify-center w-full h-32 px-4 transition bg-blue-50 border-2 border-primary_colors border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none"
                >
                  <input
                    id="document"
                    type="file"
                    name="document"
                    className="hidden"
                    multiple={false}
                    onChange={onChangeHandler}
                  />
                  {data?.document?.name ? (
                    <div className="flex flex-col items-center">
                      <div>
                        <img
                          src={require("../../assets/icon/file.png")}
                          alt="file"
                          className="w-10"
                        />
                      </div>
                      <h1 className="text-sm mt-2">{data?.document?.name}</h1>
                    </div>
                  ) : (
                    <span class="flex items-center space-x-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-6 h-6 text-gray-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                      <span class="text-sm font-medium text-gray-600">
                        <span class="text-blue-600 "> browse</span>
                      </span>
                    </span>
                  )}
                </label>
              </div>
              {/* File Name and submit */}
              <div className="md:w-1/2">
                <label
                  htmlFor="docName"
                  className="text-sm text-gray-600 font-semibold"
                >
                  Document Name*
                </label>
                <input
                  type="text"
                  name="docName"
                  className="border w-full p-2 focus:outline-none text-sm rounded mt-1"
                  placeholder="Eg: Pancard"
                  onChange={onChangeHandler}
                />
                <div className="flex w-full">
                  <button
                    type="submit"
                    className="bg-primary_colors p-2 px-4 rounded text-white text-sm mt-6 w-full"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      {loading && <StudentLoader />}
    </>
  );
};

export default DocModal;
