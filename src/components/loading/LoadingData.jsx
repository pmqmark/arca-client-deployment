import React from "react";
import { PulseLoader } from "react-spinners";

const LoadingData = () => {
  return (
    <div className="flex flex-col items-center">
      <PulseLoader color="#058BD2" />
    </div>
  );
};

export default LoadingData;
