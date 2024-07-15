import React, { useEffect, useState } from "react";
import ReqLoader from "../loading/ReqLoader";
import { IoClose } from "react-icons/io5";
import EmptyData from "../loading/EmptyData";
import { getAllComments, postComment } from "../../utils/Endpoint";
import { toast } from "react-toastify";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useSelector } from "react-redux";

const MessageBox = ({ setModal, data }) => {
  const axios = useAxiosPrivate();
  const user = useSelector((state) => state?.auth?.userInfo);

  const [loader, setLoader] = useState(false);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    const message = {
      resourceId: data?._id,
      resourceType: "lead",
      commentorId: user?._id,
      comment: comment,
    };
    console.log("data", data);
    console.log("message", message);
    try {
      const response = await axios.post(postComment, message);
      toast.success(response?.data?.msg);
      setComments([response?.data?.data, ...comments]);
      setComment("");
    } catch (error) {
      console.log(error);
      toast.warning(error?.response?.data?.msg);
    }
  };

  useEffect(() => {
    axios
      .get(`${getAllComments}/lead/${data?._id}`)
      .then((res) => {
        setComments(res?.data);
      })
      .catch((error) => {
        console.log(error);
      });

  }, [data?._id]);

  return (
    <div className="fixed top-0 left-0 w-full h-screen overflow-auto bg-black/50 flex items-center justify-center z-50 p-5">
      <div className="relative bg-white w-full md:w-1/2 rounded-lg  p-5">
        <IoClose
          onClick={() => setModal(false)}
          className="absolute right-1 top-1 rounded bg-primary_colors text-white cursor-pointer"
        />
        <div className="flex flex-col w-full items-center justify-center border-2 rounded-lg border-dotted border-primary_colors p-5 md:p-17">

          <h1 className="font-bold text-center text-xl md:text-[22px] text-primary_colors pb-3">
            Add Comments
          </h1>
          <form
            action=""
            onSubmit={submitHandler}
            className=" rounded-lg w-full"
          >
            <div className="w-full flex flex-wrap">
              <textarea
                name=""
                id=""
                cols="20"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full border-2 rounded-lg bg-primary_colors/5  border-primary_colors p-2 focus:outline-none"
              ></textarea>
            </div>

            {/* BUTTON */}
            <div className="text-white text-normal space-x-3 flex items-center justify-end mt-5">
              <button
                type="submit"
                className="bg-primary_colors p-2 px-5 rounded-lg hover:scale-105 ease-in-out duration-200"
              >
                Send
              </button>
              {/* )} */}
            </div>
          </form>
          <h1 className="font-bold text-start text-xl md:text-[20px] text-primary_colors pb-3 w-full">
            Old Comments
          </h1>
          <div className="max-h-[200px] w-full overflow-scroll gap-2 flex flex-col capitalize text-blue-gray-600 text-sm">
            <div className="w-full border rounded-lg bg-primary_colors/5  border-primary_colors p-2 focus:outline-none">
              {comments?.length > 0 ? (
                comments?.map((items, i) => (
                  <div key={i}>
                    <div className="flex justify-between">
                      <h1 className="text-xs font-medium text-gray-500 capitalize">
                        {items?.commentor}
                      </h1>
                      <h1 className="text-xs text-gray-500">
                        {new Date(items?.createdAt).toLocaleString()}
                      </h1>
                    </div>
                    <div className="bg-primary_colors p-5 mt-2 rounded-lg">
                      <p className="text-[13px] text-white">{items?.comment}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <EmptyData data={"No Comments Are Available"} />
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

export default MessageBox;
