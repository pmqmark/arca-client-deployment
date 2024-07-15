import React, { useEffect, useState } from "react";
import Profile from "./Profile/Profile";
import DashCard from "./Profile/DashCard";
import Applications from "./Profile/Applications";
import { useParams } from "react-router-dom";
import {
  LeadsofTeamRoute,
  assignedLeadsRoute,
  getAnEmployeeRoute,
  getAssignedWorksRoute,
  getEmpFollowupMetrics,
  getEmpLeadMetrics,
  getEmpTaskMetrics,
  getFollowupsOfEmp,
  getTeamFollowupMetrics,
  getTeamFollowups,
  getTeamLeadMetrics,
  getTeamTaskMetrics,
  getTeamWorksRoute,
} from "../../utils/Endpoint";
import ReqLoader from "../loading/ReqLoader";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useSelector } from "react-redux";
import LeadsProfile from "./Profile/LeadsProfile";
import FollowupProfile from "./Profile/FollowupProfile";

const EmployeeProfile = () => {
  const axios = useAxiosPrivate();
  const user = useSelector((state) => state.auth.userInfo);
  const [tab, setTab] = useState('task')

  const { id } = useParams();
  const [loader, setLoader] = useState(false);
  const [empData, setEmpData] = useState({});
  const [works, setWorks] = useState([]);
  const [leads, setLeads] = useState([]);
  const [followups, setFollowups] = useState([]);
  const [taskMetrics, setTaskMetrics] = useState([]);
  const [leadMetrics, setLeadMetrics] = useState([]);
  const [followupMetrics, setFollowupMetrics] = useState([]);

  const isAdmin = user?.role === 'admin';
  const isLeader = user?.role === 'leader';
  const isEmployee = user?.role === 'employee';

  let userId;

  if (isAdmin) {
    userId = id;
  }
  else if(isLeader && id){
    userId = id;
  }
  else {
    userId = user?._id;
  }


  const getEmployee = async () => {
    await axios
      .get(`${getAnEmployeeRoute}/${userId}`)
      .then((res) => {
        setEmpData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getTaskMetrics = async () => {
    let fetchTaskMetrics;
    if (empData?.role === 'leader') {
      fetchTaskMetrics = getTeamTaskMetrics
    }
    else {
      fetchTaskMetrics = getEmpTaskMetrics
    }

    await axios
      .get(`${fetchTaskMetrics}/${userId}`)
      .then((res) => {
        setTaskMetrics(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getLeadMetrics = async () => {
    let fetchLeadMetrics;
    if (empData?.role === 'leader') {
      fetchLeadMetrics = getTeamLeadMetrics
    }
    else {
      fetchLeadMetrics = getEmpLeadMetrics
    }

    await axios
      .get(`${fetchLeadMetrics}/${userId}`)
      .then((res) => {
        setLeadMetrics(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getFollowupMetrics = async () => {
    let fetchFollowupMetrics;
    if (empData?.role === 'leader') {
      fetchFollowupMetrics = getTeamFollowupMetrics
    }
    else {
      fetchFollowupMetrics = getEmpFollowupMetrics
    }

    await axios
      .get(`${fetchFollowupMetrics}/${userId}`)
      .then((res) => {
        setFollowupMetrics(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAssignedWorks = async () => {
    let fetchWorks;
    if (empData?.role === 'leader') {
      fetchWorks = getTeamWorksRoute
    }
    else {
      fetchWorks = getAssignedWorksRoute
    }

    try {
      setLoader(true);
      await axios
        .get(`${fetchWorks}/${userId}`)
        .then((res) => {
          console.log(res.data);
          setWorks(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };


  const getAssignedLeads = async()=>{
    let leadFetchRoute ;

    if (empData?.role === 'leader') {
      leadFetchRoute = LeadsofTeamRoute + "/" + userId
    }
    else {
      leadFetchRoute = assignedLeadsRoute + "/" + userId;
    }

    setLoader(true);
    axios
      .get(
        `${leadFetchRoute}`
      )
      .then((res) => {
        console.log(res?.data);
        setLeads(res?.data?.lead);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoader(false);
      });
  }

  const getTheFollowups= async()=>{
    let followfetchroute;
    if(empData?.role === "leader"){
      followfetchroute = getTeamFollowups
    }
    else{
      followfetchroute = getFollowupsOfEmp

    }

    await axios.get(`${followfetchroute}/${userId}`)
      .then((res) => {
        setFollowups(res?.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }


  useEffect(() => {
    window.scroll(0, 0);
    getEmployee();
  }, []);
  
  useEffect(() => {
    if(tab === "task"){
      getTaskMetrics();
    }
    else if(tab === "lead"){
      getLeadMetrics();
    }
    else if(tab === "followup"){
      getFollowupMetrics();
    }
    

    if(isAdmin){
      if(tab == "task"){
        getAssignedWorks();
      }
      else if(tab === "lead"){
        getAssignedLeads();
      }
      else if(tab === "followup"){
        getTheFollowups();
      }
    }

  }, [empData, tab])

  return (
    <div className="w-full text-black pt-10 pb-28">
      <h1 className="text-primary_colors text-2xl font-bold capitalize">
        {isAdmin ? `Employee's Profile` : 'Profile'}
      </h1>
      <div className="w-full mt-5 flex flex-col md:flex-row gap-5">
        <div className="w-full md:w-2/6">
          <Profile data={empData} />
        </div>
        <div className="w-full md:w-4/6 space-y-5">
          <div>
            {
              tab === 'task' 
              ?
              <DashCard data={taskMetrics} variant='task' />
              :
              tab === 'lead'
              ?
              <DashCard data={leadMetrics} variant='lead' />
              :
              tab === 'followup'
              &&
              <DashCard data={followupMetrics} variant='followup' />

            }
          </div>

          {/* {
            isAdmin &&
            <div>
              {works?.length > 0 && (
                <h1 className="mt-10 mb-5 text-xl font-bold text-primary_colors">
                  Tasks
                </h1>
              )}
              <Applications data={works} />
            </div>
          } */}

          <div className='w-full sm:w-[50vw] flex flex-col p-5 gap-3 mt-10'>
            <div className='w-full sm:w-1/2 flex '>
              <div className={`w-1/2 border-b-[4px] flex justify-center items-center  ${tab === 'task' ? 'border-primary_colors' : 'border-[#EAECF1]'} `}>
                <span
                  onClick={() => setTab('task')}
                  className={`font-semibold ${tab === 'task' ? 'text-primary_colors' : 'text-[#7688A8]'} cursor-pointer`}>Tasks</span>
              </div>

              <div className={`w-1/2 border-b-[4px] flex justify-center items-center ${tab === 'lead' ? 'border-primary_colors' : 'border-[#EAECF1]'} `}>
                <span
                  onClick={() => setTab('lead')}
                  className={`font-semibold ${tab === 'lead' ? 'text-primary_colors' : 'text-[#7688A8]'} cursor-pointer`}>Leads</span>
              </div>

              <div className={`w-1/2 border-b-[4px] flex justify-center items-center ${tab === 'followup' ? 'border-primary_colors' : 'border-[#EAECF1]'} `}>
                <span
                  onClick={() => setTab('followup')}
                  className={`font-semibold ${tab === 'followup' ? 'text-primary_colors' : 'text-[#7688A8]'} cursor-pointer`}>Follow-ups</span>
              </div>

            </div>

            {
              isAdmin &&
              <div className='w-full h-auto mt-5 flex flex-wrap gap-10 '>
                {
                  tab === "task"
                    ?

                    <Applications data={works} />

                    :
                    tab === "lead"
                      ?
                      <LeadsProfile data={leads}/>
                      :
                      tab === "followup"
                      &&
                      <FollowupProfile data={followups}/>
                }

              </div>

            }


          </div>


        </div>
      </div>
      {loader && <ReqLoader />}
    </div>
  );
};

export default EmployeeProfile;
