import React, { useEffect, useState } from "react";
import TaskMain from "./task/TaskMain";
import EmptyData from "../loading/EmptyData";
import LoadingData from "../loading/LoadingData";

import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  createTask,
  getAllMembersFromProject,
  getAllTask,
} from "../../utils/Endpoint";
import { IoClose } from "react-icons/io5";
import { toast } from "react-toastify";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const Team = () => {
  const instance = useAxiosPrivate();

  const [taskData, setTaskData] = useState();
  const [loader, setLoader] = useState(false);
  const [modal, setaModal] = useState(false);
  const [employee, setEmployee] = useState();
  const user = useSelector((state) => state.auth.userInfo);
  const { proId } = useParams();
  const [formData, setFormData] = useState({
    projectId: proId,
    assignee: "",
    taskName: "",
  });

  const employeeData = async () => {
    try {
      const response = await instance.get(
        `${getAllMembersFromProject}/${proId}`
      );
      setEmployee(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoader(true);
      const response = await instance.post(createTask, formData);
      console.log(response.data);
      if (response?.status === 200) {
        toast.success("Successfully Created");
        setaModal(false);
        GetAllTasks();
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.msg || "Something went wrong");
    } finally {
      setLoader(false);
    }
  };

  const inputChangeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const GetAllTasks = async () => {
    setLoader(true);
    instance
      .get(`${getAllTask}/${proId}`)
      .then((res) => {
        if (user?.role === "admin") {
          setTaskData(res.data);
        } else if (user?.role === "employee") {
          console.log("user", user);
          const allTasks = res.data;
          console.log("allTasks", allTasks);
          const myTasks = allTasks.filter((task) => task._id === user._id);
          setTaskData(myTasks);
        }

        setLoader(false);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoader(false);
      });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    employeeData();
    setLoader(true);
    GetAllTasks();
  }, [proId, modal]);

  return (
    <div className="container mx-auto w-full h-full  pt-10 pb-28">
      <div className="flex  justify-between">
        <h1 className="text-primary_colors text-2xl font-bold">Task</h1>
        <button
          onClick={() => setaModal(true)}
          className={`bg-primary_colors px-5 text-white rounded  text-sm p-2 ${
            user?.role === "admin" ? "block" : "hidden"
          }`}
        >
          Add Task
        </button>
      </div>
      <div
        className={`container mx-auto w-full py-5 flex flex-wrap gap-5 overflow-auto`}
      >
        {taskData && taskData?.length > 0 ? (
          taskData?.map((items, i) => (
            <TaskMain
              key={i}
              user={user}
              data={items}
              setaModal={setaModal}
              cb={GetAllTasks}
            />
          ))
        ) : (
          <EmptyData data={"No Available Task..."} />
        )}
      </div>

      {modal && (
        <div className="fixed left-0 top-0 z-50 bg-black/60 w-full h-full flex items-center justify-center p-5">
          <div className="bg-white flex md:w-[400px] p-2 rounded relative">
            <IoClose
              onClick={() => setaModal(false)}
              className="absolute bg-primary_colors text-white right-2 cursor-pointer"
            />
            <div className="flex flex-col items-center justify-center w-full p-5">
              <h1 className="mb-5 text-primary_colors font-bold">New Task</h1>
              <form
                onSubmit={submitHandler}
                className="w-full flex flex-col gap-3 text-gray-700"
              >
                <input
                  onChange={inputChangeHandler}
                  required
                  type="text"
                  name="taskName"
                  className="border border-gray-500 text-sm p-2 font-thin rounded w-full focus:outline-none"
                  placeholder="Task "
                />

                <select
                  onChange={inputChangeHandler}
                  required
                  name="assignee"
                  id=""
                  className="border border-gray-500 text-sm text-gray-500 p-2 font-thin rounded w-full focus:outline-none"
                >
                  <option value="" className="">
                    Select a employee
                  </option>
                  {employee?.map((items, i) => (
                    <option
                      key={i}
                      name="assignee"
                      value={items?._id}
                      className=""
                    >
                      {items?.name}
                    </option>
                  ))}
                </select>

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

      {loader && <LoadingData />}
    </div>
  );
};

export default Team;
