import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import ReqLoader from "../loading/ReqLoader";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { toast } from "react-toastify";
import { deleteStepper } from "../../utils/Endpoint";


const ApplicationCard = ({ data, getData }) => {
  // console.log(data);
  const navigate = useNavigate();
  const [deleteModal, setDeleteModal] = useState(false)
  // const [stepper, setStepper] = useState({})

  const instance = useAxiosPrivate();

  const [loader, setLoader] = useState(false);

  const CancelModal = () => {
    setDeleteModal(false);
  };

  const ConfirmDeletion = async () => {
    try {
      setLoader(true);
      await instance
        .delete(`${deleteStepper}/${data?._id}`)
        .then((res) => {
          toast.success(res?.data?.msg);
          getData();
          CancelModal();
        })
        .catch((error) => {
          console.log(error);
          toast.error(error?.response?.data?.msg);
        });
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  const handleDelete = (e) => {
    e.stopPropagation()
    setDeleteModal(true)
  }

  return (
    <>
    <div
      onClick={(e) =>
        navigate(`/applications/${data.applicationId}/${data._id}`)
      }
      className="relative p-8 bg-white rounded-lg shadow-lg w-full md:w-[310px] capitalize hover:scale-105 ease-in-out duration-200 cursor-pointer"
    >
      <h1 className="font-semibold text-primary_colors">
        university:{" "}
        <span className="font-medium text-sm">{data?.university}</span>
      </h1>
      <h1 className="font-semibold text-primary_colors">
        Program:{" "}
        <span className="font-medium text-sm">{data?.program}</span>
      </h1>
      <h1 className="font-semibold text-primary_colors">
        Intake:{" "}
        <span className="font-medium text-sm">{data?.intake}</span>
      </h1>
      <h1 className="mt-2 text-sm">
        Partnership:{" "}
        <span className="font-medium text-gray-500">{data?.partnership}</span>
      </h1>
      <h1 className="mt-2 text-sm">
        Through:{" "}
        <span className="font-medium text-gray-500">{data?.through}</span>
      </h1>
      <h1 className="mt-2 text-sm">
        Total Steps:{" "}
        <span className="font-medium text-gray-500">{data?.steps.length}</span>
      </h1>

      <MdDeleteOutline
        onClick={handleDelete}
        size={26}
        className="absolute top-4 right-4 cursor-pointer hover:scale-105 ease-in-out duration-400 text-red-700"
      />

    </div>
      {
        deleteModal
        &&
        <div className="fixed top-0 left-0 w-full h-screen bg-black/50 flex items-center justify-center z-50">
          <div className="relative bg-white mt-60  md:mt-0 rounded-lg p-5 md:p-10 m-5 flex flex-col gap-7">
            <h1 className="font-bold text-center capitalize text-xl text-primary_colors">
              Do you want to delete ?
            </h1>
            <IoClose
              onClick={CancelModal}
              className="absolute right-3 top-3 rounded bg-primary_colors text-white cursor-pointer bg-primary"
            />
            <div className="w-full flex justify-evenly gap-3">
              <button
                onClick={CancelModal}
                className="p-2 px-5 rounded text-sm text-white bg-primary_colors w-full"
              >
                Cancel
              </button>

              <button
                onClick={ConfirmDeletion}
                className="p-2 px-5 rounded text-sm text-white bg-red-500 w-full"
              >
                Confirm
              </button>
            </div>
          </div>
          {loader && <ReqLoader />}
        </div>
  }
    </>

  );
};

export default ApplicationCard;
