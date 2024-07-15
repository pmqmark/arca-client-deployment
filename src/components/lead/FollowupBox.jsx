import React, { useEffect, useState } from "react";
import ReqLoader from "../loading/ReqLoader";
import { IoClose } from "react-icons/io5";
import EmptyData from "../loading/EmptyData";
import { createFollowup, getAllfollowups, leadFollowup, postComment } from "../../utils/Endpoint";
import { toast } from "react-toastify";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useSelector } from "react-redux";

const FollowupBox = ({ setModal, data, getMethod }) => {
  const axios = useAxiosPrivate();
  console.log(data)

  const [formData, setFormData] = useState({
    leadId : data?._id,
    assignee: data?.assignee?._id,
    dueDate : "",
    note : "",
  });

  const [loader, setLoader] = useState(false);
  const [followups, setFollowups] = useState([]);

  const changeHandler = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    await axios.post(createFollowup, formData)
    .then((res) => {
      setFormData((prev)=>({...prev, note:"", dueDate:""}))
      toast.success(res?.data?.msg);
      setFollowups((prev)=>([res?.data?.result, ...prev]));
      getMethod && getMethod()
    })
    .catch((error) => {
      console.log(error);
      toast.warning(error?.response?.data?.msg);
    });

  
  };

  const fetchFollowups = async()=>{
    await axios
      .get(`${leadFollowup}/${data?._id}`)
      .then((res) => {
        setFollowups(res?.data ? res?.data : []);
      })
      .catch((error) => {
        console.log(error);
      });

  }

  useEffect(() => {
    fetchFollowups()

  }, [data?._id]);

  console.log(followups)

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
            Add Follow-Up
          </h1>

            <div className="w-fit flex relative">
              <label htmlFor="dueDate" className="absolute top-[-20px] left-0 text-xs ">
                Follow-up Date
              </label>
              <input
                onChange={changeHandler}
                type="date"
                name="dueDate"
                value={formData?.dueDate}
                className="border border-primary_colors p-2  rounded-lg text-secondary text-normal focus:outline-none w-full"
              />
            </div>

            <div className="w-full flex flex-wrap">
              <textarea
                name="note"
                placeholder="Note"
                id=""
                cols="20"
                rows="3"
                value={formData?.note}
                onChange={changeHandler}
                className="w-full border-2 rounded-lg bg-primary_colors/5  border-primary_colors p-2 focus:outline-none"
              ></textarea>
            </div>

            {/* BUTTON */}
            <div className="text-white text-normal space-x-3 flex items-center justify-end mt-5">
              <button
                type="submit"
                className="bg-primary_colors p-2 px-5 rounded-lg hover:scale-105 ease-in-out duration-200"
              >
                Save
              </button>
              {/* )} */}
            </div>
          </form>
          <h1 className="font-bold text-start text-xl md:text-[20px] text-primary_colors pb-3 w-full">
            Previous Followups
          </h1>
          <div className="max-h-[200px] w-full overflow-scroll gap-2 flex flex-col capitalize text-blue-gray-600 text-sm">
            <div className="w-full border rounded-lg bg-primary_colors/5  border-primary_colors p-2 focus:outline-none">
              {followups?.length > 0 ? (
                followups?.map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between">
                      <h1 className="text-xs font-medium text-gray-500 capitalize">
                        {item?.assignee?.name}
                      </h1>
                      <h1 className="text-xs text-gray-500">
                        {new Date(item?.dueDate).toLocaleDateString('en-GB')}
                      </h1>
                    </div>
                    <div className="bg-primary_colors p-5 mt-2 rounded-lg">
                      <p className="text-[13px] text-white">
                        {item?.note || 'NIL'}
                        </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <EmptyData data={"No Followups Are Available"} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {loader && <ReqLoader />}
    </div>
  );
};

export default FollowupBox;
