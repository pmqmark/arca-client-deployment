import React, { useCallback, useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";

import Multiselect from "multiselect-react-dropdown";
import ProjectCard from "../../components/projeect/ProjectCard";
import {
  createProject,
  deleteProject,
  getAllProjects,
  getEmpProjects,
  getEmployeesRoute,
} from "../../utils/Endpoint";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import EmptyData from "../../components/loading/EmptyData";
import ReqLoader from "../../components/loading/ReqLoader";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const Project = () => {
  const instance = useAxiosPrivate()
  const [loader, setLoader] = useState(false);
  const [modal, setModal] = useState(false);
  const [employee, setEmployee] = useState([]);
  const [projectData, setProjectData] = useState([]);

  const user = useSelector((state) => state?.auth?.userInfo);

  // Setting the input values to the state
  const [team, setTeam] = useState({
    name: "",
    startDate: "",
    endDate: "",
    members: [],
  });

  //Adding the employee to the team
  const selectHandler = (event) => {
    team.members = event.map((items) => {
      return items._id;
    });
  };

  // Removing the employee to the team
  const removeHandler = (event) => {
    team.members = event.map((items) => {
      return items._id;
    });
  };

  const inputChangeHandler = (e) => {
    setTeam({ ...team, [e.target.name]: e.target.value });
  };

  // Submit modal
  const submitHandler = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        setLoader(true);
        const response = await instance.post(createProject, team);
        if (response?.status === 200) {
          toast.success("Project Successfully Created");
          allProject();
          setModal(false);
        } else {
          toast.warning("Something Went Wrong");
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("Error occurred");
      } finally {
        setLoader(false);
      }
    },
    [createProject, team, setModal]
  );

  // fetch data from employee

  const getEmployees = async()=>{
    await instance
      .get(getEmployeesRoute)
      .then((response) => {
        setEmployee(response?.data);
      })
      .catch((error) => {
        console.log(error);
      });

  }

  const allProject = async() => {
    let fetchRoute;

    if (user?.role === "admin") {
      fetchRoute = getAllProjects
    } else if (user?.role === "employee") {
      fetchRoute = `${getEmpProjects}/${user._id}`
    }

    try {
      setLoader(true);
      await instance
        .get(fetchRoute)
        .then((response) => {
          setProjectData(response?.data);
          // console.log(response.data);
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

  // fetch project Data
  useEffect(() => {
    allProject();

    if(user?.role === "admin"){
      getEmployees();
    }

  }, []);

  const deleteHandler = async (proId) => {
    try {
      setLoader(true);
      const response = await instance.delete(`${deleteProject}/${proId}`);
      console.log(response.data);
      toast.success("Successfully Deleted");
      allProject();
    } catch (error) {
      console.log(error);
      toast.error("Something went Wrong");
    } finally {
      setLoader(false);
    }
  };

  return (
    <>
      <div className="container mx-auto w-full h-full  pt-10 pb-28">
        <div className="flex  justify-between">
          <h1 className="text-primary_colors text-2xl font-bold">Project</h1>
          {user?.role === "admin" && (
            <button
              onClick={() => setModal(true)}
              className="bg-primary_colors text-white text-sm p-2 px-10 rounded-md hover:scale-105 ease-in-out duration-300"
            >
              New Project
            </button>
          )}
        </div>

        <div className="mt-5 flex flex-col gap-5">
          {projectData.length ? (
            projectData?.map((items, i) => (
              <ProjectCard
                key={i}
                data={items}
                deleteHandler={deleteHandler}
                user={user}
              />
            ))
          ) : (
            <EmptyData data="No Projects Available" />
          )}
        </div>
      </div>

      {/* project modal */}
      {modal && (
        <div className="fixed left-0 top-0 z-50 bg-black/60 w-full h-full flex items-center justify-center p-5">
          <div className="bg-white flex md:w-[400px] p-2 rounded relative">
            <IoClose
              onClick={() => setModal(false)}
              className="absolute bg-primary_colors text-white right-2 cursor-pointer"
            />
            <div className="flex flex-col items-center justify-center w-full mt-5 p-5">
              <h1 className="mb-5 text-primary_colors font-bold">
                New Project
              </h1>
              <form
                onSubmit={submitHandler}
                className="w-full flex flex-col gap-3 text-gray-700"
              >
                <input
                  onChange={inputChangeHandler}
                  required
                  type="text"
                  name="name"
                  className="border border-gray-500 text-sm p-2 font-thin rounded w-full focus:outline-none"
                  placeholder="Project Name"
                />
                <div className="flex gap-3">
                  <div>
                    <label htmlFor="" className="text-xs ">
                      {" "}
                      Starting Date
                    </label>
                    <input
                      onChange={inputChangeHandler}
                      type="date"
                      name="startDate"
                      required
                      min={new Date().toISOString().split("T")[0]}
                      className="border border-gray-400 text-sm p-2 font-thin rounded w-full focus:outline-none"
                      placeholder="Project Name"
                    />
                  </div>
                  <div>
                    <label htmlFor="" className="text-xs ">
                      {" "}
                      Ending Date
                    </label>
                    <input
                      onChange={inputChangeHandler}
                      type="date"
                      name="endDate"
                      required
                      min={new Date().toISOString().split("T")[0]}
                      className="border border-gray-400 text-sm p-2 font-thin rounded w-full focus:outline-none"
                      placeholder="Project Name"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <div>
                    <label htmlFor="" className="text-xs">
                      Select Employee
                    </label>
                    <Multiselect
                      required
                      onSelect={selectHandler}
                      onRemove={removeHandler}
                      options={employee}
                      displayValue="name"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="mt-3 bg-primary_colors p-2 rounded text-white"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {loader && <ReqLoader />}
    </>
  );
};

export default Project;
