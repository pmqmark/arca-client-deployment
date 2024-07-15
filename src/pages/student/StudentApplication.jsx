import React, { useEffect, useState } from "react";
import StudentStepper from "../../components/student/StudentStepper";
import DateFormat from "../../utils/DateFormat";
import DocModal from "../../components/student/DocModal";

import { useSelector } from "react-redux";
import { getAnApplicationRoute } from "../../utils/Endpoint";
import { Link, useParams } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const StudentApplication = () => {
  const axios = useAxiosPrivate();

  const {id} = useParams()
  const [state, setState] = useState([]);
  const [docModal, setDocModal] = useState(false);
  const user = useSelector((state) => state.auth.userInfo);

  const [currStepper, setCurrStepper] = useState(null);

  useEffect(() => {
    window.scroll(0, 0);
    axios
      .get(`${getAnApplicationRoute}/${id}`)
      .then((res) => {
        setState(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [docModal, user?.id]);

  const fnToCallGetFn = () => {
    console.log("Doc upload");
  };

  console.log(state);
  return (
    <>
      <div className=" w-full mb-20">
        <div className="w-full">
          <div className="w-full mt-10 p-5 bg-gradient-to-b from-[#28B5FF] to-[#1B4160] rounded-lg">
            <div className="flex flex-col md:flex-row gap-3 justify-between">
              <div>
                <h1 className="font-semiBold text-white text-2xl">
                  Welcome{" "}
                  <span className="font-semiBold capitalize">{user?.name}</span>
                </h1>

              </div>
              <div>
                <p className="text-white text-[11px]">
                  <span className="font-bold">DOB :</span>{" "}
                  {DateFormat(user?.birthDate)}
                </p>

                
              </div>
            </div>
            {/* details about the student */}
            <div className="text-white text-xs mt-8 gap-3  flex flex-wrap md:flex-row justify-between">
              <div>
                <h1 className="font-semibold pb-0.5">Email</h1>
                <p>{user?.email}</p>
              </div>
              <div>
                <h1 className="font-semibold pb-0.5">Phone</h1>
                <p>{user?.phone}</p>
              </div>
              <div>
                <h1 className="font-semibold pb-0.5">Qualification</h1>
                <p>{user?.qualification}</p>
              </div>
              <div>
                <h1 className="font-semibold pb-0.5">Country</h1>
                <p>
                  {
                    state?.country
                      ?
                      state?.country
                      :
                      "NIL"
                  }
                </p>
              </div>

              <div>
                <h1 className="font-semibold pb-0.5">Intake</h1>
                <p>
                  {state?.intakes
                    ?
                    (state?.intakes?.length > 1
                      ?
                      state?.intakes[0] + " +more"
                      :
                      state?.intakes[0])
                    :
                    "NIL"

                  }
                </p>
              </div>
            </div>
          </div>

          {/* Tracker for the status */}
          {
            <div className="mt-10 w-full">
              <h1 className="text-[#0061B2] font-bold text-xl">
                Track your Progress
              </h1>
              <div className="w-full flex flex-col gap-[8vh] ">
                <div className="w-full overflow-x-auto flex gap-5 p-2 py-10 ">
                  {state?.steppers?.map((stepper, i) => (
                    <div
                      key={i}
                      onClick={() => setCurrStepper(stepper)}
                      className="flex flex-col p-5 bg-white rounded-lg shadow-xl w-full md:w-[210px] cursor-pointer"
                    >
                      <h1 className="text-primary_colors">University: <span className="text-black">{stepper?.university}</span> </h1>
                      <h4 className="text-primary_colors">Program: <span className="text-black">{stepper?.program}</span></h4>
                      <h4 className="text-primary_colors">Intake: <span className="text-black">{stepper?.intake}</span></h4>
                    </div>
                  ))}
                </div>
                {currStepper && (
                  <div className="w-full overflow-x-auto flex justify-around">
                    <StudentStepper stepper={currStepper} />
                  </div>
                )}

              </div>
            </div>
          }

          {/* Document Update and view */}
          <div className="mt-10 flex flex-col justify-end">
            <div className="w-full mb-5">
              <h1 className="text-[#0061B2] font-bold text-xl">Documents</h1>
              <div className="my-5">
                {state?.documents?.length > 0 ? (
                  <div>
                    {state?.documents?.map((items, i) => (
                      <div className="flex gap-4 items-center justify-between border p-3 my-2 rounded border-primary_colors bg-blue-50">
                        <p key={i} className="text-sm ">
                          {" "}
                          <span className="font-semibold">
                            Document Name :{" "}
                          </span>
                          <span className="text-sm capitalize">
                            {items?.name}
                          </span>
                        </p>
                        <Link to={items?.location}>
                          <button className="bg-primary_colors p-2 px-5 text-sm rounded text-white hover:scale-105 ease-in-out duration-300">
                            Download
                          </button>
                        </Link>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div>
                    <h1>No Documents are submitted</h1>
                  </div>
                )}
              </div>
            </div>
            <div className="w-full flex justify-end">
              <button
                onClick={() => setDocModal(true)}
                className="bg-[#0061B2] md:w-1/4 text-white text-sm p-3 px-5 rounded hover:scale-105 ease-in-out duration-300"
              >
                Upload Documents
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {docModal && (
        <DocModal
          setModal={setDocModal}
          applicationData={state}
          cb={fnToCallGetFn}
        />
      )}
    </>
  );
};

export default StudentApplication;
