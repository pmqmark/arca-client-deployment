import React from "react";

const EmptyData = ({ data }) => {
  return (
    <div className="flex flex-col items-center">
      <span className="text-gray-500 text-sm mt-2">{data}</span>
    </div>
  );
};

export default EmptyData;
