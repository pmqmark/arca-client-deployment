import React, { useState } from "react";
import { IoCloseCircle } from "react-icons/io5";
import { toast } from "react-toastify";

import { updateApplicationRoute } from "../../utils/Endpoint";
import { Phases, countries } from "../../data/Dashboard";
import ReqLoader from "../loading/ReqLoader";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const PhaseChanger = ({ data, setData, getTableData, setModal }) => {
  const axios = useAxiosPrivate();

  const [loader, setLoader] = useState(false);

  const [formData, setFormData] = useState({
    country: data?.country, phase: data?.phase
  })

  const changeHandler = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoader(true)
      await axios.put(`${updateApplicationRoute}/${data?._id}`, formData)
        .then((res) => {
          setModal(false)
          setData({})
          getTableData();
          toast.success("Application Updated Successfully");
        })
    } catch (error) {
      console.log(error);
      toast.warning(error?.response?.data?.msg);
    } finally {
      setLoader(false)
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-screen overflow-auto bg-black/50 flex items-center justify-center z-50">
      <div className="relative bg-white mt-60 md:w-2/6  md:mt-0  rounded-lg p-5  m-5">
        <IoCloseCircle
          onClick={() => setModal(false)}
          className="absolute right-3 top-3 rounded bg-primary_colors text-white cursor-pointer"
        />

        {/* Form part */}
        <div className="flex flex-col w-full border rounded shadow ">
          <form
            action=""
            onSubmit={submitHandler}
            className="flex flex-col md:flex-row justify-around w-full gap-3 "
          >
            {/* File Name and submit */}
            <div className="w-full p-5">
              <h1 className="font-bold mb-4 text-primary_colors">
                Update the Application of {data?.studentName}
              </h1>

              {
                !countries?.some(elem=> elem.name === data?.country)
                &&
                <>
                  <label htmlFor="" className="text-sm text-gray-600 font-semibold">
                    Country
                  </label>
                  <div className="mt-1">
                    <select
                      onChange={changeHandler}
                      value={formData?.country}
                      name="country"
                      id=""
                      className="border p-3 w-full rounded capitalize focus:outline-none text-sm text-gray-700"
                    >
                      <option className="text-xs" value="">
                        Select a Country
                      </option>
                      {countries.map((country) => (
                        <option value={country?.name} className="capitalize">
                          {country?.name}

                        </option>
                      ))}
                    </select>
                  </div>
                </>

              }

              <label htmlFor="" className="text-sm text-gray-600 font-semibold">
                Application State
              </label>
              <div className="mt-1">
                <select
                  onChange={changeHandler}
                  value={formData?.phase}
                  name="phase"
                  id=""
                  className="border p-3 w-full rounded capitalize focus:outline-none text-sm text-gray-700"
                >
                  <option className="text-xs" value="">
                    Select a state
                  </option>
                  {Phases.map((phase) => (
                    <option value={phase?.name} className="capitalize">
                      {phase?.name}

                    </option>
                  ))}
                </select>
              </div>

              <div className="flex w-full justify-around">

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
      {loader && <ReqLoader />}
    </div>
  );
};

export default PhaseChanger;
