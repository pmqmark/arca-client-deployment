import React from "react";
import TaskCard from "./TaskCard";
import { TbHemispherePlus } from "react-icons/tb";

const TaskMain = ({ user, data, setaModal, cb }) => {
  return (
    <div className="w-[280px] h-full shadow-lg bg-white rounded-lg p-5">
      <div className="flex justify-between text-normalText text-sm font-medium">
        <h2>{data?.assigneeName}</h2>
        <h2>
          Tasks
          <span className="ps-2"></span>
        </h2>
      </div>
      <div className="w-full py-5">
        {data?.tasks?.map((items, i) => (
          <TaskCard key={i} data={items} cb={cb} />
        ))}
      </div>

      {/* Task Add button */}
      {user?.role === "admin" && (
        <div
          onClick={() => setaModal(true)}
          className="flex items-center gap-3 text-sm font-semibold hover:cursor-pointer 
              p-3 hover:rounded hover:bg-blue-200 hover:text-white ease-in-out duration-200"
        >
          <TbHemispherePlus size={20} className="hover:scale-105 " />
          <h2>Add a task</h2>
        </div>
      )}
    </div>
  );
};

export default TaskMain;
