import React, { useEffect, useState } from "react";
import { getAllStudent, getTeamStudents, getWorkStudents } from "../../utils/Endpoint";

import StudentTable from "../../components/Table/StudentTable";
import Pagination from "../../components/Pagination";
import SearchData from "../../components/search/SearchData";
import { toast } from "react-toastify";
import { Office } from "../../data/Dashboard";
import { useSelector } from "react-redux";
import ReqLoader from "../../components/loading/ReqLoader";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
// import Pagination from "../../components/Pagination";

const Student = () => {
  const instance = useAxiosPrivate();
  const offices = useSelector(state=> state.data.offices)

  const [loader, setLoader] = useState(false);
  const [data, setData] = useState();
  const [page, setPage] = useState(1);
  const [entries, setEntries] = useState(10);
  const [office, setOffice] = useState("");
  const [appstatus, setAppstatus] = useState("");
  const [search, setSearch] = useState("");
  const user = useSelector((state) => state?.auth?.userInfo)
  const isAdmin = user?.role === 'admin'
  const isLeader = user?.role === 'leader'
  const isEmployee = user?.role === 'employee'

  // Table initial api call
  const studentTable = async () => {
    let fetchroute;
    if(isAdmin){
      fetchroute = getAllStudent
    }
    else if(isLeader){
      fetchroute = `${getTeamStudents}/${user._id}`
    }
    else if(isEmployee){
      fetchroute = `${getWorkStudents}/${user._id}`

    }

    try {
      setLoader(true)
      const res = await instance.get(
        `${fetchroute}?page=${page}&entries=${entries}&search=${search}&office=${office}&appstatus=${appstatus}`
      );
      setData(res.data);
      // console.log(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false)
    }
  };

  useEffect(() => {
    window.scroll(0, 0);
    studentTable();
  }, [office, appstatus]);


  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      studentTable();
    }
  };

  return (
    <div className="w-full h-full text-black pt-10 pb-28">
      <div className="flex flex-col md:flex-row md:justify-between">
        <h1 className="text-primary_colors text-2xl font-bold">
          Track Student
        </h1>
        <div className="flex flex-col md:flex-row mt-4 md:mt-0 gap-4">


          {
            user?.role === "admin"
            &&
            <>
              <select
                onChange={(e) => setAppstatus(e.target.value)}
                className="border shadow p-2  rounded-lg text-secondary text-normal focus:outline-none w-3/4"
              >
                <option value="" >Select App. Presence</option>
                <option value="present" >With Application</option>
                <option value="absent" >Without Application</option>
              </select>

              <select
                onChange={(e) => setOffice(e.target.value)}
                className="border shadow p-2  rounded-lg text-secondary text-normal focus:outline-none w-1/2"
              >
                <option value="" >Select Office</option>
                {
                  offices.map((item) => (
                    <option key={item.id} value={item._id}>{item.name}</option>
                  ))
                }

              </select>
            </>

          }

          <SearchData
            placeholder={"Student Data"}
            searchHandler={studentTable}
            handleKeyPress={handleKeyPress}
            setSearch={setSearch}
          />
        </div>
      </div>
      <div className="w-full mt-5 flex flex-col md:flex-row gap-5">
        <StudentTable data={data} getData={studentTable} page={page} entries={entries} />
      </div>

      {/* <Pagination/> */}
      <div className="w-full flex justify-end">
        <Pagination
          dataLength={data?.length}
          page={page}
          setPage={setPage}
          entries={entries}
          setEntries={setEntries}
          getMethod={studentTable}
        />
      </div>
      {loader && <ReqLoader />}
    </div>
  );
};

export default Student;
