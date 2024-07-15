import React from "react";
import { TiTick } from "react-icons/ti";
import "./TrackingUI.css";
import { useSelector } from "react-redux";

const TrackingUI = ({ currentStep, complete, steps }) => {
  const user = useSelector((state) => state.auth.userInfo);
  return (
    <>
      <div
        className={`w-full ${
          user.role === "student" ? "flex  items-start justify-start" : "flex  justify-between"
        }`}
      >
        {steps?.map((step, i) => (
          <div
            key={i}
            className={`step-item text-wrap text-center ${
              currentStep === i + 1 && "active"
            } ${(i + 1 < currentStep || complete) && "complete"} `}
          >
            <div className={`step ${user.role === "student" && "me-10"}`}>
              {i + 1 < currentStep || complete ? <TiTick size={24} /> : i + 1}
            </div>
            <p className="text-gray-500 text-wrap text-center text-xs font-semibold mt-2">
              {step}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default TrackingUI;
