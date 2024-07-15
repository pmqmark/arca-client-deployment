import React, { useEffect, useState } from "react";
import { dashData } from "../../utils/Endpoint";
import { FaUserGraduate } from "react-icons/fa";
import { MdManageAccounts } from "react-icons/md";
import { Link } from "react-router-dom";

import Filter from "../../components/dashboard/Filter";
import RegistrationForm from "../../components/dashboard/RegistrationForm";
import Cards from "../../components/dashboard/Cards";
import StudentLoader from "../../components/loading/StudentLoader";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import WorkLeadChart from "../../components/dashboard/WorkLeadChart";
import Leadstages from "../../components/dashboard/Leadstages";
import BasicCalendar from "../../components/calendar/BasicCalendar";
import EmpRegForm from "../../components/dashboard/EmpRegForm";
import StdRegForm from "../../components/dashboard/StdRegForm";

const Dashboard = () => {
  const axios = useAxiosPrivate();
  
  const [data, setData] = useState([]);
  const [date, setDate] = useState(new Date());
  const [modal, setModal] = useState(false);
  const [empModal, setEmpModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [value, onChange] = useState(new Date());

  // @DCS All Card Data
  useEffect(() => {
    setLoading(true);
    axios
      .get(dashData)
      .then((res) => {
        // console.log(res);
        setData(res.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(()=>{
    window.scroll(0,0)
  },[])

  return (
    <>
      <div className="container mx-auto w-full h-full text-black pt-10 pb-28">
        <h1 className="text-primary_colors text-2xl font-bold">Dashboard</h1>
        <h3 className="text-secondary text-[14px]">
          Welcome to Course Finder Portal
        </h3>

        <div className="mt-5 md:mt-10 space-y-7">
          <div>
            <Filter setData={setData} endPoint={dashData} isDashboard={true} />
          </div>
          <div className="">
            {loading ? <StudentLoader /> : <Cards data={data} />}
          </div>
          <div className="w-full flex items-center justify-end">
            <button
              onClick={() => setEmpModal(true)}
              className="me-2 p-2 px-4 text-normal bg-primary_colors text-white rounded-lg hover:scale-105 ease-in-out duration-200"
            >
              Register a New Employee
            </button>

            <button
              onClick={() => setModal(!modal)}
              className="me-2 p-2 px-4 text-normal bg-primary_colors text-white rounded-lg hover:scale-105 ease-in-out duration-200"
            >
              Register a New Student
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row w-full mt-5 md:mt-10 gap-5 md:gap-2">
          <div className=" md:w-1/2 ">
            <div className="border-2 border-primary_colors  p-9  rounded hover:shadow-xl cursor-pointer">
              <div className=" ">
                <FaUserGraduate className="text-3xl text-primary_colors" />
              </div>
              <h1 className="text-xl font-semibold text-primary_colors my-2">
                Students
              </h1>
              <div>
                <Link to={"/admin/student"}>
                  <h1 className="hover:underline hover:text-primary_colors">
                    Track Student
                  </h1>
                </Link>
                <Link to={"/admin/applications"}>
                  <h1 className="hover:underline hover:text-primary_colors">
                    Manage Application
                  </h1>
                </Link>
              </div>
            </div>
          </div>
          <div className=" md:w-1/2 ">
            <div className="border-2 border-primary_colors  p-9  rounded hover:shadow-xl cursor-pointer">
              <div className=" ">
                <MdManageAccounts className="text-5xl text-primary_colors" />
              </div>
              <h1 className="text-xl font-semibold text-primary_colors my-3">
                Track Employee
              </h1>
              <div>
                <Link
                  to={"/admin/employee"}
                  className="hover:underline hover:text-primary_colors"
                >
                  <h1 className="flex-wrap">
                    UnderStand the Workflow of all employees.{" "}
                  </h1>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="relative mt-10">
          <label htmlFor="" className="absolute top-[-20px] left-0 text-xs ">
            Select Date
          </label>
          <input
            onChange={(e)=> setDate(e.target.value)}
            type="date"
            name="date"
            placeholder=""
            className="border border-primary_colors p-2  rounded-lg text-secondary text-normal focus:outline-none w-fit"
          />
        </div> */}

        <div className="w-full h-auto mt-20 flex flex-col gap-5">
          <div className="w-full flex items-center justify-center gap-5">
            <div className="flex items-center justify-center gap-1">
              <div className="w-10 h-5 bg-blue-500"></div>
              Leads
            </div>
            <div className="flex items-center justify-center gap-1">
              <div className="w-10 h-5 bg-yellow-500"></div>
              Applications
            </div>
          </div>
          <WorkLeadChart date={value}/>

        </div>

        <div className="w-full h-auto mt-20 flex flex-col gap-5">
          <h1 className="text-primary_colors text-lg ">Lead Stage Segregation</h1>
          <Leadstages date={value} />

        </div>

        <div className="relative mt-10">
          {/* <label htmlFor="" className="absolute top-[-20px] left-0 text-xs ">
            Select a Date
          </label> */}
          <BasicCalendar value={value} onChange={onChange} />
        </div>
      
      </div>
      
      {modal && <StdRegForm setModal={setModal}/>}

      {empModal && (
        <EmpRegForm setModal={setEmpModal} />
      )}
    </>
  );
};

export default Dashboard;
