import React, { useState } from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

import { BsArrowRight } from "react-icons/bs";
import { useSelector } from "react-redux";
import { TimeLimit } from "../../../utils/TimeLimit";
import EmptyData from "../../loading/EmptyData";
import { IoClose } from "react-icons/io5";
import { status } from "../../../data/Employee";
import { updateTask } from "../../../utils/Endpoint";
import { toast } from "react-toastify";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

const TaskCard = ({ data, cb }) => {
  const instance = useAxiosPrivate();

  const userInfo = useSelector((state) => state.auth.userInfo);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({
    taskStatus: "",
  });

  const TimeLimite = TimeLimit(data?.startDate, data?.endDate);

  const inputChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await instance.put(`${updateTask}/${data._id}`, form);
      console.log(response.data);
      data = response.data;
      setModal(false);
      toast.success("Task Update Successfully");
      cb();
    } catch (error) {
      console.log(error);
      toast.error("Something went Wrong");
    }
  };

  // console.log(data);
  return (
    <>
      <Tippy
        className="text-primaryColor"
        content={
          <div className="w-[250px] p-2 shadow-lg ">
            <ul className="space-y-1 text-xs">
              <li>Project Name: {data?.projectName}</li>
              <li>TimeLimit: {TimeLimite} </li>
              <li>Status: {data?.taskStatus}</li>
              <li>
                {" "}
                Last Comment:{" "}
                {data?.comments && data?.comments?.length > 0 ? (
                  <div>
                    {data?.comments[data?.comments.length - 1]?.comment}
                  </div>
                ) : (
                  <EmptyData data={"No comments yet"} />
                )}
              </li>
            </ul>
          </div>
        }
      >
        <div
          onClick={() => setModal(true)}
          className={`bg-[#3D3D3D] flex items-center justify-between p-4 text-[12px] text-[#FFFFFF] font-[500] rounded 
        ${
          userInfo?.role === "admin"
            ? "hover:cursor-grab"
            : "hover:cursor-pointer"
        } hover:scale-105 ease-in-out duration-300 mb-2`}
        >
          <div>
            <h2>{data?.taskName}</h2>
          </div>
          <BsArrowRight size={20} />
          <div className="flex items-center gap-2">
            <h2>{data?.taskStatus}</h2>
            <div
              className={`w-3 p-2 rounded-full ${
                data?.taskStatus === "pending"
                  ? "bg-[#FFF730]"
                  : data?.taskStatus === "completed"
                  ? "bg-[#00C78B]"
                  : data?.taskStatus === "Updating"
                  ? "bg-[#fca151]"
                  : data?.taskStatus === "Need help"
                  ? "bg-[#FF6464]"
                  : "bg-[#4bc3ff]"
              }`}
            ></div>
          </div>
        </div>
      </Tippy>

      {modal && (
        <div className="fixed left-0 top-0 z-50 bg-black/60 w-full h-full flex items-center justify-center p-5">
          <div className="bg-white flex md:w-[400px] p-2 rounded relative">
            <IoClose
              onClick={() => setModal(false)}
              className="absolute bg-primary_colors text-white right-2 cursor-pointer"
            />
            <div className="flex flex-col items-center justify-center w-full p-5">
              <h1 className="mb-5 text-primary_colors font-bold">Update Task</h1>
              <div className="w-full border border-gray-500 rounded p-2 mb-3">
                <h1 className="mb-2 text-sm text-gray-900">
                  Previous Comments
                </h1>
                  {data?.comments?.map((items, i) => (
                    <div
                      key={i}
                      className="flex flex-col items-start text-sm w-full max-h-[80px] overflow-y-scroll"
                    >
                      <div className="border w-full p-2 shadow mb-2 text-gray-600">
                        {items?.comment}
                      </div>
                    </div>
                  ))}
              </div>
              <form
                onSubmit={submitHandler}
                className="w-full flex flex-col gap-3 text-gray-700"
              >
                <textarea
                  onChange={inputChangeHandler}
                  name="comment"
                  id=""
                  cols="20"
                  rows="5"
                  placeholder="Comment"
                  className="border border-gray-500 text-sm text-gray-500 p-2 font-thin rounded w-full focus:outline-none"
                ></textarea>

                <select
                  onChange={inputChangeHandler}
                  required
                  defaultValue={data?.taskStatus}
                  name="taskStatus"
                  id=""
                  className="border border-gray-500 text-sm text-gray-500 p-2 font-thin rounded w-full focus:outline-none"
                >
                  <option value="" className="">
                    Update Status
                  </option>
                  {status.map((items, i) => (
                    <option key={i} value={items?.name} >
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
    </>
  );
};

export default TaskCard;
