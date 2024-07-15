import React, { useEffect, useState } from "react";
import CommonTable from "../Table/Commontable";
import Pagination from "../Pagination";
import { getAllApplications } from "../../utils/Endpoint";
import { useLocation } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const Application = () => {
  const instance = useAxiosPrivate();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('query')

  const [data, setData] = useState();

  const [page, setPage] = useState(1);
  const [entries, setEntries] = useState(10);

  const GetApplications = async () => {
    try {
      const response = await instance.get(
        `${getAllApplications}?page=${page}&entries=${entries}&search=${query}`
      );
      setData(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    window.scroll(0, 0);
    GetApplications();
  }, [setPage, query]);

  return (
    <div className="w-full h-full text-black pt-10 pb-28">
      <div className="flex flex-col md:flex-row justify-between">
        <h1 className="text-primary_colors text-2xl font-bold">Applications</h1>
      </div>

      {/* Common Table */}
      <div className="flex flex-wrap mt-5 w-full ">
        <CommonTable data={data} page={page} entries={entries} />
      </div>

      {/* Pagination */}
      <div className="w-full flex justify-end">
        <Pagination
          Data={data}
          page={page}
          setPage={setPage}
          getMethod={GetApplications}
        />
      </div>
    </div>
  );
};

export default Application;
