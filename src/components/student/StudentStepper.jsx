import React, { useEffect, useState } from "react";
import { TiTick } from "react-icons/ti";
import { useSelector } from "react-redux";
import { getAnApplicationRoute } from "../../utils/Endpoint";
import { BarLoader } from "react-spinners";

import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "../stepper/TrackingUI.css";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const TrackingUI = ({stepper}) => {
  const axios = useAxiosPrivate();

  const [currentStep, setCurrentStep] = useState(0);
  const [complete, setComplete] = useState(false);
  const [state, setState] = useState([]);

  const user = useSelector((state) => state.auth.userInfo);

  useEffect(() => {
    axios
      .get(`${getAnApplicationRoute}/${user?.applicationId}`)
      .then((res) => {
        setState(res.data);
        setCurrentStep(res.data.currentStep || 0);
        setComplete();
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user]);

  return (
    <>
      <div
        className={`w-full ${
          user.role === "student"
            ? "flex  items-start justify-start"
            : "flex  justify-between"
        }`}
      >
        {stepper?.steps?.length > 0 ? (
          stepper?.steps?.map((step, i) => (
            <div
              key={i}
              className={`step-item text-wrap text-center ${
                currentStep === i + 1 && "active"
              } ${
                (i + 1 < currentStep || step?.status === "completed") &&
                "complete"
              } `}
            >
              <div className={`step ${user.role === "student" && "me-10"}`}>
                {i + 1 < currentStep || step?.status === "completed" ? (
                  <TiTick size={24} />
                ) : (
                  i + 1
                )}
              </div>
              <Tippy className="" content={<div>{step.name}</div>}>
                <p className="text-gray-500 w-10  text-xs font-semibold mt-2 truncate cursor-pointer">
                  {step.name}{" "}
                </p>
              </Tippy>
            </div>
          ))
        ) : (
          <div className="flex items-center gap-4">
            <BarLoader color="#058BD2" />
            <span className="text-gray-500 font-semibold">
              Application Not Start Yet
            </span>
          </div>
        )}
      </div>
    </>
  );
};

export default TrackingUI;
