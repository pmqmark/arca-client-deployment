import React, { useEffect, useState } from "react";
import { FilterData, FilterDataDash } from "../../data/Dashboard";

import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import ReqLoader from "../loading/ReqLoader";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const Filter = ({ setData, endPoint, isDashboard, page, entries }) => {
  const axios = useAxiosPrivate();

  const [loader, setLoader] = useState(false);
  const TheDataToFilter = isDashboard ? FilterDataDash : FilterData;

  const [form, setForm] = useState({
    start_date: "",
    end_date: "",
    country: "",
    intake: "",
    status: "",
  });

  //   @DCS updating the form data
  const changeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  //   @DCS Submitting the data
  const submitData = async (e) => {
    e.preventDefault();
    const { start_date, end_date, country, intake, status } = form;
    try {
      setLoader(true);
      const res = await axios.get(
        `${endPoint}?page=${page}&entries=${entries}&start_date=${start_date}&end_date=${end_date}&country=${country}&intake=${intake}&status=${status}`
      );
      // console.log(res);
      setData(res.data);
    } catch (error) {
      // console.error(error);
      toast.error(error.response.data.msg);
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="w-full">
      <form
        onSubmit={submitData}
        action=""
        className="flex flex-col justify-between md:flex-row gap-5 md:gap-5 "
      >
        <div className="relative">
          <label htmlFor="" className="absolute top-[-20px] left-0 text-xs ">
            Starting Date
          </label>
          <input
            onChange={changeHandler}
            type="date"
            name="start_date"
            placeholder=""
            className="border border-primary_colors p-2  rounded-lg text-secondary text-normal focus:outline-none w-full"
          />
        </div>

        <div className="relative">
          <label htmlFor="" className="absolute top-[-20px] left-0 text-xs ">
            Ending Date
          </label>
          <input
            onChange={changeHandler}
            type="date"
            name="end_date"
            placeholder=""
            className="border border-primary_colors p-2  rounded-lg text-secondary text-normal focus:outline-none w-full"
          />
        </div>

        {TheDataToFilter.map((data) => (
          <select
            key={data?.id}
            onChange={changeHandler}
            name={data?.name}
            id=""
            className="border border-primary_colors p-2  rounded-lg text-secondary text-normal focus:outline-none w-full"
          >
            <option value="">Select {data.name}</option>
            {data?.options?.map((data) => (
              <option key={data?.id} value={data?.name}>
                {data?.name}
              </option>
            ))}
          </select>
        ))}
        <button
          type="submit"
          className="bg-primary_colors p-2 rounded text-white text-normal  hover:scale-105 ease-in-out duration-200 w-full"
        >
          Filter
        </button>
      </form>
      {loader && <ReqLoader />}
    </div>
  );
};

export default Filter;
