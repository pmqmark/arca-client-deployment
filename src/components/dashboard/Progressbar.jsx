import React from "react";
import ProgressBar from "@ramonak/react-progress-bar";

const Progressbar = ({label, numerator,denominator}) => {
  return (
    <div className="md:border md:border-[#E3E3E3] md:p-6 rounded-lg space-y-2 hover:cursor-pointer hover:scale-105 ease-in-out duration-300">
      <div className="flex justify-between text-sm text-normalText font-medium text-white">
        <h1>{label}</h1>
        <span>{`${numerator}/${denominator}`}</span>
      </div>
      <ProgressBar
        completed={denominator!==0 ? Math.floor(numerator/denominator*100) : 0}
        animateOnRender={true}
        height="13px"
        width=""
        labelSize={8}
        className="lg:w-full "
        bgColor="#1090D4"
      />
    </div>
  );
};

export default Progressbar;
