import React from "react";
import TaskCard from "./TaskCard";

import { useSelector } from "react-redux";
// import { HiPlus } from "react-icons/hi";

const TaskManagingCard = ({ task, team, editTask, modal }) => {
  const teamUserId = team?._id;

  // Accessing the State user Details
  const userInfo = useSelector((state) => state.auth.userInfo);

  // Filter data from the both data channels
  const taskData = task.filter((items) => items?.assignedTo?._id === team?._id);

  // Calculating each person completed task Count
  const CompletedTask = taskData.filter((items) => items.status === "Complete");

  return (
    <>
      {team ? (
        <div className="">
          <div className="w-[280px]  bg-white rounded-lg p-5">
            <div className="flex justify-between text-normalText text-sm font-medium">
              <h2>{team.fullName}</h2>
              <h2>
                Task
                <span className="ps-2">
                  {CompletedTask.length}/{taskData.length}
                </span>
              </h2>
            </div>
            <div className="w-full py-5">
              {taskData.length !== 0 ? (
                taskData.map((items) => {
                  return (
                    <TaskCard
                      modal={modal}
                      key={items?._id}
                      editTask={editTask}
                      data={items}
                    />
                  );
                })
              ) : (
                <div className="w-full flex items-center justify-center">
                  <span className="text-sm text-slate-500">
                    No Task Available
                  </span>
                </div>
              )}
            </div>
            {userInfo._id === teamUserId && (
              <div
                className="flex items-center gap-3 text-sm font-semibold hover:cursor-pointer 
              p-3 rounded bg-blue-200 text-white ease-in-out duration-200"
              >
                {/* <HiPlus size={20} className="hover:scale-105" /> */}
                <h2>You can Update the task </h2>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="w-full flex items-center justify-center">
          <span className="text-sm text-slate-500">No Task Available</span>
        </div>
      )}
    </>
  );
};

export default TaskManagingCard;
