import React, { useEffect, useState } from "react";
import ReqLoader from "../loading/ReqLoader";
import { IoClose } from "react-icons/io5";
import EmptyData from "../loading/EmptyData";
import { createFollowup, getAllfollowups, leadFollowup, postComment, updateFollowup } from "../../utils/Endpoint";
import { toast } from "react-toastify";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useSelector } from "react-redux";
import FollowupBox from "./FollowupBox";

const SingleFollow = ({ setModal, data, getMethod }) => {
  const axios = useAxiosPrivate();
  const user = useSelector((state) => state.auth.userInfo);

  const isAssignee = user?._id === data?.assignee?._id

  const [formData, setFormData] = useState({
    dueDate: data?.dueDate?.split("T")[0],
    note: data?.note,
    isCompleted: data?.isCompleted
  });

  const [loader, setLoader] = useState(false);

  const [addBox, setAddBox] = useState(false);

  const leadData = {
    _id: data?.leadId?._id,
    assignee: {
      _id: data?.assignee?._id
    }
  }

  console.log("data", data)
  console.log("leadData", leadData)

  const changeHandler = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  };

  const toggleHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.checked,
    });
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoader(true)
    await axios.put(`${updateFollowup}/${data?._id}`, formData)
      .then((res) => {
        getMethod()
        // setModal(false)
        toast.success(res?.data?.msg);
      })
      .catch((error) => {
        console.log(error);
        toast.warning(error?.response?.data?.msg);
      })
      .finally(()=>{
        setLoader(false)
      })


  };


  return (
    <div className="fixed top-0 left-0 w-full h-screen overflow-auto bg-black/50 flex items-center justify-center z-50 p-5">
      <div className="relative bg-white w-full md:w-1/2 rounded-lg  p-5">
        <IoClose
          onClick={() => setModal(false)}
          className="absolute right-1 top-1 rounded bg-primary_colors text-white cursor-pointer"
        />
        <div className="flex flex-col w-full items-center justify-center border-2 rounded-lg border-dotted border-primary_colors p-5 md:p-17">

          <form
            action=""
            onSubmit={submitHandler}
            className=" rounded-lg w-full flex flex-col gap-4"
          >
            <h1 className="font-bold text-center text-xl md:text-[22px] text-primary_colors pb-3">
              View{isAssignee && '/Edit'} Follow-Up
            </h1>

            <h2 className="mb-3 capitalize">Follow Up with {data?.leadId?.name ? data?.leadId?.name : "NIL"}</h2>

            <div className="w-full flex justify-between relative">
              <label htmlFor="dueDate" className="absolute top-[-20px] left-0 text-xs ">
                Follow-up Date
              </label>
              <input
                onChange={changeHandler}
                type="date"
                name="dueDate"
                value={formData?.dueDate}
                disabled={!isAssignee}
                className="w-fit border border-primary_colors p-2  rounded-lg text-secondary text-normal focus:outline-none"
              />

            {
              isAssignee
              &&
              <div className='w-fit flex items-center p-2 gap-3 border border-primary_colors rounded-lg'>
                <span className='font-bold'>Mark as Complete</span>
                <input
                  type='checkbox'
                  name='isCompleted'
                  checked={formData?.isCompleted}
                  onChange={toggleHandler}
                  className='cursor-pointer'
                />
              </div>
            }

            </div>

            <div className="w-full relative">
              Note :
              <textarea
                name="note"
                placeholder="Note"
                id=""
                cols="20"
                rows="3"
                value={formData?.note}
                onChange={changeHandler}
                disabled={!isAssignee}
                className="w-full border-2 rounded-lg bg-primary_colors/5  border-primary_colors p-2 focus:outline-none"
              ></textarea>
            </div>

            {/* BUTTON */}
            {
              isAssignee &&
              <div className="text-white text-normal space-x-3 flex items-center justify-between mt-5">
                <button
                  type="button"
                  onClick={()=> setAddBox(true)}
                  className="bg-primary_colors p-2 px-5 rounded-lg hover:scale-105 ease-in-out duration-200"
                >
                  Add New
                </button>

                <button
                  type="submit"
                  className="bg-primary_colors p-2 px-5 rounded-lg hover:scale-105 ease-in-out duration-200"
                >
                  Save
                </button>
              
              </div>
            }
          </form>

        </div>
      </div>
      {loader && <ReqLoader />}

      {addBox && <FollowupBox setModal={setAddBox} data={leadData} getMethod={getMethod} /> }
    </div>
  );
};

export default SingleFollow;
